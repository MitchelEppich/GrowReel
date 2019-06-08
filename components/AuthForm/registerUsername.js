const registerUsername = props => {
  return (
    <div className="mb-1">
      <label className="block text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        aria-label="Username Input"
        className="shadow appearance-none border w-full py-2 px-3 leading-tight"
        id="username"
        minLength="8"
        maxLength="16"
        name="username"
        type="text"
        placeholder="Username"
        required="required"
        onChange={e => {
          let value = e.target.value.toLowerCase().trim();
          let error = "";
          if (value.indexOf("admin") != -1) {
            error = "Username can not contain the word 'admin'";
          }
          if (value.indexOf("growreel") != -1) {
            error = "Username can not contain the word 'growreel'";
          }
          if (value.indexOf("moderator") != -1) {
            error = "Username can not contain the word 'moderator'";
          }
          if (value.indexOf(" ") != -1) {
            error = "Username can not contain spaces";
          }
          if (new RegExp(/[ !@#$%^&*()+=\[\]{};':"\\|,.<>\/?]/).test(value)) {
            error =
              "Username can not contain special characters (except '_' and '-')";
          }
          e.target.setCustomValidity(error);
        }}
      />
      <p className="text-red font-bold p-2">{props.usernameError}</p>
    </div>
  );
};
export default registerUsername;
