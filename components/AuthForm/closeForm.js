import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const closeForm = props => {
  return (
    <div className="flex w-full lg:h-8 justify-end sm:pin-r text-center absolute z-50 text-white">
      <div
        className="cursor-pointer h-10 w-10 pt-2 hover:bg-red float-right"
        onClick={() => {
          props.closeAllHandler();
        }}
      >
        <FontAwesomeIcon icon="times" className="fa-lg" />
      </div>
    </div>
  );
};
export default closeForm;
