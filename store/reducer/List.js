import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  lists: [],
  listUpdating: false
};

let lists = null;
let index;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_UPDATING_STATUS:
      return updateObject(state, { listUpdating: action.value });
    case actionTypes.FETCH_LISTS:
      return updateObject(state, {
        lists: [...action.lists],
        listUpdating: false
      });
    case actionTypes.APPEND_LIST:
      // console.log(action.list);
      return updateObject(state, {
        lists: [...state.lists, action.list],
        listUpdating: false
      });
    case actionTypes.FETCH_LIST:
      // Find index of current list
      index = findWithAttr(state.lists, "key", action.list.key);
      // Create a new list with the new list having replaced the index list
      lists = state.lists;
      lists[index] = action.list;
      // Return the new list
      return updateObject(state, { lists: [...lists] });
    case actionTypes.UPDATE_LIST_VIDEO:
      // console.log(action.video);
      lists = state.lists;
      for (let i = 0; i < lists.length; i++) {
        for (let j = 0; j < lists[i].videos.length; j++) {
          if (lists[i].videos[j]._id == action.video._id) {
            lists[i].videos[j] = action.video;
          }
        }
      }
      // console.log(lists);
      return updateObject(state, { lists: lists });
    case actionTypes.SET_LIST_SLIDE_INDEX:
      // Find index of current list
      index = findWithAttr(state.lists, "key", action.list.key);
      // Create a new list with the new list having replaced the index list
      lists = state.lists;
      lists[index] = action.list;
      // Return the new list
      return updateObject(state, { lists: [...lists] });
    default:
      return state;
  }
};

const findWithAttr = (array, attr, value) => {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
};
