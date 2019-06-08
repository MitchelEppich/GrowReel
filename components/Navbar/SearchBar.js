/***************************/
/*The search bar, links to
search results page
/***************************/

import Search from "../Search";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

const searchBar = props => {
  return (
    <div className="sm:w-full sm:mx-auto sm:px-2 sm:mr-5 sm:z-0 sm:mt-2 inline-block ml-2 mt-2 h-8 md:mx-auto md:flex-1 md:w-full lg:mx-auto lg:flex-1 lg:w-full xl:mx-auto xl:flex-1 xl:w-full xxl:mx-auto xxl:flex-1 xxl:w-full xxxl:mx-auto xxxl:flex-1 xxxl:w-full">
      <div className="h-8 w-full ml-2 relative">
        <label className="hidden block text-sm font-bold mb-2">Search</label>
        <span className="position: relative; display: inline-block; direction: ltr;">
          <input
            aria-label="searchbar"
            style={{ width: window.innerWidth > 450 ? "98%" : "100%" }}
            className="transition focus:outline-0 border border-transparent focus:bg-white focus:border-grey-light placeholder-grey-darkest bg-grey-lighter py-2 pr-4 pl-10 block appearance-none leading-normal ds-input h-8  inline-flex float-left pl-4"
            type="search"
            placeholder="Search..."
            name="search"
            id="search"
            onChange={event => {
              let input = event.target.value;
              if (input != null) {
                props.toggleSearch(true);
                props.setSearchKey(input);
                props.fetchSearch(input, 12, {
                  sort: props.sort,
                  length: props.length,
                  target: props.target,
                  postedOn: props.postedOn
                });
              }
            }}
          />
        </span>
        <div
          className="cursor-pointer icons-animation hover:text-teal absolute text-grey pin-y pin-l pl-3 flex items-center w-8"
          onClick={() => {
            props.toggleSearch(!props.showSearch);
          }}
        >
          <FontAwesomeIcon icon={faSearch} className="" />
        </div>
      </div>

      {props.showSearch ? (
        <Search
          close={props.close}
          videos={props.searchVideos}
          queueVideo={props.queueVideo}
          formatNumber={props.formatNumber}
          toggleFiltersMenu={props.toggleFiltersMenu}
          showFiltersMenu={props.showFiltersMenu}
          setFilter={props.setFilter}
          sort={props.sort}
          length={props.length}
          target={props.target}
          postedOn={props.postedOn}
          searchKey={props.searchKey}
          fetchSearch={props.fetchSearch}
          fetchReel={props.fetchReel}
          toggleReel={props.toggleReel}
        />
      ) : null}
    </div>
  );
};

export default searchBar;
