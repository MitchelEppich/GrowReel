import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";
import VideoThumbnail from "../Videos/VideoThumbnail";
import MobileReel from "./MobileReel";
import MetaTags from "react-meta-tags";
import ShowMore from "../Utilities/ShowMore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let Particles;

class Reel extends Component {
  componentDidMount() {
    if (this.props.reel.reelUpdated) {
      let reel = this.refs.reel;
      reel.addEventListener("scroll", this.fireOnScroll);
    }
    Particles = require("react-particles-js").default;
  }
  componentDidUpdate(prevProps) {
    if (
      (this.props.reel.videos == null && this.props.reel.id != null) ||
      prevProps.user != this.props.user ||
      prevProps.reel.id != this.props.reel.id
    ) {
      this.props.fetchUserVideos(
        this.props.reel.id,
        0,
        5,
        this.props.user.currentUser != null &&
          (this.props.user.currentUser._id == this.props.reel.id ||
            this.props.user.currentUser.admin)
      );
    }
    let reel = this.refs.reel;
    reel != null ? reel.addEventListener("scroll", this.fireOnScroll) : null;
  }

  componentWillUnmount() {
    this.props.cleanReel();
  }

  fireOnScroll = e => {
    let scale = 1 - e.target.scrollTop / window.innerWidth;
    this.props.handleReelScroll(scale, e.target.scrollTop);
  };

  populateVideos = (className, style) => {
    let videos = [];
    if (this.props.reel.videos != null) {
      videos = this.props.reel.videos.slice(0).map(video => {
        return (
          <VideoThumbnail
            currentUser={this.props.user.currentUser}
            reel={this.props.reel}
            key={video._id}
            white={false}
            queueVideo={this.props.queueVideo}
            video={video}
            formatNumber={this.props.formatNumber}
            chooseFeaturedVideoMode={this.props.reel.chooseFeaturedVideoMode}
            chooseFeaturedVideoHandler={this.props.chooseFeaturedVideoHandler}
            featurePath={this.props.reel.featurePath}
            deleteVideoMode={this.props.reel.deleteVideoMode}
            chooseDeleteVideoHandler={this.props.chooseDeleteVideoHandler}
            deleteVideos={this.props.reel.deleteVideos}
            editMode={this.props.reel.editMode}
          />
        );
      });

      if (videos.length != 0 && videos.length % 5 == 0) {
        videos.push(
          <ShowMore
            {...this.props}
            icon
            key="showmore"
            onClick={() => {
              this.props.fetchVideoList(
                this.props.reel,
                this.props.reel.videos.length,
                5,
                function(a, b) {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                },
                this.props.user.currentUser != null &&
                  (this.props.user.currentUser._id == this.props.reel.id ||
                    this.props.user.currentUser.admin)
              );
            }}
            style={style != null ? style : undefined}
            className={className != null ? className : undefined}
          />
        );
      }
    }
    return videos;
  };

  section = (videos, amt) => {
    return (
      <div
        style={{
          width: "250px",
          height: `${250 * amt}px`,
          backgroundColor: "black"
        }}
      >
        <div
          style={{
            marginLeft: "12px"
          }}
        >
          {videos}
        </div>
      </div>
    );
  };

  content = () => {
    let videos = this.populateVideos();

    let perScreen = this.props.reel.itemPerScreen;
    let height = window.innerHeight;
    if (height >= 850) {
      if (perScreen != 3) this.props.setItemPerScreen(3);
    } else if (height >= 620) {
      if (perScreen != 2) this.props.setItemPerScreen(2);
    } else if (perScreen != 1) this.props.setItemPerScreen(1);
    let numScreens = Math.ceil(videos.length / perScreen);

    let showScreens = () => {
      let arr = [];
      let count = 0;
      for (let i = 0; i < numScreens; i++) {
        let start = count;
        let end = Math.min(count + perScreen, count + (videos.length - count));
        arr.push(
          this.section(
            count >= videos.length ? null : videos.slice(start, end),
            perScreen
          )
        );

        count += perScreen;
      }

      return arr;
    };

    let screenWidth = 250 * numScreens;

    if (videos.length == 0) {
      return (
        <div
          style={{
            marginLeft: "350px",
            backgroundColor: "black",
            width: `calc(100vw + ${
              window.innerWidth > screenWidth ? window.innerWidth : screenWidth
            }px)`,
            height: "calc(100vh - 3%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Particles
            width={window.innerWidth}
            height={window.innerHeight}
            style={{
              position: "absolute",
              top: "0",
              left: "100%"
            }}
            params={{
              particles: {
                number: {
                  value: "60",
                  density: {
                    enable: true,
                    value_area: "800"
                  }
                },
                color: {
                  value: "#79BA3E"
                },
                shape: {
                  type: "circle",
                  stroke: {
                    width: "0",
                    color: "#79BA3E"
                  },
                  polygon: {
                    nb_sides: 5
                  }
                },
                opacity: {
                  value: 1,
                  random: false,
                  anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 1,
                    sync: false
                  }
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                  }
                },
                line_linked: {
                  enable: true,
                  distance: "10",
                  color: "#79BA3E",
                  opacity: "0.4",
                  width: "1"
                },
                move: {
                  enable: true,
                  speed: "6",
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: true,
                  attract: {
                    enable: true,
                    rotateX: "600",
                    rotateY: "1200"
                  }
                }
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: {
                    enable: true,
                    mode: "grab"
                  },
                  resize: true
                },
                modes: {
                  grab: {
                    distance: 140,
                    line_linked: {
                      opacity: 1
                    }
                  },
                  bubble: {
                    distance: 400,
                    size: 6,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                  },
                  repulse: {
                    distance: 200,
                    duration: 0.4
                  },
                  remove: {
                    particles_nb: 2
                  }
                }
              },
              retina_detect: true
            }}
          />
          <h2 style={{ width: "60%" }}>Sorry, This User Has No Videos.</h2>
        </div>
      );
    }

    return (
      <div
        style={{
          marginLeft: "350px",
          backgroundColor: "black",
          width: `calc(100vw + ${
            window.innerWidth > screenWidth ? window.innerWidth : screenWidth
          }px)`,
          display: "-webkit-inline-box",
          height: "calc(100vh - 3%)",
          display: "flex",
          alignItems: "center"
        }}
      >
        {showScreens()}
      </div>
    );
  };

  render() {
    let thumbBG = this.props.reel.avatar;
    return this.props.reel.reelUpdated ? (
      <div itemScope itemType="https://schema.org/ProfilePage">
        <MetaTags>
          <title>{`${this.props.reel.username} Reel`}</title>
          <meta
            id="og-title"
            property="og:title"
            content={`${this.props.reel.username} Reel`}
          />
          <meta id="og-url" property="og:url" content={window.location.href} />
          <meta
            id="og-video"
            property="og:video"
            content={this.props.reel.featurePath}
          />
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
            content={this.props.reel.description}
          />
          <meta id="og-image" property="og:image" content={thumbBG} />
        </MetaTags>
        <div className="fixed sm:hidden md:hidden h-screen w-screen z-20 bg-black">
          {this.props.reel.left < window.innerWidth ? (
            <div
              style={{
                position: "relative",
                right: this.props.reel.left * 0.5
              }}
              className="reelFeaturedVideo"
            >
              <video
                ref="video"
                style={{
                  minWidth: "100%",
                  minHeight: "100%",
                  width: "auto",
                  height: "auto",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  WebkitTransform: "translate(-50%,-50%)",
                  MozTransform: "translate(-50%,-50%)",
                  MsTransform: "translate(-50%,-50%)",
                  OTransform: "translate(-50%,-50%)"
                }}
                autoPlay
                loop
                muted
                onPlay={() => {
                  if (this.refs.thumbnailInput != null) {
                    this.refs.thumbnailInput.click();
                    this.refs.video.muted = false;
                  }
                }}
              >
                // poster=
                {"/static/images/GrowReelLogoGrey.png"}
                <source src={this.props.reel.featurePath} type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
            </div>
          ) : null}
          <div
            ref="reel"
            className={
              this.props.reel.left < window.innerWidth
                ? "horizontal-scroll-wrapper bg-transparent"
                : "horizontal-scroll-wrapper"
            }
            style={{
              top: window.innerWidth > 1250 ? "64px" : "56px"
            }}
          >
            <div
              className="bg-transparent"
              style={{
                height: "100vw",
                marginTop: "100vw",
                width: "350px",
                marginLeft: "calc(100vh - 350px)"
              }}
            >
              <div
                style={{ height: "calc(100vh - 3%)" }}
                className="h-screen reelInfo flex flex-wrap content-start absolute overflow-x-hidden overflow-y-scroll"
              >
                <div
                  style={{
                    background: "url(" + thumbBG + ")",
                    backgroundPosition: "top",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "150px",
                    height: "150px"
                  }}
                  className="reelInfo__userImage ml-4 mt-6"
                >
                  {this.props.reel.editMode ? (
                    <div
                      onClick={() => {
                        this.refs.thumbnailInput.click();
                      }}
                      className="w-full h-full relative icons-animation bg-black text-white"
                    >
                      <div className="absolute pin-b w-full bg-almost-black p-1 text-center font-bold text-sm text-green-dark cursor-pointer">
                        Change Picture
                      </div>
                      <input
                        aria-label="Select Thumbnail"
                        onChange={e => this.props.setAvatar(e.target.files[0])}
                        ref="thumbnailInput"
                        type="file"
                        id="avatar"
                        className="hidden"
                        name="avatar"
                        accept="image/png, image/jpeg"
                      />
                      {this.props.reel.avatar != null ? (
                        <div
                          itemProp="thumbnailUrl"
                          style={{
                            background: "url(" + thumbBG + ")",
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            width: "150px",
                            height: "150px"
                          }}
                          className="w-full h-full text-white hover:text-teal cursor-pointer flex justify-center items-center"
                        />
                      ) : null}
                      {this.props.reel.avatar == null ? (
                        <div className="w-full h-full text-white hover:text-teal cursor-pointer flex justify-center items-center">
                          <FontAwesomeIcon
                            icon="camera-retro"
                            className="text-3xl"
                          />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <ul className="list-reset pt-8 pl-8 w-1/2 h-24 leading-loose cursor-default">
                  <li className="inline-flex">
                    {this.props.formatNumber(this.props.reel.subscribers)}{" "}
                    {this.props.reel.subscribers == 1 ? (
                      <p className="ml-2"> subscriber</p>
                    ) : (
                      <p className="ml-2"> subscribers</p>
                    )}
                  </li>
                  <li>
                    <span itemProp="interactionType">
                      {this.props.formatNumber(this.props.reel.views)}
                    </span>{" "}
                    <FontAwesomeIcon icon="eye" className="ml-1" />
                  </li>
                  <li>
                    <span itemProp="interactionType">
                      {this.props.formatNumber(this.props.reel.likes)}
                    </span>{" "}
                    <FontAwesomeIcon
                      icon="thumbs-up"
                      className="ml-1 cursor-default"
                    />
                  </li>
                </ul>
                <h2
                  className="text-white h-4 w-full pl-4 mt-4 mb-2 text-2xl cursor-default"
                  itemProp="creator"
                >
                  {this.props.reel.username}
                </h2>
                <hr className="reelInfo__hr" />
                {this.props.reel.editMode ? (
                  <textarea
                    maxLength="330"
                    ref="description"
                    name="descriptionField"
                    defaultValue={this.props.reel.description}
                    className="p-4 leading-normal bg-transparent text-md w-full mx-2 h-250 w-full cursor-pointer text-left text-white mb-2 border border-semi-transparent active:border-green-dark hover:border-green-dark"
                    itemProp="description"
                  />
                ) : (
                  <textarea
                    disabled
                    ref="description"
                    name="descriptionField"
                    readOnly
                    maxLength="330"
                    defaultValue={
                      this.props.reel.description // </p> //   {this.props.reel.description} // <p className="px-4 leading-normal h-64 text-lg">
                    }
                    itemProp="description"
                    className="px-4 leading-normal bg-transparent text-lg w-full ml-3 h-325 w-full text-left text-white mb-2"
                  />
                )}
                <hr className="reelInfo__hr" />
                <ul className="list-reset pt-8 mx-2 w-full leading-loose">
                  <li className="flex justify-end">
                    {this.props.reel.editMode ? (
                      <input
                        aria-label="Instagram Url"
                        ref="ig"
                        className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full  w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
                        id="instagram"
                        name="instagram"
                        placeholder={
                          this.props.reel.ig != null
                            ? this.props.reel.ig
                            : "www.instagram.com"
                        }
                      />
                    ) : (
                      <a
                        className="text-white hover:text-teal h-8"
                        target="_blank"
                        href={
                          this.props.reel.ig != null
                            ? this.props.reel.ig.indexOf("http") == -1
                              ? `http://${this.props.reel.ig}`
                              : this.props.reel.ig
                            : "https://www.instagram.com"
                        }
                      >
                        Instagram{" "}
                        <FontAwesomeIcon icon="instagram" className="ml-2" />
                      </a>
                    )}
                  </li>
                  <li className="flex justify-end">
                    {this.props.reel.editMode ? (
                      <input
                        aria-label="Facebook Url"
                        ref="fb"
                        name="facebook"
                        id="facebook"
                        className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
                        placeholder={
                          this.props.reel.fb != null
                            ? this.props.reel.fb
                            : "www.facebook.com"
                        }
                      />
                    ) : (
                      <a
                        className="text-white hover:text-teal h-8"
                        target="_blank"
                        href={
                          this.props.reel.fb != null
                            ? this.props.reel.fb.indexOf("http") == -1
                              ? `http://${this.props.reel.fb}`
                              : this.props.reel.fb
                            : "https://www.facebook.com"
                        }
                      >
                        Facebook{" "}
                        <FontAwesomeIcon
                          icon="facebook-square"
                          className="ml-2"
                        />
                      </a>
                    )}
                  </li>
                  <li className="flex justify-end">
                    {this.props.reel.editMode ? (
                      <input
                        aria-label="Twitter Url"
                        ref="tw"
                        name="twitter"
                        id="twitter"
                        className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full  w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
                        placeholder={
                          this.props.reel.tw != null
                            ? this.props.reel.tw
                            : "www.twitter.com"
                        }
                      />
                    ) : (
                      <a
                        className="text-white hover:text-teal h-8"
                        target="_blank"
                        href={
                          this.props.reel.tw != null
                            ? this.props.reel.tw.indexOf("http") == -1
                              ? `http://${this.props.reel.tw}`
                              : this.props.reel.tw
                            : "https://www.twitter.com"
                        }
                      >
                        Twitter{" "}
                        <FontAwesomeIcon icon="twitter" className="ml-2" />
                      </a>
                    )}
                  </li>
                </ul>
                {!this.props.reel.editMode &&
                this.props.user.currentUser != null &&
                this.props.user.currentUser.username ==
                  this.props.reel.username ? (
                  <button
                    alt="Edit Reel"
                    aria-label="Edit Reel"
                    onClick={() => {
                      this.props.toggleEditMode();
                    }}
                    className="w-64 h-10 mt-6 bg-transparent mx-auto  cursor-pointer z-40 hover:text-teal text-white text-lg"
                  >
                    Edit
                  </button>
                ) : null}
                <div className="w-64 justify-center h-10 mx-auto mt-6 bg-transparent cursor-pointer z-40">
                  {this.props.reel.editMode ? (
                    <button
                      alt="Save Reel"
                      aria-label="Save Reel"
                      onClick={() => {
                        let feature_path =
                          this.props.reel.featurePath != null
                            ? this.props.reel.featurePath.includes("/video")
                              ? undefined
                              : this.props.reel.featurePath
                            : undefined;
                        if (this.props.reel.deleteVideos != []) {
                          this.props.reel.deleteVideos.forEach(path => {
                            if (this.props.reel.featurePath == path) {
                              feature_path = null;
                            }
                            this.props.destroyVideo(path);
                            this.props.reel.videos = this.props.reel.videos.filter(
                              obj => {
                                return obj.path != path;
                              }
                            );
                          });
                        }

                        let input = {
                          description: this.refs.description.value,
                          avatar: this.props.reel.avatar,
                          ig_url:
                            this.refs.ig.value != ""
                              ? this.refs.ig.value
                              : undefined,
                          tw_url:
                            this.refs.tw.value != ""
                              ? this.refs.tw.value
                              : undefined,
                          fb_url:
                            this.refs.fb.value != ""
                              ? this.refs.fb.value
                              : undefined,
                          feature_path: feature_path,
                          has_avatar: this.props.reel.avatarChanged
                            ? true
                            : undefined
                        };
                        this.props.updateUser(
                          this.props.user.currentUser,
                          input
                        );
                        this.props.updateReel(input);
                        this.props.toggleEditMode();
                        this.props.toggleChooseFeaturedVideo(false);
                        this.props.toggleDeleteVideoMode(false);
                      }}
                      className="w-28 h-full bg-green-dark cursor-pointer z-40 hover:bg-teal hover:bg-white hover:text-black hover:border-white text-white text-lg"
                    >
                      Save
                    </button>
                  ) : null}
                  {this.props.reel.editMode ? (
                    <button
                      alt="Cancel Edit"
                      aria-label="Cancel Edit"
                      onClick={() => {
                        this.props.toggleEditMode();
                        this.props.toggleChooseFeaturedVideo(false);
                        this.props.chooseFeaturedVideoHandler(null);
                        this.props.toggleDeleteVideoMode(false);
                        this.props.clearDeleteVideos();
                      }}
                      className="w-28 h-full ml-8 bg-transparent cursor-pointer z-40  text-white text-lg"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
                {this.props.reel.editMode &&
                !this.props.reel.chooseFeaturedVideoMode ? (
                  <button
                    alt="Choose Featured Video"
                    aria-label="Choose Featured Video"
                    onClick={() => {
                      this.props.toggleChooseFeaturedVideo(
                        !this.props.reel.chooseFeaturedVideoMode
                      );
                      this.refs.reel.scrollTop = window.innerWidth - 350;
                      this.props.toggleDeleteVideoMode(false);
                    }}
                    className="w-64 h-10 bg-transparent hover:text-teal text-white mx-auto mt-4"
                  >
                    Choose Featured Video
                  </button>
                ) : null}
                {this.props.reel.editMode &&
                !this.props.reel.deleteVideoMode ? (
                  <button
                    alt="Delete Videos"
                    aria-label="Delete Videos"
                    onClick={() => {
                      this.props.toggleDeleteVideoMode(
                        !this.props.reel.deleteVideoMode
                      );
                      this.refs.reel.scrollTop = window.innerWidth - 350;
                      this.props.toggleChooseFeaturedVideo(false);
                    }}
                    className="w-64 h-10 bg-transparent hover:text-red text-white mx-auto mt-4"
                  >
                    Choose Videos to Delete
                  </button>
                ) : null}
              </div>
              {this.content()}
            </div>
            {/* {this.mapScreens()} */}
          </div>
        </div>
        <MobileReel
          formatNumber={this.props.formatNumber}
          populateVideos={this.populateVideos}
          {...this.props}
        />
      </div>
    ) : (
      <div className="fixed loader loader-leaves" />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleReelScroll: (scale, left) =>
      dispatch(actions.handleReelScroll(scale, left)),
    fetchUserVideos: (id, cursor, limit, hasAccess) =>
      dispatch(actions.fetchUserVideos(id, cursor, limit, hasAccess)),
    queueVideo: videoID => {
      dispatch(actions.movePlayer("lg"));
      dispatch(actions.queueVideo(videoID));
    },
    toggleEditMode: () => {
      dispatch(actions.toggleEditMode());
    },
    toggleChooseFeaturedVideo: bool => {
      dispatch(actions.toggleChooseFeaturedVideo(bool));
    },
    chooseFeaturedVideoHandler: path => {
      dispatch(actions.chooseFeaturedVideoHandler(path));
    },
    toggleDeleteVideoMode: bool =>
      dispatch(actions.toggleDeleteVideoMode(bool)),
    chooseDeleteVideoHandler: videoID =>
      dispatch(actions.chooseDeleteVideoHandler(videoID)),
    clearDeleteVideos: () => dispatch(actions.clearDeleteVideos()),
    cleanReel: () => dispatch(actions.cleanReel()),
    updateReel: input => dispatch(actions.updateReel(input)),
    setItemPerScreen: value => dispatch(actions.setItemPerScreen(value)),
    updateUser: (user, input) => dispatch(actions.updateUser(user, input))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Reel);
