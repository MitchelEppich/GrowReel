import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  usedKeys: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USE_KEY:
      return updateObject(state, { usedKeys: [...state.usedKeys, action.key] });
    default:
      return state;
  }
};
