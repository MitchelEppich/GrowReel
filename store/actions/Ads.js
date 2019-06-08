import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {};

const getActions = uri => {
  const objects = {
    createAd: ad => {},
    fetchAd: query => {},
    updateAd: ad => {},
    deleteAd: id => {},
    postAd: ad => {},
    uploadAdVideo: video => {}
  };

  return { ...objects };
};
const query = {};

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
