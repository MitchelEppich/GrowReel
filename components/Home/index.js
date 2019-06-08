/***************************/
/*black canvas for rendering
groups of video sections. The
video carousel is rendered
here on the homepage.
/***************************/

import Heading from "./Heading";
import VideoCarousel from "../Videos/VideoCarousel";
import VisibilitySensor from "react-visibility-sensor";

const Home = props => {
  let interval = null;
  let slidesToShow = Math.floor(window.innerWidth / 210 - 1.5);
  if (slidesToShow < 1) {
    slidesToShow = 1;
  }

  return (
    <VisibilitySensor
      onChange={isVisible => {
        if (interval) return;
        interval = setInterval(
          isVisible => {
            if (isVisible) {
              props.fetchList(props.videoList.key);
            }
          },
          3600000, // 1 hour
          isVisible
        );
      }}
    >
      <div
        className={
          props.videoList.key == "featured"
            ? "mt-10 z-10 relative w-full h-325 bg-black shadow-customDivs"
            : "z-10 relative w-full h-325 bg-black shadow-customDivs"
        }
        id={props.videoList.href}
      >
        <Heading
          title={props.videoList.key.replace(/^\w/, c => c.toUpperCase())}
        />
        <VideoCarousel
          videos={props.videoList.videos}
          queueVideo={props.queueVideo}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
          slidesToShow={slidesToShow}
          cellSpacing={0}
          formatNumber={props.formatNumber}
          slideIndex={props.slideIndex}
          {...props}
        />
      </div>
    </VisibilitySensor>
  );
};

export default Home;
