/***************************/
/*Button showing users name
 if logged in, soon to be a
link to users channel/dashboard
/***************************/
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userReelButton = props => {
  let style = {
    transform:
      props.currentUser || props.reelActive
        ? "translateY(0)"
        : "translateY(-5.0rem)",
    WebkitTransform:
      props.currentUser || props.reelActive
        ? "translateY(0)"
        : "translateY(-5.0rem)",
    MsTransform:
      props.currentUser || props.reelActive
        ? "translateY(0)"
        : "translateY(-5.0rem)",
    MozTransform:
      props.currentUser || props.reelActive
        ? "translateY(0)"
        : "translateY(-5.0rem)",
    OTransform:
      props.currentUser || props.reelActive
        ? "translateY(0)"
        : "translateY(-5.0rem)",
    position: props.currentUser || props.reelActive ? "" : "absolute"
  };
  return (
    <Link
      href="/"
      as={
        !props.reelActive
          ? `/r/${props.currentUser ? props.currentUser.username : "null"}`
          : "/"
      }
    >
      <div className="w-64 lg:w-12 sm:hidden md:w-12 inline-block mx-1">
        <button
          alt="Reel"
          aria-label="Reel"
          onClick={() => {
            if (!props.reelActive) {
              props.fetchReel(props.currentUser.username);
              props.movePlayer("bl");
            }
            props.toggleReel(!props.reelActive);
          }}
          style={style}
          className="h-8 w-64 lg:hidden md:hidden sm:hidden mr-1 text-white"
        >
          <p>
            <span>
              {!props.reelActive
                ? props.currentUser
                  ? "Hi, " + props.currentUser.username + "!"
                  : ""
                : "Close Reel"}
            </span>
          </p>
        </button>

        <button
          alt="Reel"
          aria-label="Reel"
          onClick={() => {
            if (!props.reelActive) {
              props.fetchReel(props.currentUser.username);
              props.movePlayer("bl");
            }
            props.toggleReel(!props.reelActive);
          }}
          style={style}
          className="h-8 w-12 mr-1 xl:hidden xxl:hidden xxxl:hidden text-white"
        >
          <p>
            <FontAwesomeIcon icon="user" />
          </p>
        </button>
      </div>
    </Link>
  );
};

export default userReelButton;
