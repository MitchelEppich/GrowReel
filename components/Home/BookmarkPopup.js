import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const bookmarkPopup = props => {
  return (
    <div className="bookmarkPopup md:hidden lg:hidden xl:hidden xxl:hidden sm:fixed sm:z-50 sm:w-full sm:h-150 sm:overflow-auto sm:bg-almost-black sm:text-white sm:text-center sm:shadow-md">
      <div className="lg:hidden flex w-full lg:h-8 justify-end sm:pin-r text-center pl-2 absolute z-50 bg-almost-black text-white">
        <div
          className="sm:h-8 sm:w-8 sm:pt-2 hover:bg-red float-right"
          onClick={() => {
            props.closeAllHandler();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <h3 className="text-white sm:text-sm mt-10">
        Hey, don't forget to bookmark our app!
      </h3>
      <button
        alt="Add Bookmark"
        aria-label="Add Bookmark"
        className="bg-black text-white mt-4 mb-4 p-2"
      >
        Add bookmark{" "}
        <FontAwesomeIcon icon="star" className="w-full fa-sm justify-end" />
      </button>
    </div>
  );
};

export default bookmarkPopup;
