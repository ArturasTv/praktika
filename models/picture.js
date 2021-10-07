const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  static: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  facebookID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("pictures", userSchema);
