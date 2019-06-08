const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for list object */
var listSchema = Schema({
  key: String,
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  regex: String,
  sort: { type: String, deafult: '{ "createdAt" : 1 }' },
  url: String,
  href: String,
  icon: String,
  minLimit: { type: Number, default: 18 },
  maxLimit: { type: Number, default: 72 }
});

module.exports = listSchema;
