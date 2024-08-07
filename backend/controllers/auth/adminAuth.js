const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginAdmin = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const admin = await Admin.findOne({ gmail });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (password !== admin.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate jwt token
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "server error due to " + error });
  }
};

// User profile data
const adminProfile = async (req, res) => {
  const token = req.header("admin-Token");
  if (!token) {
    return res.status(401).json({ message: `Please login` });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(admin);
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = { loginAdmin, adminProfile };
