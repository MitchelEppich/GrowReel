let cancelBtn = props => {
  return (
    <button
      alt="Cancel Edit"
      aria-label="Cancel Edit"
      onClick={() => {
        props.setThumbnail(null);
        props.toggleEditVideoMode(false);
      }}
      type="button"
      className="bg-almost-black sm:w-16 sm:px-1 sm:py-1 w-32 h-10 ml-3 hover:bg-white hover:text-black hover:border-white shadow text-white py-2 px-3"
    >
      Cancel
    </button>
  );
};

export default cancelBtn;
