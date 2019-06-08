/*******************************************/
/*User Reducer for all user related
state management*/
/******************************************/

import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  currentUser: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SEND_EMAIL:
      return updateObject(state, {});
    case actionTypes.APPEND_HISTORY:
      return updateObject(state, {});
    case actionTypes.UPDATE_USER:
      return updateObject(state, {
        currentUser: {
          ...state.currentUser,
          ...action.user
        }
      });
    case actionTypes.SET_USER:
      return updateObject(state, {
        currentUser: action.currentUser
      });
    case actionTypes.DESTROY_USER:
      return updateObject(state, { currentUser: action.currentUser });
    case actionTypes.DELETE_USER:
      return updateObject(state, {});
    case actionTypes.TOGGLE_SUBSCRIBE_USER:
      return updateObject(state, {
        currentUser: {
          ...state.currentUser,
          subscriptions: action.subscriptions
        }
      });
    case actionTypes.FETCH_USER_VIDEO_LIST:
      return updateObject(state, { userVideoListvideos: action.videos });
    case actionTypes.RESET_PASSWORD:
      return updateObject(state, {});

    default:
      return state;
  }
};
