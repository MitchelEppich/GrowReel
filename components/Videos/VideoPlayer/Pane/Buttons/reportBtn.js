import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

let reportBtn = props => {
  let _user = props.user.currentUser;
  let isLoggedIn = _user != null;

  return (
    <a
      className="mr-8 sm:mr-2 icons-animation hover:text-teal cursor-pointer"
      onClick={() => {
        if (isLoggedIn) {
          props.showReportHandler();
          props.setReportType("flag");
        } else {
          props.toggleAuthError();
        }
      }}
    >
      Report
      <FontAwesomeIcon
        icon={faFlag}
        className="icons-animation ml-1 hover:text-teal"
      />
    </a>
  );
};

export default reportBtn;
