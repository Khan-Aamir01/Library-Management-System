const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Fine = require("../models/fine");
const Borrow = require("../models/borrow");
const Otp = require("../models/otp");
const sendPasswordResetOTP = require("../services/updatePassEmailService");

//Get User
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

//Get User by ID
const getUserbyID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

//Update User
const updateUser = async (req, res) => {
  const { name, image, gmail, password, address, phoneNumber } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name || user.name;
    user.image = image || user.image;
    user.gmail = gmail || user.gmail;
    user.password = hashedPassword || user.password;
    user.address = address || user.address;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

// send otp for update password
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const user = await User.findOne({ gmail: email });
    if (!user) {
      return res.status(409).json({ message: "Check your email" });
    }

    let otpUser = await Otp.findOne({ email });
    if (!otpUser) {
      const generateOtp = () =>
        Math.floor(1000 + Math.random() * 9000).toString();
      const otp = generateOtp();

      otpUser = new Otp({ email, otp });
      await otpUser.save();

      // Send OTP to user email
      sendPasswordResetOTP(otp, email);
      return res
        .status(200)
        .json({ message: "OTP has been sent to your email" });
    } else {
      return res.status(409).json({ message: "OTP already sent to the email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// update user password
const updateUserPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // Validate input
  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide all required information." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ gmail: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Find OTP entry by email
    const otpUser = await Otp.findOne({ email });
    if (!otpUser || otpUser.otp !== otp) {
      return res
        .status(401)
        .json({ message: "OTP is invalid or has expired." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    // Delete the OTP entry after successful password update
    await Otp.deleteOne({ email });

    return res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const checkBorrowStatus = await Borrow.find({
    userId,
    status: { $nin: ["Returned", "Expired", "NotReturned"] },
  });

  if (checkBorrowStatus.length > 0) {
    return res.status(401).json({ message: "Please return all books" });
  }

  const checkFine = await Fine.find({ userId });
  if (checkFine.length > 0) {
    return res.status(401).json({ message: "Please pay fine" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error due to " + error.message });
    return;
  }
};

// Get User Fine History
const getUserFine = async (req, res) => {
  try {
    const fine = await Fine.find({ userId: req.params.id });
    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

// Get User Fine History with Status (Paid,unPaid)
const getUserFineStatus = async (req, res) => {
  try {
    const fine = await Fine.find({
      userId: req.params.id,
      status: req.params.status,
    });
    res.status(200).json(fine);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

// Get user Borrow History
// Can make both function as a single function
const getUserBorrow = async (req, res) => {
  const userId = req.params.id;
  try {
    const borrow = await Borrow.find({ userId });
    res.status(200).json(borrow);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

// Get Borrow History with status (Waiting,Expired,Borrowed,Returned,NotReturned)
const getUserBorrowStatus = async (req, res) => {
  try {
    const borrow = await Borrow.find({
      userId: req.params.id,
      status: req.params.status,
    });
    res.status(200).json(borrow);
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
  }
};

module.exports = {
  getAllUser,
  getUserbyID,
  updateUser,
  sendOtp,
  updateUserPassword,
  deleteUser,
  getUserFine,
  getUserBorrow,
  getUserBorrowStatus,
  getUserFineStatus,
};
