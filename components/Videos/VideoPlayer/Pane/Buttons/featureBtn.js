let featureBtn = props => {
  let _video = props.video.currentVideo;

  return (
    <button
      alt="Feature Video"
      aria-label="Feature Video"
      className={`${
        _video.disable ? "pointer-events-none opacity-50 unselectable" : ""
      } ${
        _video.feature ? "bg-red-dark" : "bg-green-dark"
      } sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-0 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3 mr-2`}
      type="button"
      onClick={() => {
        if (_video.disable) return;
        let newFeature = !_video.feature;
        if (props.reel.active) {
          for (let _ of props.reel.videos) {
            if (_._id == _video._id) {
              _.feature = newFeature;
            }
          }
        }

        props.updateVideo(_video, {
          feature: !_video.feature
        });
      }}
    >
      {_video.feature ? "Remove Feature" : "Add Feature"}
    </button>
  );
};

export default featureBtn;
