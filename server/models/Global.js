const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//========================
// SCHEMAS
// -----------------------

/** Template for global object */
let GlobalSchema = Schema({
  trends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityRecord"
    }
  ],
  activity: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityRecord"
    }
  ],
  recordFrom: String,
  period: String
});

module.exports = GlobalSchema;
