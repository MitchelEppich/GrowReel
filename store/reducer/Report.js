import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  type: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REPORT:
      return updateObject(state, {});
    case actionTypes.SET_REPORT_TYPE:
      return updateObject(state, { type: action._type });
    default:
      return state;
  }
};
