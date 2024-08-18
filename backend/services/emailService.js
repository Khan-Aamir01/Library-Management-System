const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // my gmail
    pass: process.env.SMTP_PASS, // my gmail password
  },
});

// send email
const sendMail = (otp, email) => {
  // create mailOtion object  what we want to send the user
  const mailOptions = {
    from: "14sahbaz3@gmail.com",
    to: email,
    subject: "Library Management System OTP",
    html: `<p>Your OTP for the Library Management System is: <strong>${otp}</strong><p/>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: ", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendMail;
