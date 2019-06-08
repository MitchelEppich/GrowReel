const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for message object */
let MessageSchema = Schema({
  key: String,
  body: String,
  recipient: [String],
  subject: String,
  sentAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  sender: String
});

module.exports = MessageSchema;
