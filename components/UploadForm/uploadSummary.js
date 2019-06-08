/***************************/
/*The component for summarizing
 completed upload video.
/***************************/
import moment from "moment";

let re = new RegExp(/(.*)\.[^.]+$/);

const UploadSummary = props => {
  return (
    <div className="w-full pt-8 h-uploader bg-white leading-loose">
      <h3>{re.exec(props.uploader.file.name)[1]}</h3>
      <p>
        Duration : {moment.utc(props.uploader.duration * 1000).format("m:ss")}
      </p>
      <p>Size : {humanFileSize(props.uploader.file.size, true)}</p>
    </div>
  );
};

let humanFileSize = (bytes, si) => {
  var thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  var units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  var u = -1;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1) + " " + units[u];
};

export default UploadSummary;
