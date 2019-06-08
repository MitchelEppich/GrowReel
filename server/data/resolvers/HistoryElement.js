const { HistoryElement, Video, User } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const { historyElementFilters } = require("./functions");

const resolvers = {
  Query: {
    historyElement: (_, args) => {
      return HistoryElement.findOne(args);
    },
    allHistoryElements: (_, { filter }) => {
      let query = filter ? { $or: historyElementFilters(filter) } : {};
      return HistoryElement.find(query);
    }
  },
  // You can pull all the videos right here but most likely not great for data
  HistoryElement: {
    video(historyElement) {
      return Video.findById(historyElement.video);
    }
  },
  Subscription: {},
  Mutation: {
    createHistoryElement: async (_, { input }) => {
      const historyElement = new HistoryElement({
        video: input.videoID,
        user: input.userID
      });

      const user = await User.findById(input.userID);

      user.history.push(historyElement);

      user.save();
      historyElement.save();

      return user.toObject();
    }
  }
};

module.exports = resolvers;
