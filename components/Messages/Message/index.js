import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Default from "./Default";
import Editor from "./Editor";

const message = props => {
  return (
    <div>
      {props.messages.editIndex == props.index ? (
        <Editor {...props} />
      ) : (
        <Default {...props} />
      )}
    </div>
  );
};
export default message;
