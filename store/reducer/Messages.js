/*******************************************/
/*Image Reducer for all image related
state management*/
/******************************************/

import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  messages: null,
  editIndex: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPSERT_MESSAGE:
      return updateObject(state, {});
    case actionTypes.EDIT_MESSAGE:
      return updateObject(state, { editIndex: action.input });
    case actionTypes.NEW_MESSAGE:
      return updateObject(state, {
        editIndex: action.index,
        messages: action.messages
      });
    case actionTypes.USER_MESSAGES:
      return updateObject(state, { messages: action.input });
    default:
      return state;
  }
};
