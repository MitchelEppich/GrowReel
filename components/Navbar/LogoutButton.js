/***************************/
/*Logout button, rendered if
user is logged in
/***************************/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const logoutButton = props => {
  return (
    <p>
      <span>
        Logout
        <FontAwesomeIcon icon="sign-out-alt" className="mx-2" />
      </span>
    </p>
  );
};

export default logoutButton;
