import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const respondToFlag = props => {
  return (
    <div className="p-2 mt-2">
      <div className="text-sm text-light-grey inline-flex ">
        <div
          onClick={() => {
            props.updateComment(
              {
                _id: props.comment._id,
                flags: []
              },
              props.video
            );
          }}
          className={`ml-4 hover:text-teal cursor-pointer`}
        >
          <FontAwesomeIcon className="mx-2 fa-sm" icon="check" />
          Keep
        </div>
        <div
          onClick={() => {
            props.deleteComment(props.comment._id, props.video);
          }}
          className={`ml-4 hover:text-teal cursor-pointer`}
        >
          <FontAwesomeIcon className="mx-2 fa-sm" icon="times" />
          Remove
        </div>
      </div>
    </div>
  );
};

export default respondToFlag;
