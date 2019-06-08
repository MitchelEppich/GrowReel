const registerConfirmation = props => {
  return (
    <div className="mb-2">
      <label
        className="block text-sm font-bold mb-2"
        htmlFor="passwordConfirmation"
      >
        Confirm Password
      </label>
      <input
        aria-label="Confirm Password Input"
        className="shadow appearance-none w-full py-2 px-3 mb-1 leading-tight"
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
      <div className="mb-3 mt-2 inline-flex">
        <input
          aria-label="User Agreement Input"
          className="ml-2 mt-0 mr-2 mb-0"
          id="userAgreement"
          name="password"
          type="checkbox"
          required="required"
        />
        <label
          className="text-xs text-white font-bold mb-2"
          htmlFor="userAgreement"
        >
          I agree with the{" "}
          <a
            href="./agreement"
            target="_blank"
            className="text-white font-bold mb-2 hover:text-teal"
          >
            terms of service
          </a>
        </label>
      </div>
    </div>
  );
};
export default registerConfirmation;
