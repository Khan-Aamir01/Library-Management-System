const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Fine = require("../models/fine");
const Borrow = require("../models/borrow");

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

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error due to " + error });
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
  try {
    const borrow = await Borrow.find({ userId: req.params.id });
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
  deleteUser,
  getUserFine,
  getUserBorrow,
  getUserBorrowStatus,
  getUserFineStatus,
};
