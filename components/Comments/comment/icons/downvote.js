import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const downvote = props => {
  return (
    <a
      onClick={() => {
        if (props.currentUser != null) {
          props.updateComment(
            {
              _id: props.comment._id,
              user: props.currentUser._id,
              isUpvote: false,
              upvotes: props.upvotes.map(a => a._id),
              downvotes: props.downvotes.map(a => a._id)
            },
            props.video
          );
        }
      }}
    >
      <FontAwesomeIcon
        className={`mx-2 icons-animation fa-lg sm:fa-sm ${
          props.downvotes
            .map(a => a._id)
            .indexOf(props.currentUser != null && props.currentUser._id) != -1
            ? "text-green"
            : ""
        }`}
        icon="arrow-down"
      />
    </a>
  );
};
export default downvote;
