import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const flagged = props => {
  return (
    <span className="pl-2 text-almost-white text-xs">
      <FontAwesomeIcon
        className="mx-1 text-red opacity-50 fa-lg sm:fa-sm"
        icon="flag"
      />
    </span>
  );
};

export default flagged;
