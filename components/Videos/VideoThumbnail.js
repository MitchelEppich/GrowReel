/***************************/
/*The video thumbnail for
the homepage as well as
search results depending on
props.plus/white
/***************************/

import Link from "next/link";
import MetaTags from "react-meta-tags";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faEye,
  faThumbsUp,
  faStar,
  faBan
} from "@fortawesome/free-solid-svg-icons";

import Tilt from "react-tilt";

let videoTitle, userName;

const videoThumbnail = props => {
  if (Object.keys(props.video).length > 0) {
    const video = props.video;
    const thumbURL = video.has_thumbnail
      ? `https://s3.amazonaws.com/media.growreel.com/${video.path}/thumbnail`
      : "../static/default/thumbnail/video_thumbnail.jpg";

    videoTitle =
      video.title.length > 20
        ? video.title.substring(0, 20) + "..."
        : video.title || "No Title Found";
    userName =
      video.user.username.length > 16
        ? video.user.username.substring(0, 16) + "..."
        : video.user.username || "No User";

    const imageSrc = {
      background: "url(" + `${thumbURL}` + ")",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    };

    let selectedFeature =
      props.featurePath == video.path && props.editMode ? " bg-teal" : "";
    let selectedForDelete = " ";
    if (
      props.deleteVideos &&
      props.deleteVideos.includes(video.path) &&
      props.editMode
    ) {
      selectedForDelete = " bg-red";
    } else {
      selectedForDelete = " ";
    }
    const outerDivClass = props.white
      ? "video-link--wide my-1 mx-auto"
      : "video-link my-2 inline-flex mx-2" +
        selectedFeature +
        selectedForDelete;
    const innerLink = props.white
      ? "h-full w-full flex cursor-pointer"
      : "h-full w-full cursor-pointer";
    const imageClass = props.white
      ? "video-link--wide__image text-white"
      : "video-link__image text-white";
    const captionClass = props.white
      ? "video-link--wide__caption text-black p-1 bg-white"
      : "video-link__caption text-white p-1 pb-3 bg-transparent-grey text-left";

    let thumbnail =
      !props.chooseFeaturedVideoMode && !props.deleteVideoMode ? (
        <div
          className={outerDivClass}
          itemScope
          itemType="http://schema.org/MediaObject"
        >
          <Link href="/" as={`/watch/${video._id}`}>
            <a className={innerLink} onClick={() => props.queueVideo(video)}>
              <div
                className={imageClass}
                style={imageSrc}
                itemScope
                itemType="https://schema.org/MediaObject"
                itemProp="thumbnailUrl"
              >
                {(props.reel != null &&
                  props.currentUser != null &&
                  props.reel.id == props.currentUser._id) ||
                (props.currentUser != null && props.currentUser.admin) ? (
                  <span>
                    <p
                      className={`absolute pin-r text-xs p-1 pl-2 text-white font-bold ${
                        video.state == 1 ? "bg-green" : "bg-orange"
                      } `}
                      style={{ borderBottomLeftRadius: "8px" }}
                    >
                      {video.state == 1 ? "PUBLISHED" : "UNPUBLISHED"}
                    </p>
                    {video.disable ? (
                      <span
                        className={`absolute pin-l text-xs pb-1 px-1 pt-2px pl-2 text-white font-bold bg-red`}
                        style={{ borderBottomRightRadius: "8px" }}
                      >
                        <FontAwesomeIcon icon={faBan} className="mr-2" />
                      </span>
                    ) : video.feature ? (
                      <span
                        className={`absolute pin-l text-xs pb-1 px-1 pt-2px pl-2 text-white font-bold bg-blue`}
                        style={{ borderBottomRightRadius: "8px" }}
                      >
                        <FontAwesomeIcon icon={faStar} className="mr-2" />
                      </span>
                    ) : null}
                  </span>
                ) : null}

                {video.mature ? (
                  <p
                    className={`absolute pin-l text-xs p-1 pl-2 pr-2 text-white font-bold bg-red`}
                    style={{
                      borderTopRightRadius: "8px",
                      marginTop: "97px"
                    }}
                  >
                    19 +
                  </p>
                ) : null}

                <p className="video-link__time" itemProp="duration">
                  {moment.utc(video.duration * 1000).format("m:ss")}
                </p>
              </div>
              <div className={captionClass}>
                <h3 className="text-base mt-1" itemProp="headline">
                  {videoTitle}
                </h3>
                {video.user ? (
                  <Link href="/" as={`/r/${video.user.username}`}>
                    <p
                      className="text-sm mt-1 hover:text-teal"
                      onClick={e => {
                        e.stopPropagation();
                        props.fetchReel(video.user.username);
                        props.toggleReel(true);
                      }}
                      itemProp="creator"
                    >
                      {userName}
                    </p>
                  </Link>
                ) : (
                  <p>NO USER</p>
                )}
                <p className="text-xs mt-1">
                  <span itemProp="userInteractionCount">
                    {props.formatNumber(video.views) || 0}
                  </span>{" "}
                  <FontAwesomeIcon icon={faEye} className="ml-1 mr-3" />
                  <span itemProp="dateCreated">
                    {moment(new Date(video.createdAt)).fromNow()}
                  </span>
                  <FontAwesomeIcon icon={faClock} className="ml-1 mr-3" />
                  <span
                    itemProp="interactionType"
                    href="http://schema.org/LikeAction"
                  >
                    {video.likes ? props.formatNumber(video.likes.length) : 0}
                  </span>
                  <FontAwesomeIcon icon={faThumbsUp} className="ml-1 mr-4" />
                </p>
                {props.plus ? <p className="p-2">{props.descSmall}</p> : null}
              </div>
            </a>
          </Link>
        </div>
      ) : (
        <div className={outerDivClass}>
          <a
            className={innerLink}
            onClick={() => {
              props.chooseFeaturedVideoMode
                ? props.chooseFeaturedVideoHandler(video.path)
                : props.chooseDeleteVideoHandler(video.path);
            }}
          >
            <div className={imageClass} style={imageSrc}>
              <p className="video-link__time">
                {moment.utc(video.duration * 1000).format("m:ss")}
              </p>
            </div>
            <div className={captionClass}>
              <h3 className="text-base mt-1">
                {video.title ? video.title.substring(0, 20) : "NO TITLE"}
                {video.title && video.title.length > 20 ? "..." : ""}
              </h3>
              <p className="text-sm mt-1">
                {video.user ? video.user.username.substring(0, 16) : "NO USER"}
                {video.user && video.user.username.length > 16 ? "..." : ""}
              </p>
              <p className="text-xs mt-1">
                {props.formatNumber(video.views) || 0}{" "}
                <FontAwesomeIcon icon={faEye} className="ml-1 mr-3" />
                {moment(new Date(video.createdAt)).fromNow()}
                <FontAwesomeIcon icon={faClock} className="ml-1 mr-3" />
                {props.formatNumber(video.likes) ? video.likes.length : 0}
                <FontAwesomeIcon icon={faThumbsUp} className="ml-1 mr-4" />
              </p>
              {props.plus ? <p className="p-2">{props.descSmall}</p> : null}
            </div>
          </a>
        </div>
      );

    return (
      <div className="inline-flex">
        <MetaTags>
          <meta id="og-title" property="og:title" content={video.title} />
          <meta id="og-url" property="og:url" content={window.location.href} />
          <meta property="og:image:secure_url" content={window.location.href} />
          <meta id="og-locale" property="og:locale" content="en_US" />
          <meta property="og:image" content={thumbURL} />
          <meta property="og:image:width" content="210" />
          <meta property="og:image:height" content="118" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta
            property="og:image:alt"
            content="A preview of the video content."
          />
        </MetaTags>

        <Tilt
          className="Tilt"
          options={{ max: 32, scale: 1.1, transition: true, maxGlare: 5 }}
          style={{ height: 250, width: 250 }}
        >
          <div className="Tilt-inner">{thumbnail}</div>
        </Tilt>
      </div>
    );
  }
};

export default videoThumbnail;
