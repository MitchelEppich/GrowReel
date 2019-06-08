const { Video, User, Comment } = require("../../models");

const { videoFilters } = require("./functions");

const UserResolvers = require("./User");
const GlobalResolvers = require("./Global");

const resolvers = {
  Query: {
    video: (_, args) => {
      return Video.findOne(args);
    },
    allVideos: async (
      _,
      { filter, cursor, limit, sort, hasAccess = false }
    ) => {
      let query = {};
      let vf;
      if (filter) {
        vf = await videoFilters(filter);
        query = { $or: vf };
      }

      if (vf[0] != null) {
        if (!vf[0].videos) {
          let q = { $and: [query] };
          if (!hasAccess) {
            q["state"] = 1;
            q["disable"] = false;
          }
          return Video.find(q)
            .sort({ createdAt: -1 })
            .limit(limit || null)
            .skip(cursor || 0);
        } else {
          return vf[0].videos;
        }
      } else return [];
    }
  },
  Video: {
    user(video) {
      return User.findById(video.user);
    },
    comments(video) {
      return Comment.find({ video: video._id })
        .sort({ createdAt: -1 })
        .limit(10);
    }
  },
  Mutation: {
    createVideo: async (_, { input }) => {
      const video = new Video({
        ...input
      });
      await video.save();

      return video.toObject();
    },
    updateVideo: async (_, { input }) => {
      const video = await Video.findByIdAndUpdate(
        input.id,
        {
          $set: { ...input }
        },
        { new: true }
      );

      video.save();

      return video.toObject();
    },
    deleteVideo: async (_, { path }) => {
      await Video.remove({ path: path });
    },
    toggleLikeVideo: async (_, { input }) => {
      const video = await Video.findById(input.id);
      const user = await User.findById(input.user);
      if (video.likes.indexOf(user._id) == -1) {
        video.likes.push(user._id);
        user.likes.push(input.id);

        // Add View to global tracker
        GlobalResolvers.Mutation.upsertGlobal(_, {
          input: {
            tags: video.tags,
            videos: [video._id],
            new_like: true
          }
        });

        // Add Like to User Total
        UserResolvers.Mutation.updateUser(_, {
          input: {
            id: input.user,
            new_like: true
          }
        });
      } else {
        video.likes.pull(input.user);
        user.likes.pull(input.id);
      }
      video.save();
      user.save();

      return { likes: video.likes };
    },
    appendView: async (_, { input }) => {
      let video = await Video.findById(input.id);
      video.views += 1;
      // Add View to global tracker
      GlobalResolvers.Mutation.upsertGlobal(_, {
        input: {
          tags: video.tags,
          videos: [video._id],
          new_view: true
        }
      });

      // Add View to User Total
      UserResolvers.Mutation.updateUser(_, {
        input: {
          id: input.user,
          new_view: true
        }
      });

      video.save();
      return { views: video.views };
    },
    applyVideoTags: async (_, { input }) => {
      const video = await Video.findById(input.id);
      video.tags.push(...input.tags);
      video.save();
    }
  }
};

module.exports = resolvers;
