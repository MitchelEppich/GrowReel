const { List, Video, Global } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const { listFilters, fillVideos } = require("./functions");

const moment = require("moment");

const period = process.env.GLOBAL_PERIOD;

const resolvers = {
  Query: {
    list: (_, args) => {
      return List.findOne(args);
    },
    allLists: (_, { filter }) => {
      let query = filter ? { $or: listFilters(filter) } : {};
      return List.find(query);
    }
  },
  // You can pull all the videos right here but most likely not great for data
  List: {
    async videos(list) {
      return fillVideos(list);
    }
  },
  Subscription: {},
  Mutation: {
    createList: async (_, { input }) => {
      const list = new List({
        ...input
      });

      await list.save();

      return list.toObject();
    }
  }
};

module.exports = resolvers;
