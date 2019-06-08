/*******************************************/
/*Image Reducer for all image related
state management*/
/******************************************/

import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPLOAD_IMAGE:
      return updateObject(state, {});
    default:
      return state;
  }
};
