import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";

const actionTypes = {
  FETCH_LISTS: "FETCH_LISTS",
  FETCH_LIST: "FETCH_LIST",
  UPDATE_LIST_VIDEO: "UPDATE_LIST_VIDEO",
  APPEND_LIST: "APPEND_LIST",
  TOGGLE_UPDATING_STATUS: "TOGGLE_UPDATING_STATUS",
  SET_LIST_SLIDE_INDEX: "SET_LIST_SLIDE_INDEX"
};

const getActions = uri => {
  const objects = {
    fetchLists: () => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.allLists
        };

        makePromise(execute(link, operation)).then(data => {
          dispatch({
            type: actionTypes.FETCH_LISTS,
            lists: data.data.allLists
          });
        });
        // .catch(error => console.log(error));
      };
    },
    fetchList: key => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = { query: query.list, variables: { key: key } };

        return makePromise(execute(link, operation)).then(data => {
          dispatch({
            type: actionTypes.FETCH_LIST,
            list: data.data.allLists[0]
          });
          return Promise.resolve(data.data.allLists[0]);
        });
        // .catch(error => console.log(error));
      };
    },
    populateList: list => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.listVideos,
          variables: { tags: [list.key] }
        };

        return makePromise(execute(link, operation)).then(data => {
          let videos = data.data.allVideos;
          list.videos = videos;
          dispatch(objects.appendList(list));
        });
        // .catch(error => console.log(error));
      };
    },
    toggleUpdatingStatus: value => {
      return {
        type: actionTypes.TOGGLE_UPDATING_STATUS,
        value: value
      };
    },
    appendList: list => {
      return {
        type: actionTypes.APPEND_LIST,
        list: list
      };
    },
    setListSlideIndex: (list, index) => {
      return {
        type: actionTypes.SET_LIST_SLIDE_INDEX,
        list: {
          ...list,
          slideIndex: index
        }
      };
    },
    updateListVideo: video => {
      return {
        type: actionTypes.UPDATE_LIST_VIDEO,
        video: video
      };
    }
  };

  return { ...objects };
};

const query = {
  listVideos: gql`
    query($tags: [String]) {
      allVideos(filter: { OR: [{ tags_contains: $tags }] }) {
        _id
        title
        duration
        has_thumbnail
        createdAt
        views
        path
        likes {
          _id
        }
        user {
          _id
          username
        }
        state
        mature
      }
    }
  `,
  allLists: gql`
    query {
      allLists {
        key
        regex
        sort
        videos {
          _id
          title
          duration
          has_thumbnail
          createdAt
          views
          path
          likes {
            _id
          }
          user {
            _id
            username
          }
          state
          mature
        }
        url
        icon
        href
        minLimit
        maxLimit
      }
    }
  `,
  list: gql`
    query($key: String) {
      allLists(filter: { OR: [{ key_contains: $key }] }) {
        key
        regex
        sort
        videos {
          _id
          title
          duration
          has_thumbnail
          createdAt
          views
          path
          likes {
            _id
          }
          user {
            _id
            username
          }
          state
          mature
        }
        url
        icon
        href
        minLimit
        maxLimit
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
