import Description from "../Elements/description";
import MatureToggle from "../Elements/matureToggle";
import TagEditor from "../Elements/tagEditor";
import Title from "../Elements/title";
import ThumbnailPreview from "../Elements/thumbnailPreview";
import SaveBtn from "../Buttons/saveBtn";
import CancelBtn from "../Buttons/cancelBtn";

let Editor = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let _thumbnail = props.video.thumbnail;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          let description = e.target.description.value;
          let title = e.target.videoTitle.value;
          let mature = e.target.matureContent.checked;
          props.toggleEditVideoMode(false);
          if (_video.user._id === _user._id) {
            props
              .updateVideo(_video, {
                tags: props.video.currentTags,
                description,
                title,
                thumbnail: _thumbnail,
                has_thumbnail: props.video.has_thumbnail,
                has_changed: props.video.thumbnailChanged,
                mature,
                bucket: props.misc.bucket
              })
              .then(res => {
                if (props.reel.active) {
                  for (let _ of props.reel.videos) {
                    if (_._id == _video._id) {
                      _.mature = res.mature;
                    }
                  }
                }
                props.updateListVideo(res);
              });
          }
          props.setThumbnail(null);
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <ThumbnailPreview {...props} />
          <div className="w-2/5 sm:pt-12">
            <SaveBtn {...props} />
            <CancelBtn {...props} />
          </div>
        </div>
        <div>
          <Title {...props} />
        </div>
        {props.child}
        <Description {...props} />
        <MatureToggle {...props} />
        <TagEditor {...props} />
      </form>
    </div>
  );
};

export default Editor;
