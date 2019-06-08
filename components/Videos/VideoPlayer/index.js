/***************************/
/*The VideoPlayer.
/***************************/
import React, { Component } from "react";
import gql from "graphql-tag";
import Link from "next/link";

import Pane from "./Pane";

import Video from "../Video";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

let movePlayer = (e, direction, props) => {
  if (props.video.expandedCircle) {
    e.stopPropagation();
    props.movePlayer(direction);
    props.expandCircle(false);
  }
};

let copyEmbedLink = () => {
  const el = document.createElement("textarea");
  el.value = embedLink;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

let shareLink = () => {
  let el = document.createElement("textarea");
  el.innerHTML = window.location.href;
  el.value = el.innerHTML;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

let hasSubscribed;
let videoPlayerClass;
let videoPlayerContentClass;
let videoClass;
let [bl, br, tr, tl, md, lg] = ["bl", "br", "tr", "tl", "md", "lg"];
let circleClass,
  playerControls,
  maxPlayerIcon,
  minPlayerIcon,
  closePlayerIcon,
  innerPlayerControls;
let brClass, blClass, trClass, tlClass;
let videoTitle;
let userName;
let embedLink;
let videoUrl;

class videoPlayer extends Component {
  componentDidUpdate(prevProps) {
    let lastVideo = prevProps.video.currentVideo;
    let video = this.props.video.currentVideo;
    if (lastVideo._id != video._id) {
      console.log(true);
    }
  }

  showVideo = (video, formats, resolution, videoPosition, isOwner) => {
    if (formats == null) return;

    // Get video format resolution
    let format = formats.includes(resolution) ? resolution : formats[0];

    // Get video url for streaming
    let url = `https://s3.amazonaws.com/media.growreel.com/${
      video.path
    }/${format}${format == "video" ? "" : ".mp4"}`;

    // Create video object
    let videoObj = {
      ...video,
      url
    };

    return (
      <Video
        {...this.props}
        isOwner={isOwner}
        videoObj={videoObj}
        className={`w-full bg-black lg:w-full xl:w-full xxl:w-full xxxl:w-full ${
          videoPosition == "lg" ? "" : "max-h-videoMini"
        }`}
      />
    );
  };

  render() {
    let video = this.props.video.currentVideo;

    if (video == null) return null;

    let user = this.props.user.currentUser;
    let videoPosition = this.props.video.videoPlayerPosition;

    // Check if this is a video by the current user
    let isOwner =
      user != null &&
      video.user != null &&
      user.username == video.user.username;

    let hasSubscribed =
      user == null
        ? false
        : user.subscriptions.find(_user => {
            return _user._id == video.user._id;
          });

    const shareUrl = `https://growreel.com/watch/${
      this.props.video.currentVideo._id
    }`;
    const title = this.props.video.currentVideo.title;

    embedLink = `<iframe width="560" height="315" src="https://${
      window.location.hostname
    }/embed/${video._id}" frameBorder="0"></iframe>`;

    switch (this.props.video.videoPlayerPosition) {
      case bl:
        videoPlayerClass =
          "w-650 md:w-1/2 sm:w-full sm:h-250 border border-white mt-16 bg-almost-black overflow-hidden fixed pin-l pin-b z-50 justify-center";
        videoPlayerContentClass = "hidden";
        videoClass = "";
        break;
      case br:
        videoPlayerClass =
          "w-650 md:w-1/2 sm:w-full sm:h-250 border border-white mt-16 bg-almost-black overflow-hidden fixed pin-r pin-b z-50 justify-center";
        videoPlayerContentClass = "hidden";
        videoClass = "";
        break;
      case tl:
        videoPlayerClass =
          "w-650 md:w-1/2 sm:w-full sm:h-250 border border-white mt-16 bg-almost-black overflow-hidden fixed pin-l pin-t z-50 justify-center";
        videoPlayerContentClass = "hidden";
        videoClass = "";
        break;
      case tr:
        videoPlayerClass =
          "w-650 md:w-1/2 sm:w-full sm:h-250 border border-white mt-16 bg-almost-black overflow-hidden fixed pin-r pin-t z-50 justify-center";
        videoPlayerContentClass = "hidden";
        videoClass = "";
        break;
      case md: // ADDED Fhelipe
        videoPlayerClass =
          "w-screen h-50 w-full h-screen sm:mt-12 bg-almost-black overflow-y-scroll fixed z-20 flex justify-center sm:pt-0 pt-48"; // pt-48 UPDATE: WORKING
        videoPlayerContentClass = "";
        videoClass = "w-4/5 h-full sm:w-full sm:px-2";
        break;
      case lg:
        videoPlayerClass =
          "w-screen h-50 w-full h-screen sm:mt-12 lg:fixed bg-almost-black overflow-y-scroll fixed z-40 flex justify-center sm:pt-0 pt-48"; // pt-48 UPDATE: WORKING
        videoPlayerContentClass = "";
        videoClass =
          "w-4/5 sm:w-7/8 pt-12 xxl:pt-2 xxxl:pt-8 xxl:max-w-almostFull xxxl:max-w-almostFull sm:px-2";
      default:
        videoPlayerClass =
          "w-screen h-50 w-full h-screen sm:mt-12 lg:fixed bg-almost-black overflow-y-scroll fixed z-30 flex justify-center sm:pt-12 xl:pt-16 xxl:pt-32 xxxl:pt-32 pt-32"; //pt-48 please add margin above the video - UPDATE: WORKING
        videoPlayerContentClass = "";
        videoClass =
          "w-4/5 sm:w-7/8 pt-12 xxl:pt-2 xxxl:pt-8 xxl:max-w-almostFull xxxl:max-w-almostFull sm:px-2";
        break;
    }

    videoTitle =
      video.title.length > 22
        ? video.title.substring(0, 22) + "..."
        : video.title || "No Title Found";
    userName =
      video.user.username.length > 16
        ? video.user.username.substring(0, 16) + "..."
        : video.user.username || "No User";
    circleClass =
      "flex flex-wrap w-10 h-10 p-2 mr-1 content-center circleControl";
    closePlayerIcon = "cursor-pointer w-10 h-10 pt-3 hover:bg-red";
    /*
      playerControls
      */
    if (this.props.video.videoPlayerPosition == lg) {
      if (this.props.video.showControls) {
        playerControls =
          "flex justify-between pin-r pin-t sm:fixed md:fixed lg:fixed xl:fixed xxl:fixed  xxxl:fixed w-full mt-14 mr-2 text-center pl-2 absolute bg-almost-black text-white mt-16";
        // } else {
        //   playerControls =
        //     "flex justify-between pin-r pin-t md:fixed lg:fixed xl:fixed xxl:fixed xxxl:fixed w-full mt-14 mr-2 text-center pl-2 absolute bg-almost-black text-white mt-32";
      }
      minPlayerIcon = "cursor-pointer w-10 h-10 pt-3 hover:bg-teal";
      maxPlayerIcon = "hidden sm:pt-3 w-10 h-10";
      circleClass = "hidden";
    } else {
      if (this.props.video.showControls) {
        playerControls =
          "flex justify-between pin-t text-center pl-2 absolute w-1/2 w-full z-50 bg-almost-black text-white";
      } else {
        playerControls = "hidden";
      }
      minPlayerIcon = "hidden";
      maxPlayerIcon = "cursor-pointer w-10 h-10 pt-3 hover:bg-teal";
    }
    if (playerControls != null && playerControls.indexOf("sm:hidden") == -1)
      playerControls += " sm:hidden";

    /*
      circle icon quarters
      */
    if (this.props.video.expandedCircle) {
      circleClass = "flex flex-wrap circleControl circleControl--show";
      brClass = br + " br--expand";
      blClass = bl + " bl--expand";
      trClass = tr + " tr--expand";
      tlClass = tl + " tl--expand";
      minPlayerIcon = "hidden";
      maxPlayerIcon = "hidden";
      closePlayerIcon = "hidden";
      playerControls += " h-full";
      innerPlayerControls = "flex flex-wrap w-full";
    } else {
      brClass = br;
      blClass = bl;
      trClass = tr;
      tlClass = tl;
      if (playerControls != null && playerControls.indexOf("h-10") == -1)
        playerControls += " h-10";
      innerPlayerControls = "flex flex-wrap mr-2";
    }

    circleClass += " sm:hidden";
    return (
      <div
        itemScope
        itemType="http://schema.org/MediaObject"
        onClick={() => {
          if (this.props.video.videoPlayerPosition == "lg") {
            this.props.closeAllHandler();
          }
        }}
        className={videoPlayerClass}
      >
        <div className="lg:hidden md:hidden xl:hidden xxl:hidden xxxl:hidden sm:fixed flex w-full lg:h-8 justify-end text-center pr-3 absolute z-50 bg-almost-black text-white">
          <div
            className="lg:w-10 lg:h-10 sm:h-8 sm:w-8 sm:pt-2 lg:pt-3 hover:bg-teal"
            onClick={() => this.props.movePlayer(lg)}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className="cursor-pointer text-white"
            />
          </div>
          <div
            className="lg:w-10 lg:h-10 sm:h-8 sm:w-8 sm:pt-2 lg:pt-3 hover:bg-teal"
            onClick={() => this.props.movePlayer(br)}
          >
            <FontAwesomeIcon
              icon={faMinus}
              className="cursor-pointer text-white"
            />
          </div>
          <Link href="/">
            <div
              className="lg:w-10 lg:h-10 sm:h-8 sm:w-8 sm:pt-2 lg:pt-3 hover:bg-red"
              onClick={() => this.props.destroyPlayer()}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="cursor-pointer text-white"
              />
            </div>
          </Link>
        </div>
        <div
          onClick={e => {
            e.stopPropagation();
          }}
          className={videoClass}
          onMouseEnter={() => this.props.showControlsHandler(true)}
          onMouseLeave={() => {
            this.props.showControlsHandler(false);
            this.props.expandCircle(false);
          }}
        >
          <div
            className={playerControls}
            style={
              this.props.video.videoPlayerPosition == md &&
              lg &&
              !this.props.video.expandedCircle
                ? { top: "8.5rem" }
                : null
            }
          >
            <div className="text-lg leading-loose h-5">
              {this.props.video.videoPlayerPosition !== lg &&
              !this.props.video.expandedCircle
                ? videoTitle
                : null}
            </div>
            <div className={innerPlayerControls}>
              <div
                onClick={() => {
                  if (!this.props.video.expandedCircle) {
                    this.props.expandCircle(true);
                  }
                }}
                className={circleClass}
              >
                <div
                  onClick={e => {
                    movePlayer(e, tl, this.props);
                  }}
                  className={tlClass}
                />
                <div
                  onClick={e => {
                    movePlayer(e, tr, this.props);
                  }}
                  className={trClass}
                />
                <div
                  onClick={e => {
                    movePlayer(e, bl, this.props);
                  }}
                  className={blClass}
                />
                <div
                  onClick={e => {
                    movePlayer(e, br, this.props);
                  }}
                  className={brClass}
                />
              </div>
              <div
                className={maxPlayerIcon}
                onClick={() => this.props.movePlayer(lg)}
              >
                <FontAwesomeIcon
                  icon={faPlus}
                  className="cursor-pointer text-white"
                />
              </div>
              <div
                className={minPlayerIcon}
                onClick={() => this.props.movePlayer(br)}
              >
                <FontAwesomeIcon
                  icon={faMinus}
                  className="cursor-pointer text-white"
                />
              </div>
              <Link href="/">
                <div
                  className={closePlayerIcon}
                  onClick={() => this.props.destroyPlayer()}
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="cursor-pointer text-white"
                  />
                </div>
              </Link>
            </div>
          </div>
          {this.showVideo(
            video,
            this.props.video.formats,
            this.props.video.resolution,
            videoPosition,
            isOwner
          )}
          <Pane
            videoPlayerContentClass={videoPlayerContentClass}
            embedLink={embedLink}
            {...this.props}
            commentAdded={subscription.commentAdded}
          />
        </div>
      </div>
    );
  }
}

const subscription = {
  commentAdded: gql`
    subscription($video: String) {
      commentAdded(video: $video) {
        _id
        body
        user {
          _id
          username
        }
        upvotes {
          _id
        }
        downvotes {
          _id
        }
        flags {
          _id
        }
        createdAt
        edited
        editedAt
        _type
      }
    }
  `
};

export default videoPlayer;
