let matureToggle = props => {
  let _video = props.video.currentVideo;
  return (
    <div className="w-full">
      <hr className="hr mb-8" />
      <span className="text-lg">
        This video contains mature content:
        <input
          className="ml-3 checkbox-mature"
          type="checkbox"
          name="matureContent"
          alt="Mature Content Toggle"
          aria-label="Mature Content Toggle"
          defaultChecked={_video.mature}
        />
      </span>
    </div>
  );
};

export default matureToggle;
