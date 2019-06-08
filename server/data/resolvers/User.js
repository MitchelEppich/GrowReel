const { User, HistoryElement, Video } = require("../../models");

const { userFilters } = require("./functions");

const S3 = require("./S3");

const resolvers = {
  Query: {
    user: (_, args) => {
      return User.findOne(args);
    },
    allUsers: (_, { filter }) => {
      let query = filter ? { $or: userFilters(filter) } : {};
      return User.find(query);
    },
    verifyToken: async (_, args) => {
      // const user = await resolvers.Query.currentUser();
      const user = await User.findOne({
        jwt:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc0NGNkMDc2MGMyMDI0YzhiNTMyOTUiLCJlbWFpbCI6InBvb3BAcG9vcCIsImlhdCI6MTUzNDM0ODQ5NiwiZXhwIjoxNTM0MzU5Mjk2fQ.IoIG4f-yla4eVxPiC1Ht8kBRJRHC18yfYCckjtSzRM8"
      });
      user.verifyToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc0NGNkMDc2MGMyMDI0YzhiNTMyOTUiLCJlbWFpbCI6InBvb3BAcG9vcCIsImlhdCI6MTUzNDM0ODQ5NiwiZXhwIjoxNTM0MzU5Mjk2fQ.IoIG4f-yla4eVxPiC1Ht8kBRJRHC18yfYCckjtSzRM8",
        res => console.log("HELLO", res)
      );
      return user;
    }
  },
  User: {
    subscriptions(user) {
      return User.find({ _id: { $in: user.subscriptions } }).limit(5);
    },
    history(user) {
      return HistoryElement.find({ _id: { $in: user.history } }).limit(10);
    }
  },
  Mutation: {
    login: async (_, { input }) => {
      let user = await User.findOne({
        email: input.email.toLowerCase()
      });

      if (!user) {
        throw new Error("Email not found");
      }

      const validPassword = user.validPassword(input.password);
      if (!validPassword) {
        throw new Error("Password is incorrect");
      }
      user.jwt = user.createToken();

      await user.save();

      user = user.toObject();
      delete user.password;

      return user;
    },
    register: async (_, { input }) => {
      // let existingUser;
      // existingUser = await User.findOne({
      //   email: input.email.toLowerCase()
      // });

      // if (existingUser) {
      //   throw new Error("Email already used");
      // }

      // existingUser = await User.findOne({ username: input.username });

      // if (existingUser) {
      //   throw new Error("Username already used");
      // }

      let user = new User({
        ...input
      });

      user.jwt = user.createToken();

      await user.save();

      user = user.toObject();
      delete user.password;

      return user;
    },
    toggleSubscribeUser: async (_, { input }) => {
      const user = await User.findById(input.userID);
      const oUser = await User.findById(input.oUserID);
      if (oUser.subscribers.indexOf(user._id) == -1) {
        user.subscriptions.push(oUser._id);
        oUser.subscribers.push(user._id);
      } else {
        user.subscriptions.pop(oUser._id);
        oUser.subscribers.pop(user._id);
      }
      user.save();
      oUser.save();

      return {
        subscriptions: user.subscriptions
      };
    },
    destroyUser: async (_, { id }) => {
      User.findByIdAndRemove(id, async (err, data) => {
        if (err || !data) {
          // console.log("error in deleting user");
          // console.log(err);
        } else {
          const { history, has_avatar, username, _id } = data;
          // Remove history
          for (id of history.toObject()) {
            HistoryElement.findByIdAndRemove(id);
          }
          // Remove videos
          let videos = await Video.find({ _username: username });
          for (video of videos) {
            if (!video.path || video.path == "") continue;
            S3.Mutation.deleteS3(_, { input: { filename: `${video.path}/` } });
            video.remove();
          }
          // Remove avatar
          if (has_avatar) {
            S3.Mutation.deleteS3(_, { input: { filename: `users/${_id}/` } });
          }
        }
      });
    },
    updateUser: async (_, { input }) => {
      let user;
      try {
        user = (await User.findOneAndUpdate(
          { $or: [{ _id: input.id }, { email: input.email }] },
          {
            $set: { ...input },
            $inc: {
              total_likes: input.new_like ? 1 : 0,
              total_views: input.new_view ? 1 : 0
            }
          },
          { new: true }
        )).toObject();

        delete user.password;

        return user;
      } catch (error) {
        console.log("No user object was found -> ", input);
        return null;
      }
    }
  }
};

module.exports = resolvers;
