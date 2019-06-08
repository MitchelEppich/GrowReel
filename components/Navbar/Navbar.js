/***************************/
/*Main navbar component that
imports all sub components 
/***************************/

import SideMenu from "./SideMenu";
import SearchBar from "./SearchBar";
import UserReelButton from "./UserReelButton";
import UploadButton from "./UploadButton";
import NotificationButton from "./NotificationButton";
import AuthButton from "./AuthButton";
import BugButton from "./BugButton";
import Bars from "./Bars";
import LiveButton from "./LiveButton";

const navBar = props => {
  return (
    <div
      className={
        "w-full bg-black pin-t text-transparent flex flex-wrap items-center justify-between fixed z-nav py-1 lg:h-navbar sm:h-navbarMobile" // onClick={() => props.movePlayer("bl")}
      }
    >
      <div className="sm:w-full mx-auto lg:flex-1 xl:flex-1 xl:w-3/5 xxl:flex-1 xxl:w-2/3 xxxl:flex-1 xxxl:w-3/4 lg:w-70p md:w-2/3 md:flex-1 flex flex-wrap">
        <SideMenu
          {...props}
          list={props.list}
          userSideMenu={props.userSideMenu}
          subs={props.currentUser ? props.currentUser.subscriptions : []}
          history={props.currentUser ? props.currentUser.history : []}
          queueVideo={props.queueVideo}
          isMobile={props.isMobile}
        />
        <Bars
          close={props.closeAllHandler}
          showSideMenu={props.showSideMenu}
          toggleSideMenuHandler={props.toggleSideMenuHandler}
        />
        <div>
          <a href="/">
            <img
              className="w-250"
              alt="GrowReel Logo"
              src="../static/images/GrowReelLogoHorizontal.png"
            />
          </a>
        </div>
        <SearchBar
          close={props.closeAllHandler}
          showSearch={props.showSearch}
          searchVideos={props.searchVideos}
          fetchSearch={props.fetchSearch}
          queueVideo={props.queueVideo}
          isMobile={props.isMobile}
          formatNumber={props.formatNumber}
          toggleFiltersMenu={props.toggleFiltersMenu}
          showFiltersMenu={props.showFiltersMenu}
          toggleSearch={props.toggleSearch}
          setFilter={props.setFilter}
          sort={props.sort}
          length={props.length}
          target={props.target}
          postedOn={props.postedOn}
          setSearchKey={props.setSearchKey}
          searchKey={props.searchKey}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
        />
      </div>
      <div className="inline-block lg:w-300 lg:pl-4 xl:w-2/5 xxl:w-1/3 xxxl:w-1/4 md:w-1/6  text-right h-navbar pt-3">
        <UserReelButton {...props} />
        {/* <LiveButton {...props} /> */}
        <BugButton {...props} />
        <NotificationButton
          toggleUploader={props.toggleUploader}
          toggleAuthError={props.toggleAuthError}
          currentUser={props.currentUser}
          showUploader={props.showUploader}
          {...props}
        />
        <UploadButton
          toggleUploader={props.toggleUploader}
          toggleAuthError={props.toggleAuthError}
          currentUser={props.currentUser}
          showUploader={props.showUploader}
        />

        <AuthButton
          {...props}
          showAuth={props.showAuth}
          logOutHandler={props.logOutHandler}
          currentUser={props.currentUser}
        />
      </div>
    </div>
  );
};

export default navBar;
