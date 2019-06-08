/***************************/
/*The login/register form
/***************************/

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReportForm = props => {
  let lbl =
    props.report.type == "flag"
      ? "Tell us what is wrong:"
      : "We value your feedback!";
  let plc =
    props.report.type == "flag"
      ? "Describe your issue here..."
      : "Tell us about an issue or compliment our awesome work!...just kidding we have no time for compliments";

  return (
    <div className="authForm fixed w-80 max-w-sm z-50">
      <div className="flex h-10 w-10 justify-end pin-r text-center float-right sm:mr-5 sm:pb-2 sm:mb-2 z-50 text-white">
        <div
          className="cursor-pointer h-10 w-10 pt-2 hover:bg-red float-right"
          onClick={() => {
            props.closeAllHandler();
          }}
        >
          <FontAwesomeIcon icon="times" className="fa-lg" />
        </div>
      </div>
      <form
        id="reportForm"
        onSubmit={event =>
          props.handleReportSubmit(props.report.type, event, props)
        }
        className="w-full h-full bg-semi-transparent text-white shadow-md px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-2">
          <label
            className="block text-med text-center font-bold mb-3"
            htmlFor="email"
          >
            {lbl}
          </label>
          <textarea
            style={{ resize: "none", width: "100%", padding: "5px" }}
            maxLength="300"
            rows="4"
            form="reportForm"
            name="report"
            required
            autoFocus
            placeholder={plc}
          />
        </div>
        <div>
          <button
            alt="Submit Report"
            aria-label="Submit Report"
            className="bg-black w-full border-none mb-4 hover:bg-white hover:text-black text-white py-2 px-4"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
