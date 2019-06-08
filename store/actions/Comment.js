import gql from "graphql-tag";
import { makePromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import Video from "./Video";

const actionTypes = {
  POST_COMMENT: "POST_COMMENT",
  APPEND_COMMENT: "APPEND_COMMENT",
  APPEND_VOTE_COMMENT: "APPEND_VOTE_COMMENT",
  FETCH_COMMENTS: "FETCH_COMMENTS",
  DELETE_COMMENT: "DELETE_COMMENT",
  REMOVE_COMMENT: "REMOVE_COMMENT",
  EDIT_COMMENT: "EDIT_COMMENT",
  UPDATE_COMMENT: "UPDATE_COMMENT",
  SET_COMMENT_BODY: "SET_COMMENT_BODY",
  SET_COMMENT_EDIT: "SET_COMMENT_EDIT"
};

const getActions = uri => {
  const objects = {
    postComment: (user, video, body) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.createComment,
          variables: {
            user: user._id,
            body: body,
            video: video._id
          }
        };

        makePromise(execute(link, operation)).then(data => {
          // Promise.resolve(
          //   dispatch(objects.appendComment(data.data.createComment, video))
          // );
          dispatch({
            type: actionTypes.POST_COMMENT
          });
        });
      };
    },
    deleteComment: (id, video) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.deleteComment,
          variables: {
            id: id,
            video: video._id
          }
        };

        return makePromise(execute(link, operation)).then(data => {
          dispatch({
            type: actionTypes.DELETE_COMMENT
          });
        });
      };
    },
    removeComment: (comment, video) => {
      return dispatch => {
        let id = comment._id;
        let comments = video.comments;
        let index = 0;
        for (let comm of comments) {
          if (id == comm._id) {
            comments.splice(index, 1, {
              _id: comm._id + "_deleted",
              body: "Comment has been deleted.",
              user: {
                username: "[ deleted ]"
              },
              createdAt: comm.createdAt,
              upvotes: [],
              downvotes: [],
              deleted: true,
              editedAt: comment.editedAt
            });

            break;
          }
          index++;
        }

        const videoActions = Video(uri);
        dispatch(videoActions.setComments(comments));

        dispatch({
          type: actionTypes.REMOVE_COMMENT
        });
      };
    },
    updateComment: (comment, video) => {
      return dispatch => {
        console.log(comment);
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.editComment,
          variables: {
            id: comment._id,
            body: comment.body,
            video: video._id,
            flags: comment.flags,
            user: comment.user,
            isUpvote: comment.isUpvote,
            upvotes: comment.upvotes,
            downvotes: comment.downvotes
          }
        };

        return makePromise(execute(link, operation)).then(data => {
          dispatch({
            type: actionTypes.UPDATE_COMMENT
          });
        });
      };
    },
    editComment: (comment, video) => {
      return dispatch => {
        let comments = video.comments;
        for (let comm of comments) {
          if (comment._id == comm._id) {
            comm.body = comment.body;
            comm.edited = comment.edited;
            comm.editedAt = comment.editedAt;
            comm.flags = comment.flags;
            comm.upvotes = comment.upvotes;
            comm.downvotes = comment.downvotes;
            break;
          }
        }
        const videoActions = Video(uri);
        dispatch(videoActions.setComments(comments));

        dispatch({
          type: actionTypes.EDIT_COMMENT
        });
      };
    },
    appendComment: (comments, video) => {
      return dispatch => {
        if (!video.comments.map(a => a._id).includes(comments[0]._id)) {
          video.comments = [...video.comments, ...comments].sort(function(
            a,
            b
          ) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
        }
        const videoActions = Video(uri);
        dispatch(videoActions.setComments(video.comments));

        dispatch({
          type: actionTypes.APPEND_COMMENT
        });
      };
    },
    appendVoteComment: (comment, userID, isUpvote) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: mutation.appendVoteComment,
          variables: {
            userID: userID,
            commentID: comment._id,
            isUpvote: isUpvote
          }
        };
        makePromise(execute(link, operation)).then(data => {
          let upvotes = data.data.appendVoteComment.upvotes;
          let downvotes = data.data.appendVoteComment.downvotes;
          Promise.resolve(
            dispatch({
              type: actionTypes.APPEND_VOTE_COMMENT,
              upvotes: upvotes,
              downvotes: downvotes,
              comment: comment
            })
          );
        });
      };
    },
    setCommentBody: value => {
      return {
        type: actionTypes.SET_COMMENT_BODY,
        value: value
      };
    },
    setCommentEdit: value => {
      return {
        type: actionTypes.SET_COMMENT_EDIT,
        value: value
      };
    },
    // PAGINATION
    fetchComments: (video, cursor, limit) => {
      return dispatch => {
        const link = new HttpLink({ uri, fetch: fetch });
        const operation = {
          query: query.fetchComments,
          variables: {
            video: video._id,
            cursor: cursor,
            limit: limit
          }
        };
        return makePromise(execute(link, operation)).then(data => {
          let comments = data.data.allComments;

          dispatch({
            type: actionTypes.FETCH_COMMENTS
          });
          return Promise.resolve(comments);
        });
      };
    }
  };

  return { ...objects };
};

const mutation = {
  deleteComment: gql`
    mutation($id: String, $video: String) {
      destroyComment(input: { _id: $id, video: $video }) {
        _id
      }
    }
  `,
  editComment: gql`
    mutation(
      $id: String
      $video: String
      $body: String
      $flags: [String]
      $user: String
      $isUpvote: Boolean
      $upvotes: [String]
      $downvotes: [String]
    ) {
      updateComment(
        input: {
          _id: $id
          body: $body
          video: $video
          flags: $flags
          user: $user
          isUpvote: $isUpvote
          upvotes: $upvotes
          downvotes: $downvotes
        }
      ) {
        _id
      }
    }
  `,
  createComment: gql`
    mutation($body: String!, $user: String!, $video: String!) {
      createComment(input: { body: $body, user: $user, video: $video }) {
        _id
        body
        user {
          _id
          username
        }
        upvotes {
          _id
        }
        downvotes {
          _id
        }
        createdAt
      }
    }
  `,
  appendVoteComment: gql`
    mutation($userID: String!, $commentID: String!, $isUpvote: Boolean) {
      appendVoteComment(
        input: { userID: $userID, commentID: $commentID, isUpvote: $isUpvote }
      ) {
        upvotes {
          _id
        }
        downvotes {
          _id
        }
      }
    }
  `
};

const subscription = {
  commentAdded: gql`
    subscription($video: String) {
      commentAdded(video: $video) {
        _id
        body
        user {
          _id
          username
        }
        upvotes {
          _id
        }
        downvotes {
          _id
        }
        createdAt
      }
    }
  `
};

const query = {
  fetchComments: gql`
    query($video: String, $cursor: Int, $limit: Int) {
      allComments(
        filter: { OR: [{ video_equals: $video }] }
        cursor: $cursor
        limit: $limit
      ) {
        _id
        body
        createdAt
        downvotes {
          _id
        }
        upvotes {
          _id
        }
        video {
          _id
        }
        user {
          _id
          username
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
