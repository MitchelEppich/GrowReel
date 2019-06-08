/***************************/
/*Help form
/***************************/

import HelpPopDown from "../HelpForm/HelpPopDown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const helpForm = props => {
  let questions = props.misc.helpFormContent.map((question, index) => {
    return (
      <HelpPopDown
        key={index}
        helpFormTab={props.misc.helpFormTab}
        toggleHelpFormTab={props.toggleHelpFormTab}
        {...question}
      />
    );
  });
  return (
    <div className="authForm fixed w-80 sm:ml-5 sm:max-w-xs max-w-sm sm:h-400 h-600 z-30">
      <div className="flex h-10 w-full justify-end pin-r bg-semi-transparent text-center float-right z-50 text-white">
        <div
          className="cursor-pointer h-10 w-10 pt-2 hover:bg-red float-right"
          onClick={() => {
            props.closeAllHandler();
          }}
        >
          <FontAwesomeIcon icon="times" className="fa-lg" />
        </div>
      </div>
      <div className="sm:h-400 overflow-y-auto w-full bg-semi-transparent h-600 sm:p-2 sm:pt-0 p-2 z-30">
        <h1 className="text-center">Help</h1>
        {questions}
      </div>
    </div>
  );
};

export default helpForm;
