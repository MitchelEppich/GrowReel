/**************************/
/*Video control bar for video player.*/
/**************************/

import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeOff,
  faVolumeUp,
  faVolumeDown,
  faExpand,
  faCompress
} from "@fortawesome/free-solid-svg-icons";

import Slider from "../Utilities/Slider";

const controlBar = props => {
  if (!props.videoRef) return <div />;

  let showFormats = () => {
    let res = [];
    let formats = props.video.formats;

    for (let format of formats) {
      res.push(
        <option key={format} value={format}>
          {format}
        </option>
      );
    }

    if (res.length == 0) {
      res.push(
        <option key={"No Format"} value={"No Format"}>
          No Format
        </option>
      );
    }

    let selectElm = React.createElement(
      "select",
      {
        className: "resolution mr-4 sm:mr-1 dropdown icons-animation",
        onChange: e => props.setResolution(e.target.value),
        defaultValue: props.video.resolution
      },
      res
    );

    return selectElm;
  };

  return (
    <div className="videoControlsBar" onMouseMove={props.onMouseMove}>
      <Slider
        videoPlayerPosition={props.video.videoPlayerPosition}
        bar1={{ width: `${props.video.loadProgress * 100}%` }}
        min={0}
        max={100}
        withBars
        className="horizontal-slider"
        value={(props.video.currentTime / props.videoRef.duration) * 100}
        onChange={value => {
          let seekTo = props.videoRef.duration * (value / 100);
          props.setCurrentTime(seekTo);
          props.videoRef.currentTime = seekTo;
        }}
      />
      <div className="flex m-1 ml-2 p-1 items-center sm:text-sm sm:ml-0 w-full">
        <div
          className="icons-animation"
          onClick={() => props.controls.play(props.videoRef)}
        >
          {!props.videoRef.paused ? (
            <FontAwesomeIcon
              icon={faPause}
              className="cursor-pointer text-white"
            />
          ) : (
            <FontAwesomeIcon
              icon={faPlay}
              className="cursor-pointer text-white"
            />
          )}
        </div>
        <div className="ml-4 sm:ml-1">{`${
          props.video.currentTime
            ? moment.utc(props.video.currentTime * 1000).format("mm:ss")
            : "0:00"
        } / ${
          props.videoRef.duration
            ? moment.utc(props.videoRef.duration * 1000).format("mm:ss")
            : "0:00"
        }`}</div>

        <div className="flex absolute pin-r overflow-visible">
          <select
            defaultValue={props.video.playbackRate}
            className="playbackRate dropdown mr-4 sm:mr-1 icons-animation"
            onChange={e => {
              let rate = e.target.value;
              props.setPlaybackRate(rate);
              props.videoRef.playbackRate = rate;
            }}
          >
            <option value="0.25">0.25</option>
            <option value="0.5">0.5</option>
            <option value="0.75">0.75</option>
            <option value="1">Normal</option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
            <option value="1.75">1.75</option>
            <option value="2">2</option>
          </select>
          {/* Resolution Selection */}
          {showFormats()}

          {/* Volume */}
          <div
            className="volumeSlider"
            hidden
            onMouseLeave={e => {
              let slider = document.querySelector(".volumeSlider");
              slider.hidden = true;
            }}
          >
            <Slider
              bar-1={{ width: "100px" }}
              videoPlayerPosition={props.video.videoPlayerPosition}
              min={0}
              max={100}
              withBars
              invert
              value={props.video.volume * 100}
              onChange={value => {
                let volumeTo = parseFloat(value / 100).toFixed(2);
                props.setVolume(volumeTo);
                props.videoRef.volume = volumeTo;
              }}
              className="vertical-slider"
              orientation="vertical"
            />
          </div>
          <div
            id="muteBtn"
            className="mr-4 sm:mr-1 muteBtn icons-animation"
            onMouseEnter={e => {
              let slider = document.querySelector(".volumeSlider");
              slider.hidden = false;
            }}
            onClick={e => {
              let volumeTo = props.video.volume != 0 ? 0 : 1;
              props.setVolume(volumeTo);
              props.videoRef.volume = volumeTo;
            }}
          >
            {props.video.volume == 0 ? (
              <FontAwesomeIcon
                icon={faVolumeOff}
                className="cursor-pointer text-white"
              />
            ) : props.video.volume <= 0.5 ? (
              <FontAwesomeIcon
                icon={faVolumeDown}
                className="cursor-pointer text-white"
              />
            ) : (
              <FontAwesomeIcon
                icon={faVolumeUp}
                className="cursor-pointer text-white"
              />
            )}
          </div>
          <div
            id="fullscreenBtn"
            className="mr-4 sm:mr-1 icons-animation"
            onClick={() => props.controls.fullscreen(props.videoContainerRef)}
          >
            {props.video.fullscreen ? (
              <FontAwesomeIcon
                icon={faCompress}
                className="cursor-pointer text-white"
              />
            ) : (
              <FontAwesomeIcon
                icon={faExpand}
                className="cursor-pointer text-white"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default controlBar;
