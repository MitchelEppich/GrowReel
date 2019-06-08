const { Global, ActivityRecord } = require("../../models");

const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const moment = require("moment");

const period = process.env.GLOBAL_PERIOD;

const ActivityRecordResolver = require("./ActivityRecord");

const resolvers = {
  Query: {
    global: async (_, args) => {
      return Global.findOne(args);
    }
  },
  Global: {
    trends(global) {
      return ActivityRecord.find({ _id: { $in: global.trends } });
    },
    activity(global) {
      return ActivityRecord.find({ _id: { $in: global.activity } });
    }
  },
  Subscription: {},
  Mutation: {
    createGlobal: _ => {
      let global = new Global({
        recordFrom: getStartOfPeriod(period),
        period: period
      });

      return global;
    },
    upsertGlobal: async (_, { input }) => {
      let recordFrom = getStartOfPeriod(period);
      let global = (await Global.find({
        recordFrom: recordFrom
      }).limit(1))[0];

      if (!global) {
        global = resolvers.Mutation.createGlobal();
      }

      if (input.tags) {
        for (const tag of input.tags) {
          let res = await ActivityRecordResolver.Mutation.updateActivityRecord(
            _,
            {
              input: {
                key: tag,
                ...input,
                recordFor: recordFrom,
                period: period
              }
            }
          );

          if (res.new) {
            global.trends.push(res.id);
          }
        }
      }

      if (input.videos) {
        for (const id of input.videos) {
          let res = await ActivityRecordResolver.Mutation.updateActivityRecord(
            _,
            {
              input: {
                key: id,
                ...input,
                recordFor: recordFrom,
                period: period
              }
            }
          );

          if (res.new) {
            global.activity.push(res.id);
          }
        }
      }

      global.save();

      return global.toObject();
    }
  }
};

const getStartOfPeriod = period => {
  let periodStart;
  switch (period) {
    case "monthly":
      periodStart = new moment().date(1);
      break;
    case "weekly":
      periodStart = new moment().day("Sunday");
      break;
    default:
      periodStart = new moment();
      break;
  }

  return periodStart.startOf("day").format("X");
};

module.exports = resolvers;
