const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // 300 seconds = 5 minutes(5 * 60 = 300)
  },
});

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp;
