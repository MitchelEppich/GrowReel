/***************************/
/*All comments component, for
mapping a videos comments
out to be rendered in videoplayer
/***************************/
import Comment from "./comment";
import NewComment from "./newComment";
import ShowMore from "../Utilities/ShowMore";
import moment from "moment";

const comments = props => {
  let comments = props.video.currentVideo.comments;
  let renderComments;
  if (props.video.currentVideo && comments) {
    renderComments = comments.slice(0).map(comment => {
      //Add privileges here for owner and admin
      let ifAdmin =
        props.user.currentUser != null && props.user.currentUser.admin;
      let ifOwner =
        props.user.currentUser != null &&
        props.user.currentUser._id == props.video.currentVideo.user._id;
      if (comment.flags != null && comment.flags.length >= 10) {
        if (!ifAdmin && !ifOwner) {
          comment = {
            ...comment,
            body: "Comment has been flagged and awaiting review.",
            user: {
              username: "[ flagged ]"
            },
            flagged: true
          };
        } else {
          comment = {
            ...comment,
            flagged: true
          };
        }
      }
      return (
        <Comment
          ifAdmin={ifAdmin}
          ifOwner={ifOwner}
          setCommentBody={props.setCommentBody}
          setCommentEdit={props.setCommentEdit}
          newBody={props.comment.newBody}
          commentEditId={props.comment.commentEditId}
          video={props.video.currentVideo}
          deleteComment={props.deleteComment}
          updateComment={props.updateComment}
          key={comment._id}
          user={comment.user.username}
          body={comment.body}
          date={moment(new Date(comment.createdAt)).fromNow()}
          upvotes={comment.upvotes}
          downvotes={comment.downvotes}
          comment={comment}
          currentUser={props.user.currentUser}
          appendVoteComment={props.appendVoteComment}
          formatNumber={props.formatNumber}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
          movePlayer={props.movePlayer}
        />
      );
    });
  }

  return (
    <div className="w-full sm:min-h-15r sm:mb-24">
      <NewComment {...props} />
      {renderComments}
      {comments.length != 0 && comments.length % 10 == 0 ? (
        <div className="flex">
          <ShowMore
            {...props}
            key="showmore"
            onClick={() => {
              props
                .fetchComments(props.video.currentVideo, comments.length, 10)
                .then(res => {
                  props.appendComment(res, props.video.currentVideo);
                });
            }}
            body="Load More"
            className="cursor-pointer hover:bg-almost-transparent w-full m-auto hover:text-teal my-2 pb-4"
            style={{}}
          />
        </div>
      ) : null}
    </div>
  );
};

export default comments;
