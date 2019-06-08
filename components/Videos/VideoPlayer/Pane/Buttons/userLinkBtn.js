import Link from "next/link";

let userLinkBtn = props => {
  let _video = props.video.currentVideo;

  let _username = _video.user.username || "No User";

  return (
    <Link href="/" as={`/r/${_username}`}>
      <h3
        className="lg:w-1/2 font-bold icons-animation cursor-pointer sm:text-sm hover:text-teal"
        onClick={e => {
          e.stopPropagation();
          props.closeAllHandler();
          props.movePlayer("bl");
          props.fetchReel(_username);
          props.toggleReel(true);
        }}
      >
        {_username}
      </h3>
    </Link>
  );
};

export default userLinkBtn;
