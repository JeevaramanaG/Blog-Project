const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  proflieImage: {
    type: String,
  },
  coverImage: {
    type: String,
  },
});

const User = mongoose.model("user", userScheme);

module.exports = User;
