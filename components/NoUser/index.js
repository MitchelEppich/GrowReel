
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoUser = props => {
  return (
    <div>
      <div className="w-full flex-1 h-screen content-center text-center">
        <FontAwesomeIcon
          icon="exclamation-circle"
          className="img-error fa-10x sm:fa-5x"
        />
        <h1 className="mt-10 title-message">Ooops... User Not Found.</h1>
        <h3 className="mt-2 subtitle-message">
          The user you were looking for could not be found.
        </h3>
      </div>
    </div>
  );
};

export default NoUser;
