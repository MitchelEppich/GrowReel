import DeleteBtn from "./deleteBtn";
import NotifyBtn from "./notifyBtn";
import NotifyForm from "../Elements/notifyForm";
import FeatureBtn from "./featureBtn";
import DisableBtn from "./disableBtn";
import PublishBtn from "./publishBtn";
import SubscribeBtn from "./subscribeBtn";
import EditBtn from "./editBtn";

let buttons = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let isEditing = props.video.editVideoMode;
  let isLoggedIn = _user != null;
  let isOwner = isLoggedIn && _user._id == _video.user._id;
  let isAdmin = isLoggedIn && _user.admin;

  let editorButtons = (
    <div>
      <DeleteBtn {...props} />
    </div>
  );
  let defaultButtons = (
    <div>
      {isAdmin ? <NotifyBtn {...props} /> : null}
      {props.misc.showSendNotificationFields ? <NotifyForm {...props} /> : null}
      {isAdmin ? <FeatureBtn {...props} /> : null}
      {isAdmin ? <DisableBtn {...props} /> : null}
      {isOwner || isAdmin ? <PublishBtn {...props} /> : null}
      {!isOwner ? <SubscribeBtn {...props} /> : null}
      {isOwner || isAdmin ? <EditBtn {...props} /> : null}
    </div>
  );

  return <div>{isEditing ? editorButtons : defaultButtons}</div>;
};

export default buttons;
