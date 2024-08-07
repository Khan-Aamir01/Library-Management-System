const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth/userAuth");
const { loginAdmin, adminProfile } = require("../controllers/auth/adminAuth");

// user
router.post("/register", register);
router.post("/login", login);

// admin
router.post("/adminlogin", loginAdmin);
router.get("/adminProfile", adminProfile);

module.exports = router;
