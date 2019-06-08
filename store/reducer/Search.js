import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  searchVideos: [],
  sort: "createdOn",
  length: null,
  target: "title",
  postedOn: null,
  searchKey: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SEARCH:
      return updateObject(state, {
        searchVideos: action.searchVideos
      });
    case actionTypes.APPEND_SEARCH:
      return updateObject(state, {
        searchVideos: [...state.searchVideos, ...action.searchVideos]
      });
    case actionTypes.SET_SEARCH_KEY:
      return updateObject(state, { searchKey: action.input });
    case actionTypes.SET_FILTER:
      let obj = {};
      if (action.sort != null) obj.sort = action.sort;
      if (action.length != null) obj.length = action.length;
      if (action.target != null) obj.target = action.target;
      if (action.postedOn != null) obj.postedOn = action.postedOn;
      return updateObject(state, obj);

    default:
      return state;
  }
};
