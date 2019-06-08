import actionTypes from "../actions";
import { updateObject } from "../utility";

const initialState = {
  file: "",
  duration: 0,
  instruction: "",
  loading: false,
  showUploader: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FILE:
      return updateObject(state, { file: action.file, error: null });
    case actionTypes.SET_DURATION:
      return updateObject(state, { duration: action.duration });
    case actionTypes.CLEAR_THUMBNAILS:
      return updateObject(state, { thumbnailPreviews: [] });
    case actionTypes.ADD_THUMBNAIL:
      return updateObject(state, {
        thumbnailPreviews: [...state.thumbnailPreviews, action.thumbnail]
      });
    case actionTypes.SELECT_THUMBNAIL:
      return updateObject(state, {
        thumbnailSelection: action.thumbnailSelection,
        selectedThumbnailSrc: action.selectedThumbnailSrc
      });
    case actionTypes.SET_THUMBNAIL_SELECTION:
      return updateObject(state, {
        thumbnail_selection: action.thumbnailSelection
      });
    case actionTypes.TOGGLE_LOADING:
      return updateObject(state, { loading: !state.loading });
    case actionTypes.TOGGLE_UPLOADER:
      return updateObject(state, {
        showUploader:
          action.input != undefined ? action.input : !state.showUploader
      });
    case actionTypes.RESET_UPLOADER:
      return updateObject(state, {
        file: "",
        thumbnailPreviews: [],
        thumbnailSelection: 0,
        selectedThumbnailSrc: "",
        duration: 0,
        instruction: "",
        loading: false,
        showUploader: false,
        error: null
      });
    case actionTypes.TOGGLE_UPLOADER_ERROR:
      return updateObject(state, {
        error: action.error
      });
    default:
      return state;
  }
};
