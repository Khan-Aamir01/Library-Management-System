const express = require("express");
const router = express.Router();

const {
  getAllUser,
  getUserbyID,
  updateUser,
  sendOtp,
  updateUserPassword,
  deleteUser,
  getUserFine,
  getUserBorrow,
  getUserFineStatus,
  getUserBorrowStatus,
} = require("../controllers/userController");

router.get("/user", getAllUser);

router.get("/user/:id/fine/:status", getUserFineStatus); // Ex. user/@0u92193892381923/fine/Paid

router.get("/user/:id/fine", getUserFine); //Return all fine related to given user

router.get("/user/:id/borrow/:status", getUserBorrowStatus); // Ex. user/@34923849204934/borrow/Borrowed

router.get("/user/:id/borrow", getUserBorrow); // Return all borrow History of given user

router.get("/user/:id", getUserbyID);

router.put("/user/:id", updateUser);

router.post("/sendpasswordotp", sendOtp);

router.put("/resetuserpassword", updateUserPassword);

router.delete("/user/:id", deleteUser);

module.exports = router;
