const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter object using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Send email
const sendMail = (otp, email) => {
  // Create mailOptions object with what we want to send to the user
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Library Management System OTP",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
        <h1 style="color: #333;">OTP Verification</h1>
        <p style="font-size: 16px;">Hello,</p>
        <p style="font-size: 16px;">Thank you for registering with our Library Management System. Please use the following One-Time Password (OTP) to complete your verification process:</p>
        <p style="font-size: 20px; font-weight: bold; color: #2c7be5;">${otp}</p>
        <p style="font-size: 16px;">This OTP is valid for 5 minutes. Do not share this OTP with anyone.</p>
        <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
        <p style="font-size: 16px;">Best regards,<br/>Library Management System Team</p>
      </div>
    `,
  };

  // Send email and handle the result
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error.message);
      return; // Exit the function if there's an error
    }
    console.log(`Email sent successfully to ${email}: ${info.response}`);
  });
};

module.exports = sendMail;
