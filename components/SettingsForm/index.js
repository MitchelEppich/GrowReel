/***************************/
/*The login/register form
/***************************/

// this.props.insertMessage({
//   body: "",
//   subject: "",
//   from: "GrowReel Team",
//   to: ["all"]
// });
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const settingsForm = props => {
  return (
    <div
      style={{
        backgroundColor: true ? "bg-almost-black" : "bg-semi-transparent",
        transform: true ? "translateY(0)" : "translateY(-100vh)",
        WebkitTransform: true ? "translateY(0)" : "translateY(-100vh)",
        MozTransform: true ? "translateY(0)" : "translateY(-100vh)",
        MsTransform: true ? "translateY(0)" : "translateY(-100vh)",
        OTransform: true ? "translateY(0)" : "translateY(-100vh)"
      }}
      className="authForm fixed w-80 max-w-sm z-50 bg-semi-transparent text-white shadow-md m-auto pb-8 mb-4"
    >
      <div className="flex h-10 w-10 justify-end pin-r text-center float-right z-50 text-white">
        <div
          className="cursor-pointer h-10 w-10 pt-2 hover:bg-red float-right"
          onClick={() => {
            props.closeAllHandler();
          }}
        >
          <FontAwesomeIcon icon="times" className="fa-lg" />
        </div>
      </div>

      <h1 className="text-center pt-5 pl-5">Settings</h1>
      {props.user.currentUser ? (
        <div className="px-4">
          {props.user.currentUser.admin ? (
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
          ) : null}

          {props.misc.showSendNotificationFields &&
          props.user.currentUser.admin ? (
            <form
              onSubmit={event => {
                event.preventDefault();
                let body = event.target.messageInput.value;
                let subject = event.target.subjectInput.value;
                let sender = props.user.currentUser.username;
                let recipient = event.target.recipientInput.value.split(",");

                let input = { body, subject, sender, recipient };

                for (let _ of Object.keys(input)) {
                  let $ = input[_];
                  if ($ == "" || (Array.isArray($) && $.length == 0))
                    $ = undefined;
                  input[_] = $;
                }

                props.upsertMessage({
                  ...input
                });
                event.target.messageInput.value = "";
                event.target.subjectInput.value = "";
              }}
              className="p-2 w-full h-350 bg-semi-transparent"
            >
              <input
                type="text"
                className="p-2 my-1 w-full"
                placeholder="Subject"
                name="subjectInput"
                id="subjectInput"
                required="required"
              />
              <input
                type="text"
                className="p-2 my-1 w-full"
                placeholder="Recipient (Split usernames with comma)"
                name="recipientInput"
                id="recipientInput"
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

          <button
            alt="Change Password"
            aria-label="Change Password"
            className="text-white border-none w-full bg-black p-2 mt-5 mr-2"
            onClick={() => {
              props.showPasswordResetHandler();
            }}
          >
            Change Password
          </button>
          <button
            alt="Delete Account"
            aria-label="Delete Account"
            className="text-white border-none w-full bg-red p-2 mt-5"
            onClick={() => {
              props.deleteUser(props.user.currentUser._id);
              props.logOutHandler();
            }}
          >
            Delete Account
          </button>
        </div>
      ) : (
        <p className="text-center p-5">Sorry, there are no settings.</p>
      )}
    </div>
  );
};

export default settingsForm;
