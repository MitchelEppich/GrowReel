/*******************************************/
/*Video Reducer for all Video related
state management*/
/******************************************/

import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  currentVideo: null,
  communityVideos: null,
  videoPlayerPosition: "lg",
  expandedCircle: false,
  showControls: false,
  editVideoMode: false,
  editVideoThumb: null,
  thumbnail: null,
  thumbnailChanged: false,
  uploadPercent: null,
  currentTags: [],
  uploading: false,
  // Controller
  paused: false,
  muted: false,
  resolution: "360p",
  formats: [],
  volume: 1,
  playbackRate: 1,
  fullscreen: false,
  currentTime: 0,
  loadProgress: 0,
  showControls: true,
  showShareButtons: false

  // videoDim: [],
  // detectMode: true,
};

// CLOUD FRONT CACHE ERROR!!!!
// video.live_url ||
// `https://assets.growreel.com/${video.path}/${
//   this.props.video.resolution
// }.mp4`;
// video.live_url ||
// `http://d169y5sfe4jk9f.cloudfront.net/${video.path}/${
//   this.props.video.resolution
// }.mp4`;
// video.live_url ||
// `https://d169y5sfe4jk9f.cloudfront.net/${video.path}/video`;
// video.live_url ||
// `https://s3.amazonaws.com/media.growreel.com/${video.path}/${
// this.props.video.resolution
// }${this.props.video.resolution == "video" ? "" : ".mp4"}`;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMMUNITY_VIDEOS:
      return updateObject(state, { communityVideos: action.communityVideos });
    case actionTypes.SET_VIDEO:
      return updateObject(state, {
        currentVideo: action.currentVideo
      });
    // case actionTypes.SET_VIDEO_DIM:
    // console.log("help")
    //   return updateObject(state, {
    //     videoDim: action.input,
    //     detectMode: action.detectMode
    //   });
    case actionTypes.QUEUE_VIDEO:
      return updateObject(state, {});
    case actionTypes.UPLOAD_VIDEO:
      return updateObject(state, { uploading: true });
    case actionTypes.DELETE_VIDEO:
      return updateObject(state, {});
    case actionTypes.POST_VIDEO:
      return updateObject(state, { uploading: false });
    case actionTypes.SET_COMMENTS:
      return updateObject(state, {
        currentVideo: {
          ...state.currentVideo,
          comments: action.comments
        }
      });
    case actionTypes.MOVE_PLAYER:
      return updateObject(state, {
        videoPlayerPosition: action.videoPlayerPosition
      });
    case actionTypes.FETCH_VIDEO_LIST:
      if (
        action.videos.length > 0 &&
        !action.list.videos.map(a => a._id).includes(action.videos[0]._id)
      ) {
        action.list.videos = [...action.list.videos, ...action.videos].sort(
          action.sort
        );
      }
      return updateObject(state, {});
    case actionTypes.DESTROY_PLAYER:
      return updateObject(state, { currentVideo: null });
    case actionTypes.EXPAND_CIRCLE:
      return updateObject(state, { expandedCircle: action.value });
    case actionTypes.SHOW_CONTROLS_HANDLER:
      return updateObject(state, { showControls: action.value });
    case actionTypes.APPEND_VIEW:
      return updateObject(state, {
        currentVideo: {
          ...state.currentVideo,
          views: action.views
        }
      });
    case actionTypes.UPDATE_VIDEO:
      return updateObject(state, {
        currentVideo: {
          ...state.currentVideo,
          description: action.description,
          title: action.title,
          tags: action.tags,
          thumbnail: null,
          thumbnailChanged: false,
          mature: action.mature,
          feature: action.feature,
          state: action.state,
          disable: action.disable
        }
      });
    case actionTypes.TOGGLE_LIKE_VIDEO:
      return updateObject(state, {
        currentVideo: {
          ...state.currentVideo,
          likes: action.likes
        }
      });
    case actionTypes.TOGGLE_SHARING:
      return updateObject(state, {
        showShareButtons: !state.showShareButtons
      });
    case actionTypes.SET_THUMBNAIL:
      return updateObject(state, {
        thumbnail: action.thumbnail,
        thumbnailChanged: action.thumbnail == null ? false : true
      });
    case actionTypes.TOGGLE_EDIT_VIDEO_MODE:
      return updateObject(state, { editVideoMode: action.val });
    case actionTypes.SET_VIDEO_DESCRIPTION:
      return updateObject(state, { editVideoDescription: action.desc });
    case actionTypes.SET_VIDEO_TITLE:
      return updateObject(state, { editVideoTitle: action.title });
    case actionTypes.UPDATE_UPLOAD_PERCENT:
      return updateObject(state, { uploadPercent: action.percent });
    case actionTypes.SET_TAGS:
      return updateObject(state, {
        currentTags: action.tags,
        currentVideo: { ...state.currentVideo, tags: action.tags }
      });
    // Control Bar Dispatchs
    case actionTypes.SET_RESOLUTION:
      return updateObject(state, {
        resolution: action.resolution
      });
    case actionTypes.TOGGLE_PAUSE:
      return updateObject(state, { paused: !state.paused });
    case actionTypes.TOGGLE_MUTE:
      return updateObject(state, { muted: !state.muted });
    case actionTypes.SET_VOLUME:
      return updateObject(state, { volume: action.volume });
    case actionTypes.SET_PLAYBACK_RATE:
      return updateObject(state, { playbackRate: action.rate });
    case actionTypes.TOGGLE_FULLSCREEN:
      return updateObject(state, { fullscreen: action.value });
    case actionTypes.SET_CURRENT_TIME:
      return updateObject(state, { currentTime: action.time });
    case actionTypes.SET_LOAD_PROGRESS:
      return updateObject(state, { loadProgress: action.progress });
    case actionTypes.FETCH_FORMATS:
      return updateObject(state, { formats: action.formats });
    case actionTypes.TOGGLE_CONTROLS:
      return updateObject(state, { showControls: action.input });
    default:
      return state;
  }
};
