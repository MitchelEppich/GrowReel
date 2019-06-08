let editBtn = props => {
  return (
    <button
      alt="Edit Video"
      aria-label="Edit Video"
      className="bg-teal sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-1 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3"
      type="button"
      onClick={() => {
        props.toggleEditVideoMode(true);
      }}
    >
      Edit Video
    </button>
  );
};

export default editBtn;
