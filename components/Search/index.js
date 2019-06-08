/**************************/
/*Search results with
parallax effect
capabilities.*/
/**************************/
import VideoThumbnail from "../Videos/VideoThumbnail"; // FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShowMore from "../Utilities/ShowMore";
const search = props => {
  let videosMapped = {};
  if (props.videos[0] != null) {
    const results = props.videos;
    videosMapped = results.map((number, index) => {
      return (
        <VideoThumbnail
          key={index}
          video={number}
          queueVideo={props.queueVideo}
          formatNumber={props.formatNumber}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
        />
      );
    });

    if (videosMapped.length != 0 && videosMapped.length % 12 == 0) {
      videosMapped.push(
        <ShowMore
          {...this.props}
          icon
          key="showmore"
          onClick={() => {
            props.fetchSearch(
              props.searchKey,
              12,
              {
                sort: props.sort,
                length: props.length,
                target: props.target,
                postedOn: props.postedOn
              },
              videosMapped.length
            );
          }}
          style={{
            width: "210px",
            height: "193px",
            display: "inline-block",
            justifyContent: "center",
            alignItems: "center",
            margin: "0.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          }}
        />
      );
    }
  }

  return (
    <div
      className=""
      // onClick={props.close}
    >
      <div className="w-full bg-almost-black text-left overflow-y-auto overflow-x-none">
        {props.showFiltersMenu == true ? (
          <div
            style={{
              transform:
                props.showFiltersMenu == true
                  ? "translateX(5px)"
                  : "translateX(-100vh)",
              WebkitTransform:
                props.showFiltersMenu == true
                  ? "translateX(0)"
                  : "translateX(-100vh)",
              OTransform:
                props.showFiltersMenu == true
                  ? "translateX(0)"
                  : "translateX(-100vh)",
              MozTransform:
                props.showFiltersMenu == true
                  ? "translateX(0)"
                  : "translateX(-100vh)",
              MsTransform:
                props.showFiltersMenu == true
                  ? "translateX(0)"
                  : "translateX(-100vh)",
              // backgroundColor: props.showFiltersMenu == true ? "red" : "green",
              zIndex: props.showFiltersMenu == true ? "99999" : "-222",
              backgroundColor:
                props.showFiltersMenu == true
                  ? "rgba(29, 29, 29, 0.98)"
                  : "none",
              width: props.showFiltersMenu == true ? "220px" : "0"
              // marginTop: props.showFiltersMenu == true ? "50px" : "0"
            }}
            className="absolute pl-2 pt-3 sm:mt-10 mt-12 h-auto text-white bg-almost-transparent font-bold p-1"
          >
            <div>
              <p className="font-bold p-1 text-md">Search For:</p>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.target == "username"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({ target: "username" });
                }}
              >
                Username
              </div>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.target == "title"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({ target: "title" });
                }}
              >
                Title
              </div>{" "}
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.target == "tags"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({ target: "tags" });
                }}
              >
                Tag
              </div>
              <hr
                style={{
                  backgroundColor: "rgba(103, 112, 117, 0.2)",
                  height: "2px",
                  margin: "12px 0"
                }}
              />
              <p className="font-bold p-1 text-md">Length:</p>
              <div
                className={`w-full text-white font-bold p-1 text-sm cursor-pointer sm:hidden ${
                  props.length == "long"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    length: props.length == "long" ? "" : "long"
                  });
                }}
              >
                Long ( <FontAwesomeIcon icon="angle-right" /> 4 min)
              </div>
              <div
                className={`w-full text-white font-bold p-1 text-sm cursor-pointer sm:hidden ${
                  props.length == "short"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    length: props.length == "short" ? "" : "short"
                  });
                }}
              >
                Short ( <FontAwesomeIcon icon="angle-left" /> 2 min)
              </div>
              <div
                className={`w-full md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden text-white font-bold p-1 text-sm cursor-pointer ${
                  props.length == "long"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    length: props.length == "long" ? "" : "long"
                  });
                }}
              >
                <FontAwesomeIcon icon="angle-right" /> 4 min
              </div>
              <div
                className={`w-full md:hidden lg:hidden xl:hidden xxl:hidden xxxl:hidden text-white font-bold p-1 text-sm cursor-pointer ${
                  props.length == "short"
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    length: props.length == "short" ? "" : "short"
                  });
                }}
              >
                <FontAwesomeIcon icon="angle-right" /> 2 min
              </div>
              <hr
                style={{
                  backgroundColor: "rgba(103, 112, 117, 0.2)",
                  height: "2px",
                  margin: "12px 0"
                }}
              />
              <p className="font-bold p-1 text-md">Upload Date:</p>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.postedOn == 1
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    postedOn: props.postedOn == 1 ? 0 : 1
                  });
                }}
              >
                Today
              </div>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.postedOn == 7
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    postedOn: props.postedOn == 7 ? 0 : 7
                  });
                }}
              >
                This Week{" "}
              </div>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.postedOn == 30
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    postedOn: props.postedOn == 30 ? 0 : 30
                  });
                }}
              >
                This Month{" "}
              </div>
              <div
                className={` w-full text-white font-bold p-1 text-sm cursor-pointer ${
                  props.postedOn == 365
                    ? "hover:text-black bg-teal"
                    : "hover:text-teal"
                }`}
                onClick={() => {
                  props.setFilter({
                    postedOn: props.postedOn == 365 ? 0 : 365
                  });
                }}
              >
                This Year{" "}
              </div>
              <hr
                style={{
                  backgroundColor: "rgba(103, 112, 117, 0.2)",
                  height: "2px",
                  margin: "12px 0"
                }}
              />
              <div className="mt-4">
                <button
                  alt="Update"
                  aria-label="Update"
                  className="bg-black w-full h-8 hover:bg-white hover:text-black shadow text-white py-1 px-1"
                  type="submit"
                  onClick={() => {
                    props.fetchSearch(props.searchKey, 12, {
                      sort: props.sort,
                      length: props.length,
                      target: props.target,
                      postedOn: props.postedOn
                    });
                    props.toggleFiltersMenu();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="w-full bg-almost-black relative h-auto text-left relative h-searchFilter pb-10">
        <div className="bg-black flex z-50 absolute pt-1 ml-2 justify-between w-full py-1">
          <div className="absolute w-full bg-black z-50 px-2">
            <div
              className="w-1/2 sm:w-1/3 md:w-1/3 font-bold pt-3 pb-2 text-white inline-flex text-white cursor-pointer hover:text-teal"
              onClick={() => {
                props.toggleFiltersMenu();
              }}
            >
              Filters
              <FontAwesomeIcon icon="sliders-h" className="ml-2 " />
            </div>

            <div className="w-1/2 sm:w-2/3 md:w-2/3 pr-3 sm:pr-0 pin-r pt-3 pb-2 text-white inline-flex justify-end">
              <p className="px-2 font-bold">Sort by: </p>
              <select
                onChange={e => {
                  let sort = e.target.value;
                  props.setFilter({
                    sort: sort
                  });
                  props.fetchSearch(props.searchKey, 12, {
                    sort: sort,
                    length: props.length,
                    target: props.target,
                    postedOn: props.postedOn
                  });
                }}
                defaultValue="createdOn"
                className="px-1 text-sm"
              >
                <option value="createdOn" className="p-2">
                  Date Posted
                </option>
                <option value="views" className="p-2">
                  Views
                </option>
                <option value="likes" className="p-2">
                  Likes
                </option>
                <option value="duration" className="p-2">
                  Length
                </option>
                <option value="comments" className="p-2">
                  Activity
                </option>
                <option value="tags" className="p-2">
                  Trending
                </option>
              </select>
            </div>
          </div>
        </div>

        {videosMapped[0] != null ? (
          <div
            style={{
              // overflow: "scroll",
              display: "inline-block"
            }}
            className="w-full h-full mt-8 overflow-y-auto "
          >
            <div
              style={
                {
                  // float: "right",
                  // position: "absolute",
                  // paddingBottom: "5px",
                  // marginBottom: "15px",
                  // marginRight: "5px",
                }
              }
              className="p-1 pin-r w-full absolute bg-almost-black text-white fixed text-xs text-right justify-end z-50 pr-3 mt-2"
            >
              Videos Found: {videosMapped.length}
            </div>
            <div className="w-full flex flex-wrap justify-start mt-8">
              {videosMapped}
            </div>
          </div>
        ) : (
          <div className="w-full absolute h-100">
            <h4 className="mx-auto p-5 font-bold text-center mt-12 text-white">
              No results!
            </h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default search;
