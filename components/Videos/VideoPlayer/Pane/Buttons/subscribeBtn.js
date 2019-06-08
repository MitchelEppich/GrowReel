let subscribeBtn = props => {
  let _video = props.video.currentVideo;
  let _user = props.user.currentUser;

  let isLoggedIn = _user != null;

  let hasSubscribed =
    isLoggedIn &&
    _user.subscriptions.find(user => {
      return user._id == _video.user._id;
    });

  return (
    <button
      alt={hasSubscribed ? "Unsubscribe" : "Subscribe"}
      aria-label={hasSubscribed ? "Unsubscribe" : "Subscribe"}
      className="bg-teal w-32 sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-1 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3"
      type="button"
      onClick={() => {
        if (isLoggedIn) {
          props.toggleSubscribeUser(props.user.currentUser._id, video.user._id);
        } else {
          props.toggleAuthError();
        }
      }}
    >
      {hasSubscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default subscribeBtn;
