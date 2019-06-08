/**************************************/
/*Our highest ordered component. This
component wraps each page. Naturally this
component has the navigation bar and the
login form.*/
/**************************************/

import "../scss/home.scss";
import "../scss/video.scss";
import "../scss/navbar.scss";
import "../scss/carousel.scss";
import "../scss/videoMinimized.scss";
import "../scss/reel.scss";
import "../scss/loader.scss";
import React, { Component } from "react";
import Router from "next/router";
import Navbar from "../components/Navbar/Navbar";
import AuthForm from "../components/AuthForm/index";
import ReportForm from "../components/ReportForm/index";
import SettingsForm from "../components/SettingsForm/index";
import HelpForm from "../components/HelpForm/index";
import PasswordReset from "../components/PasswordReset/index";
import DimScreen from "../components/DimScreen";
import VideoPlayer from "../components/Videos/VideoPlayer";
import UploadForm from "../components/UploadForm";
import Reel from "../components/Reel";
import { connect } from "react-redux";
import actions from "../store/actions";
import Video from "../components/Videos/Video";
import Messages from "../components/Messages";
import BookmarkPopup from "../components/Home/BookmarkPopup";

class Layout extends Component {
  componentDidMount() {
    // Detect 3g
    // var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
    // var type = connection.effectiveType;

    // ----------- EXAMPLES FOR MESSAGES
    // this.props.insertMessage({
    //   body: "i liek cheese",
    //   from: "GrowReel Team",
    //   to: ["5bc12320705287426856e8fa"] // ["all"] -> all users
    // });
    // this.props.removeMessage({
    //   to: ["5bc12320705287426856e8fa"],
    //   key: "20181126040132!~hts"
    // });

    this.props.fetchLists();
    let url = this.props.router.asPath.slice(1);
    if (url && url.length != 0) {
      let qr;
      if (url.includes("watch/")) {
        let rte = "watch/";
        let queryStartIndex = url.indexOf("?");
        if (queryStartIndex > -1) {
          qr = url.slice(rte.length, queryStartIndex);
        } else {
          qr = url.slice(rte.length);
        }
        if (qr) {
          this.props.fetchVideo(qr);
        }
        Router.push("/", qr);
      } else if (url.includes("r/")) {
        qr = url.slice("r/".length);
        if (qr) {
          this.props.fetchReel(qr);
          this.props.toggleReel(true);
        }
      } else if (url.includes("e/")) {
        qr = url.slice("e/".length);
        if (qr) {
          this.props.checkForEmailRequest(qr).then(res => {
            if (res) {
              this.props.showScreenHandler();
              this.props.showPasswordResetHandler();
            }
          });
        }
      } else if (url.includes("embed/")) {
        qr = url.slice("embed/".length);
        if (qr) {
          this.props.setEmbed(true);
          this.props.fetchVideo(qr);
        }
      } else if (url.includes("help")) {
        //Open help
        this.props.showHelpHandler();
      } else if (url.includes("settings")) {
        // Open settings
        this.props.showSettingsHandler();
      }
    }
    if (!url.includes("embed/")) {
      this.props.setEmbed(false);
    }
    this.props.fetchUser();
  }

  componentDidUpdate() {}

  logOutHandler = () => {
    this.props.closeAllHandler();
    this.props.destroyUser();
  };

  render() {
    if (this.props.misc.isEmbed == true) {
      let video = this.props.video.currentVideo;
      let showVideo = video ? (
        <Video
          {...this.props}
          videoObj={{
            ...video,
            url: `https://s3.amazonaws.com/media.growreel.com/${
              video.path
            }/video`
          }}
          className="w-full h-full fixed bg-black"
        />
      ) : null;

      return showVideo;
    } else if (this.props.misc.isEmbed == false) {
      return (
        <div className="sm:pt-2">
          {/* <BookmarkPopup /> */}
          <Navbar
            {...this.props}
            showAuth={this.props.showAuthHandler}
            showReport={this.props.showReportHandler}
            showSettings={this.props.showSettingsHandler}
            showHelp={this.props.showHelpHandler}
            currentUser={this.props.user.currentUser}
            closeAllHandler={this.props.closeAllHandler}
            toggleSideMenuHandler={this.props.toggleSideMenuHandler}
            showSideMenu={this.props.misc.showSideMenu}
            userSideMenu={this.props.misc}
            logOutHandler={this.logOutHandler}
            fetchSearch={this.props.fetchSearch}
            searchVideos={this.props.search.searchVideos}
            queueVideo={this.props.queueVideo}
            fetchVideo={this.props.fetchVideo}
            movePlayer={this.props.movePlayer}
            destroyPlayer={this.props.destroyPlayer}
            toggleAuthError={this.props.toggleAuthError}
            toggleUploader={this.props.toggleUploader}
            toggleReel={this.props.toggleReel}
            reelActive={this.props.reel.active}
            list={this.props.list}
            fetchReel={this.props.fetchReel}
            formatNumber={this.props.formatNumber}
            setReportType={this.props.setReportType}
            showUploader={this.props.uploader.showUploader}
            toggleFiltersMenu={this.props.toggleFiltersMenu}
            showFiltersMenu={this.props.misc.showFiltersMenu}
            toggleSearch={this.props.toggleSearch}
            showSearch={this.props.misc.showSearch}
            setFilter={this.props.setFilter}
            sort={this.props.search.sort}
            length={this.props.search.length}
            target={this.props.search.target}
            postedOn={this.props.search.postedOn}
            searchKey={this.props.search.searchKey}
            showMessageScreen={this.props.misc.showMessageScreen}
            toggleShowMessageScreen={this.props.toggleShowMessageScreen}
            showContentMessage={this.props.showContentMessage}
            toggleContentMessage={this.props.toggleContentMessage}
          />
          {this.props.misc.showAuth ? (
            <AuthForm
              authError={this.props.misc.authError}
              setUsernameError={this.props.setUsernameError}
              setEmailError={this.props.setEmailError}
              emailError={this.props.misc.emailAuthError}
              usernameError={this.props.misc.usernameAuthError}
              show={this.props.misc.showAuth}
              showRegisterAuth={this.props.misc.showRegisterAuth}
              showRegisterHandler={this.props.showRegisterHandler}
              closeAllHandler={this.props.closeAllHandler}
              login={this.props.login}
              register={this.props.register}
              forgotPassword={this.props.misc.forgotPassword}
              showForgotPasswordForm={this.props.showForgotPasswordForm}
              handleForgotPasswordSubmit={this.props.handleForgotPasswordSubmit}
            />
          ) : null}
          {this.props.misc.showReport ? <ReportForm {...this.props} /> : null}
          {this.props.misc.showHelp ? <HelpForm {...this.props} /> : null}
          {this.props.misc.showSettings ? (
            <SettingsForm {...this.props} logOutHandler={this.logOutHandler} />
          ) : null}
          {this.props.misc.showPasswordReset ? (
            <PasswordReset {...this.props} />
          ) : null}
          {this.props.misc.showMessageScreen ? (
            <Messages {...this.props} />
          ) : null}
          <DimScreen
            showAuth={this.props.misc.showAuth}
            showScreen={this.props.misc.showScreen}
            showMessageScreen={this.props.misc.showMessageScreen}
            closeAllHandler={this.props.closeAllHandler}
            authError={this.props.misc.authError}
          />
          {this.props.video.currentVideo ? (
            <VideoPlayer {...this.props} />
          ) : null}
          {this.props.uploader.showUploader ? (
            <UploadForm {...this.props} />
          ) : null}
          {this.props.reel.active ? <Reel {...this.props} /> : null}
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, cb) =>
      dispatch(actions.login(email, password, cb)),
    register: (username, email, password, cb) =>
      dispatch(actions.register(username, email, password, cb)),
    handleForgotPasswordSubmit: (event, props) =>
      dispatch(actions.handleForgotPasswordSubmit(event, props)),
    handleReportSubmit: (type, event, props) =>
      dispatch(actions.handleReportSubmit(type, event, props)),
    resetPassword: (event, props, email) => {
      dispatch(actions.resetPassword(event, props, email)),
        dispatch(actions.showScreenHandler()),
        dispatch(actions.showPasswordReset());
    },
    editMessage: input => dispatch(actions.editMessage(input)),
    newMessage: input => dispatch(actions.newMessage(input)),
    setReportType: type => {
      dispatch(actions.setReportType(type));
    },
    fetchUser: () => dispatch(actions.fetchUser()),
    setUser: user => dispatch(actions.setUser(user)),
    destroyUser: () => dispatch(actions.destroyUser()),
    toggleSideMenuHandler: input => {
      dispatch(actions.toggleSideMenu(input));
      dispatch(actions.showScreenHandler(input));
    },
    showAuthHandler: () => {
      dispatch(actions.closeAll());
      dispatch(actions.showAuth());
    },
    showReportHandler: () => {
      dispatch(actions.closeAll("all"));
      dispatch(actions.showReport());
    },
    showSettingsHandler: () => {
      dispatch(actions.closeAll());
      dispatch(actions.showSettings());
    },
    showHelpHandler: () => {
      dispatch(actions.closeAll());
      dispatch(actions.showHelp());
    },
    showScreenHandler: () => dispatch(actions.showScreenHandler()),
    showPasswordResetHandler: () => {
      dispatch(actions.closeAll());
      dispatch(actions.showPasswordReset());
      dispatch(actions.showScreenHandler(true));
    },
    getSnapshot: (video, canvas) =>
      dispatch(actions.getSnapshot(video, canvas)),
    closeAllHandler: input => {
      dispatch(actions.closeAll(input));
      dispatch(actions.toggleUploader(false));
      // dispatch(actions.movePlayer("bl"));
      dispatch(actions.toggleEditVideoMode(false));
      dispatch(actions.setThumbnail(null));
      dispatch(actions.setUsernameError(""));
      dispatch(actions.setEmailError(""));
    },
    fetchSearch: (input, limit, query, cursor) =>
      dispatch(actions.fetchSearch(input, limit, query, cursor)),
    showRegisterHandler: () => {
      dispatch(actions.setUsernameError(""));
      dispatch(actions.setEmailError(""));
      dispatch(actions.showRegister());
    },
    showForgotPasswordForm: () => {
      dispatch(actions.setUsernameError(""));
      dispatch(actions.setEmailError(""));
      dispatch(actions.showForgotPasswordForm());
    },
    postComment: (user, video, comment) =>
      dispatch(actions.postComment(user, video, comment)),
    setComment: comment => dispatch(actions.setComment(comment)),
    fetchVideo: videoID => dispatch(actions.fetchVideo(videoID)),
    queueVideo: video => {
      dispatch(actions.movePlayer("lg"));
      dispatch(actions.queueVideo(video));
      dispatch(actions.toggleSearch(false));
    },
    movePlayer: position => {
      dispatch(actions.movePlayer(position));
      dispatch(actions.toggleEditVideoMode(false));
      dispatch(actions.setThumbnail(null));
    },
    destroyPlayer: () => {
      dispatch(actions.destroyPlayer());
      dispatch(actions.toggleEditVideoMode(false));
      dispatch(actions.setThumbnail(null));
    },
    toggleAuthError: () => {
      dispatch(actions.closeAll());
      dispatch(actions.toggleAuthError());
    },
    toggleUploader: () => {
      dispatch(actions.closeAll());
      dispatch(actions.toggleUploader());
    },
    toggleShowMessageScreen: () => {
      dispatch(actions.closeAll());
      dispatch(actions.toggleShowMessageScreen());
    },
    toggleSendNotificationField: () => {
      dispatch(actions.toggleSendNotificationField());
    },
    toggleContentMessage: index => {
      dispatch(actions.toggleContentMessage(index));
    },
    expandCircle: value => dispatch(actions.expandCircle(value)),
    showControlsHandler: value => dispatch(actions.showControlsHandler(value)),
    appendView: (user, video) => dispatch(actions.appendView(user, video)),
    toggleLikeVideo: (video, user) =>
      dispatch(actions.toggleLikeVideo(video, user)),
    toggleSubscribeUser: (userID, oUserID) =>
      dispatch(actions.toggleSubscribeUser(userID, oUserID)),
    appendVoteComment: (commentID, userID, isUpvote) =>
      dispatch(actions.appendVoteComment(commentID, userID, isUpvote)),
    appendComment: (comment, video) => {
      dispatch(actions.appendComment(comment, video));
    },
    fetchUserVideos: _id => dispatch(actions.fetchUserVideos(_id)),
    toggleEditVideoMode: val => dispatch(actions.toggleEditVideoMode(val)),
    setAvatar: file => dispatch(actions.setAvatar(file)),
    submitVideoEdit: (video, user) =>
      dispatch(actions.submitVideoEdit(video, user)),
    createHistoryElement: (user, videoID) =>
      dispatch(actions.createHistoryElement(user, videoID)),
    updateVideo: (video, input) => dispatch(actions.updateVideo(video, input)),
    destroyVideo: path => dispatch(actions.destroyVideo(path)),
    setThumbnail: data => dispatch(actions.setThumbnail(data)),
    checkForEmailRequest: id => dispatch(actions.checkForEmailRequest(id)),
    deleteUser: id => dispatch(actions.deleteUser(id)),
    fetchLists: () => dispatch(actions.fetchLists()),
    setEmbed: input => dispatch(actions.setEmbed(input)),
    toggleHelpFormTab: name => dispatch(actions.toggleHelpFormTab(name)),
    updateUser: (user, input) => dispatch(actions.updateUser(user, input)),
    updateListVideo: video => dispatch(actions.updateListVideo(video)),
    setTags: tags => dispatch(actions.setTags(tags)),
    setUsernameError: error => dispatch(actions.setUsernameError(error)),
    setEmailError: error => dispatch(actions.setEmailError(error)),
    fetchComments: (video, cursor, limit) =>
      dispatch(actions.fetchComments(video, cursor, limit)),
    toggleFiltersMenu: () => dispatch(actions.toggleFiltersMenu()),
    toggleShareButtons: () => dispatch(actions.toggleShareButtons()),
    toggleSearch: input => dispatch(actions.toggleSearch(input)),
    setFilter: input => dispatch(actions.setFilter(input)),
    setSearchKey: input => dispatch(actions.setSearchKey(input)),
    deleteComment: (id, video) => dispatch(actions.deleteComment(id, video)),
    updateComment: (comment, video) =>
      dispatch(actions.updateComment(comment, video)),
    removeComment: (comment, video) =>
      dispatch(actions.removeComment(comment, video)),
    editComment: (comment, video) =>
      dispatch(actions.editComment(comment, video)),
    setCommentBody: value => dispatch(actions.setCommentBody(value)),
    setCommentEdit: value => dispatch(actions.setCommentEdit(value)),
    upsertMessage: input => dispatch(actions.upsertMessage(input)),
    userMessages: input => dispatch(actions.userMessages(input))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(Layout);
