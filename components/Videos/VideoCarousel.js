/**************************/
/*Video carousel for homepage
 rows.*/
/**************************/
import VideoThumbnail from "./VideoThumbnail";
import Carousel from "../Utilities/nuka-carousel";
import ShowMore from "../Utilities/ShowMore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const videoCarousel = props => {
  const plxsMapped = props.videos.slice(0).map((number, index) => {
    return (
      <div key={index}>
        <VideoThumbnail
          white={props.white}
          queueVideo={props.queueVideo}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
          video={number}
          formatNumber={props.formatNumber}
        />
      </div>
    );
  });
  return (
    <div className="w-full h-64 mt-8">
      <div className="flex mx-auto w-5/6">
        <div className="h-full w-full flex sm:text-center">
          <Carousel
            slideIndex={props.slideIndex}
            afterSlide={slideIndex =>
              props.setListSlideIndex(props.videoList, slideIndex)
            }
            disableKeyboardControls={true}
            initialSlideHeight={props.cellHeight}
            cellSpacing={0}
            slidesToShow={props.slidesToShow}
            slidesToScroll={props.slidesToShow}
            renderCenterRightControls={({ nextSlide }) => (
              <div onClick={nextSlide}>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-5xl text-semi-transparent hover:text-white text-center w-1/16 my-auto"
                />
              </div>
            )}
            renderCenterLeftControls={({ previousSlide }) => (
              <div onClick={previousSlide}>
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-5xl text-semi-transparent hover:text-white text-center w-1/16 my-auto"
                />
              </div>
            )}
            renderBottomCenterControls={() => false}
            renderTopCenterControls={() => false}
          >
            {plxsMapped}
            {props.videoList.videos.length % props.videoList.minLimit == 0 ? (
              <ShowMore
                key="showmore"
                {...this.props}
                icon
                onClick={() => {
                  props.fetchVideoList(
                    props.videoList,
                    props.videoList.videos.length,
                    props.videoList.minLimit
                  );
                }}
                className="cursor-pointer video-link my-2 mx-auto  bg-semi-transparent w-full m-auto hover:text-teal my-2 pb-4"
              />
            ) : null}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default videoCarousel;
