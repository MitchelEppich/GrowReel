const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VIDEO_STATE = Object.freeze({
  UNPUBLISHED: 0,
  PUBLISHED: 1,
  UNLISTED: 2
});

//========================
// SCHEMAS
// -----------------------

/** Template for video object */
var VideoSchema = new Schema({
  // Stores the user specified title of the video
  title: String,
  // Stores the url to the thumb image
  has_thumbnail: { type: Boolean, default: false },
  // Stores the duration of the video
  duration: Number,
  // Stores the user specified video description
  description: String,
  path: String,
  // Stores the intial user who posted the video
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  _username: String,
  // Stores the url to where the video file is
  url: String,
  // Stores all posted comments on the video
  comments: [String],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  views: { type: Number, default: 0 },
  // Stores user specified tags for the video -> For relating videos to others
  tags: { type: [String], default: [] },
  // Stores intial date of creation
  createdAt: { type: Date, default: Date.now },
  deleted: { type: Boolean, default: false },
  ad: { type: Boolean, default: false },
  feature: { type: Boolean, default: false },
  live_url: String,
  live: { type: Boolean, deafult: false },
  monetize: { type: Boolean, default: false },
  mature: { type: Boolean, default: false },
  disable: { type: Boolean, default: false },
  state: { type: Number, default: VIDEO_STATE.UNPUBLISHED }
});

module.exports = VideoSchema;
