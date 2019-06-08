import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const passwordReset = props => {
  return (
    <div className="authForm fixed w-80 max-w-sm z-50">
      <div className="flex h-10 w-10 justify-end pin-r text-center float-right sm:mr-0 sm:pb-2 sm:mb-2 z-50 text-white">
        <div
          className="h-10 w-10 pt-2 hover:bg-red float-right"
          onClick={() => {
            props.closeAllHandler();
          }}
        >
          <FontAwesomeIcon icon="times" className="fa-lg" />
        </div>
      </div>

      <form
        onSubmit={event => {
          props.resetPassword(
            event,
            props,
            props.user.currentUser ? props.user.currentUser.email : null
          );
          Router.push("/", "/", { shallow: true });
        }}
        className="w-full h-full bg-semi-transparent text-white shadow-md px-8 pt-10 pb-8 mb-4"
      >
        <div className="mb-2">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            New Password
          </label>
          <input
            aria-label="New Password Input"
            className="shadow appearance-none w-full py-2 px-3 mb-3 leading-tight"
            id="password"
            name="password"
            type="password"
            placeholder="******************"
            required="required"
            onInvalid={e => {
              e.target.setCustomValidity(
                "Password needs minimum 8 characters, 1 Uppercase/Lowercase letter and 1 number"
              );
            }}
            onChange={e => {
              e.target.setCustomValidity("");
            }}
            pattern="(?=.*[a-z])(?=.*[A-Z]).{8,}"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="passwordConfirmation"
          >
            Confirm Password
          </label>
          <input
            aria-label="Confirm Password Input"
            className="shadow appearance-none w-full py-2 px-3 mb-3 leading-tight"
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="******************"
            required="required"
            onChange={e => {
              let password = document.querySelector("#password");
              if (password.value != e.target.value) {
                e.target.setCustomValidity(
                  "Password must match the previous entry"
                );
              } else {
                e.target.setCustomValidity("");
              }
            }}
          />
        </div>
        <button
          alt="Submit Password"
          aria-label="Submit Password"
          className="bg-black w-full border-none mb-4 hover:bg-white hover:text-black text-white py-2 px-4"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="text-center text-xs">©2018 GrowReel All rights reserved.</p>
    </div>
  );
};

export default passwordReset;
