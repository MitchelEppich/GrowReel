/***************************/
/*camera icon/link to the
video uploader
/***************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const uploadButton = props => {
  return props.currentUser !== null ? (
    <button
      alt="Uploader"
      aria-label="Uploader"
      onMouseEnter={props.toggleUploader}
      className={
        props.showUploader
          ? "bg-white h-8 w-16 mr-1 md:w-12 text-black sm:hidden"
          : "h-8 w-16 mr-1 md:w-12 text-white sm:hidden"
      }
    >
      <p>
        <span>
          <FontAwesomeIcon icon="video" />
        </span>
      </p>
    </button>
  ) : (
    <button
      alt="Uploader Error"
      aria-label="Uploader Error"
      onClick={props.toggleAuthError}
      className="h-8 w-16 mr-1 md:w-12 text-white sm:hidden"
    >
      <p>
        <span>
          <FontAwesomeIcon icon="video" />
        </span>
      </p>
    </button>
  );
};

export default uploadButton;
