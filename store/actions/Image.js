/*******************************************/
/*Image Actions for all image related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";

import axios from "axios";
import moment from "moment";

import crypto from "crypto";
import evaporate from "evaporate";

const actionTypes = {
  DESTROY_IMAGE: "DESTROY_IMAGE",
  UPLOAD_IMAGE: "UPLOAD_IMAGE"
};

const getActions = uri => {
  const objects = {
    destroyImage: () => {},
    uploadImage: (dataURL, path, key, bucket) => {
      return dispatch => {
        let base64 = prepareImage(dataURL, key);

        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.signS3,
          variables: {
            filename: path + "/" + base64.Key,
            filetype: base64.ContentType,
            bucket: bucket
          }
        }; // ... /thumbnail

        makePromise(execute(link, operation)).then(data => {
          const { signedRequest } = data.data.signS3;

          uploadToS3(base64.Body, signedRequest);

          dispatch({
            type: actionTypes.UPLOAD_IMAGE
          });
        });
        // .catch(error => console.log(error));
      };
    }
  };

  return { ...objects };
};

const prepareImage = (dataURL, key) => {
  let blobData = dataURItoBlob(dataURL);
  let fileName = key;
  let params = {
    Key: fileName,
    ContentType: "image/webp",
    ContentEncoding: "base64",
    Body: blobData
  };

  return params;
};

function dataURItoBlob(dataURI) {
  let binary = atob(dataURI.split(",")[1]);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/webp" });
}

async function uploadToS3(file, signedRequest, progress, uploadComplete) {
  const options = {
    headers: {
      "Content-Type": file.type,
      "Access-Control-Allow-Origin": "*"
    },
    onUploadProgress: function(progressEvent) {
      let percentCompleted = Math.floor(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      // console.log(percentCompleted);
      if (progress) {
        progress.innerHTML = percentCompleted + "%";
        progress.style.backgroundSize = percentCompleted + "% 100%";
      }
    }
  };
  await axios.put(signedRequest, file, options, uploadComplete).then(res => {
    // alert("Successfully uploaded! " + (res.config.data.name || "Thumbnail"));
    if (progress) {
      progress.innerHTML = "Upload Successful!";
      setTimeout(() => {
        return true;
      }, 5000);
      uploadComplete();
    }
  });
}

const query = {};

const mutation = {
  signS3: gql`
    mutation($filename: String, $filetype: String, $bucket: String) {
      signS3(
        input: { filename: $filename, filetype: $filetype, bucket: $bucket }
      ) {
        url
        signedRequest
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
