import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NoVideo = props => {
  return (
    <div>
      <div className="w-full flex-1 h-screen content-center text-center">
        <FontAwesomeIcon
          icon="exclamation-circle"
          className="img-error fa-10x sm:fa-5x"
        />
        <h1 className="mt-10 title-message">Video not found!</h1>
        <h3 className="mt-2 subtitle-message">
          The video you are trying to watch is unavailable.
        </h3>
      </div>
    </div>
  );
};

export default NoVideo;
