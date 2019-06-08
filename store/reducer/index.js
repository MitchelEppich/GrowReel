/*******************************************/
/*main reducer with miscellaneous state
 management.
 This reducer imports all other reducers and
  combines them to be exported to the store*/
/******************************************/

import actionTypes from "../actions";
import { combineReducers } from "redux";
import { updateObject } from "../utility";
import videoReducer from "./Video";
import imageReducer from "./Image";
import userReducer from "./User";
import commentReducer from "./Comment";
import uploaderReducer from "./Uploader";
import reelReducer from "./Reel";
import listReducer from "./List";
import emailRequestReducer from "./EmailRequest";
import historyElementReducer from "./HistoryElement";
import reportReducer from "./Report";
import searchReducer from "./Search";
import globalReducer from "./Global";
import messagesReducer from "./Messages";
import helpFormContent from "../utilities/helpForm";

const initialState = {
  showSideMenu: false,
  showAuth: false,
  showReport: false,
  showScreen: false,
  showRegisterAuth: false,
  authError: false,
  forgotPassword: false,
  showPasswordReset: false,
  showSettings: false,
  showHelp: false,
  isMobile: null,
  isEmbed: null,
  helpFormTab: null,
  queueBucket: "queue.growreel.com",
  bucket: "media.growreel.com",
  currentMediaSize: null,
  pageNotFound: false,
  emailAuthError: null,
  usernameAuthError: null,
  showFiltersMenu: false,
  showSearch: false,
  videoDim: [],
  detectMode: true,
  showShareButtons: false,
  showMessageScreen: false,
  // MOVE TO MESSAGES
  showContentMessage: null,
  showSendNotificationFields: false,
  helpFormContent: helpFormContent
};

const indexReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME_ERROR:
      return updateObject(state, {
        usernameAuthError: action.error
      });
    case actionTypes.SET_EMAIL_ERROR:
      return updateObject(state, {
        emailAuthError: action.error
      });
    case actionTypes.SET_MEDIA_SIZE:
      return updateObject(state, {
        currentMediaSize: action.size
      });
    case actionTypes.TOGGLE_SIDE_MENU:
      return updateObject(state, {
        showSideMenu: action.input
      });
    case actionTypes.SHOW_SCREEN:
      return updateObject(state, { showScreen: action.input });
    case actionTypes.SHOW_REPORT:
      return updateObject(state, {
        showSideMenu: false,
        showReport: true,
        showScreen: true
      });
    case actionTypes.SHOW_SETTINGS:
      return updateObject(state, {
        showSettings: true,
        showScreen: true,
        showHelp: false,
        showAuth: false
      });
    case actionTypes.SHOW_HELP:
      return updateObject(state, {
        showHelp: true,
        showScreen: true,
        showSettings: false,
        showAuth: false
      });
    case actionTypes.SHOW_PASSWORD_RESET:
      return updateObject(state, {
        showPasswordReset: !state.showPasswordReset
      });
    case actionTypes.SHOW_AUTH:
      return updateObject(state, {
        showSideMenu: false,
        showAuth: true,
        showScreen: true,
        showSettings: false,
        showHelp: false
      });
    case actionTypes.CLOSE_ALL:
      let retClose = {
        showSideMenu: false,
        showReport: false,
        searchVideos: null,
        authError: false,
        noscroll: false,
        showPasswordReset: false,
        forgotPassword: false,
        showSettings: false,
        showMessageScreen: false,
        showSearch: false,
        showScreen: state.showSettings || state.showHelp ? true : false
      };
      if (!state.showSideMenu || action.input == "all") {
        retClose = {
          ...retClose,
          showScreen: false,
          showHelp: false,
          showSettings: false,
          showAuth: false,
          forgotPassword: false,
          showPasswordReset: false,
          showSettings: false
        };
      }
      return updateObject(state, retClose);
    case actionTypes.SET_VIDEO_DIM:
      return updateObject(state, {
        videoDim: action.input,
        detectMode: action.detectMode
      });
    case actionTypes.SHOW_REGISTER:
      return updateObject(state, {
        showRegisterAuth: !state.showRegisterAuth
      });
    case actionTypes.SHOW_FORGOT_PASSWORD_FORM:
      return updateObject(state, { forgotPassword: !state.forgotPassword });
    case actionTypes.TOGGLE_AUTH_ERROR:
      return updateObject(state, {
        authError: true,
        showSideMenu: false,
        showAuth: true,
        showScreen: true
      });
    case actionTypes.TOGGLE_FILTERS:
      return updateObject(state, {
        showFiltersMenu: !state.showFiltersMenu
      });
    case actionTypes.TOGGLE_SHARING:
      return updateObject(state, {
        showShareButtons: !state.showShareButtons
      });
    case actionTypes.SET_EMBED:
      return updateObject(state, {
        isEmbed: action.isEmbed
      });
    case actionTypes.TOGGLE_SEARCH:
      return updateObject(state, {
        showSearch: action.input,
        showScreen: action.input
      });
    case actionTypes.TOGGLE_SHOW_MESSAGE_SCREEN:
      return updateObject(state, {
        showMessageScreen: !state.showMessageScreen,
        showScreen: !state.showMessageScreen
      });
    case actionTypes.TOGGLE_SEND_NOTIFICATION_FIELD:
      return updateObject(state, {
        showSendNotificationFields: !state.showSendNotificationFields
      });
    case actionTypes.TOGGLE_CONTENT_MESSAGE:
      return updateObject(state, {
        showContentMessage: action.index
      });
    case actionTypes.SET_IS_MOBILE:
      return updateObject(state, { isMobile: action.bool });
    case actionTypes.TOGGLE_HELP_FORM_TAB:
      return updateObject(state, { helpFormTab: action.name });
    default:
      return state;
  }
};

export default combineReducers({
  misc: indexReducer,
  video: videoReducer,
  image: imageReducer,
  user: userReducer,
  comment: commentReducer,
  uploader: uploaderReducer,
  search: searchReducer,
  reel: reelReducer,
  list: listReducer,
  history: historyElementReducer,
  email: emailRequestReducer,
  report: reportReducer,
  global: globalReducer,
  messages: messagesReducer
});
