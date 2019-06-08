/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  CREATE_HISTORY_ELEMENT: "CREATE_HISTORY_ELEMENT"
};

const getActions = uri => {
  const objects = {
    createHistoryElement: (user, videoID) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.createHistoryElement,
          variables: { userID: user._id, videoID: videoID }
        };
        makePromise(execute(link, operation)).then(data => {
          user.history = data.data.createHistoryElement.history;

          dispatch({
            type: actionTypes.CREATE_HISTORY_ELEMENT
          });
        });
        // .catch(error => console.log(error));
      };
    }
  };

  return { ...objects };
};
const query = {};

const mutation = {
  createHistoryElement: gql`
    mutation($userID: String!, $videoID: String!) {
      createHistoryElement(input: { userID: $userID, videoID: $videoID }) {
        history {
          _id
          viewedAt
          video {
            _id
            title
          }
        }
      }
    }
  `
};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
