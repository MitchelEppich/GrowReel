import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const edited = props => {
  return window.innerWidth < 650 ? (
    <span className="pl-2 text-almost-white text-xs">
      <FontAwesomeIcon
        icon="pen-alt"
        className="cursor-pointer mx-1 icons-animation text-right hover:text-teal text-almost-white"
      />{" "}
      Edited
    </span>
  ) : (
    <span className="pl-2 text-almost-white text-xs">
      Edited at {moment(props.comment.editedAt).format("DD/MM/YYYY hh:mm:ss")}
    </span>
  );
};

export default edited;
