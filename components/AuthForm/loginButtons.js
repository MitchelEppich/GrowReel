const loginButtons = props => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button
          alt="Login"
          aria-label="Login"
          className="bg-black border-none hover:bg-white hover:text-black text-white py-2 px-4"
          type="submit"
        >
          Login
        </button>
        <a
          className="inline-block align-baseline text-white text-sm cursor-pointer"
          onClick={props.showForgotPasswordForm}
        >
          Forgot Password?
        </a>
      </div>
      <hr className="w-full mb-6 hr" />
      <div className="text-center">
        <a
          onClick={props.showRegisterHandler}
          className="inline-block text-center text-white align-baseline text-sm cursor-pointer"
        >
          Don't have an account? Register
        </a>
      </div>
    </div>
  );
};

export default loginButtons;
