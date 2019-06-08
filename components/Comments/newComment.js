const newComment = props => {
  return (
    <form
      className="w-full mb-6 sm:mb-2 justify-center flex flex-wrap"
      onSubmit={event => {
        event.preventDefault();
        if (props.user.currentUser) {
          props.postComment(
            props.user.currentUser,
            props.video.currentVideo,
            event.target.commentInput.value
          );
        } else {
          // props.movePlayer("bl");
          props.toggleAuthError();
        }
        event.target.commentInput.value = "";
      }}
    >
      <input
        type="text"
        aria-label="Comment Input"
        className="shadow appearance-none border w-4/5 md:w-4/5 sm:w-3/4 sm:h-8 sm:py-1 h-8 pt-2 mr-1 flex-1 px-2"
        name="commentInput"
        id="commentInput"
        required="required"
      />
      <button
        alt="Comment"
        aria-label="Comment"
        className="bg-black w-1/5 md:w-1/5 sm:w-1/4 sm:h-8 sm:py-1 sm:text-xs h-8 hover:bg-white hover:text-black shadow text-white py-1 px-1"
        type="submit"
      >
        Comment
      </button>
    </form>
  );
};

export default newComment;
