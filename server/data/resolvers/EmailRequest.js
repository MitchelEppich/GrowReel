const { EmailRequest } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    emailRequest: (_, args) => {
      return EmailRequest.findOne(args);
    }
  },
  Subscription: {},
  Mutation: {
    createEmailRequest: (_, { input }) => {
      const emailReq = new EmailRequest({
        ...input
      });

      emailReq.save();

      return { _id: emailReq._id };
    },
    destroyEmailRequest: async (_, { input }) => {
      await EmailRequest.findByIdAndRemove(input.id);
    }
  }
};

module.exports = resolvers;
