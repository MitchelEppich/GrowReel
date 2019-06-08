import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_HISTORY_ELEMENT:
      return updateObject(state, {});
    default:
      return state;
  }
};
