const editComment = props => {
  return (
    <div className="w-full text-sm">
      <form className="flex w-full">
        <div style={{ marginLeft: "-0.5rem" }} className="ml-2 w-4/5">
          <input
            type="text"
            style={{ width: "98.5%", marginLeft: "15px" }}
            className="h-4 bg-transparent text-left p-3  leading-normal text-sm cursor-pointer text-white mb-2 border border-semi-transparent hover:border-green-dark"
            onChange={e => {
              let value = e.target.value;
              props.setCommentBody(value);
            }}
            defaultValue={props.comment.body}
          />
        </div>
        <div className="w-1/5 pin-r">
          <button
            type="submit"
            style={{ width: "99%", marginLeft: "7px" }}
            className="text-white w-full p-1"
            onClick={e => {
              e.preventDefault();
              props.updateComment(
                { _id: props.comment._id, body: props.newBody },
                props.video
              );
              props.setCommentEdit("");
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default editComment;
