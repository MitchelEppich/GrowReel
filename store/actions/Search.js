/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  SET_SEARCH: "SET_SEARCH",
  APPEND_SEARCH: "APPEND_SEARCH",
  SET_FILTER: "SET_FILTER",
  SET_SEARCH_KEY: "SET_SEARCH_KEY"
};

const getActions = uri => {
  const objects = {
    setSearch: searchVideos => {
      return {
        type: actionTypes.SET_SEARCH,
        searchVideos: searchVideos
      };
    },
    appendSearch: searchVideos => {
      return {
        type: actionTypes.APPEND_SEARCH,
        searchVideos: searchVideos
      };
    },
    setSearchKey: input => {
      return {
        type: actionTypes.SET_SEARCH_KEY,
        input: input
      };
    },
    fetchSearch: (input, limit, queryElm, cursor) => {
      return dispatch => {
        let target = `${queryElm.target}_contains`;
        let length =
          queryElm.length == "long"
            ? "longer_than"
            : queryElm.length == "short"
            ? "shorter_than"
            : undefined;
        let len =
          queryElm.length == "long"
            ? 240
            : queryElm.length == "short"
            ? 120
            : undefined;
        let period = queryElm.postedOn;

        let sort = queryElm.sort;

        let or = {};
        or[target] = input;
        if (length != null) or[length] = len;
        if (period != null) or["posted_within"] = period;

        let filter = { OR: [or] };

        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.search,
          variables: { filter: filter, limit: limit, cursor: cursor }
        };

        makePromise(execute(link, operation))
          .then(data => {
            if (cursor == null) {
              dispatch(
                objects.setSearch(
                  data.data.allVideos.sort((a, b) => {
                    if (a[sort] < b[sort]) return 1;
                    if (a[sort] > b[sort]) return -1;
                    return 0;
                  })
                )
              );
            } else {
              dispatch(
                objects.appendSearch(
                  data.data.allVideos.sort((a, b) => {
                    if (a[sort] < b[sort]) return 1;
                    if (a[sort] > b[sort]) return -1;
                    return 0;
                  })
                )
              );
            }
          })
          .catch(error => console.log(error));
      };
    },
    setFilter: input => {
      return {
        type: actionTypes.SET_FILTER,
        sort: input.sort,
        length: input.length,
        target: input.target,
        postedOn: input.postedOn
      };
    }
  };

  return { ...objects };
};

const query = {
  search: gql`
    query($filter: VideoFilter, $limit: Int, $cursor: Int) {
      allVideos(
        filter: $filter
        limit: $limit
        cursor: $cursor
        hasAccess: false
      ) {
        _id
        title
        has_thumbnail
        path
        duration
        createdAt
        views
        likes {
          _id
        }
        user {
          _id
          username
        }
        feature
        state
        mature
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
