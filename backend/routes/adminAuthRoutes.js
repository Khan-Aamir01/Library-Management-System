const express = require("express");
const router = express.Router();

const { loginAdmin } = require("../controllers/adminAuthController");

router.post("/adminlogin", loginAdmin)

module.exports = router;