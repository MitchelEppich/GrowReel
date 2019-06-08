const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for history object */
let HistoryElementSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video"
  },
  viewedAt: { type: Date, default: Date.now }
});

module.exports = HistoryElementSchema;
