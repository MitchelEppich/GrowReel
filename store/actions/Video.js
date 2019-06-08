/*******************************************/
/*Video Actions for all video related
dispatch actions*/
/******************************************/
import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import axios from "axios";
import moment from "moment";

import Image from "./Image";
import actions from ".";

import Router from "next/router";

const actionTypes = {
  DESTROY_VIDEO: "DESTROY_VIDEO",
  SET_VIDEO: "SET_VIDEO",
  QUEUE_VIDEO: "QUEUE_VIDEO",
  SET_COMMUNITY_VIDEOS: "SET_COMMUNITY_VIDEOS",
  TOGGLE_LIKE_VIDEO: "TOGGLE_LIKE_VIDEO",
  MOVE_PLAYER: "MOVE_PLAYER",
  DESTROY_PLAYER: "DESTROY_PLAYER",
  EXPAND_CIRCLE: "EXPAND_CIRCLE",
  SHOW_CONTROLS_HANDLER: "SHOW_CONTROLS_HANDLER",
  APPEND_VIEW: "APPEND_VIEW",
  FETCH_VIDEO_LIST: "FETCH_VIDEO_LIST",
  TOGGLE_EDIT_VIDEO_MODE: "TOGGLE_EDIT_VIDEO_MODE",
  UPDATE_VIDEO: "UPDATE_VIDEO",
  UPLOAD_VIDEO: "UPLOAD_VIDEO",
  DELETE_VIDEO: "DELETE_VIDEO",
  POST_VIDEO: "POST_VIDEO",
  SET_THUMBNAIL: "SET_THUMBNAIL",
  RESET_UPLOADER: "RESET_UPLOADER",
  UPDATE_UPLOAD_PERCENT: "UPDATE_UPLOAD_PERCENT",
  SET_TAGS: "SET_TAGS",
  SET_COMMENTS: "SET_COMMENTS",
  // Control Bar Actions
  SET_RESOLUTION: "SET_RESOLUTION",
  TOGGLE_PAUSE: "TOGGLE_PAUSE",
  TOGGLE_MUTE: "TOGGLE_MUTE",
  SET_VOLUME: "SET_VOLUME",
  SET_PLAYBACK_RATE: "SET_PLAYBACK_RATE",
  TOGGLE_FULLSCREEN: "TOGGLE_FULLSCREEN",
  SET_CURRENT_TIME: "SET_CURRENT_TIME",
  SET_LOAD_PROGRESS: "SET_LOAD_PROGRESS",
  FETCH_FORMATS: "FETCH_FORMATS",
  TOGGLE_CONTROLS: "TOGGLE_CONTROLS"

  // SET_VIDEO_DIM: "SET_VIDEO_DIM",
};

const getActions = uri => {
  const objects = {
    setCommunityVideos: videos => {
      return {
        type: actionTypes.SET_COMMUNITY_VIDEOS,
        communityVideos: videos
      };
    },
    fetchCommunityVideos: () => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = { query: query.allVideos };

        makePromise(execute(link, operation))
          .then(data => {
            Promise.resolve(
              dispatch(objects.setCommunityVideos(data.data.allVideos))
            );
          })
          .catch(error => console.log(error));
      };
    },
    destroyVideo: path => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        let operation = {
          query: mutation.deleteS3,
          variables: { filename: path + "/" }
        };
        makePromise(execute(link, operation))
          .then(data => {
            operation = {
              query: mutation.deleteVideo,
              variables: { path: path }
            };

            makePromise(execute(link, operation))
              .then(data => {
                dispatch({ type: actionTypes.DELETE_VIDEO });
              })
              .catch(error => console.log(error));
          })
          .catch(error => console.log(error));
      };
    },
    queueVideo: video => {
      if (sessionStorage != null) {
        sessionStorage.setItem("currentVideo", JSON.stringify(video));
      }
      return { type: actionTypes.QUEUE_VIDEO, newVideoID: video._id };
    },
    setVideo: video => {
      return { type: actionTypes.SET_VIDEO, currentVideo: video };
    },
    uploadVideo: (duration, video, user, complete, bucket) => {
      return dispatch => {
        let path = formatFilename(video.name);

        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.signS3,
          variables: {
            // filename: path + "/video",
            filename: path,
            filetype: video.type,
            bucket: bucket
          }
        };

        makePromise(execute(link, operation))
          .then(data => {
            let { signedRequest } = data.data.signS3;

            let postVideo = objects.postVideo({
              title: video.name,
              duration: duration,
              user: user._id,
              _username: user.username,
              path: "videos/" + path
            });

            dispatch({
              type: actionTypes.UPLOAD_VIDEO
            });

            dispatch(
              objects.uploadToS3(video, signedRequest, postVideo, complete)
            );
          })
          .catch(error => console.log(error));
      };
    },
    postVideo: video => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.createVideo,
          variables: { ...video }
        };

        makePromise(execute(link, operation))
          .then(data => {
            dispatch({
              type: actionTypes.POST_VIDEO
            });
            dispatch(objects.fetchVideo(data.data.createVideo._id));
          })
          .catch(error => console.log(error));
      };
    }, // Have this merged with fetchVideoList --> fetchVideos .. Allow for request of user videos or section videos
    fetchVideo: videoID => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = { query: query.video, variables: { _id: videoID } };

        makePromise(execute(link, operation))
          .then(data => {
            let video = data.data.video;
            if (!video) {
              // Send Error
              Router.push("/404");
            }
            dispatch(objects.fetchFormats(video));
          })
          .catch(error => console.log(error));
      };
    },
    fetchVideoList: (
      list,
      cursor,
      limit,
      sort = undefined,
      hasAccess = false
    ) => {
      return dispatch => {
        let or = list.id
          ? { OR: [{ user_contains: list.id }] }
          : {
              OR: [{ params: `${list.regex},${list.sort},${cursor},${limit}` }]
            };

        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.videoList,
          variables: {
            filter: or,
            cursor: cursor,
            limit: limit,
            hasAccess: hasAccess
          }
        };

        return makePromise(execute(link, operation))
          .then(data => {
            let videos = data.data.allVideos;
            dispatch({
              type: actionTypes.FETCH_VIDEO_LIST,
              list: list,
              videos: videos,
              sort: sort
            });
            return Promise.resolve(videos);
          })
          .catch(error => console.log(error));
      };
    },
    toggleLikeVideo: (video, user) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.toggleLikeVideo,
          variables: { user: user._id, id: video._id }
        };

        makePromise(execute(link, operation))
          .then(data => {
            Promise.resolve(
              dispatch({
                type: actionTypes.TOGGLE_LIKE_VIDEO,
                likes: data.data.toggleLikeVideo.likes
              })
            );
          })
          .catch(error => console.log(error));
      };
    },

    // setVideoDim: (input) => {
    //   let detectMode = input[0] > input[1]
    //   console.log("teste", input, detectMode)
    //   return {
    //     type: actionTypes.SET_VIDEO_DIM,
    //     input: input,
    //     detectMode: detectMode,
    //   };
    // },

    appendView: (user, video) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.appendView,
          variables: { user: user._id, id: video._id }
        };

        makePromise(execute(link, operation))
          .then(data => {
            Promise.resolve(
              dispatch({
                type: actionTypes.APPEND_VIEW,
                views: data.data.appendView.views
              })
            );
          })
          .catch(error => console.log(error));
      };
    },
    movePlayer: position => {
      return { type: actionTypes.MOVE_PLAYER, videoPlayerPosition: position };
    },
    destroyPlayer: () => {
      return { type: actionTypes.DESTROY_PLAYER };
    },
    expandCircle: value => {
      return { type: actionTypes.EXPAND_CIRCLE, value: value };
    },
    showControlsHandler: value => {
      return { type: actionTypes.SHOW_CONTROLS_HANDLER, value: value };
    },
    toggleEditVideoMode: val => {
      return { type: actionTypes.TOGGLE_EDIT_VIDEO_MODE, val: val };
    },
    updateVideo: (video, input) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.updateVideo,
          variables: {
            id: video._id,
            description: input.description,
            tags: input.tags,
            title: input.title,
            has_thumbnail: input.has_thumbnail || input.has_changed,
            mature: input.mature,
            feature: input.feature,
            state: input.state,
            disable: input.disable
          }
        };

        return makePromise(execute(link, operation))
          .then(data => {
            if (input.has_changed) {
              const imageActions = Image(uri);
              dispatch(
                imageActions.uploadImage(
                  input.thumbnail,
                  video.path,
                  "thumbnail",
                  input.bucket
                )
              );
            }
            // console.log(video)

            video = data.data.updateVideo;

            dispatch({
              type: actionTypes.UPDATE_VIDEO,
              description: video.description,
              title: video.title,
              tags: video.tags,
              mature: video.mature,
              feature: video.feature,
              disable: video.disable,
              state: video.state
            });

            return Promise.resolve(video);
          })
          .catch(error => console.log(error));
      };
    },
    setComments: comments => {
      // console.log(comments);
      return {
        type: actionTypes.SET_COMMENTS,
        comments: comments
      };
    },
    setThumbnail: data => {
      return dispatch => {
        dispatch({ type: actionTypes.SET_THUMBNAIL, thumbnail: data });
      };
    },
    getSnapshot: (video, canvas) => {
      const WIDTH = 210;
      const HEIGHT = 118;

      let ctx = canvas.getContext("2d");

      canvas.width = WIDTH * 1;
      canvas.height = HEIGHT * 1;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      let data = canvas.toDataURL("image/jpeg", 0.65);

      return objects.setThumbnail(data);
    },
    updateUploadPercent: percent => {
      return { type: actionTypes.UPDATE_UPLOAD_PERCENT, percent: percent };
    },
    uploadToS3: (file, signedRequest, postVideo, complete) => {
      return async dispatch => {
        const options = {
          headers: {
            "Content-Type": file.type,
            "Access-Control-Allow-Origin": "*"
          },
          onUploadProgress: function(progressEvent) {
            let percentCompleted = Math.floor(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            // if (progress) {
            //   progress.innerHTML = percentCompleted + "%";
            //   progress.style.backgroundSize = percentCompleted + "% 100%";
            // }
            dispatch(objects.updateUploadPercent(`${percentCompleted}%`));
          }
        };
        await axios
          .put(signedRequest, file, options, postVideo, dispatch, complete)
          .then(res => {
            // alert("Successfully uploaded! " + (res.config.data.name || "Thumbnail"));
            dispatch(objects.updateUploadPercent("Upload Successful!"));
            // progress.innerHTML = "Upload Successful!";
            setTimeout(() => {
              return true;
            }, 3000);
            complete();
            dispatch(postVideo);
          });
      };
    },
    setTags: tags => {
      return {
        type: actionTypes.SET_TAGS,
        tags: tags
      };
    },
    // Control Bar Functions
    fetchFormats: video => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.getFormats,
          variables: { filename: video.path }
        };

        makePromise(execute(link, operation))
          .then(data => {
            // console.log(data);
            let formats = data.data.getListS3.objects;
            dispatch({
              type: actionTypes.FETCH_FORMATS,
              formats: formats
            });
            dispatch(objects.setVideo(video));
          })
          .catch(error => console.log(error));
      };
    },
    setResolution: resolution => {
      return {
        type: actionTypes.SET_RESOLUTION,
        resolution: resolution
      };
    },
    togglePause: () => {
      return {
        type: actionTypes.TOGGLE_PAUSE
      };
    },
    toggleMute: () => {
      return {
        type: actionTypes.TOGGLE_MUTE
      };
    },
    setVolume: volume => {
      return {
        type: actionTypes.SET_VOLUME,
        volume: volume
      };
    },
    setPlaybackRate: rate => {
      return {
        type: actionTypes.SET_PLAYBACK_RATE,
        rate: rate
      };
    },
    toggleFullscreen: value => {
      return {
        type: actionTypes.TOGGLE_FULLSCREEN,
        value: value
      };
    },
    setCurrentTime: time => {
      return {
        type: actionTypes.SET_CURRENT_TIME,
        time: time
      };
    },
    setLoadProgress: progress => {
      return {
        type: actionTypes.SET_LOAD_PROGRESS,
        progress: progress
      };
    },
    toggleControls: input => {
      return {
        type: actionTypes.TOGGLE_CONTROLS,
        input: input
      };
    }
  };
  return { ...objects };
};

function formatFilename(filename) {
  const date = moment().format("YYYYMMDD");
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `${date}-${randomString}-${cleanFileName}`;
  return newFilename.substring(0, 60);
}

const query = {
  allVideos: gql`
    query {
      allVideos {
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
        mature
        state
        feature
        disable
      }
    }
  `,
  videoList: gql`
    query(
      $filter: VideoFilter
      $cursor: Int
      $limit: Int
      $hasAccess: Boolean
    ) {
      allVideos(
        filter: $filter
        cursor: $cursor
        limit: $limit
        hasAccess: $hasAccess
      ) {
        _id
        title
        path
        has_thumbnail
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
        mature
        state
        feature
        disable
      }
    }
  `,
  video: gql`
    query($_id: String!) {
      video(_id: $_id) {
        _id
        title
        duration
        has_thumbnail
        createdAt
        views
        path
        tags
        live_url
        likes {
          _id
        }
        user {
          _id
          username
        }
        description
        comments {
          _id
          edited
          editedAt
          body
          user {
            _id
            username
          }
          upvotes {
            _id
          }
          downvotes {
            _id
          }
          createdAt
          flags {
            _id
          }
        }
        mature
        monetize
        state
        feature
        disable
      }
    }
  `
};

const subscription = {
  commentAdded: gql`
    subscription {
      commentAdded {
        user {
          _id
          username
        }
        body
        createdAt
      }
    }
  `
};

const mutation = {
  getFormats: gql`
    mutation($filename: String) {
      getListS3(input: { filename: $filename }) {
        objects
      }
    }
  `,
  toggleLikeVideo: gql`
    mutation($id: String!, $user: String!) {
      toggleLikeVideo(input: { id: $id, user: $user }) {
        likes {
          _id
        }
      }
    }
  `,
  appendView: gql`
    mutation($id: String!, $user: String) {
      appendView(input: { id: $id, user: $user }) {
        views
      }
    }
  `,
  deleteVideo: gql`
    mutation($path: String!) {
      deleteVideo(path: $path) {
        _id
      }
    }
  `,
  createVideo: gql`
    mutation(
      $title: String!
      $user: String!
      $duration: Int!
      $path: String!
      $_username: String!
    ) {
      createVideo(
        input: {
          title: $title
          user: $user
          duration: $duration
          path: $path
          _username: $_username
        }
      ) {
        _id
        path
      }
    }
  `,
  updateVideo: gql`
    mutation(
      $description: String
      $title: String
      $id: String!
      $has_thumbnail: Boolean
      $tags: [String]
      $mature: Boolean
      $state: Int
      $feature: Boolean
      $disable: Boolean
    ) {
      updateVideo(
        input: {
          description: $description
          title: $title
          id: $id
          has_thumbnail: $has_thumbnail
          tags: $tags
          mature: $mature
          state: $state
          feature: $feature
          disable: $disable
        }
      ) {
        _id
        title
        duration
        has_thumbnail
        createdAt
        views
        path
        tags
        live_url
        likes {
          _id
        }
        user {
          _id
          username
        }
        description
        comments {
          _id
          body
          user {
            _id
            username
          }
          upvotes {
            _id
          }
          downvotes {
            _id
          }
          createdAt
        }
        mature
        state
        feature
        disable
      }
    }
  `,
  deleteS3: gql`
    mutation($filename: String) {
      deleteS3(input: { filename: $filename }) {
        url
      }
    }
  `,
  signS3: gql`
    mutation($filename: String, $filetype: String, $bucket: String) {
      signS3(
        input: { filename: $filename, filetype: $filetype, bucket: $bucket }
      ) {
        url
        signedRequest
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
