import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import Router from "next/router";

const actionTypes = {
  TOGGLE_REEL: "TOGGLE_REEL",
  HANDLE_REEL_SCROLL: "HANDLE_REEL_SCROLL",
  TOGGLE_EDIT_MODE: "TOGGLE_EDIT_MODE",
  FETCH_REEL: "FETCH_REEL",
  CLEAN_REEL: "CLEAN_REEL",
  FETCH_USER_VIDEOS: "FETCH_USER_VIDEOS",
  UPDATE_REEL: "UPDATE_REEL",
  TOGGLE_CHOOSE_FEATURED_VIDEO: "TOGGLE_CHOOSE_FEATURED_VIDEO",
  CHOOSE_FEATURED_VIDEO_HANDLER: "CHOOSE_FEATURED_VIDEO_HANDLER",
  TOGGLE_DELETE_VIDEO_MODE: "TOGGLE_DELETE_VIDEO_MODE",
  CHOOSE_DELETE_VIDEO_HANDLER: "CHOOSE_DELETE_VIDEO_HANDLER",
  CLEAR_DELETE_VIDEOS: "CLEAR_DELETE_VIDEOS",
  SET_AVATAR: "SET_AVATAR",
  SET_ITEM_PER_SCREEN: "SET_ITEM_PER_SCREEN"
};

const getActions = uri => {
  const objects = {
    toggleReel: bool => {
      return { type: actionTypes.TOGGLE_REEL, bool: bool };
    },
    handleReelScroll: (scale, left) => {
      return { type: actionTypes.HANDLE_REEL_SCROLL, scale: scale, left: left };
    },
    toggleEditMode: () => {
      return { type: actionTypes.TOGGLE_EDIT_MODE };
    },
    fetchReel: username => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.fetchReel,
          variables: { username: username }
        };
        return makePromise(execute(link, operation)).then(data => {
          let user = data.data.allUsers[0];
          if (!user) Router.push("/404");
          return Promise.resolve(
            dispatch({
              type: actionTypes.FETCH_REEL,
              username: user.username,
              description: user.description,
              id: user._id,
              fb: user.fb_url,
              tw: user.tw_url,
              ig: user.ig_url,
              likes: user.total_likes,
              views: user.total_views,
              subscribers: user.subscribers.length,
              feature: user.feature_path,
              hasAvatar: user.has_avatar
            })
          );
        });
        // .catch(error => console.log(error));
      };
    },
    setItemPerScreen: value => {
      return {
        type: actionTypes.SET_ITEM_PER_SCREEN,
        value: value
      };
    },
    cleanReel: () => {
      return { type: actionTypes.CLEAN_REEL };
    },
    fetchUserVideos: (id, cursor, limit, hasAccess = false) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.userVideos,
          variables: {
            id: id,
            cursor: cursor,
            limit: limit,
            hasAccess: hasAccess
          }
        };
        makePromise(execute(link, operation)).then(data => {
          let videos = data.data.allVideos ? data.data.allVideos : null;
          dispatch({
            type: actionTypes.FETCH_USER_VIDEOS,
            videos: videos
          });
        });
        // .catch(error => console.log(error));
      };
    },
    updateReel: input => {
      return { type: actionTypes.UPDATE_REEL, input: input };
    },
    toggleChooseFeaturedVideo: bool => {
      return { type: actionTypes.TOGGLE_CHOOSE_FEATURED_VIDEO, bool: bool };
    },
    chooseFeaturedVideoHandler: path => {
      return {
        type: actionTypes.CHOOSE_FEATURED_VIDEO_HANDLER,
        path: path
      };
    },
    toggleDeleteVideoMode: bool => {
      return { type: actionTypes.TOGGLE_DELETE_VIDEO_MODE, bool: bool };
    },
    chooseDeleteVideoHandler: id => {
      return {
        type: actionTypes.CHOOSE_DELETE_VIDEO_HANDLER,
        id: id
      };
    },
    clearDeleteVideos: () => {
      return { type: actionTypes.CLEAR_DELETE_VIDEOS };
    },
    setAvatar: file => {
      return dispatch => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let image = document.createElement("img");
          image.src = reader.result;
          image.onload = async () => {
            const LENGTH = 150;
            let mFactor = LENGTH / image.width;
            if (image.width > image.height) {
              mFactor = LENGTH / image.height;
            }

            canvas.width = image.width * mFactor;
            canvas.height = image.height * mFactor;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            let data = await canvas.toDataURL("image/jpeg", 0.5);
            dispatch({
              type: actionTypes.SET_AVATAR,
              avatar: data
            });
          };
        };
      };
    }
  };

  return { ...objects };
};

const query = {
  fetchReel: gql`
    query($username: String) {
      allUsers(filter: { OR: { username_contains: $username } }) {
        _id
        username
        description
        ig_url
        tw_url
        fb_url
        subscribers {
          _id
        }
        total_views
        total_likes
        feature_path
        has_avatar
        admin
      }
    }
  `,
  userVideos: gql`
    query($id: String, $cursor: Int, $limit: Int, $hasAccess: Boolean) {
      allVideos(
        filter: { OR: { user_contains: $id } }
        cursor: $cursor
        limit: $limit
        hasAccess: $hasAccess
      ) {
        _id
        title
        duration
        createdAt
        views
        path
        has_thumbnail
        likes {
          _id
        }
        user {
          _id
          username
        }
        state
        feature
        mature
        disable
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
