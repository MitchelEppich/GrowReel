/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  UPSERT_MESSAGE: "UPSERT_MESSAGE",
  USER_MESSAGES: "USER_MESSAGES",
  EDIT_MESSAGE: "EDIT_MESSAGE",
  NEW_MESSAGE: "NEW_MESSAGE"
};

const getActions = uri => {
  const objects = {
    upsertMessage: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.upsertMessage,
          variables: {
            ...input
          }
        };
        makePromise(execute(link, operation)).then(data => {
          console.log(data.data.upsertMessage);
          dispatch({
            type: actionTypes.UPSERT_MESSAGE
          });
        });
      };
    },
    editMessage: input => {
      return {
        type: actionTypes.EDIT_MESSAGE,
        input: input.index
      };
    },
    newMessage: input => {
      return {
        type: actionTypes.NEW_MESSAGE,
        messages: input.messages,
        index: input.index
      };
    },
    userMessages: input => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.userMessages,
          variables: {
            ...input
          }
        };
        makePromise(execute(link, operation)).then(data => {
          let messages = data.data.userMessages;
          dispatch({
            type: actionTypes.USER_MESSAGES,
            input: messages
          });
        });
      };
    }
  };

  return { ...objects };
};
const query = {
  userMessages: gql`
    query($username: String) {
      userMessages(username: $username) {
        key
        body
        subject
        sentAt
        updatedAt
        recipient
        sender
      }
    }
  `
};

const mutation = {
  upsertMessage: gql`
    mutation(
      $recipient: [String]
      $key: String
      $body: String
      $subject: String
      $sender: String
    ) {
      upsertMessage(
        input: {
          recipient: $recipient
          key: $key
          body: $body
          subject: $subject
          sender: $sender
        }
      )
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
