const User = require("../../models/user");
const Otp = require("../../models/otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../../services/emailService");

const login = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail: gmail });
    if (!user) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }

    // Geberate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "server error due to " + error });
  }
};

// send user data/id after login
const userProfile = async (req, res) => {
  const token = req.header("user-Token");
  if (!token) {
    return res.status(401).json({ message: "Please login" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Please provide email" });
    }

    const user = await User.findOne({ gmail: email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    let otpUser = await Otp.findOne({ email });
    if (!otpUser) {
      const generateOtp = () =>
        Math.floor(1000 + Math.random() * 9000).toString();
      const otp = generateOtp();

      otpUser = new Otp({ email, otp });
      await otpUser.save();

      // Send OTP to user email
      await sendMail(otp, email);
      return res
        .status(200)
        .json({ message: "OTP has been sent to your email" });
    } else {
      return res.status(409).json({ message: "OTP already sent to the email" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const register = async (req, res) => {
  const { name, image, gmail, otp, password, address, phoneNumber } = req.body;

  if (!name || !gmail || !otp || !password || !address || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const otpUser = await Otp.findOne({ email: gmail });
  if (!otpUser || otpUser.otp !== otp) {
    return res.status(400).json({
      message: "OTP has expired or is invalid. " + otp + "and " + otpUser.otp,
    });
  }

  try {
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      image,
      gmail,
      password: hashedPassword,
      address,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to hash the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
};

module.exports = {
  sendOTP,
  register,
  userProfile,
  login,
};
