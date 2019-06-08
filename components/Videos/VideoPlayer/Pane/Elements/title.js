let titleEditor = props => {
  let _video = props.video.currentVideo;
  return (
    <div>
      <input
        aria-label="Video Title"
        id="videoTitle"
        name="videoTitle"
        className="h-12 mt-2 w-full text-lg text-almost-white border cursor-pointer border-semi-transparent hover:border-green-dark hover:cursor-pointer text-left bg-transparent p-2"
        defaultValue={_video.title}
      />
    </div>
  );
};

export default titleEditor;
