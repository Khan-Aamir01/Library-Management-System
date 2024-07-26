const Admin = require("../models/admin");

const loginAdmin = async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const admin = await Admin.findOne({ gmail });
    if (!admin) {
      return res.status(404).json({ message: "Invalid Credentials" });
    }
    if (password === admin.password) {
      return res.status(200).json(admin);
    }
  } catch (error) {
    res.status(500).json({ message: "server error due to " + error });
  }
};

module.exports = { loginAdmin };
