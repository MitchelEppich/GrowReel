import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class mobileReel extends Component {
  render() {
    let videos = this.props.populateVideos(null, {
      width: "210px",
      height: "193px",
      display: "inline-block",
      justifyContent: "center",
      alignItems: "center",
      margin: "0.5rem",
      backgroundColor: "rgba(255, 255, 255, 0.15)"
    });

    return (
      <div
        className="absolute md:mt-12 sm:mt-12 mt-24 z-20 lg:hidden xl:hidden xxl:hidden xxxl:hidden w-screen min-h-screen bg-black content-around flex flex-wrap"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
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
          <meta
            id="og-image"
            property="og:image"
            content={this.props.reel.avatar}
          />
        </MetaTags>
        <video
          ref="video"
          style={{
            minWidth: "85vw",
            width: "87%",
            marginTop: "56px",
            marginLeft: "24px",
            maxHeight: "60vw",
            position: "fixed",
            zindex: "-20"
          }}
          autoPlay
          loop
          muted
          onPlay={() => {
            this.refs.thumbnailInput.click();
            this.refs.video.muted = false;
          }}
        >
          {"/static/images/GrowReelLogoGrey.png"}
          <source src={this.props.reel.featurePath} type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
        <div
          style={{
            position: "relative",
            top: "250px",
            width: "100%",
            zindex: "-20",
            background: "rgba(0, 0, 0, .5)"
          }}
        >
          <div className="w-full bg-almost-transparent flex flex-wrap p-2">
            <div className="w-full mx-4 flex">
              <div
                style={{
                  background: "url(" + this.props.reel.avatar + ")",
                  backgroundPosition: "top",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  width: "150px",
                  height: "150px"
                }}
                className="reelInfo__userImage flex sm:ml-0 md:m-0 sm:mt-0 ml-4 mt-6"
              >
                {this.props.reel.editMode ? (
                  <div
                    onClick={() => {
                      this.refs.thumbnailInput.click();
                    }}
                    className="w-full h-full bg-black text-white"
                  >
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
                          background: "url(" + this.props.reel.avatar + ")",
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
              <div className="w-2/3">
                <ul className="list-reset w-full px-4 leading-normal">
                  <li>
                    <h3 className="font-bold">{this.props.reel.username}</h3>
                  </li>
                  <li>
                    {this.props.formatNumber(this.props.reel.subscribers)}{" "}
                    {this.props.reel.subscribers == 1 ? (
                      <p className="ml-2 inline-flex"> subscriber</p>
                    ) : (
                      <p className="ml-2 inline-flex"> subscribers</p>
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
                    <FontAwesomeIcon icon="thumbs-up" className="ml-1" />
                  </li>
                </ul>
                <span
                  onClick={() => {
                    this.props.toggleReel();
                  }}
                  className="w-12 cursor-pointer text-right mr-4 mt-2 h-12 pin-r pin-t absolute "
                />
              </div>
            </div>

            {this.props.reel.editMode ? (
              <textarea
                maxLength="330"
                ref="description"
                defaultValue={this.props.reel.description}
                className="p-4 leading-normal bg-transparent text-md w-full mt-5 mx-3 h-200 text-almost-white w-full cursor-pointer text-left mb-2 border border-semi-transparent active:border-green-dark hover:border-green-dark"
                itemProp="description"
              /> // <p className="p-4 mt-4 w-full leading-normal text-lg">
            ) : (
              //   {this.props.reel.description}
              // </p>
              <textarea
                disabled
                ref="description"
                name="descriptionField"
                readOnly
                defaultValue={this.props.reel.description}
                className="leading-normal bg-transparent text-md w-full mt-5 mx-4 h-150 text-almost-white w-full text-left mb-2"
              />
            )}
            <hr className="reelInfo__hr" />
            <ul className="list-reset pt-4 mx-3 w-full sm:mx-3 leading-loose">
              <li className="flex justify-end">
                {this.props.reel.editMode ? (
                  <input
                    aria-label="Instagram Url"
                    ref="ig"
                    className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full ml-0 sm:ml-0 w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
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
                    className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full ml-0 sm:ml-0 w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
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
                    <FontAwesomeIcon icon="facebook-square" className="ml-2" />
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
                    className="h-8 bg-transparent text-right p-4 leading-normal text-md w-full ml-0 sm:ml-0 w-full cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
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
                    Twitter <FontAwesomeIcon icon="twitter" className="ml-2" />
                  </a>
                )}
              </li>
            </ul>
            {!this.props.reel.editMode &&
            this.props.user.currentUser != null &&
            this.props.user.currentUser.username == this.props.reel.username ? (
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
            <div className="w-full text-center h-10 mx-auto mt-6 bg-transparent cursor-pointer z-40">
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
                    this.props.updateUser(this.props.user.currentUser, input);
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
              <div className="w-full flex">
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
              </div>
            ) : null}
            {this.props.reel.editMode && !this.props.reel.deleteVideoMode ? (
              <div className="w-full flex">
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
                  className="w-64 h-10 bg-red hover:text-black text-white mx-auto mt-4 mb-6"
                >
                  Choose Videos to Delete
                </button>
              </div>
            ) : null}
          </div>

          <div className="bg-black pt-12">
            <div className="w-full flex flex-wrap justify-center mt-8">
              {videos}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default mobileReel;
