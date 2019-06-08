import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Offline = props => {
  return (
    <div>
      <div className="w-full flex-1 h-screen content-center text-center">
        <FontAwesomeIcon
          icon="exclamation-circle"
          className="img-error fa-10x sm:fa-5x"
        />
        <h1 className="mt-10 title-message">Ooops... No Internet.</h1>
        <h3 className="mt-2 subtitle-message">
          Please, check your connection and try again.
        </h3>
      </div>
    </div>
  );
};

export default Offline;
