import actions from "../actions";

const imports = [];

const middleware = [
  // Log
  store => {
    return next => {
      return action => {
        const result = next(action);
        if (action.type == "QUEUE_VIDEO") {
          const newVideoID = action.newVideoID || null;
          let oldVideoID;
          if (
            sessionStorage.getItem("currentVideo") &&
            JSON.parse(sessionStorage.getItem("currentVideo"))._id !== null
          ) {
            oldVideoID = sessionStorage.getItem("currentVideo")._id;
          } else {
            oldVideoID =
              store.getState().video.currentVideo !== null
                ? store.getState().video.currentVideo._id
                : null;
          }
          if (oldVideoID !== newVideoID) {
            store.dispatch(actions.fetchVideo(newVideoID));
            return result;
          }
          // console.log("Middleware next state", store.getState());
          return result;
        }
        // console.log("Middleware action...", action.type);
        // console.log("Middleware next state", store.getState());
        return result;
      };
    };
  }
  // Get video information for viewing video
  // store => {
  //   return next => {
  //     return action => {
  //       if (action.type == "QUEUE_VIDEO"){
  //         const newVideoID = Router.query._id || null;
  //         console.log("ID", newVideoID)
  //         console.log("STORE", store.getState())
  //         // if (this.props.currentVideo._id){
  //         //   if (this.props.video.currentVideo._id !== newVideoID) {
  //         //     this.props.fetchVideo(newVideoID);
  //         //   }
  //         // }

  //       }
  //       return next(action);
  //     }
  //   }
  // }
];

export default [...middleware, ...imports];
