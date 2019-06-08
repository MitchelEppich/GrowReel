
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const bugButton = props => {
  return (
    <button
      onClick={() => {
        props.showReport();
        props.setReportType("bug");
      }}
      className="h-8 w-24 mr-1 md:w-24 lg:hidden xl:hidden xxl:hidden xxxl:hidden text-white sm:hidden md:hidden"
      alt="Report Bug"
      aria-label="Report Bug"
    >
      <p>
        <span>
          Report
          <FontAwesomeIcon icon="bug" className="mx-2" />
        </span>
      </p>
    </button>
  );
};

export default bugButton;
