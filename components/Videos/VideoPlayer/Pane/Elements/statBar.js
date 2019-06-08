import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEye } from "@fortawesome/free-solid-svg-icons";

let statBar = props => {
  let _video = props.video.currentVideo;
  return (
    <span>
      <span>{props.formatNumber(_video.views) || 0}</span>
      <FontAwesomeIcon icon={faEye} className="ml-1 mr-5 sm:mr-2" />
      <span>{moment(new Date(_video.createdAt)).fromNow()}</span>
      <FontAwesomeIcon icon={faClock} className="ml-1 mr-5 sm:mr-2" />
    </span>
  );
};

export default statBar;
