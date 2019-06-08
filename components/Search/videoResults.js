import ShowMore from "../Utilities/ShowMore";
import VideoThumbnail from "../Videos/VideoThumbnail";

const videoResults = props => {
  let videosMapped = {};
  if (props.videos[0] != null) {
    const results = props.videos;
    videosMapped = results.map((number, index) => {
      return (
        <VideoThumbnail
          key={index}
          video={number}
          queueVideo={props.queueVideo}
          formatNumber={props.formatNumber}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
        />
      );
    });

    if (videosMapped.length != 0 && videosMapped.length % 12 == 0) {
      videosMapped.push(
        <ShowMore
          icon
          key="showmore"
          onClick={() => {
            props.fetchSearch(
              props.searchKey,
              12,
              {
                sort: props.sort,
                length: props.length,
                target: props.target,
                postedOn: props.postedOn
              },
              videosMapped.length
            );
          }}
          style={{
            width: "210px",
            height: "193px",
            display: "inline-block",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          }}
        />
      );
    }
  }

  return videosMapped[0] != null ? (
    <div
      style={{
        display: "inline-block"
      }}
      className="w-full h-full mt-8 overflow-y-auto "
    >
      <div className="p-1 pin-r w-full absolute bg-almost-black text-white fixed text-xs text-right justify-end z-50 pr-3 mt-2">
        Videos Found: {videosMapped.length}
      </div>
      <div className="w-full flex flex-wrap justify-start mt-8">
        {videosMapped}
      </div>
    </div>
  ) : (
    <div className="w-full absolute h-100">
      <h4 className="mx-auto p-5 font-bold text-center mt-12 text-white">
        No results!
      </h4>
    </div>
  );
};

export default videoResults;
