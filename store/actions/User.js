/*******************************************/
/*User Actions for all user related
dispatch actions*/
/******************************************/

import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import Image from "./Image";

const actionTypes = {
  SET_USER: "SET_USER",
  DESTROY_USER: "DESTROY_USER",
  TOGGLE_SUBSCRIBE_USER: "TOGGLE_SUBSCRIBE_USER",
  FETCH_USER_VIDEO_LIST: "FETCH_USER_VIDEO_LIST",
  APPEND_HISTORY: "APPEND_HISTORY",
  UPDATE_USER: "UPDATE_USER",
  REGISTER_STATUS: "REGISTER_STATUS",
  LOGIN_FAILED: "LOGIN_FAILED",
  RESET_PASSWORD: "RESET_PASSWORD",
  SEND_EMAIL: "SEND_EMAIL",
  DELETE_USER: "DELETE_USER"
};

const getActions = uri => {
  const objects = {
    login: (email, password, cb) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        // const token = sessionStorage.getItem("token");
        const operation = {
          query: mutation.login,
          variables: { email: email, password: password }
        };
        return makePromise(execute(link, operation))
          .then(data => {
            const user = data.data.login;
            if (user) {
              sessionStorage.setItem("token", user.jwt);
              Promise.resolve(dispatch(objects.setUser(user)));
              cb();
            } else {
              return "Email or Password are incorrect!";
            }
          })
          .catch(error => console.log(error));
      };
    },
    checkAccountAvailability: (username, email) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });

        const operation = {
          query: query.getUser,
          variables: { username: username, email: email }
        };
        return makePromise(execute(link, operation))
          .then(data => {
            data = data.data.allUsers;

            // No need for dispatch, add if needed

            return Promise.resolve(data);
          })
          .catch(error => console.log(error));
      };
    },
    resetPassword: (e, props, email) => {
      e.preventDefault();

      let _email = email ? email : props.email.request.email;
      let password = e.target.password.value;

      // add password to user, on save it will hash to database!!!!
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.updateUser,
          variables: { email: _email, password: password }
        };
        makePromise(execute(link, operation))
          .then(data => {
            dispatch({ type: actionTypes.RESET_PASSWORD });
          })
          .catch(error => console.log(error));
      };
    },
    register: (username, email, password, cb) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.register,
          variables: { username: username, email: email, password: password }
        };

        return dispatch(objects.checkAccountAvailability(username, email)).then(
          data => {
            if (data.length == 0) {
              makePromise(execute(link, operation))
                .then(data => {
                  let user = data.data.register;
                  if (user) {
                    sessionStorage.setItem("token", user.jwt);
                    dispatch(objects.emailUser("welcome", user.email));
                    Promise.resolve(dispatch(objects.setUser(user)));
                    cb();
                  }
                })
                .catch(error => {
                  // console.log(error);
                });
            } else {
              let errors = [];
              let sData = JSON.stringify(data).toLowerCase();
              if (sData.includes(username.toLowerCase())) {
                errors.push("username");
              }
              if (sData.includes(email.toLowerCase())) {
                errors.push("email");
              }
              return errors; //Qwertyui1234
            }
          }
        );
      };
    },
    handleForgotPasswordSubmit: (event, props) => {
      event.preventDefault();
      const form = event.target;
      let email = form.email.value;

      props.closeAllHandler();

      return objects.emailUser("passwordReset", email);
    },
    emailUser: (type, email) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.sendEmail,
          variables: { type: type, email: email }
        };
        makePromise(execute(link, operation))
          .then(data => {
            dispatch({ type: actionTypes.SEND_EMAIL });
          })
          .catch(error => console.log(error));
      };
    },
    setUser: user => {
      return { type: actionTypes.SET_USER, currentUser: user };
    },
    destroyUser: () => {
      sessionStorage.setItem("token", "");
      return { type: actionTypes.DESTROY_USER, currentUser: null };
    },
    fetchUser: () => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const token = sessionStorage.getItem("token");
        const operation = {
          query: query.getCurrentUser,
          variables: { jwt: token }
        };
        makePromise(execute(link, operation))
          .then(data => {
            const user = data.data.user;
            if (user) {
              Promise.resolve(dispatch(objects.setUser(user)));
            }
          })
          .catch(error => console.log(error));
      };
    },
    toggleSubscribeUser: (userID, oUserID) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.toggleSubscribeUser,
          variables: { userID: userID, oUserID: oUserID }
        };
        makePromise(execute(link, operation))
          .then(data => {
            Promise.resolve(
              dispatch({
                type: actionTypes.TOGGLE_SUBSCRIBE_USER,
                subscriptions: data.data.toggleSubscribeUser.subscriptions
              })
            );
          })
          .catch(error => console.log(error));
      };
    },
    fetchUserVideoList: videoList => {
      return dispatch => {
        let videoIds = videoList;
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = { query: query.videoList, variables: { videoIds } };
        makePromise(execute(link, operation))
          .then(data => {
            dispatch({
              type: actionTypes.FETCH_USER_VIDEO_LIST,
              videos: data ? data.data.allVideos : null
            });
          })
          .catch(error => console.log(error));
      };
    },
    deleteUser: id => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = { query: mutation.deleteUser, variables: { id: id } };

        makePromise(execute(link, operation))
          .then(data => {
            dispatch({ type: actionTypes.DELETE_USER });
          })
          .catch(error => console.log(error));
      };
    },
    updateUser: (user, input) => {
      return dispatch => {
        if (
          input.feature != null &&
          input.feature ==
            "https://s3.amazonaws.com/media.growreel.com/default/feature.mp4"
        )
          input.feature = undefined;
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.updateUser,
          variables: {
            id: user._id,
            ...input
          }
        };

        makePromise(execute(link, operation))
          .then(data => {
            if (input.has_avatar) {
              let path = `users/${user._id}`;
              const imageActions = Image(uri);
              dispatch(
                imageActions.uploadImage(
                  input.avatar,
                  path,
                  "avatar",
                  "media.growreel.com"
                )
              );
            }

            let userData = data.data.updateUser;

            dispatch({ type: actionTypes.UPDATE_USER, user: userData });
          })
          .catch(error => console.log(error));
      };
    }
  };
  return { ...objects };
};

const query = {
  getUser: gql`
    query($username: String, $email: String) {
      allUsers(
        filter: {
          OR: [{ username_equals: $username }, { email_equals: $email }]
        }
      ) {
        email
        username
      }
    }
  `,
  getCurrentUser: gql`
    query($jwt: String) {
      user(jwt: $jwt) {
        _id
        admin
        email
        username
        jwt
        messages
        subscriptions {
          _id
          username
        }
        age_verified
        history {
          _id
          viewedAt
          video {
            _id
            title
          }
        }
      }
    }
  `
};

const mutation = {
  deleteUser: gql`
    mutation($id: String!) {
      destroyUser(id: $id) {
        _id
      }
    }
  `,
  updateUser: gql`
    mutation($email: String, $password: String) {
      updateUser(input: { email: $email, password: $password }) {
        email
      }
    }
  `,
  sendEmail: gql`
    mutation($email: String, $type: String) {
      sendEmail(input: { email: $email, type: $type }) {
        _id
      }
    }
  `,
  updateUser: gql`
    mutation(
      $id: String
      $description: String
      $ig_url: String
      $fb_url: String
      $tw_url: String
      $has_avatar: Boolean
      $feature_path: String
      $new_view: Boolean
      $new_like: Boolean
      $email: String
      $password: String
      $age_verified: Boolean
    ) {
      updateUser(
        input: {
          id: $id
          description: $description
          ig_url: $ig_url
          fb_url: $fb_url
          tw_url: $tw_url
          has_avatar: $has_avatar
          feature_path: $feature_path
          new_like: $new_like
          new_view: $new_view
          email: $email
          password: $password
          age_verified: $age_verified
        }
      ) {
        description
        ig_url
        fb_url
        tw_url
        has_avatar
        feature_path
        total_views
        total_likes
        age_verified
      }
    }
  `,
  toggleSubscribeUser: gql`
    mutation($userID: String!, $oUserID: String!) {
      toggleSubscribeUser(input: { userID: $userID, oUserID: $oUserID }) {
        subscriptions {
          _id
          username
        }
      }
    }
  `,
  login: gql`
    mutation($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        _id
        email
        admin
        username
        jwt
        subscriptions {
          _id
          username
        }
        age_verified
        history {
          _id
          viewedAt
          video {
            _id
            title
          }
        }
        messages
      }
    }
  `,
  register: gql`
    mutation($username: String!, $email: String!, $password: String!) {
      register(
        input: { username: $username, email: $email, password: $password }
      ) {
        _id
        email
        admin
        username
        jwt
        subscriptions {
          _id
          username
        }
        age_verified
        messages
        history {
          _id
          viewedAt
          video {
            _id
            title
          }
        }
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
