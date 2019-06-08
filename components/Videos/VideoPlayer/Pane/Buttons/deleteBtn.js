let deleteBtn = props => {
  let _video = props.video.currentVideo;

  return (
    <div className="sm:text-sm sm:mt-2 sm:w-full">
      <button
        alt="Delete Video"
        aria-label="Delete Video"
        className="bg-red sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-0 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3 mr-2"
        type="button"
        onClick={() => {
          props.destroyVideo(_video.path);
          props.destroyPlayer();
        }}
      >
        Delete Video
      </button>
    </div>
  );
};

export default deleteBtn;
