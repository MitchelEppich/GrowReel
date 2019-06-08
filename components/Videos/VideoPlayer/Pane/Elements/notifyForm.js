let notifyForm = props => {
  let _video = props.video.currentVideo;

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.upsertMessage({
          body: event.target.messageInput.value,
          subject: event.target.subjectInput.value,
          from: "GrowReel Team",
          recipient: [_video.user.username]
        });
        event.target.messageInput.value = "";
        event.target.subjectInput.value = "";
        props.toggleSendNotificationField();
      }}
      className="p-2 mt-1 w-full h-200 bg-semi-transparent absolute"
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
        rows="4"
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
  );
};

export default notifyForm;
