import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ShowMore = props => {
  return (
    <div
      key={"show more"}
      style={
        props.style
          ? props.style
          : {
              width: "210px",
              height: "193px",
              display: "block",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.15)"
              // marginTop: "8px"
            }
      }
      className={
        props.className
          ? props.className
          : "mx-auto my-2 video-link hover:text-teal"
      }
      onClick={e => onClick(e, () => props.onClick())}
    >
      {props.icon ? (
        <div className="block text-center pt-16 w-full">
          <FontAwesomeIcon
            icon={faPlus}
            className="fa-3x text-semi-transparent"
          />
        </div>
      ) : null}
      <div className="block text-center w-full pt-3">
        <h4>{props.body ? props.body : "Show More"}</h4>
      </div>
    </div>
  );
};

const onClick = (e, onClick) => {
  let btn = e.target;
  onClick();
};

export default ShowMore;
