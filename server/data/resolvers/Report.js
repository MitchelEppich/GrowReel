const { Report } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    report: (_, args) => {
      return EmailRequest.findOne(args);
    },
    allReports: (_, { filter }) => {
      return EmailRequest.findOne(args);
    }
  },
  Subscription: {},
  Mutation: {
    createReport: (_, { input }) => {
      const report = new Report({
        ...input
      });

      report.save();

      return report.toObject();
    }
  }
};

module.exports = resolvers;
