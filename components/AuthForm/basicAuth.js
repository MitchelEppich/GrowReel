const basicAuth = props => {
  return (
    <React.Fragment>
      <div className="mb-1">
        <label className="block  text-sm font-bold mb-1" htmlFor="email">
          Email
        </label>
        <input
          aria-label="Email Input"
          className="shadow appearance-none border w-full py-2 px-3 leading-tight"
          id="email"
          name="email"
          type={props.showRegisterAuth ? "email" : "text"}
          placeholder="Email"
          required="required"
          onInvalid={e => {
            if (props.showRegisterAuth)
              e.target.setCustomValidity(
                'Must be valid email and should contain "@"'
              );
          }}
          onChange={e => {
            e.target.setCustomValidity("");
          }}
          pattern={
            props.showRegisterAuth
              ? "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$"
              : null
          }
        />
        <p className="text-red font-bold p-2">{props.emailError}</p>
      </div>
      <div className="mb-1">
        <label className="block text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          aria-label="Password Input"
          className="shadow appearance-none w-full py-2 px-3 mb-1 leading-tight"
          id="password"
          name="password"
          type="password"
          placeholder="******************"
          required="required"
          onInvalid={e => {
            if (props.showRegisterAuth)
              e.target.setCustomValidity(
                "Password needs minimum 8 characters, 1 Uppercase/Lowercase letter and 1 number"
              );
          }}
          onChange={e => {
            e.target.setCustomValidity("");
          }}
          pattern={
            props.showRegisterAuth ? "(?=.*[a-z])(?=.*[A-Z]).{8,}" : null
          }
        />
      </div>
    </React.Fragment>
  );
};

export default basicAuth;
