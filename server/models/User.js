const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const { Video } = require("../models");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  // Stores the user specified username
  username: String,
  // Stores the user specified BUT server modified encrypted password
  password: String,
  // Stores the user specified email address
  email: String,
  // // Stores the user specified description
  description: String,
  ig_url: String,
  fb_url: String,
  tw_url: String,
  total_views: Number,
  total_likes: Number,
  feature_path: String,
  has_avatar: { type: Boolean, default: false },
  // Stores all the user the current user is subscribed to
  history: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HistoryElement"
    }
  ],
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // // Stores all the users who are subscribed to the current user
  subscribers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  // // Stores all the user liked videos for the current user
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    }
  ],
  // deleted: { type: Boolean, default: false },
  jwt: String,
  xp: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  age_verified: { type: Boolean, default: false },
  messages: {
    type: [String],
    default: []
  },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// adds a method to a user document object to create a hashed password
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// adds a method to a user document object to check if provided password is correct
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.createToken = function() {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TOKEN_EXPIRE
    }
  );
};

UserSchema.methods.verifyToken = (token, callback) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // console.log("VERIFY TOKEN", err, decoded);

    let current_time = new Date().getTime() / 1000;

    if (current_time > decoded.exp) {
      console.log("JWT is expired");
    }

    if (decoded.exp - decoded.iat != process.env.JWT_TOKEN_EXPIRE) {
      console.log("JWT is not authentic");
    }

    if (err) {
      return callback(err);
    }

    return callback(decoded);
  });
};

// middleware: before saving, check if password was changed,
// and if so, encrypt new password before saving:
UserSchema.pre("findOneAndUpdate", function(next) {
  // Hash the password if updated
  if (this._update.$set.password) {
    this._update.$set.password = this.schema.methods.generateHash(
      this._update.$set.password
    );
  }
  next();
});
UserSchema.pre("save", function(next) {
  if (this.isModified("password")) {
    this.password = this.generateHash ? this.generateHash(this.password) : null;
  }
  next();
});

module.exports = UserSchema;
