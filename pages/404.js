import withData from "../lib/withData";
import React, { Component } from "react";
import { connect } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

library.add(faExclamationCircle);

class _404 extends Component {
  render() {
    return (
      <div>
        <div className="w-full flex-1 h-screen content-center text-center">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="img-error fa-10x sm:fa-5x"
          />
          <h1 className="mt-10 title-message">404</h1>
          <h3 className="mt-2 mb-4 subtitle-message">Whoops... Page Not Found!</h3>
          <a href="../" className="p-2 bg-teal text-white border border-white hover:bg-black hover:text-white">
            Return to the Home!
          </a>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  state => state,
  mapDispatchToProps
)(withData(_404));
