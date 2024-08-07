const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      expiresIn: "1h",
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

const register = async (req, res) => {
  const { name, image, gmail, password, address, phoneNumber } = req.body;
  try {
    const checkGmail = await User.find({ gmail: gmail });
    if (checkGmail.length > 0) {
      console.log(checkGmail);
      return res.status(200).json({ message: "Email Already Exist" });
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
    res.status(500).json({ message: "server error due to " + error });
  }
};
// Funtion to hash the passord
const hashPassword = async (password) => {
  const saltRound = 10;
  try {
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; //Add throw error for security
  }
};
module.exports = {
  register,
  userProfile,
  login,
};
