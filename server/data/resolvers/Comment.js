const { Comment, User } = require("../../models");

const { PubSub, withFilter } = require("graphql-subscriptions");

const { commentFilters } = require("./functions");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    comment: (_, args) => {
      return Comment.findOne(args);
    },
    allComments: (_, { filter, cursor, limit }) => {
      let query = filter ? { $or: commentFilters(filter) } : {};
      return Comment.find(query)
        .sort({ createdAt: -1 })
        .skip(cursor || 0)
        .limit(limit || null);
    }
  },
  Comment: {
    user(comment) {
      return User.findById(comment.user);
    }
  },
  Subscription: {
    commentAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("commentAdded"),
        (payload, variables) => {
          // console.log(
          //   payload,
          //   variables,
          //   payload.commentAdded.video == variables.video
          // );
          return payload.commentAdded.video == variables.video;
        }
      )
      // subscribe: () => pubsub.asyncIterator("commentAdded")
    }
  },
  Mutation: {
    createComment: async (_, { input }) => {
      const comment = new Comment({
        ...input
      });

      await comment.save();
      pubsub.publish("commentAdded", {
        commentAdded: { ...comment.toObject(), _type: "ADDED" }
      });

      return comment.toObject();
    },
    updateComment: async (_, { input }) => {
      let user = input.user;
      delete input.user;
      if (user != null) {
        // Locate
        let uindex = input.upvotes.indexOf(user);
        let dindex = input.downvotes.indexOf(user);

        // Remove
        if (uindex != -1) input.upvotes.splice(uindex, 1);
        if (dindex != -1) input.downvotes.splice(dindex, 1);

        // Add
        if (input.isUpvote) {
          if (uindex == -1) input.upvotes.push(user);
        } else if (dindex == -1) input.downvotes.push(user);
      }
      if (input.body != null) {
        input.edited = true;
        input.editedAt = new Date();
      }
      let comment;
      try {
        comment = await Comment.findOneAndUpdate(
          { $or: [{ _id: input._id }] },
          {
            $set: { ...input }
          },
          { new: true }
        );

        pubsub.publish("commentAdded", {
          commentAdded: { ...comment.toObject(), _type: "EDITED" }
        });

        return comment.toObject();
      } catch (error) {
        console.log("No comment was found -> ", input);
        return null;
      }
    },
    destroyComment: async (_, { input }) => {
      pubsub.publish("commentAdded", {
        commentAdded: {
          _id: input._id,
          video: input.video,
          editedAt: new Date(),
          _type: "REMOVED"
        }
      });
      await Comment.remove({ _id: input._id });
    },
    appendVoteComment: async (_, { input }) => {
      const comment = await Comment.findById(input.commentID);
      const user = await User.findById(input.userID);

      if (input.isUpvote) {
        if (comment.upvotes.indexOf(input.userID) != -1) {
          comment.upvotes.pull(input.userID);
        } else {
          comment.upvotes.push(input.userID);
          comment.downvotes.pull(input.userID);
        }
      } else {
        if (comment.downvotes.indexOf(input.userID) != -1) {
          comment.downvotes.pull(input.userID);
        } else {
          comment.downvotes.push(input.userID);
          comment.upvotes.pull(input.userID);
        }
      }

      comment.save();
      user.save();
      return {
        upvotes: comment.upvotes,
        downvotes: comment.downvotes
      };
    }
  }
};

module.exports = resolvers;
