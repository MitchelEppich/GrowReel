import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

let thumbnailPreview = props => {
  let _thumbnail = props.video.thumbnail;

  return (
    <div className="w-3/5">
      <p className="p-4 m-2">
        {!_thumbnail
          ? "Choose your thumbnail by scanning through the video."
          : null}
      </p>
      <div
        onClick={() => {
          props.setThumbnail(null);
        }}
      >
        <img className="border sm:w-200 w-350" src={_thumbnail} />
        {_thumbnail != null ? (
          <FontAwesomeIcon
            icon={faTimes}
            className="fa-lg absolute"
            style={{ marginLeft: "-23px", marginTop: "5px" }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default thumbnailPreview;
