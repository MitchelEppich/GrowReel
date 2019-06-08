const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for history object */
let ActivityRecordSchema = Schema({
  key: String,
  likes: Number,
  views: Number,
  recordFor: String,
  period: String
});

module.exports = ActivityRecordSchema;
