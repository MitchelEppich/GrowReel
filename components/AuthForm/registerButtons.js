


const register = props => {
  return (
    <div>
      <button
        alt="Register"
        aria-label="Register"
        className="bg-black w-full border-none mb-2 hover:bg-white hover:text-black text-white py-2 px-4"
        type="submit"
      >
        Register
              </button>
      <hr className="w-full mb-4 hr" />
      <a
        onClick={props.showRegisterHandler}
        className="w-full inline-block text-center text-white align-baseline text-sm cursor-pointer"
      >
        Already a user? Login
              </a>
    </div>
  )
}

export default register;