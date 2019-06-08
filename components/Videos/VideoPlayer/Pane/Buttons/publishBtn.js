let publishBtn = props => {
  let _video = props.video.currentVideo;

  return (
    <button
      alt="Toggle Publish Video"
      aria-label="Toggle Publish Video"
      className={`${_video.state == 1 ? "bg-blue" : "bg-blue"} ${
        _video.disable ? "pointer-events-none opacity-50 unselectable" : ""
      } sm:h-8 sm:w-full sm:py-1 sm:mt-1 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3 mr-2`}
      type="button"
      onClick={() => {
        if (_video.disable) return;
        let newState = _video.state == 1 ? 0 : 1;
        if (props.reel.active) {
          for (let _ of props.reel.videos) {
            if (_._id == _video._id) {
              _.state = newState;
            }
          }
        }
        props.updateVideo(_video, {
          state: newState
        });
      }}
    >
      {_video.state == 1 ? "Unpublish" : "Publish"}
    </button>
  );
};

export default publishBtn;
