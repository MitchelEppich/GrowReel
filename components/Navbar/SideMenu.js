/***************************/
/*Side menu, shown upon
hovering over bars in the
top left corner. 
/***************************/

import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCannabis,
  faCog,
  faFilm,
  faCircle,
  faUser,
  faVideo,
  faQuestion,
  faSignInAlt,
  faSignOutAlt,
  faBug,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faCannabis,
  faCog,
  faFilm,
  faCircle,
  faUser,
  faVideo,
  faQuestion,
  faSignInAlt,
  faSignOutAlt,
  faBug
);

const sideMenu = props => {
  let links = props.list.lists
    ? props.list.lists.map(list => {
        if (list.videos.length == 0) return null;
        return (
          <li key={list.key}>
            <a
              onClick={() => props.closeAllHandler()}
              className="text-white no-underline hover:text-teal"
              href={"#" + list.href}
            >
              {/* <i className={`${list.icon} mr-4`} /> */}
              <FontAwesomeIcon icon={list.icon} className="mr-4" />
              {list.key.replace(/^\w/, c => c.toUpperCase())}
            </a>
          </li>
        );
      })
    : [];
  // let history = [];
  let history = props.history.map(element => {
    if (!element.video) return null;
    return (
      <li key={element._id}>
        <Link href={`/watch/${element.video._id}`}>
          <a
            className="text-white no-underline hover:text-teal"
            onClick={() => props.queueVideo(element.video)}
          >
            <FontAwesomeIcon icon={faFilm} className="mr-4" />
            {element.video.title
              ? element.video.title.substring(0, 22)
              : "NO TITLE"}
            {element.video.title && element.video.title.length > 22
              ? "..."
              : ""}
          </a>
        </Link>
      </li>
    );
  });
  let subs = props.subs
    ? props.subs.map(user => {
        return (
          <li key={user._id}>
            <a
              className="text-white no-underline hover:text-teal"
              href={"/r/" + user.username}
            >
              <FontAwesomeIcon icon={faUser} className="mr-4" />
              {user.username}
            </a>
          </li>
        );
      })
    : null;

  return (
    <div
      style={{
        transform: props.userSideMenu.showSideMenu
          ? "translateX(0)"
          : "translateX(-100vh)",
        WebkitTransform: props.userSideMenu.showSideMenu
          ? "translateX(0)"
          : "translateX(-100vh)",
        OTransform: props.userSideMenu.showSideMenu
          ? "translateX(0)"
          : "translateX(-100vh)",
        MozTransform: props.userSideMenu.showSideMenu
          ? "translateX(0)"
          : "translateX(-100vh)",
        MsTransform: props.userSideMenu.showSideMenu
          ? "translateX(0)"
          : "translateX(-100vh)"
      }} // onMouseLeave={props.closeAllHandler} // Too many issues with these, need a better solution if we want this
      // onClick={() => {
      //   props.toggleSideMenuHandler(true);
      // }}
      className="sideMenu z-50 text-lg leading-loose w-sideMenu sm:bg-semi-transparent bg-semi-transparent absolute lg:mt-nlg xl:mt-nlg xxl:mt-nlg md:mt-nlg sm:mt-nmd"
    >
      <div className="w-full h-full">
        <ul className="w-full list-reset sm:pb-0 sm:pt-2 md:pb-0 md:pt-2 pt-4 pl-8 pb-4">
          {props.currentUser != null || props.reelActive ? (
            <Link href={"/"}>
              <li
                onClick={() => {
                  if (!props.reelActive) {
                    props.fetchReel(props.currentUser.username);
                    props.movePlayer("bl");
                  }
                  props.toggleReel(!props.reelActive);
                }}
                className=""
              >
                <a className="text-white no-underline hover:text-teal cursor-pointer">
                  <FontAwesomeIcon icon={faFilm} className="mr-4" />
                  {props.reelActive ? "Close Reel" : "Reel"}
                </a>
              </li>
            </Link>
          ) : null}
          {/*</ul> <Link href={"/"}>
        //   <li 
        //     onClick={
        //       props.currentUser != null
        //         ? props.toggleUploader
        //         : props.toggleAuthError
        //     }
        //     className="lg:hidden"
        //   >
        //     <a className="text-white no-underline hover:text-teal cursor-pointer">
        //     <i className="blinking text-red-dark mr-4 fas fa-circle" />
        //       We Are Live!
        //     </a>
        //   </li>
        // </Link> */}
          <Link href={"/"}>
            <li
              onClick={
                props.currentUser != null
                  ? props.toggleUploader
                  : props.toggleAuthError
              }
              className=""
            >
              <a className="text-white no-underline hover:text-teal cursor-pointer">
                <FontAwesomeIcon icon={faVideo} className="mr-4" />
                Upload Video
              </a>
            </li>
          </Link>
        </ul>
        <hr className="w-4/5 mx-auto hr" />
        <ul className="w-full list-reset sm:pb-0 sm:pt-2 md:pb-0 pl-8 pb-4">
          {links}
        </ul>
        {props.currentUser ? (
          <div>
            {props.history.length != 0 ? (
              <div>
                <hr className="w-4/5 mx-auto hr" />
                <h5 className="text-white pl-8 pt-2 text-xl sm:text-lg md:text-lg">
                  Recently Viewed
                </h5>
                <ul className="w-full list-reset sm:pb-0 sm:pt-2 md:pb-0 pl-8 pb-4">
                  {history}
                </ul>
              </div>
            ) : null}
            {props.subs.length != 0 ? (
              <div>
                <hr className="w-4/5 mx-auto hr" />
                <h5 className="text-white pl-8 pt-2 text-xl sm:text-lg md:text-lg">
                  Subscriptions
                </h5>
                <ul className="w-full list-reset pl-8 pb-4">{subs}</ul>
              </div>
            ) : null}
          </div>
        ) : null}
        <hr className="w-4/5 mx-auto hr" />
        <ul className="w-full list-reset pl-8 pb-4 md:pb-32 sm:pb-32">
          <li>
            <Link href="/" as="../settings">
              <span
                className="cursor-pointer text-white no-underline hover:text-teal"
                onClick={props.showSettings}
              >
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                Settings
              </span>
            </Link>
          </li>
          {props.currentUser != null ? (
            <li>
              <span
                className="cursor-pointer text-white no-underline hover:text-teal"
                onClick={() => {
                  props
                    .userMessages({ username: props.currentUser.username })
                    .then(res => {
                      {
                        props.toggleShowMessageScreen();
                      }
                    });
                }}
                alt="Notifications"
                aria-label="Notifications"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3" />
                Notifications
              </span>
            </li>
          ) : null}
          <li>
            <span
              className="cursor-pointer text-white no-underline hover:text-teal"
              onClick={() => {
                props.showReport();
                props.setReportType("bug");
              }}
              alt="Report Bug"
              aria-label="Report Bug"
            >
              <FontAwesomeIcon icon={faBug} className="mr-3" />
              Report
            </span>
          </li>
          <li>
            <Link href="/" as="../help">
              <span
                className="cursor-pointer text-white no-underline hover:text-teal"
                onClick={props.showHelp}
              >
                <FontAwesomeIcon icon={faQuestion} className="mr-4" />
                Help
              </span>
            </Link>
          </li>
          {props.currentUser != null ? (
            <Link href={"/"}>
              <li className="" onClick={props.logOutHandler}>
                <a className="text-white no-underline hover:text-teal cursor-pointer">
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                  Logout
                </a>
              </li>
            </Link>
          ) : (
            <Link href={"/"}>
              <li className="" onClick={props.showAuth}>
                <a className="text-white no-underline hover:text-teal cursor-pointer">
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-3" />
                  Login or Register
                </a>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default sideMenu;
