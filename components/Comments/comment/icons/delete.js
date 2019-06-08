import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const deleteComment = props => {
  return (
    <span>
      <a
        onClick={() => {
          if (props.currentUser) {
            props.deleteComment(props.comment._id, props.video);
          }
        }}
        className="ml-4"
      >
        <FontAwesomeIcon
          className="mx-2 icons-animation fa-lg"
          icon="trash-alt"
        />
      </a>
    </span>
  );
};

export default deleteComment;
