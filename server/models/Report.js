const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for history object */
let ReportSchema = Schema({
  type: String,
  body: String
});

module.exports = ReportSchema;
