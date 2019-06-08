/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

const actionTypes = {
  CREATE_REPORT: "CREATE_REPORT",
  SET_REPORT_TYPE: "SET_REPORT_TYPE"
};

const getActions = uri => {
  const objects = {
    createReport: (type, body) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.createReport,
          variables: { body: body, type: type }
        };
        makePromise(execute(link, operation)).then(data => {
          dispatch({ type: actionTypes.CREATE_REPORT });
        });
        // .catch(error => console.log(error));
      };
    },
    handleReportSubmit: (type, event, props) => {
      event.preventDefault();
      const form = event.target;
      let report = form.report.value;

      props.closeAllHandler();

      return objects.createReport(type, report);
    },
    setReportType: _type => {
      return {
        type: actionTypes.SET_REPORT_TYPE,
        _type: _type
      };
    }
  };

  return { ...objects };
};

const query = {};

const mutation = {
  createReport: gql`
    mutation($body: String, $type: String) {
      createReport(input: { body: $body, type: $type }) {
        body
        type
      }
    }
  `
};

export default uri => {
  const actions = getActions(uri);
  return {
    // TYPES
    ...actionTypes,
    // ACTIONS
    ...actions
  };
};
