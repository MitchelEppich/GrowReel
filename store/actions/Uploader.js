const actionTypes = {
  SET_FILE: "SET_FILE",
  SET_DURATION: "SET_DURATION",
  CLEAR_THUMBNAILS: "CLEAR_THUMBNAILS",
  ADD_THUMBNAIL: "ADD_THUMBNAIL",
  SELECT_THUMBNAIL: "SELECT_THUMBNAIL",
  TOGGLE_LOADING: "TOGGLE_LOADING",
  TOGGLE_UPLOADER: "TOGGLE_UPLOADER",
  RESET_UPLOADER: "RESET_UPLOADER",
  TOGGLE_UPLOADER_ERROR: "TOGGLE_UPLOADER_ERROR"
};

const getActions = uri => {
  const objects = {
    loadFile: file => {
      return dispatch => {
        let supported = ["mov", "webm", "ogg", "ogv", "mp4", "quicktime"];
        // console.log(file);
        if (!supported.includes(file.type.split("/")[1])) {
          dispatch(objects.toggleUploaderError("Unsupported file type!"));
          return;
        }

        let video, duration;
        video = document.createElement("video");
        video.preload = "auto";

        video.onloadedmetadata = () => {
          // console.log(video);
          duration = Math.round(video.duration);
          // console.log(duration);
          // console.log("This video is fine also");
          if (duration < 1) {
            dispatch(objects.toggleUploaderError("Video too short!"));
          } else if (duration > 300) {
            dispatch(
              objects.toggleUploaderError("Video must be less than 5 minutes!")
            );
          } else {
            dispatch(objects.setDuration(duration));
            dispatch(objects.setFile(file));
          }
        };
        video.src = file.preview;
      };
    },
    setDuration: duration => {
      return {
        type: actionTypes.SET_DURATION,
        duration: duration
      };
    },
    setFile: file => {
      return {
        type: actionTypes.SET_FILE,
        file: file
      };
    },
    toggleLoading: () => {
      return {
        type: actionTypes.TOGGLE_LOADING
      };
    },
    toggleUploader: input => {
      return {
        type: actionTypes.TOGGLE_UPLOADER,
        input: input
      };
    },
    resetUploader: () => {
      return {
        type: actionTypes.RESET_UPLOADER
      };
    },
    toggleUploaderError: error => {
      return {
        type: actionTypes.TOGGLE_UPLOADER_ERROR,
        error: error
      };
    }
  };

  return { ...objects };
};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
