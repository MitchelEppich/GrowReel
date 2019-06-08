/***************************/
/*camera icon/link to the
video uploader
/***************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const notificationButton = props => {
  return props.currentUser !== null ? (
    <button
      alt="Notifications"
      aria-label="Notifications"
      onClick={() => {
        props.userMessages({ username: props.currentUser.username });
        props.toggleShowMessageScreen();
      }}
      className={`${
        false ? "bg-white text-black" : "text-white"
      } h-8 w-16 mr-1 md:w-12 sm:hidden md:hidden lg:hidden xl:hidden`}
    >
      <p>
        <span className="mr-2">
          {props.messages.messages != null
            ? props.messages.messages.length
            : props.currentUser.messages.length}
        </span>
        <span>
          <FontAwesomeIcon icon="envelope" />
        </span>
      </p>
    </button>
  ) : (
    <button
      alt="Notications Error"
      aria-label="Notications Error"
      onClick={props.toggleAuthError}
      className="h-8 w-16 mr-1 md:w-12 text-white sm:hidden md:hidden lg:hidden"
    >
      <p>
        <span>
          <FontAwesomeIcon icon="envelope" />
        </span>
      </p>
    </button>
  );
};

export default notificationButton;
