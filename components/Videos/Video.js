import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { JSONLD, Generic } from "react-structured-data";
import Hls from "hls.js";
import { library } from "@fortawesome/fontawesome-svg-core"; // FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";
import actions from "../../store/actions";

import ControlBar from "./ControlBar";

library.add();

let video;

let vidWidth;
let vidHeight;
let detectMode;

let _controlTimeout;

class Video extends Component {
  componentDidMount() {
    this._init();
  }

  // action.currentVideo.live_url ||
  //   `https://s3.amazonaws.com/media.growreel.com/${
  //   action.currentVideo.path
  //   }/${state.resolution}${state.resolution == "video" ? "" : ".mp4"}`

  componentWillUpdate(nextProps, nextState) {
    console.log(this.props, nextProps);
    if (
      nextProps.video.resolution != this.props.video.resolution ||
      nextProps.videoObj._id != this.props.videoObj._id
    ) {
      this.refs.video.pause();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.video.resolution != prevProps.video.resolution) {
      setTimeout(() => {
        this.refs.video.src = this.props.videoObj.url;
        this.refs.video.load();
        this.refs.video.play();
        this.refs.video.currentTime = this.props.video.currentTime;
      }, 300);
    }
    if (prevProps.videoObj._id != this.props.videoObj._id) {
      this.refs.video.src = this.props.videoObj.url;
      this.refs.video.load();
      this.refs.video.play();
    }
    let curDim = [this.refs.video.videoWidth, this.refs.video.videoHeight];
    if (JSON.stringify(curDim) != JSON.stringify(this.props.misc.videoDim)) {
      this.props.setVideoDim([
        this.refs.video.videoWidth,
        this.refs.video.videoHeight
      ]);
    }
  }

  _init() {
    this.props.toggleControls(true);

    video = this.props.videoObj;

    if (video.url == null) return;

    if (video.url.includes(".m3u8")) {
      let $video = this.refs.video;

      let hls = new Hls(hls);

      hls.loadSource(video.url);
      hls.attachMedia($video);

      video.url = $video.src;
    }

    if (video.monetize && !this.props.currentUsersVideo) {
      this.refs.video.src = "../../static/videos/Default_Ad_Video.mp4"; // Select random ad here
      this.refs.video.className = `advideo ${this.props.className} ${
        detectMode ? "h-full" : "h-heightVideoSm"
      } 
      ${
        this.props.video.fullscreen
          ? "h-heightVideoFull md:h-heightVideoFull "
          : "h-full"
      }`;
    } else {
      this.refs.video.src = video.url;
    }
  }

  render() {
    let showAgeRestriction = () => {
      // if (this.props.currentUsersVideo) return null;
      if (
        (this.props.user.currentUser &&
          this.props.user.currentUser.age_verified) ||
        !video.mature
      )
        return null;

      if (this.refs.video && !this.refs.ageRestriction.hidden) {
        this.refs.video.pause();
      }

      return (
        <div ref="ageRestriction" className="relative">
          <div className="pt-16 sm:mt-32 bg-black opacity-95 w-full sm:h-heightVideoFull h-heightVideoFull z-40 absolute">
            <h3 className="text-center whitespace-no-wrap sm:mt-2 sm:text-xs sm:p-4 md:mt-2 mt-32">
              This video contains content suitable for ages 19+.
            </h3>
            <p className="text-center sm:text-sm sm:mt-2 md:mt-2 mt-8">
              Are you over the age of 19?
            </p>
            <div className="text-center sm:mt-2 md:mt-2 mt-16">
              <button
                alt="Age Verification"
                aria-label="Age Verification"
                className="p-1 md:w-16 sm:w-16 h-8 w-32 m-2 text-white"
                onClick={() => {
                  if (this.props.user.currentUser) {
                    this.props.updateUser(this.props.user.currentUser, {
                      age_verified: true
                    });
                  }
                  this.refs.ageRestriction.hidden = true;
                  this.refs.video.play();
                }}
              >
                Yes
              </button>
              <button
                alt="Age Denial"
                aria-label="Age Denial"
                className="p-1 md:w-16 sm:w-16 h-8 w-32 m-2 text-white"
                onClick={() => this.props.destroyPlayer()}
              >
                No
              </button>
            </div>
            {!this.props.user.currentUser ? (
              <p className="text-center sm:text-sm sm:mt-2 md:mt-2 mt-1">
                Sign up today and verify once!
              </p>
            ) : null}
          </div>
        </div>
      );
    };

    let showProcessing = () => {
      return (
        <div>
          <h2
            className=" absolute pin-t w-full"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              textAlign: "center"
            }}
          >
            Video is still processing, please check again in about a minute.
          </h2>
        </div>
      );
    };

    let showSkip = () => {
      return (
        <div
          ref="skipButton"
          className="z-30 absolute pin-r pin-b justify-end mb-24 lg:mb-16 md:mb-16 sm:mb-16 sm:h-8 float-right h-10 w-100 bg-almost-black"
          hidden
        >
          <button
            className="text-white sm:h-8 h-10 w-100"
            onClick={() => {
              if (!this.refs.video.src.includes(video.url)) {
                this.refs.video.src = video.url;
                this.refs.video.className = `${this.props.className} ${
                  detectMode ? "h-full" : "h-heightVideoSm"
                } 
                ${
                  this.props.video.fullscreen
                    ? "h-heightVideoFull md:h-heightVideoFull "
                    : "h-full"
                }`;
                this.refs.skipButton.hidden = true;
              }
            }}
          >
            SKIP
            <FontAwesomeIcon icon={faAngleDoubleRight} className="ml-6" />
          </button>
        </div>
      );
    };

    let showOverlay = () => {
      if (this.props.misc.isEmbed) {
        /* or _parent for the current page */

        return (
          <div>
            <base target="_blank" />
            <a href={`/watch/${video._id}`} className="growreel-button" />
          </div>
        );
      }

      return null;
    };

    let video = this.props.videoObj;
    return (
      <div className="relative">
        <MetaTags>
          <title>{video.title}</title>
          <meta id="og-title" property="og:title" content={video.title} />
          <meta id="og-type" property="og:type" content="video.movie" />
          <meta id="og-url" property="og:url" content={window.location.href} />
          <meta id="og-video" property="og:video" content={video.url} />
          <meta id="og-locale" property="og:locale" content="en_US" />
          <meta id="og-video-width" property="og:video:width" content="1920" />
          <meta property="og:video:secure_url" content={window.location.href} />
          <meta
            id="og-video-height"
            property="og:video:height"
            content="1080"
          />
          <meta
            id="og-description"
            property="og:description"
            content={video.description}
          />
          <meta
            id="og-image"
            property="og:image"
            content={
              video.has_thumbnail
                ? `https://s3.amazonaws.com/media.growreel.com/${
                    video.path
                  }/thumbnail`
                : "../../static/default/thumbnail/video_thumbnail.jpg"
            }
          />
        </MetaTags>
        {showAgeRestriction()}
        {showSkip()}
        <div
          id="videoContainer"
          className={
            this.props.misc.isEmbed
              ? "h-screen w-screen overflow-hidden m-0 p-0"
              : ""
          }
          ref="videoContainer"
        >
          <video
            itemID={video.url}
            itemScope
            itemType="http://schema.org/VideoObject"
            alt="Video Player"
            aria-label="Video Player"
            ref="video"
            onContextMenu={e => {
              // playsInline
              e.preventDefault();
            }}
            className={
              !this.props.misc.isEmbed
                ? `${this.props.className}
            ${
              this.props.video.fullscreen
                ? "h-heightVideoFull"
                : this.props.misc.detectMode
                ? "w-full"
                : " h-heightVideoLg sm:h-heightVideoSm md:h-heightVideoMd"
            } 
              }`
                : "h-full w-full"
            }
            autoPlay
            crossOrigin="anonymous"
            controlsList="nodownload"
            poster={
              "/static/images/GrowReelLogoGrey.png" // controls
            }
            key={this.props.video.resolution}
            onLoadedMetadata={() => {
              // Set session defaults
              this.refs.video.volume = this.props.video.volume;
              this.refs.video.playbackRate = this.props.video.playbackRate;

              if (this.refs.video.src.includes(video.url)) {
                this.props.appendView(video.user, video);
                if (this.props.user.currentUser) {
                  this.props.createHistoryElement(
                    this.props.user.currentUser,
                    video._id
                  );
                }
              }
              if (!this.refs.video.src.includes(video.url)) {
                this.refs.skipButton.hidden = false;
              }

              this.props.setVideoDim([
                this.refs.video.videoWidth,
                this.refs.video.videoHeight
              ]);
            }}
            onTimeUpdate={e => {
              let video = e.target;
              this.props.setCurrentTime(video.currentTime);

              if (this.props.video.editVideoMode) {
                video.pause();
              }
            }}
            onSeeked={() => {
              this.props.getSnapshot(
                this.refs.video,
                this.refs.canvasPlaceholder
              );
            }}
            onEnded={() => {
              if (!this.refs.video.src.includes(video.url)) {
                this.refs.video.src = video.url;
                this.refs.video.className = `${this.props.className} ${
                  detectMode ? "h-full" : "h-heightVideoSm"
                } 
                ${
                  this.props.video.fullscreen
                    ? "h-heightVideoFull md:h-heightVideoFull "
                    : "h-full"
                }`;
                this.refs.skipButton.hidden = true;
              }
            }}
            onProgress={e => {
              let video = this.refs.video;
              if (video.buffered.length != 0) {
                let buffer = video.buffered.end(0) / e.target.duration;
                this.props.setLoadProgress(parseFloat(buffer).toFixed(2));
              }
            }}
            onMouseMove={() =>
              setControlTimeout(
                this.props.video.showControls,
                this.props.toggleControls
              )
            }
            onMouseEnter={() =>
              setControlTimeout(
                this.props.video.showControls,
                this.props.toggleControls
              )
            }
            onClick={() => {
              controls.play(this.refs.video);
              setControlTimeout(
                this.props.video.showControls,
                this.props.toggleControls
              );
            }}
            onDoubleClick={() => {
              controls.fullscreen(this.refs.videoContainer);
            }}
          >
            <p>Your browser does not support the video tag.</p>
          </video>
          {video.url == null ? showProcessing() : null}
          {this.props.video.showControls ? (
            <ControlBar
              onMouseMove={() =>
                setControlTimeout(
                  this.props.video.showControls,
                  this.props.toggleControls
                )
              }
              controls={controls}
              videoContainerRef={this.refs.videoContainer}
              videoRef={this.refs.video}
              {...this.props}
              toggleFullscreen={this.props.toggleFullscreen}
            />
          ) : (
            <div />
          )}
        </div>

        {showOverlay()}
        <canvas ref="canvasPlaceholder" hidden />
        <JSONLD>
          <Generic
            type="videoObject"
            jsonldtype="VideoObject"
            schema={{
              director: this.props.video.currentVideo.user.username,
              caption: this.props.video.currentVideo.description
            }}
          />
        </JSONLD>
      </div>
    );
  }
}

const setControlTimeout = (show, toggleControls) => {
  if (!toggleControls) return;
  if (!show) toggleControls(true);
  clearTimeout(_controlTimeout);
  _controlTimeout = setTimeout(() => {
    toggleControls(false);
  }, 1500);
};

const controls = {
  play: video => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  },
  fullscreen: container => {
    if (
      document.fullscreenElement == null &&
      document.mozFullScreenElement == null &&
      document.webkitFullscreenElement == null
    ) {
      if (container.requestFullScreen) {
        container.requestFullScreen();
        props.toggleFullscreen(true);
      } else if (container.webkitRequestFullScreen) {
        container.webkitRequestFullScreen();
        props.toggleFullscreen(true);
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
        props.toggleFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        props.toggleFullscreen(false);
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        props.toggleFullscreen(false);
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        props.toggleFullscreen(false);
      }
    }
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setResolution: resolution => dispatch(actions.setResolution(resolution)),
    togglePause: () => dispatch(actions.togglePause()),
    toggleMute: () => dispatch(actions.toggleMute()),
    toggleControls: input => dispatch(actions.toggleControls(input)),
    setVolume: volume => dispatch(actions.setVolume(volume)),
    setPlaybackRate: rate => dispatch(actions.setPlaybackRate(rate)),
    toggleFullscreen: value => dispatch(actions.toggleFullscreen(value)),
    setCurrentTime: time => dispatch(actions.setCurrentTime(time)),
    setLoadProgress: progress => dispatch(actions.setLoadProgress(progress))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Video);
