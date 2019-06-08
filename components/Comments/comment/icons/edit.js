import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const edit = props => {
  return (
    <span>
      <a
        onClick={() => {
          if (props.currentUser) {
            // Toggle comment edit mode
            props.setCommentEdit(
              props.commentEditId == props.comment._id ? "" : props.comment._id
            );
          }
        }}
        className="ml-4"
      >
        <FontAwesomeIcon className="mx-2 icons-animation fa-lg" icon="edit" />
      </a>
    </span>
  );
};

export default edit;
