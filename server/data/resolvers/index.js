const nodemailer = require("nodemailer");

const emailTemplates = require("../emails");

const aws = require("aws-sdk");

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3Bucket = process.env.S3_BUCKET;

const UserResolvers = require("./User");
const VideoResolvers = require("./Video");
const CommentResolvers = require("./Comment");
const HistoryElementResolvers = require("./HistoryElement");
const EmailRequestResolvers = require("./EmailRequest");
const ListResolvers = require("./List");
const ReportResolvers = require("./Report");
const GlobalResolvers = require("./Global");
const S3Resolvers = require("./S3");
const MessagesResolvers = require("./Messages");

const User = UserResolvers.User;
const Comment = CommentResolvers.Comment;
const HistoryElement = HistoryElementResolvers.HistoryElement;
// const EmailRequest = EmailRequestResolvers.EmailRequest;
const Video = VideoResolvers.Video;
const List = ListResolvers.List;
const Global = GlobalResolvers.Global;

const resolvers = {
  Query: {
    ...CommentResolvers.Query,
    ...UserResolvers.Query,
    ...VideoResolvers.Query,
    ...ListResolvers.Query,
    ...HistoryElementResolvers.Query,
    ...EmailRequestResolvers.Query,
    ...ReportResolvers.Query,
    ...GlobalResolvers.Query,
    ...S3Resolvers.Query,
    ...MessagesResolvers.Query
  },
  User,
  Comment,
  Video,
  List,
  HistoryElement,
  Global,
  Subscription: {
    ...CommentResolvers.Subscription
  },
  Mutation: {
    ...CommentResolvers.Mutation,
    ...UserResolvers.Mutation,
    ...VideoResolvers.Mutation,
    ...ListResolvers.Mutation,
    ...HistoryElementResolvers.Mutation,
    ...EmailRequestResolvers.Mutation,
    ...ReportResolvers.Mutation,
    ...GlobalResolvers.Mutation,
    ...S3Resolvers.Mutation,
    ...MessagesResolvers.Mutation,
    createPasswordResetURL: (_, email) => {
      // Need to ensure this is directing to the correct DNS
      let prefix = `https://growreel.com/`;

      let input = { type: "reset", email: email };

      let emailReq = resolvers.Mutation.createEmailRequest(_, { input });

      let id = emailReq._id;

      return prefix + "e/" + id;
    },
    sendEmail: async (_, { input }) => {
      let url = await resolvers.Mutation.createPasswordResetURL(_, input.email);

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "growreel.noreply@gmail.com",
          pass: "etydthavvvnkdqxf"
        }
      });

      let mailOptions;
      switch (input.type) {
        case "welcome":
          mailOptions = emailTemplates.welcome({
            ...input,
            username: (await UserResolvers.Query.user(_, {
              email: input.email
            })).username,
            url: url
          });
          break;
        case "passwordReset":
          mailOptions = emailTemplates.passwordReset({
            ...input,
            username: (await UserResolvers.Query.user(_, {
              email: input.email
            })).username,
            url: url
          });
          break;
      }

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // nothing
        }
      });
    }
  }
};

module.exports = resolvers;
