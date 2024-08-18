const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null, // A URL of a default profile picture should be added
  },
  gmail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  dateOfJoin: {
    type: Date,
    default: () => {
      return new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
