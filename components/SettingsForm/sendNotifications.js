const sendNotifications = props => {
  let showButton = props.currentUser.admin ? (
    <button
      alt="Send Notifications"
      aria-label="Send Notifications"
      className="text-white border-none w-full bg-grey p-2 mt-5 mr-2"
      onClick={() => {
        props.toggleSendNotificationField();
      }}
    >
      Send Notifications
    </button>
  ) : null;
  return (
    <React.Fragment>
      {showButton}
      {props.showSendNotificationFields && props.currentUser.admin ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            props.insertMessage({
              body: event.target.messageInput.value,
              subject: event.target.subjectInput.value,
              from: "GrowReel Team",
              to: ["all"]
            });
            event.target.messageInput.value = "";
            event.target.subjectInput.value = "";
          }}
          className="p-2 w-full h-64 bg-semi-transparent"
        >
          <input
            type="text"
            className="p-2 my-1 w-full"
            placeholder="Subject"
            name="subjectInput"
            id="subjectInput"
            required="required"
          />
          <textarea
            name="message"
            rows="7"
            cols="50"
            className="p-2 my-2 w-full"
            placeholder="Message"
            name="messageInput"
            id="messageInput"
            required="required"
          />

          <button
            alt="Send Message"
            aria-label="Send Message"
            className="text-white border-none w-full bg-green p-2 mr-2"
            type="submit"
          >
            Send
          </button>
        </form>
      ) : null}
    </React.Fragment>
  );
};
export default sendNotifications;
