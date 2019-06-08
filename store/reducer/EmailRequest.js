import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  request: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHECK_FOR_EMAIL_REQUEST:
      return updateObject(state, { request: action.object });
    default:
      return state;
  }
};
