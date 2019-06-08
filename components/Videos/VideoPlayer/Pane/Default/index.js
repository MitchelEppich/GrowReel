import moment from "moment";
import Link from "next/link";

import {
  TwitterShareButton,
  FacebookShareButton,
  EmailShareButton,
  RedditShareButton
} from "react-share";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faClock,
  faEye,
  faTimes,
  faFlag,
  faThumbsUp,
  faCode,
  faEnvelope,
  faShareSquare
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faRedditAlien
} from "@fortawesome/free-brands-svg-icons";

let Default = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let isLoggedIn = _user != null;
  let isOwner = isLoggedIn && _user._id == _video.user._id;
  let isAdmin = isLoggedIn && _user.admin;

  let shareUrl = `https://www.growreel.com/watch/${_video._id}`;

  let thumbImg = "https://www.growreel.com/static/images/GrowReelLogoGrey.png";

  let _title = _video.title || "No Title";
  let _username = _video.user.username || "No User";
  let _description = _video.description || "No Description";

  let hasSubscribed =
    isLoggedIn &&
    _user.subscriptions.find(user => {
      return user._id == _video.user._id;
    });

  //#region title
  let showTitle = (
    <div className="sm:w-full w-4/5">
      <h2 className="h-12 font-bold mt-2 w-full sm:h-8 sm:w-full text-white sm:text-lg text-left">
        {_title}
      </h2>
    </div>
  );
  //#endregion title
  //#region shareBar
  let shareBar = (
    <div
      style={
        props.misc.showShareButtons
          ? {
              width: "170px",
              justifyContent: "space-between",
              opacity: "1",
              marginTop: "-2px",
              paddingTop: "4px",
              transition: "0.3s all ease",
              backgroundColor: "rgba(27, 27, 27, 0.51)",
              overflowX: "hidden"
            }
          : {
              width: "0px",
              opacity: "0",
              transition: "0.3s all ease",
              overflowX: "hidden"
            }
      }
      className="inline-flex"
    >
      <div className="icons-animation mx-1">
        <a
          style={{
            border: "none",
            background: "none"
          }}
          target="_blank"
          href={
            "https://www.facebook.com/sharer/sharer.php?u=https%3A//" +
            window.location.href.split("//")[1]
          }
          // url={shareUrl}
          // media={thumbImg}
          // quote={_title}
          className="Demo__some-network__share-button border-0"
        >
          <FontAwesomeIcon
            icon={faFacebook}
            className="cursor-pointer fa-lg icons-animation ml-1 text-white"
          />
        </a>
      </div>
      <div className="icons-animation mx-1">
        <TwitterShareButton
          style={{
            border: "none",
            background: "none"
          }}
          url={shareUrl}
          title={_title}
          media={thumbImg}
          className="Demo__some-network__share-button hover:opacity-0"
        >
          <FontAwesomeIcon
            icon={faTwitter}
            className="cursor-pointer fa-lg icons-animation ml-1 text-white"
          />
        </TwitterShareButton>
      </div>
      <div className="icons-animation mx-1">
        <RedditShareButton
          style={{
            border: "none",
            background: "none"
          }}
          url={shareUrl}
          media={thumbImg}
          title={_title}
          className="Demo__some-network__share-button "
        >
          <FontAwesomeIcon
            icon={faRedditAlien}
            className="cursor-pointer fa-lg icons-animation ml-1 text-white"
          />
        </RedditShareButton>
      </div>
      <div className="icons-animation mx-1">
        <EmailShareButton
          style={{
            border: "none",
            background: "none"
          }}
          url={shareUrl}
          media={thumbImg}
          title={_title}
          className="Demo__some-network__share-button "
        >
          <FontAwesomeIcon
            icon={faEnvelope}
            className="cursor-pointer fa-lg icons-animation ml-1 text-white"
          />
        </EmailShareButton>
      </div>
      <div
        className="icons-animation mx-1"
        onClick={() => {
          copyEmbedLink(props);
        }}
      >
        <FontAwesomeIcon
          icon={faCode}
          className="cursor-pointer fa-lg icons-animation ml-1 text-white"
        />
      </div>
    </div>
  );
  //#endregion shareBar
  //#region shareBtn
  let shareBtn = (
    <div
      className="mt-2 inline-flex hover:text-teal cursor-pointer icons-animation"
      onClick={() => {
        props.toggleShareButtons();
      }}
    >
      <div className="inline-flex">
        Share
        <FontAwesomeIcon
          icon={faShareSquare}
          className=" ml-1 text-center text-white"
        />
      </div>
    </div>
  );
  //#endregion shareBtn
  //#region showDescription
  let showDescription = (
    <textarea
      disabled
      name="description"
      value={_description}
      className="resize-none px-2 w-full bg-transparent text-left h-150 text-white  sm:text-sm mb-8"
    />
  );
  //#endregion showDescription

  return (
    <div>
      <div className="w-full inline-flex sm:block pl-2 pt-2">
        {showTitle}
        <div className="inline-flex sm:w-full w-1/5 justify-end sm:justify-start">
          {shareBtn}
          <div className="ml-2 h-10 pb-2 inline-flex pl-1 pt-1">{shareBar}</div>
        </div>
      </div>
      {props.child}
      {showDescription}
    </div>
  );
};

export default Default;

let copyEmbedLink = props => {
  const el = document.createElement("textarea");
  el.value = props.embedLink;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};
