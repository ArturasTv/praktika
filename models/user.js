const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  facebookID: {
    type: String,
    required: true,
  },
  apiID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("testas", userSchema);
