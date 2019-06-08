import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

let tag = props => {
  let _video = props.video.currentVideo;

  let onDeleteTag = (e, value) => {
    props.setTags(
      _video.tags.filter(tag => {
        return tag != props.value;
      })
    );
  };

  let tag = (
    <span
      key={tag + 1}
      className="cursor-pointer bg-green-dark border border-white flex items-center mr-2 mt-2 w-32 inline-flex lowercase h-10 hover:bg-white align-middle hover:text-black shadow text-white px-2"
      onClick={e => onDeleteTag(e, props.value)}
    >
      <FontAwesomeIcon icon={faTimes} className="mr-2" />
      {props.value}
    </span>
  );
  return <React.Fragment>{tag}</React.Fragment>;
};

export default tag;
