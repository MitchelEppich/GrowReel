const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for history object */
let EmailRequestSchema = Schema({
  type: String,
  email: String,
  expireAt: { type: Date, default: new Date() }
});

module.exports = EmailRequestSchema;
