import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

let likeBtn = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let isLoggedIn = _user != null;

  return (
    <div>
      {props.formatNumber(_video.likes.length) || 0}
      <a
        onClick={() => {
          if (isLoggedIn) {
            props.toggleLikeVideo(_video, _user);
          } else {
            props.toggleAuthError();
          }
        }}
      >
        <FontAwesomeIcon
          icon={faThumbsUp}
          className="icons-animation text-white hover:text-teal ml-2"
        />
      </a>
    </div>
  );
};

export default likeBtn;
