const { ActivityRecord } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const resolvers = {
  Query: {},
  Global: {},
  Subscription: {},
  Mutation: {
    createActivityRecord: async (_, { input }) => {
      let activityRecord = new ActivityRecord({
        ...input,
        views: input.new_view ? 1 : 0,
        likes: input.new_like ? 1 : 0
      });

      await activityRecord.save();

      return { id: activityRecord._id, new: true };
    },
    updateActivityRecord: async (_, { input }) => {
      let activityRecord = await ActivityRecord.findOneAndUpdate(
        { $or: [{ key: input.key, recordFor: input.recordFor }] },
        {
          $set: { ...input },
          $inc: { likes: input.new_like ? 1 : 0, views: input.new_view ? 1 : 0 }
        }
      );

      if (!activityRecord) {
        return await resolvers.Mutation.createActivityRecord(_, {
          input: input
        });
      }

      return { id: activityRecord._id, new: false };
    }
  }
};

module.exports = resolvers;
