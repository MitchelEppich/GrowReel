let disableBtn = props => {
  let _video = props.video.currentVideo;

  return (
    <button
      alt="Disable Video"
      aria-label="Disable Video"
      className={`${
        _video.disable ? "bg-green-dark" : "bg-black"
      } sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-0 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3 mr-2`}
      type="button"
      onClick={() => {
        let newDisable = !_video.disable;
        if (props.reel.active) {
          for (let _ of props.reel.videos) {
            if (_._id == _video._id) {
              _.disable = newDisable;
              _.feature = false;
              _.state = 0;
            }
          }
        }

        props.updateVideo(_video, {
          disable: !_video.disable,
          feature: false,
          state: 0
        });
      }}
    >
      {_video.disable ? "Enable" : "Disable"}
    </button>
  );
};

export default disableBtn;
