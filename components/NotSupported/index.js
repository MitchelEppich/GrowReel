import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Offline = props => {
  return (
    <div className="w-full flex-1 h-screen content-center text-center">
      {/* <img src="../images/Thumbnail.png" alt="No Internet" class="img-error" /> */}
      <FontAwesomeIcon
        icon="exclamation-circle"
        className="img-error fa-10x sm:fa-5x"
      />
      <h1 className="mt-10 text-6x1 sm:text-lg">Ooops... that sucks!</h1>
      <h3 className="mt-2 text-5x1 sm:text-lg px-5">
        Unfortunately, we do not support your browser!
      </h3>
      <p className="text-5x1 sm:text-lg">
        Please, choose one of these to download and enjoy our website.
      </p>
      <div className="w-full browsers-list">
        <div className="browser-item text-center">
          <a href="https://www.google.com/chrome/" target="_blank">
            <img
              src="../static/images/browser_icons/logo-chrome.png"
              alt="logo chrome"
              className="logo-browsers text-center"
            />
            <p className="text-center text-white">Chrome</p>
          </a>
        </div>
        <div className="browser-item text-center">
          <a href="https://www.mozilla.org/pt-PT/firefox/new/" target="_blank">
            <img
              src="../static/images/browser_icons/logo-firefox.png"
              alt="logo firefox"
              className="logo-browsers text-center"
            />
            <p className="text-center text-white">Firefox</p>
          </a>
        </div>
        <div className="browser-item text-center">
          <a href="https://www.opera.com/pt-br/download" target="_blank">
            <img
              src="../static/images/browser_icons/logo-opera.png"
              alt="logo opera"
              className="logo-browsers text-center"
            />
            <p className="text-center text-white">Opera</p>
          </a>
        </div>
        <div className="browser-item text-center">
          <a href="https://support.apple.com/downloads/safari" target="_blank">
            <img
              src="../static/images/browser_icons/logo-safari.png"
              alt="logo safari"
              className="logo-browsers text-center"
            />
            <p className="text-center text-white">Safari</p>
          </a>
        </div>
      </div>
      <div className="w-full">
        <p className="line-through text-black mt-24">
          Internet Explorer and Edge sucks
        </p>
      </div>
    </div>
  );
};

export default Offline;
