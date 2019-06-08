import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FilterDates from "./filterDates";
import FilterLengths from "./filterLengths";
import FilterSearchFor from "./filterSearchFor";

const filters = props => {
  let filters = props.showFiltersMenu ? "filters--show" : "filters";
  let hr = (
    <hr
      style={{
        backgroundColor: "rgba(103, 112, 117, 0.2)",
        height: "2px",
        margin: "12px 0"
      }}
    />
  );

  return props.showFiltersMenu == true ? (
    <div
      className={
        "absolute pl-2 pt-3 sm:mt-10 mt-12 h-auto text-white bg-almost-transparent font-bold p-1 " +
        filters
      }
    >
      <div>
        <p className="font-bold p-1 text-md">Search For:</p>
        <FilterSearchFor target={props.target} />
        {hr}
        <p className="font-bold p-1 text-md">Length:</p>
        <FilterLengths
          currentMediaSize={props.currentMediaSize}
          length={props.length}
          setFilter={props.setFilter}
        />
        <p className="font-bold p-1 text-md">Upload Date:</p>
        <FilterDates postedOn={props.postedOn} setFilter={props.setFilter} />
        {hr}
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
  ) : null;
};

export default filters;
