/*******************************************/
/*Index Actions for all miscellaneous related
dispatch actions. All other actiontypes are
imported into this file, to then be exported
for the reducers and corresponding pages.*/
/******************************************/

import User from "./User";
import Video from "./Video";
import Comment from "./Comment";
import Uploader from "./Uploader";
import Image from "./Image";
import Reel from "./Reel";
import List from "./List";
import HistoryElement from "./HistoryElement";
import EmailRequest from "./EmailRequest";
import Report from "./Report";
import Search from "./Search";
import Global from "./Global";
import Messages from "./Messages";

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

// const uri = "https://192.168.0.27:3000/graphql";
// const uri = "https://192.168.0.15:3000/graphql";

// const uri = "https://www.localhost:443/graphql";
const uri = "http://127.0.0.1:3000/graphql";
// const uri = "https://www.growreel.com:443/graphql";
// const uri = "https://growreel.com:443/graphql";
// const uri = "https://138.197.166.114:443/graphql";

const imports = {
  ...User(uri),
  ...Video(uri),
  ...Comment(uri),
  ...Uploader(uri),
  ...Image(uri),
  ...Reel(uri),
  ...List(uri),
  ...HistoryElement(uri),
  ...EmailRequest(uri),
  ...Report(uri),
  ...Search(uri),
  ...Global(uri),
  ...Messages(uri)
};

const actionTypes = {
  TOGGLE_SIDE_MENU: "SHOW_SIDE_MENU",
  SHOW_AUTH: "SHOW_AUTH",
  SHOW_REPORT: "SHOW_REPORT",
  CLOSE_ALL: "CLOSE_ALL",
  SHOW_REGISTER: "SHOW_REGISTER",
  SHOW_SCREEN: "SHOW_SCREEN",
  SHOW_FORGOT_PASSWORD_FORM: "SHOW_FORGOT_PASSWORD_FORM",
  TOGGLE_AUTH_ERROR: "TOGGLE_AUTH_ERROR",
  MOVE_PLAYER: "MOVE_PLAYER",
  SHOW_PASSWORD_RESET: "SHOW_PASSWORD_RESET",
  SHOW_SETTINGS: "SHOW_SETTINGS",
  SHOW_HELP: "SHOW_HELP",
  SET_EMBED: "SET_EMBED",
  TOGGLE_HELP_FORM_TAB: "TOGGLE_HELP_FORM_TAB",
  SET_MEDIA_SIZE: "SET_MEDIA_SIZE",
  SET_USERNAME_ERROR: "SET_USERNAME_ERROR",
  SET_EMAIL_ERROR: "SET_EMAIL_ERROR",
  TOGGLE_FILTERS: "TOGGLE_FILTERS",
  TOGGLE_SEARCH: "TOGGLE_SEARCH",
  SET_VIDEO_DIM: "SET_VIDEO_DIM",
  TOGGLE_SHARING: "TOGGLE_SHARING",
  TOGGLE_SHOW_MESSAGE_SCREEN: "TOGGLE_SHOW_MESSAGE_SCREEN",
  TOGGLE_CONTENT_MESSAGE: "TOGGLE_CONTENT_MESSAGE",
  TOGGLE_SEND_NOTIFICATION_FIELD: "TOGGLE_SEND_NOTIFICATION_FIELD"
};

const actions = {
  setUsernameError: error => {
    return { type: actionTypes.SET_USERNAME_ERROR, error: error };
  },
  setEmailError: error => {
    return { type: actionTypes.SET_EMAIL_ERROR, error: error };
  },
  setMediaSize: size => {
    return { type: actionTypes.SET_MEDIA_SIZE, size: size };
  },
  toggleSideMenu: input => {
    return { type: actionTypes.TOGGLE_SIDE_MENU, input: input };
  },
  showAuth: () => {
    return {
      type: actionTypes.SHOW_AUTH
    };
  },
  showReport: () => {
    return {
      type: actionTypes.SHOW_REPORT
    };
  },
  showSettings: () => {
    return {
      type: actionTypes.SHOW_SETTINGS
    };
  },
  showHelp: () => {
    return {
      type: actionTypes.SHOW_HELP
    };
  },
  showScreenHandler: input => {
    return {
      type: actionTypes.SHOW_SCREEN,
      input: input
    };
  },
  closeAll: input => {
    return {
      type: actionTypes.CLOSE_ALL,
      input: input
    };
  },
  setVideoDim: input => {
    let detectMode = input[0] > input[1];
    // console.log(input, detectMode)
    return {
      type: actionTypes.SET_VIDEO_DIM,
      input: input,
      detectMode: detectMode
    };
  },
  showRegister: () => {
    return {
      type: actionTypes.SHOW_REGISTER
    };
  },
  showForgotPasswordForm: () => {
    return {
      type: actionTypes.SHOW_FORGOT_PASSWORD_FORM
    };
  },
  showPasswordReset: () => {
    return {
      type: actionTypes.SHOW_PASSWORD_RESET
    };
  },
  setEmbed: input => {
    return {
      type: actionTypes.SET_EMBED,
      isEmbed: input
    };
  },
  toggleAuthError: () => {
    return {
      type: actionTypes.TOGGLE_AUTH_ERROR
    };
  },
  toggleHelpFormTab: name => {
    return {
      type: actionTypes.TOGGLE_HELP_FORM_TAB,
      name: name
    };
  },
  toggleFiltersMenu: () => {
    return {
      type: actionTypes.TOGGLE_FILTERS
    };
  },
  toggleShareButtons: () => {
    return {
      type: actionTypes.TOGGLE_SHARING
    };
  },
  toggleSearch: input => {
    return {
      type: actionTypes.TOGGLE_SEARCH,
      input: input
    };
  },
  toggleShowMessageScreen: () => {
    return {
      type: actionTypes.TOGGLE_SHOW_MESSAGE_SCREEN
    };
  },
  toggleContentMessage: index => {
    return {
      type: actionTypes.TOGGLE_CONTENT_MESSAGE,
      index: index
    };
  },
  toggleSendNotificationField: () => {
    return {
      type: actionTypes.TOGGLE_SEND_NOTIFICATION_FIELD
    };
  }
};

const query = {};

const mutation = {};

export default {
  // TYPES
  ...actionTypes,
  // IMPORTS
  ...imports,
  // ACTIONS
  ...actions
};
