let notifyBtn = props => {
  return (
    <button
      alt="Send Notifications"
      aria-label="Send Notifications"
      className="sm:w-full sm:py-1 sm:mt-1 sm:h-8 sm:px-0 hover:bg-white hover:text-black hover:border-black shadow text-white h-8 py-1 px-3 mr-2"
      onClick={() => {
        props.toggleSendNotificationField();
      }}
    >
      Send Notifications
    </button>
  );
};

export default notifyBtn;
