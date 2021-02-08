//contains the user data as stored in the DB
const monogoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT = 10;

require("dotenv").config;

const userSchema = monogoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    minLength: 8,
  },
  phone: {
    type: Number,
    minLength: 10,
    maxLength: 14,
  },
  firstName: String,
  lastName: String,
  dob: String,
  lastLogin: Number,
  device: String,
  verified: {
    type: Boolean,
    default: 0,
  },
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
