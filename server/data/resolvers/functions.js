const { Video, Global } = require("../../models");
const moment = require("moment");

const period = process.env.GLOBAL_PERIOD;

// Video filters
const videoFilters = async ({
  OR = [],
  description_contains,
  url_contains,
  title_contains,
  user_contains,
  tags_contains,
  id_contains,
  username_contains,
  longer_than,
  shorter_than,
  posted_within,
  params
}) => {
  const filter =
    description_contains ||
    url_contains ||
    title_contains ||
    user_contains ||
    tags_contains ||
    username_contains ||
    id_contains ||
    longer_than ||
    shorter_than ||
    posted_within ||
    params
      ? {}
      : null;
  if (params) {
    params = params.split(",");
    let videos = await fillVideos({
      regex: params[0],
      sort: params[1],
      cursor: parseInt(params[2], 10),
      minLimit: parseInt(params[3], 10)
    });
    return { videos };
  }
  if (longer_than) {
    filter.duration = { $gte: longer_than };
  }
  if (shorter_than) {
    filter.duration = { $lte: shorter_than };
  }
  if (posted_within) {
    let period;
    switch (posted_within) {
      case 1:
        period = "day";
        break;
      case 7:
        period = "week";
        break;
      case 30:
        period = "month";
        break;
      case 365:
        period = "year";
        break;
      default:
        period = "day";
    }

    filter.createdAt = {
      $lt: moment().endOf(period),
      $gte: moment().startOf(period)
    };
  }
  if (description_contains) {
    filter.description = { $regex: `.*(?i)${description_contains}.*` };
  }
  if (url_contains) {
    filter.url = { $regex: `.*${url_contains}.*` };
  }
  if (title_contains) {
    filter.title = { $regex: `.*(?i)${title_contains}.*` };
  }
  if (user_contains) {
    filter.user = user_contains;
  }
  if (username_contains) {
    filter._username = { $regex: `.*(?i)${username_contains}.*` };
  }
  if (tags_contains) {
    filter.tags = { $regex: `.*(?i)${tags_contains}.*` };
  }
  if (id_contains) {
    filter._id = { $in: id_contains };
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(await videoFilters(OR[i]));
  }
  return filters;
};

// List filters
const listFilters = ({ OR = [], key_contains }) => {
  const filter = key_contains ? {} : null;

  if (key_contains) {
    filter.key = { $regex: `.*(?i)${key_contains}.*` };
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(listFilters(OR[i]));
  }
  return filters;
};
// Comment filters
const commentFilters = ({ OR = [], video_equals, id_contains }) => {
  const filter = video_equals || id_contains ? {} : null;

  if (id_contains) {
    filter.id = { $regex: `.*(?i)${id_contains}.*` };
  }

  if (video_equals) {
    filter.video = video_equals;
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(commentFilters(OR[i]));
  }
  return filters;
};

// Report filters
// const reportFilters = ({ OR = [], key_contains }) => {
//   const filter = key_contains ? {} : null;

//   if (key_contains) {
//     filter.key = { $regex: `.*(?i)${key_contains}.*` };
//   }

//   let filters = filter ? [filter] : [];
//   for (let i = 0; i < OR.length; i++) {
//     filters = filters.concat(listFilters(OR[i]));
//   }
//   return filters;
// };

// User filters
const userFilters = ({
  OR = [],
  username_contains,
  username_equals,
  email_contains,
  email_equals,
  id_contains
}) => {
  const filter =
    username_contains ||
    username_equals ||
    email_contains ||
    email_equals ||
    id_contains
      ? {}
      : null;

  if (username_contains) {
    filter.username = { $regex: `.*(?i)${username_contains}.*` };
  }
  if (username_equals) {
    filter.username = { $regex: `^(?i)${username_equals}$` };
  }
  if (email_contains) {
    filter.email = { $regex: `.*(?i)${email_contains}.*` };
  }
  if (email_equals) {
    filter.email = { $regex: `^(?i)${email_equals}$` };
  }
  if (id_contains) {
    filter._id = id_contains;
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(userFilters(OR[i]));
  }

  return filters;
};

// List filters
const historyElementFilters = ({ OR = [], user_contains }) => {
  const filter = user_contains ? {} : null;

  if (key_contains) {
    filter.user = { $regex: `.*(?i)${user_contains}.*` };
  }

  let filters = filter ? [filter] : [];
  for (let i = 0; i < OR.length; i++) {
    filters = filters.concat(historyElementFilters(OR[i]));
  }
  return filters;
};

const fillVideos = async list => {
  if (!list.regex) return [];
  if (list.regex[0] == "$") {
    let keys;
    let type = list.regex.substring(1);
    let sorter = list.sort;
    let retFunc;

    switch (type) {
      case "trends":
        keys = (await Global.find({
          recordFrom: getStartOfPeriod(period),
          period: period
        }).populate("trends"))[0];
        if (!keys) return [];
        keys = keys.trends.toObject();
        retFunc = () => {
          return Video.find({
            $and: [{ tags: { $in: keys } }, { state: 1 }, { disable: false }]
          })
            .limit(list.minLimit)
            .skip(list.cursor || 0);
        };
        break;
      case "activity":
        keys = (await Global.find({
          recordFrom: getStartOfPeriod(period),
          period: period
        }).populate("activity"))[0];
        if (!keys) return [];
        keys = keys.activity.toObject();
        retFunc = () => {
          return Video.find({
            $and: [{ _id: { $in: keys } }, { state: 1 }, { disable: false }]
          })
            .limit(list.minLimit)
            .skip(list.cursor || 0);
        };
        break;
      default:
        keys = [];
    }

    let sortFunc;

    switch (sorter) {
      case "likes":
        sortFunc = (a, b) => {
          if (a.likes < b.likes) return 1;
          if (a.likes > b.likes) return -1;
          return 0;
        };
        break;
      case "views":
        sortFunc = (a, b) => {
          if (a.views < b.views) return 1;
          if (a.views > b.views) return -1;
          return 0;
        };
        break;
    }

    keys = keys.sort(sortFunc).map(a => a.key);

    return await retFunc();
  } else {
    return await Video.find({
      $and: [JSON.parse(list.regex), { state: 1 }, { disable: false }]
    })
      .sort(list.sort ? JSON.parse(list.sort) : {})
      .limit(list.minLimit)
      .skip(list.cursor || 0);
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

module.exports = {
  historyElementFilters,
  videoFilters,
  listFilters,
  userFilters,
  commentFilters,
  fillVideos
};
