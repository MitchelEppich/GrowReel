/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import List from "./List";

const moment = require("moment");

const actionTypes = {
  USE_KEY: "USE_KEY"
};

const getActions = uri => {
  const objects = {
    buildList: usedKeys => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.getTrends,
          variables: { recordFrom: getStartOfPeriod("monthly") }
        };
        makePromise(execute(link, operation)).then(data => {
          if (usedKeys.length == data.data.global.trends.length) return;

          let global = (({ trends, activity }) => {
            return {
              trends: trends
                .filter(a => {
                  if (a.views < 100) return false;
                  return true;
                })
                .sort((a, b) => {
                  if (a.views < b.views) return 1;
                  if (a.views > b.views) return -1;
                  return 0;
                })
                .map(a => a.key)
            };
          })(data.data.global);

          let key = global.trends[usedKeys.length];
          if (key == null) return;
          let list = {
            key: key,
            href: key,
            regex: { tags: key },
            sort: { createdAt: -1 },
            icon: "cannabis",
            url: `../static/images/backgrounds/background_0${((usedKeys.length +
              3) %
              6) +
              1}.jpg`,
            videos: []
          };

          const listActions = List(uri);
          dispatch({
            type: actionTypes.USE_KEY,
            key: key
          });
          dispatch(listActions.populateList(list));
        });
        // .catch(error => console.log(error));
      };
    }
  };

  return { ...objects };
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

const query = {
  getTrends: gql`
    query($recordFrom: String) {
      global(recordFrom: $recordFrom) {
        trends {
          _id
          key
          views
          likes
        }
        activity {
          _id
          key
          views
          likes
        }
      }
    }
  `
};

const mutation = {};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
