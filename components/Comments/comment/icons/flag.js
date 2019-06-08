import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const flag = props => {
  return (
    <span>
      <a
        onClick={() => {
          props.updateComment(
            {
              _id: props.comment._id,
              flags: [
                ...props.comment.flags.map(a => a._id),
                props.currentUser._id
              ]
            },
            props.video
          );
        }}
        className={`ml-4 ${
          JSON.stringify(props.comment.flags).includes(props.currentUser._id)
            ? "pointer-events-none text-red opacity-50"
            : ""
        }`}
      >
        <FontAwesomeIcon className="mx-2 icons-animation fa-lg" icon="flag" />
      </a>
      {props.comment.flags.length}
    </span>
  );
};

export default flag;
