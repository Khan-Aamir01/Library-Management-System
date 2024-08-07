const express = require("express");
const router = express.Router();

const {
  register,
  userProfile,
  login,
} = require("../controllers/auth/userAuth");
const { loginAdmin, adminProfile } = require("../controllers/auth/adminAuth");

// user
router.post("/register", register);
router.get("/userProfile", userProfile);
router.post("/login", login);

// admin
router.post("/adminlogin", loginAdmin);
router.get("/adminProfile", adminProfile);

module.exports = router;
