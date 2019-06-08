/*******************************************/
/*Main page, Renders all home videos*/
/******************************************/

import React, { Component } from "react";
import AdBar from "../components/Home/AdBar";
import Home from "../components/Home";
import withData from "../lib/withData";
import { connect } from "react-redux";
import actions from "../store/actions";
import Layout from "../HOC/Layout";
import { Offline, Online } from "react-detect-offline";
import _Offline from "../components/Offline";
import _NotSupported from "../components/NotSupported";
import registerServiceWorker from "../registerServiceWorker";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebookSquare,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faCircle,
  faBug,
  faVideo,
  faUser,
  faSignOutAlt,
  faEnvelope,
  faTimes,
  faCheck,
  faPenAlt,
  faTrashAlt,
  faArrowUp,
  faEdit,
  faArrowDown,
  faFlag,
  faShareAlt,
  faCode,
  faPlus,
  faMinus,
  faStar,
  faExclamationCircle,
  faAngleLeft,
  faAngleRight,
  faAngleDown,
  faCaretDown,
  faSlidersH,
  faCameraRetro,
  faEye,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faCircle,
  faBug,
  faVideo,
  faUser,
  faSignOutAlt,
  faEnvelope,
  faTimes,
  faCheck,
  faPenAlt,
  faTrashAlt,
  faArrowUp,
  faEdit,
  faArrowDown,
  faAngleDown,
  faFlag,
  faShareAlt,
  faCode,
  faPlus,
  faMinus,
  faStar,
  faExclamationCircle,
  faAngleLeft,
  faAngleRight,
  faCaretDown,
  faSlidersH,
  faCameraRetro,
  faEye,
  faThumbsUp,
  faFacebookSquare,
  faInstagram,
  faTwitter
);

class Index extends Component {
  componentDidMount() {
    registerServiceWorker();

    let offsetAnchor = () => {
      if (location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 50);
      }
    };
    window.addEventListener("hashchange", offsetAnchor);
    window.setTimeout(offsetAnchor, 1);

    window.addEventListener("resize", () => {
      let breakpoints = [
        0,
        515,
        776,
        1030,
        1280,
        1350,
        1530,
        1780,
        1920,
        2268,
        2300,
        2400,
        2750,
        3840
      ];

      for (let i = 0; i < breakpoints.length - 1; i++) {
        if (
          window.innerWidth > breakpoints[i] &&
          window.innerWidth <= breakpoints[i + 1] &&
          this.props.misc.currentMediaSize != breakpoints[i + 1]
        ) {
          this.props.setMediaSize(breakpoints[i + 1]);
        }
      }
    });

    let body = document.querySelector("#body");
    body.addEventListener("scroll", () => {
      if (
        body.scrollHeight - 100 > body.scrollTop + body.clientHeight &&
        !this.props.list.listUpdating
      ) {
        this.props.toggleUpdatingStatus(true);
        this.props.buildList(this.props.global.usedKeys);
      }
    });
  }

  renderBackground = () => {
    return this.props.list.lists.map((list, index) => {
      if (list.videos.length == 0) return;
      return (
        <div
          className={this.props.isMobile ? "z-0 pt-4" : "z-0"}
          key={list.key}
        >
          <Home
            formatNumber={this.formatNumber}
            index={index}
            videoList={list}
            fetchList={this.props.fetchList}
            queueVideo={this.props.queueVideo}
            fetchReel={this.props.fetchReel}
            toggleReel={this.props.toggleReel}
            isMobile={this.props.isMobile}
            fetchVideoList={this.props.fetchVideoList}
            slideIndex={list.slideIndex || 0}
            setListSlideIndex={this.props.setListSlideIndex}
          />
          <AdBar url={list.url} index={index} isMobile={this.props.isMobile} />
        </div>
      );
    });
  };

  formatNumber = value => {
    let fvalue;
    if (value >= 1000000000) {
      fvalue = Math.trunc(value / 1000000000) + "B";
    } else if (value >= 1000000) {
      fvalue = Math.trunc(value / 1000000) + "M";
    } else if (value >= 1000) {
      fvalue = Math.trunc(value / 1000) + "K";
    } else {
      fvalue = value;
    }
    return fvalue;
  };

  fixedScreen = () => {
    let bodyStyle = "";
    if (!this.props.isMobile) {
      bodyStyle += "sm:pt-24 pt-16";
      if (
        this.props.reel.active ||
        (this.props.video.currentVideo &&
          this.props.video.videoPlayerPosition == "lg")
      ) {
        bodyStyle += " h-screen overflow-hidden";
      }
    }
    if (this.props.isMobile) {
      bodyStyle += " pt-20";
      if (
        this.props.misc.showScreen ||
        this.props.reel.active ||
        (this.props.video.currentVideo &&
          this.props.video.videoPlayerPosition == "lg")
      ) {
        bodyStyle += " h-screen overflow-hidden";
      }
    }
    return bodyStyle;
  };

  render() {
    return (
      <div>
        <Offline>
          <_Offline />
        </Offline>
        <Online>
          {this.props.supportedBrowser ? (
            <Layout {...this.props} formatNumber={this.formatNumber}>
              {this.props.list.lists.length > 0 ? (
                <div
                  onClick={() => {
                    this.props.uploader.showUploader
                      ? this.props.closeUploader(false)
                      : null;
                  }}
                  className={this.fixedScreen()}
                >
                  {this.renderBackground()}
                </div>
              ) : (
                <div className="fixed loader loader-leaves" />
                // <div className="fixed lds-default">
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                //   <div />
                // </div>
              )}
            </Layout>
          ) : (
            <_NotSupported />
          )}
        </Online>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    queueVideo: videoID => {
      dispatch(actions.movePlayer("lg"));
      dispatch(actions.queueVideo(videoID));
    },
    setVideoDim: input => dispatch(actions.setVideoDim(input)),
    movePlayer: position => dispatch(actions.movePlayer(position)),
    fetchReel: username => dispatch(actions.fetchReel(username)),
    toggleReel: reelBool => {
      dispatch(actions.closeAll());
      dispatch(actions.toggleReel(reelBool));
    },
    fetchList: key => dispatch(actions.fetchList(key)),
    fetchVideoList: (list, cursor, limit, sort, hasAccess) =>
      dispatch(actions.fetchVideoList(list, cursor, limit, sort, hasAccess)),
    closeUploader: input => dispatch(actions.toggleUploader(input)),
    setMediaSize: size => dispatch(actions.setMediaSize(size)),
    buildList: usedKeys => dispatch(actions.buildList(usedKeys)),
    toggleUpdatingStatus: value =>
      dispatch(actions.toggleUpdatingStatus(value)),
    setListSlideIndex: (list, index) =>
      dispatch(actions.setListSlideIndex(list, index))
  };
};

export default connect(
  state => state,
  mapDispatchToProps
)(withData(Index));
