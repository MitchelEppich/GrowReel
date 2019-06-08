/***************************/
/*Login/Logout button,
imports the logout button
and renders if user is signed in.
/***************************/

import LogoutButton from "./LogoutButton";

const authButton = props => {
  return (
    <button
      onClick={props.currentUser ? props.logOutHandler : props.showAuth}
      className="h-8 w-32 lg:w-32 mr-2 text-white authButton sm:hidden md:hidden"
      alt="User Authentication"
      aria-label="User Authentication"
    >
      {props.currentUser ? <LogoutButton /> : <p>Login or Register</p>}
    </button>
  );
};

export default authButton;
