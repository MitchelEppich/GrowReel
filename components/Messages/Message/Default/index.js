import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const message = props => {
  let index = props.index;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <div className="w-full bg-black text-white mb-1">
        <button
          onClick={() => {
            props.toggleContentMessage(
              props.misc.showContentMessage == index ? null : index
            );
            props.editMessage({ index: null });
          }}
          className="text-white justify-between inline-flex sm:text-left w-full border-none bg-black p-2"
        >
          <div className="w-full text-left">
            <p className="cursor-pointer">
              <span className="ml-2 capitalize">{props.message.subject}</span>
            </p>
          </div>
          <div className="w-12 cursor-pointer">
            <FontAwesomeIcon icon="angle-down" className="float-right" />
          </div>
        </button>
        {props.misc.showContentMessage == index ? (
          <div className="w-full p-2 text-left bg-almost-transparent relative">
            <p className="mb-6 text-sm p-1">{props.message.body}</p>
            <p className="ml-2 text-xs text-semi-transparent">
              Sent by {props.message.sender}
            </p>
            <div className="pin-b pin-r absolute text-right justify-end flex">
              <div
                onClick={() => {
                  props.editMessage({ index });
                }}
                className="text-xs mt-2 bg-almost-transparent p-2 cursor-pointer icons-animation mb-1 mr-1"
              >
                <FontAwesomeIcon icon="pen-alt" className="mr-2" />
                Edit
              </div>
              <div
                onClick={() => {
                  props.upsertMessage({
                    recipient: [props.user.currentUser.username],
                    key: props.message.key
                  });
                }}
                className="text-xs mt-2 bg-almost-transparent p-2 cursor-pointer icons-animation mb-1 mr-1"
              >
                <FontAwesomeIcon icon="trash-alt" className="mr-2" />
                Delete
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
};
export default message;
