import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  newBody: "",
  commentEditId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPEND_COMMENT:
      return updateObject(state, {});
    case actionTypes.POST_COMMENT:
      return updateObject(state, {});
    case actionTypes.DELETE_COMMENT:
      return updateObject(state, {});
    case actionTypes.EDIT_COMMENT:
      return updateObject(state, {});
    case actionTypes.REMOVE_COMMENT:
      return updateObject(state, {});
    case actionTypes.UPDATE_COMMENT:
      return updateObject(state, {});
    case actionTypes.SET_COMMENT_BODY:
      return updateObject(state, { newBody: action.value });
    case actionTypes.SET_COMMENT_EDIT:
      return updateObject(state, { commentEditId: action.value });
    case actionTypes.FETCH_COMMENTS:
      return updateObject(state, {});
    case actionTypes.APPEND_VOTE_COMMENT:
      action.comment.upvotes = action.upvotes;
      action.comment.downvotes = action.downvotes;
      return updateObject(state, {});
    default:
      return state;
  }
};
