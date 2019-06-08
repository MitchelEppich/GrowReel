import Default from "./Default";
import Editor from "./Editor";

import Buttons from "./Buttons";
import LikeBtn from "./Buttons/likeBtn";
import ReportBtn from "./Buttons/reportBtn";
import UserLinkBtn from "./Buttons/userLinkBtn";

import StatBar from "./Elements/statBar";

import Comments from "../../../Comments/Comments";

import { Subscription } from "react-apollo";

const pane = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let isEditing = props.video.editVideoMode;

  let commentSection = (
    <div>
      <hr className="hr mb-8" />
      <Subscription
        subscription={props.commentAdded}
        variables={{ video: _video._id }}
      >
        {({ data }) => {
          if (data != null && data.commentAdded) {
            let comment = data.commentAdded;
            if (comment._type == "ADDED") {
              if (
                !_video.comments
                  .map(comment => comment._id)
                  .includes(comment._id)
              ) {
                props.appendComment([comment], _video);
              }
            } else if (comment._type == "REMOVED") {
              if (
                _video.comments
                  .map(comment => comment._id)
                  .includes(comment._id)
              ) {
                props.removeComment(comment, _video);
              }
            } else if (comment._type == "EDITED") {
              if (
                !_video.comments
                  .map(comment => {
                    return JSON.stringify({
                      _id: comment._id,
                      body: comment.body,
                      flags: comment.flags,
                      downvotes: comment.downvotes,
                      upvotes: comment.upvotes
                    });
                  })
                  .includes(
                    JSON.stringify({
                      _id: comment._id,
                      body: comment.body,
                      flags: comment.flags,
                      downvotes: comment.downvotes,
                      upvotes: comment.upvotes
                    })
                  )
              ) {
                props.editComment(comment, _video);
              }
            }
          }
          return <Comments {...props} />;
        }}
      </Subscription>
    </div>
  );

  let child = (
    <div>
      <div className="flex justify-between m-2">
        <span className="text-base sm:text-xs">
          <StatBar {...props} />
          {_user == null || _user._id != _video.user._id ? (
            <ReportBtn {...props} />
          ) : null}
        </span>
        <span className="text-base icons-animation hover:text-teal cursor-pointer sm:text-sm">
          <LikeBtn {...props} />
        </span>
      </div>
      <div className="text-white items-center px-2 flex flex-wrap justify-between sm:my-6 my-8">
        <UserLinkBtn {...props} />
        <div className="sm:text-sm sm:mt-2 sm:w-full relative">
          <Buttons {...props} />
        </div>
      </div>
    </div>
  );
  return (
    <div className={props.videoPlayerContentClass}>
      {isEditing ? (
        <Editor {...props} child={child} />
      ) : (
        <Default {...props} child={child} />
      )}
      {commentSection}
    </div>
  );
};

export default pane;
