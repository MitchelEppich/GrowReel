const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for video object */
var commentSchema = Schema({
  // Stores content of the message
  body: String,
  // Stores the user who wrote the message
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    // id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User"
    // },
    // username: String
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },
  upvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  downvotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // Stores the date of intial creation
  createdAt: { type: Date, default: Date.now },
  editedAt: Date,
  edited: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  flags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = commentSchema;
