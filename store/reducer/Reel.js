import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  active: false,
  scale: 1.0,
  left: 0,
  editMode: false,
  videos: null,
  id: null,
  avatar: null,
  username: "No Name",
  description: "",
  ig: "www.instagram.com",
  fb: "www.facebook.com",
  tw: "www.twitter.com",
  views: 0,
  likes: 0,
  subscribers: 0,
  featurePath: null,
  chooseFeaturedVideoMode: false,
  deleteVideoMode: false,
  deleteVideos: [],
  avatarChanged: false,
  hasAvatar: false,
  reelUpdated: false,
  itemPerScreen: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_REEL:
      return updateObject(state, { active: action.bool, editMode: false });
    case actionTypes.HANDLE_REEL_SCROLL:
      return updateObject(state, { scale: action.scale, left: action.left });
    case actionTypes.TOGGLE_EDIT_MODE:
      return updateObject(state, { editMode: !state.editMode });
    case actionTypes.SET_ITEM_PER_SCREEN:
      return updateObject(state, { itemPerScreen: action.value });
    case actionTypes.CLEAN_REEL:
      return updateObject(state, {
        videos: null,
        description: "",
        username: "",
        id: null,
        avatar: null,
        reelUpdated: false
      });
    case actionTypes.UPDATE_REEL:
      return updateObject(state, {
        description: action.input.description,
        ig: action.input.ig_url ? action.input.ig_url : state.ig,
        fb: action.input.fb_url ? action.input.fb_url : state.fb,
        tw: action.input.tw_url ? action.input.tw_url : state.tw,
        featurePath: action.feature
          ? action.feature.includes("/video")
            ? undefined
            : action.feature
          : undefined
      });
    case actionTypes.FETCH_REEL:
      return updateObject(state, {
        description: action.description,
        avatar: action.hasAvatar
          ? `https://s3.amazonaws.com/media.growreel.com/users/${
              action.id
            }/avatar`
          : `../../static/default/avatar/avatar_${(
              Math.floor(Math.random() * 10) + 1
            )
              .toString()
              .padStart(2, "0")}.png`,
        username: action.username,
        id: action.id,
        fb: action.fb,
        tw: action.tw,
        ig: action.ig,
        views: action.views,
        likes: action.likes,
        subscribers: action.subscribers,
        featurePath:
          !action.feature || action.feature == ""
            ? `https://s3.amazonaws.com/media.growreel.com/default/feature.mp4` // Cloud front not working...
            : `https://s3.amazonaws.com/media.growreel.com/${
                action.feature
              }/video`,
        hasAvatar: action.hasAvatar,
        reelUpdated: true
      });
    case actionTypes.FETCH_USER_VIDEOS:
      return updateObject(state, { videos: action.videos });
    case actionTypes.TOGGLE_CHOOSE_FEATURED_VIDEO:
      return updateObject(state, { chooseFeaturedVideoMode: action.bool });
    case actionTypes.CHOOSE_FEATURED_VIDEO_HANDLER:
      return updateObject(state, { featurePath: action.path });
    case actionTypes.TOGGLE_DELETE_VIDEO_MODE:
      return updateObject(state, { deleteVideoMode: action.bool });
    case actionTypes.CHOOSE_DELETE_VIDEO_HANDLER:
      let deleteVideos = state.deleteVideos;
      if (deleteVideos.includes(action.id)) {
        deleteVideos = deleteVideos.filter(item => {
          return item != action.id;
        });
      } else {
        deleteVideos.push(action.id);
      }
      return updateObject(state, { deleteVideos: [...deleteVideos] });
    case actionTypes.CLEAR_DELETE_VIDEOS:
      return updateObject(state, { deleteVideos: [] });
    case actionTypes.SET_AVATAR:
      return updateObject(state, {
        avatar: action.avatar,
        avatarChanged: true
      });
    default:
      return state;
  }
};
