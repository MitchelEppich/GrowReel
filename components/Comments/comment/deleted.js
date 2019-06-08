import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const deleted = props => {
  return window.innerWidth < 650 ? (
    <span className="pl-2 text-almost-white text-xs">
      <FontAwesomeIcon
        icon="trash-alt"
        className="cursor-pointer mx-1 icons-animation text-right hover:text-teal text-almost-white"
      />{" "}
      Deleted
    </span>
  ) : (
    <span className="pl-2 text-almost-white text-xs">
      Deleted at {moment(props.comment.editedAt).format("DD/MM/YYYY hh:mm:ss")}
    </span>
  );
};

export default deleted;
