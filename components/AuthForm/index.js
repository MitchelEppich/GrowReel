/***************************/
/*The login/register form
/***************************/
import AuthError from "./authError";
import CloseForm from "./closeForm";
import ForgotPassword from "./forgotPassword";
import BasicAuth from "./basicAuth";
import LoginButtons from "./loginButtons";
import RegisterButtons from "./registerButtons";
import RegisterUsername from "./registerUsername";
import RegisterConfirmation from "./registerConfirmation";

const AuthForm = props => {
  let showClass = props.show ? "authForm" : "authForm--hide";
  return (
    <div className={"fixed w-80 max-w-sm sm:mt-5 " + showClass}>
      {props.authError ? <AuthError {...props} /> : null}
      <CloseForm {...props} />
      {!props.forgotPassword ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            const form = event.target;
            const formData = new window.FormData(form);
            if (props.showRegisterAuth) {
              props
                .register(
                  formData.get("username"),
                  formData.get("email"),
                  formData.get("password"),
                  () => {
                    props.closeAllHandler();
                    form.reset();
                  }
                )
                .then(res => {
                  if (res != null && res.includes("email"))
                    props.setEmailError("Email already in use!");
                  else props.setEmailError("");
                  if (res != null && res.includes("username"))
                    props.setUsernameError("Username is not avaliable!");
                  else props.setUsernameError("");
                });
            } else {
              props
                .login(formData.get("email"), formData.get("password"), () => {
                  props.closeAllHandler();
                  form.reset();
                })
                .then(res => {
                  props.setEmailError(res);
                });
            }
          }}
          className="w-full h-full bg-semi-transparent text-white shadow-md px-4 pt-6 pb-8 mb-4"
        >
          {props.showRegisterAuth ? <RegisterUsername {...props} /> : null}
          <BasicAuth {...props} />
          {props.showRegisterAuth ? <RegisterConfirmation {...props} /> : null}
          {!props.showRegisterAuth ? (
            <LoginButtons {...props} />
          ) : (
            <RegisterButtons {...props} />
          )}
        </form>
      ) : (
        <ForgotPassword {...props} />
      )}
      <p className="text-center text-xs">©2018 GrowReel All rights reserved.</p>
    </div>
  );
};

export default AuthForm;
