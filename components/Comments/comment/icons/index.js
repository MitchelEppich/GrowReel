import Upvote from "./upvote";
import Downvote from "./downvote";
import Delete from "./delete";
import Edit from "./edit";
import Flag from "./flag";

const index = props => {
  let ratingOutput =
    props.rating == 0 &&
    props.upvotes.length == 0 &&
    props.downvotes.length == 0
      ? "Vote"
      : rating <= 0
      ? props.formatNumber(props.rating)
      : "+" + props.formatNumber(props.rating);

  return (
    <p
      className="text-xs text-light-grey sm:text-xs flex w-full p-2 mt-2 sm:p-1"
      itemScope
      itemType="https://schema.org/UserInteraction"
    >
      <Upvote {...props} />
      <span itemProp="interactionType" className="font-bold">
        {ratingOutput}
      </span>
      <Downvote {...props} />
      {props.currentUser &&
      (props.currentUser._id == props.comment.user._id ||
        props.currentUser.admin) ? (
        <Delete {...props} />
      ) : null}
      {props.currentUser && props.currentUser._id == props.comment.user._id ? (
        <Edit {...props} />
      ) : null}
      {props.currentUser != null ? <Flag {...props} /> : null}
    </p>
  );
};

export default index;
