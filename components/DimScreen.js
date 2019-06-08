/***************************/
/*This is the semi-opaque
overlay pulled up for certain
events
/***************************/

import Link from "next/link";

const dimScreen = props => {
  let error = "";

  return (
    <Link
      href="/"
      as={
        window.location.pathname.includes("watch")
          ? window.location.pathname
          : ""
      }
    >
      <div
        style={{
          transform: props.showScreen
            ? "translateY(0px)"
            : "translateY(-100vh)",
          WebkitTransform: props.showScreen
            ? "translateY(0px)"
            : "translateY(-100vh)",
          MozTransform: props.showScreen
            ? "translateY(0px)"
            : "translateY(-100vh)",
          MsTransform: props.showScreen
            ? "translateY(0px)"
            : "translateY(-100vh)",
          OTransform: props.showScreen
            ? "translateY(0px)"
            : "translateY(-100vh)",
          opacity: props.showScreen ? 0.9 : 0
        }}
        onClick={props.closeAllHandler}
        className="dimScreen z-dim h-screen"
      >
        {error != "" ? (
          <div className="bg-barStatus w-full h-auto sm:mt-20 mt-10 text-sm lg:text-sm text-black pt-10 pb-4 text-center">
            <h2 className="font-bold" style={{ whiteSpace: "pre" }}>
              {error}
            </h2>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default dimScreen;
