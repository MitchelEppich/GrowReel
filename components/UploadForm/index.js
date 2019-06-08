/*******************************************/
/*Component for uploading videos.*/
/******************************************/

import React, { Component } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import actions from "../../store/actions";
import UploadSummary from "./uploadSummary";
import Router from "next/router";

class Uploader extends Component {
  componentDidMount() {
    if (!this.props.user.currentUser) {
      Router.push("/");
    }
  }

  render() {
    return (
      <div
        style={{ zIndex: "999" }}
        className={
          "max-w-3 bg-white pin-r mt-14 mx-auto w-450 absolute sm:w-full sm:mt-24 md:mt-14 md:w-450 lg:max-w-lg mr-2 sm:mx-1 md:mx-1"
        }
      >
        <div className="h-8 w-full bg-black">
          {this.props.uploader.error != null ? (
            <div className="h-full bg-red w-full text-white text-center leading-loose">
              {this.props.uploader.error}
            </div>
          ) : (
            <div
              ref="progress"
              className="h-full w-full text-white text-center leading-loose"
              style={{
                backgroundImage: "linear-gradient(#38c172, #38c172)",
                backgroundPosition: "0% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize: `${this.props.video.uploadPercent} 100%`
              }}
            >
              {this.props.video.uploadPercent}
            </div>
          )}
        </div>
        <div className="mx-auto text-center">
          <Dropzone
            onDrop={files => this.props.loadFile(files[0])}
            className="cursor-pointer text-black"
          >
            {this.props.uploader.file == "" ? (
              <div className="pt-10 pb-12 h-uploader">
                <p className="w-1/2 text-center mx-auto">Drop a file</p>
                <div
                  style={{
                    width: "100%",
                    height: "20px",
                    borderBottom: "1px solid black",
                    textAlign: "center",
                    width: "50%",
                    margin: "0 auto"
                  }}
                >
                  <span
                    style={{
                      backgroundColor: "#FFF",
                      padding: "0 10px",
                      position: "relative",
                      top: "10px"
                    }}
                  >
                    or
                  </span>
                </div>
                <p className="w-1/2 mt-4 text-center mx-auto">
                  Click to browse
                </p>
              </div>
            ) : (
              <UploadSummary {...this.props} />
            )}
          </Dropzone>

          {this.props.uploader.file ? (
            <button
              alt="Upload"
              aria-label="Upload"
              className={`h-8 w-full text-white ${
                this.props.video.uploading ? "bg-barely-teal" : "bg-teal"
              }`}
              onClick={() => {
                if (
                  this.props.uploader.error == null &&
                  !this.props.video.uploading
                ) {
                  this.props.uploadVideo(
                    this.props.uploader.duration,
                    this.props.uploader.file,
                    this.props.user.currentUser,
                    this.props.uploadComplete,
                    this.props.misc.queueBucket
                  );
                }
              }}
            >
              <span>Upload</span>
            </button>
          ) : (
            <p>{this.props.uploader.file}</p>
          )}
        </div>
      </div>
    );
  }
}
// <uploadSummary />
const mapDispatchToProps = dispatch => {
  return {
    refreshThumbnailPreviews: video =>
      dispatch(actions.refreshThumbnailPreviews(video)),
    loadFile: file => {
      dispatch(actions.loadFile(file));
    },
    toggleLoading: () => dispatch(actions.toggleLoading()),
    uploadComplete: () => dispatch(actions.resetUploader()),
    uploadVideo: (duration, video, user, uploadComplete, bucket) => {
      dispatch(
        actions.uploadVideo(duration, video, user, uploadComplete, bucket)
      );
    }
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Uploader);
