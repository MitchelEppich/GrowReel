
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const liveButton = props => {
  return (
    <button
      className="h-8 w-liveButton mr-1 text-white sm:hidden"
      alt="GrowReel Livestream"
      aria-label="GrowReel Livestream"
      onClick={() => {
        props.fetchVideo("000000000000000000000000");
      }}
    >
      <p>
        <span className="w-full">
          <FontAwesomeIcon
            icon="circle"
            className="blinking text-red-dark mx-2"
          />
          We are Live
        </span>
      </p>
    </button>
  );
};

export default liveButton;
