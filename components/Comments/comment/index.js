/***************************/
/*Single comment component
/***************************/
import Icons from "./icons";
import RespondToFlag from "./respondToFlag";
import Edited from "./edited";
import Flagged from "./flagged";
import Deleted from "./deleted";
import CommentBody from "./commentBody";
import EditComment from "./editComment";

const comment = props => {
  let rating = props.upvotes.length - props.downvotes.length;
  if (rating < -100) {
    props.deleteComment(props.comment._id, props.video);
    return <div />;
  }
  return (
    <div
      className="w-full text-left mb-4 sm:mb-2 hover:bg-almost-transparent text-white sm:mb-12"
      itemScope
      itemType="https://schema.org/UserComments"
    >
      <p className="w-full leading-normal pt-4 p-2 sm:pt-2">
        <span
          className={`font-bold hover:text-teal cursor-pointer ${
            props.comment.deleted || props.comment.flagged
              ? "pointer-events-none"
              : ""
          }`}
          itemProp="creator"
          onClick={e => {
            e.stopPropagation();
            props.fetchReel(props.user);
            props.movePlayer("bl");
            props.toggleReel(true);
          }}
        >
          {props.user}
        </span>
        {props.comment.flagged ? <Flagged {...props} /> : null}
        {props.comment.edited ? <Edited {...props} /> : null}
        {props.comment.deleted ? <Deleted {...props} /> : null}
        <span
          className="ml-4 text-xs pin-r pin-t float-right mt-1 lg:text-sm"
          itemProp="commentTime"
        >
          {props.date}
        </span>
      </p>
      {props.commentEditId != props.comment._id ? (
        <CommentBody {...props} />
      ) : (
        <EditComment {...props} />
      )}

      {!props.comment.deleted && !props.comment.flagged ? (
        <Icons rating={rating} {...props} />
      ) : props.comment.flagged && (props.ifAdmin || props.ifOwner) ? (
        <RespondToFlag {...props} />
      ) : null}
      <hr
        style={{ backgroundColor: "rgba(21, 21, 21, 0.31)", height: "2px" }}
      />
    </div>
  );
};

export default comment;
