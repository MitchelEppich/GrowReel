import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "./Message";

const Messages = props => {
  console.log("AHHHHHHHHHHHH");
  if (props.user.currentUser != null && props.messages.messages == null) {
    props.userMessages({ username: props.user.currentUser.username });
  }
  let messages = props.messages.messages;
  if (messages == null) return null;
  let loopMessages = messages.map((message, index) => {
    return (
      <Message
        key={index}
        index={index}
        messages={messages}
        message={message}
        {...props}
      />
    );
  });
  let showMessages =
    messages != null ? (
      <div className="w-full mt-4 text-center">
        <p className="text-sm">
          You have {props.messages.messages.length} notifications
        </p>
        <div
          style={{ width: "96%" }}
          className="h-64 mt-4 mx-2 overflow-y-auto overflow-x-hidden"
        >
          {loopMessages}
        </div>
      </div>
    ) : null;

  return (
    <div className="notifications w-400 h-400 bg-semi-transparent text-white">
      <div className="w-full inline-flex relative">
        <div className="w-full text-center">
          <h1 className="mt-2">Notifications</h1>
        </div>
        <div className="w-12 absolute text-center h-12 pin-r pin-t">
          <div
            className="cursor-pointer h-10 w-10 pt-2 hover:bg-red float-right"
            onClick={() => {
              props.closeAllHandler();
            }}
          >
            <FontAwesomeIcon icon="times" className="fa-lg" />
          </div>
        </div>
      </div>
      {showMessages}
      <div className="w-full mt-4 text-center" />
      <div className="w-full">
        <div
          onClick={() => {
            let _messages = props.messages.messages;
            let index = _messages.findIndex(message => {
              if (message.key == null) return true;
              return false;
            });
            if (index == -1) {
              index = _messages.length;
              _messages.push({ key: null });
            }

            props.newMessage({
              messages
            });
            props.editMessage({ index });
            props.toggleContentMessage(index);
          }}
          className="pin-r mr-2 cursor-pointer icons-animation bg-almost-transparent text-sm p-1 absolute"
        >
          Create Message
        </div>
      </div>
    </div>
  );
};

export default Messages;
