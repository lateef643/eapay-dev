//contains the user data as stored in the DB
const monogoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config;

const SALT = 10;
const MAX_LOGIN = 5;
const LOCK_UNTIL = 0.5 * 60 * 60 * 1000; //lock the user out after 5consecutive failed login attempt

const userSchema = monogoose.Schema({
  username: String,
  email: { type: String, unique: 1 },
  password: { type: String, minLength: 8 },
  phone: { type: Number, minLength: 10, maxLength: 14, unique: 1 },
  firstname: String,
  lastname: String,
  dob: String,
  lastLogin: Number,
  device: String,
  newDevice: Boolean,
  token: String,
  verified: { type: Boolean, default: 0 },
  lockUntil: { type: Number, default: 0 },
  loginAttempt: { type: Number, default: 0 },
});

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next();
      user.password = hash;
      next();
    });
  });
});

monogoose.model("users", userSchema);
