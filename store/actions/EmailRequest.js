/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  CHECK_FOR_EMAIL_REQUEST: "CHECK_FOR_EMAIL_REQUEST"
};

const getActions = uri => {
  const objects = {
    checkForEmailRequest: id => {
      return dispatch => {
        let object = null;
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.getEmailRequest,
          variables: { id: id }
        };
        return makePromise(execute(link, operation)).then(data => {
          object = data.data.emailRequest;
          dispatch(objects.destroyEmailRequest(id));
          dispatch({
            type: actionTypes.CHECK_FOR_EMAIL_REQUEST,
            object: object
          });
          return Promise.resolve(object);
        });
      };
    },
    destroyEmailRequest: id => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.destroyEmailRequest,
          variables: { id: id }
        };
        makePromise(execute(link, operation)).catch(error => {});
      };
    }
  };

  return { ...objects };
};

const query = {};

const mutation = {
  getEmailRequest: gql`
    query($id: String) {
      emailRequest(_id: $id) {
        _id
        type
        expireAt
        email
      }
    }
  `,
  destroyEmailRequest: gql`
    mutation($id: String) {
      destroyEmailRequest(input: { id: $id }) {
        _id
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
