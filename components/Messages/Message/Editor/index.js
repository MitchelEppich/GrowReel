import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const message = props => {
  let index = props.index;
  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.editMessage({ index: null });

        let body = event.target.messageInput.value;
        let subject = event.target.subjectInput.value;
        let recipient = event.target.recipientInput.value.split(",");
        let key = props.message.key;
        let sender = undefined;
        if (key == null) {
          sender = props.user.currentUser.username;
        }

        let input = { body, subject, recipient, key, sender };

        for (let _ of Object.keys(input)) {
          let $ = input[_];
          if ($ == "" || (Array.isArray($) && $.length == 0)) $ = undefined;
          input[_] = $;
        }

        props.upsertMessage({
          ...input
        });
      }}
    >
      <div className="w-full bg-black text-white mb-1">
        <div
          onClick={() => {
            props.toggleContentMessage(null);
            props.editMessage({ index: null });
          }}
          className="text-white justify-between inline-flex sm:text-left w-full border-none bg-black p-2"
        >
          <div className="w-full text-left">
            <p className="cursor-pointer">
              <input
                onClick={e => {
                  e.stopPropagation();
                }}
                type="text"
                name="subjectInput"
                placeholder="Subject"
                required
                className="w-full p-1 bg-transparent text-white border border-semi-transparent hover:border-green-dark cursor-pointer"
                defaultValue={props.message.subject}
              />
            </p>
          </div>
          <div className="w-12 cursor-pointer">
            <FontAwesomeIcon icon="angle-down" className="float-right" />
          </div>
        </div>
        {props.misc.showContentMessage == index ? (
          <div className="w-full p-2 text-left bg-almost-transparent relative">
            <div className="w-full text-left mb-1">
              <p className="cursor-pointer">
                <input
                  type="text"
                  name="recipientInput"
                  placeholder="Recipients (Seperate with a comma)"
                  required
                  className="w-full p-1 bg-transparent text-white border border-semi-transparent hover:border-green-dark cursor-pointer"
                  defaultValue={props.message.recipient}
                />
              </p>
            </div>
            <textarea
              name="messageInput"
              required
              placeholder="Enter Message"
              defaultValue={props.message.body}
              className="w-full h-16 mb-3 p-1 bg-transparent text-white border border-semi-transparent hover:border-green-dark cursor-pointer"
            />
            <p className="ml-2 text-xs text-semi-transparent">
              Sent by{" "}
              {props.message.key == null
                ? props.user.currentUser.username
                : props.message.sender}
            </p>
            <div className="pin-b pin-r absolute text-right justify-end flex">
              <button
                className="border-none text-white text-xs mt-2 bg-almost-transparent p-2 cursor-pointer icons-animation mb-1 mr-2"
                type="submit"
              >
                Save
              </button>
              <div
                onClick={() => {
                  props.editMessage({ index: null });
                }}
                className="text-xs mt-2 bg-almost-transparent p-2 cursor-pointer icons-animation mb-1 mr-2"
              >
                Cancel
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};
export default message;
