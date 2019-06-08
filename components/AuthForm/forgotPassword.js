const forgotPassword = props => {
  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        props.handleForgotPasswordSubmit(event, props);
      }}
      className="w-full h-full bg-semi-transparent text-white shadow-md px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          aria-label="Email Input"
          className="shadow appearance-none border w-full py-2 px-3 leading-tight"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required="required"
        />
      </div>
      <div>
        <button
          alt="Submit"
          aria-label="Submit"
          className="bg-black w-full border-none mb-4 hover:bg-white hover:text-black text-white py-2 px-4"
          type="submit"
        >
          Submit
        </button>
        <hr className="w-full mb-4 hr" />
        <a
          alt="Forgot Password"
          onClick={props.showForgotPasswordForm}
          className="w-full inline-block text-center text-white align-baseline text-sm cursor-pointer"
        >
          Login
        </a>
      </div>
    </form>
  );
};
export default forgotPassword;
