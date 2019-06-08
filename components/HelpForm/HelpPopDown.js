
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HelpPopDown = props => {
  let open = props.helpFormTab != null && props.helpFormTab == props.helpTitle;
  let helpText = props.helpText.map((textArr, index) => {
    let paragraphs = textArr.map((text, index) => {
      if (typeof text === "object") {
        if (text.icon) {
          return (
            <FontAwesomeIcon
              key={index}
              icon={text.icon}
              className="fa-lg inline mx-3"
            />
          );
        }
        if (text.element) {
          return (
            <div key={index} className="text-center">
              <div className="bars" />
              <div
                className="bars"
                style={{
                  top: "-10px",
                  left: "-40px",
                  marginRight: "-35px"
                }}
              />
            </div>
          );
        }
      }
      return (
        <span key={index} className="mb-1 text-white">
          {text}
        </span>
      );
    });
    return (
      <div key={index} className="pl-4">
        {paragraphs}
      </div>
    );
  });

  return (
    <div>
      <button
        aria-labelledby={open ? "Open Tab" : "Close Tab"}
        alt={open ? "Open Tab" : "Close Tab"}
        className="text-white justify-between inline-flex w-full sm:text-left border-none bg-black p-2 mt-5 mr-2"
        onClick={() => {
          props.toggleHelpFormTab(open ? null : props.helpTitle);
        }}
      >
        {props.helpTitle} <FontAwesomeIcon icon={open ? faMinus : faPlus} />
      </button>{" "}
      <div className={open ? "p-6 leading-normal" : "hidden"}>
        <p className="mb-2">{props.heading}</p>
        {helpText}
      </div>
    </div>
  );
};

export default HelpPopDown;
