import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const Registration = () => {
  const navigate = useNavigate();
  const [otpMessage, setOtpMessage] = useState(null);
  const [error, setError] = useState(null);

  // to change the registration button text
  const [regiButton, setRegiButton] = useState(false);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/578/616/original/vector-book-reading-logo-and-symbols-template-icons-app.jpg",
    gmail: "",
    otp: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtp = async () => {
    const email = user.gmail;

    // Email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setOtpMessage("Please enter a valid email address.");
      setTimeout(() => setOtpMessage(null), 3000);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/sendotp`, {
        email: user.gmail,
      });
      setOtpMessage(response.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server sent a specific error message
        setOtpMessage(error.response.data.message);
      } else {
        // For other errors, show a general message
        setOtpMessage("An error occurred. Please try again.");
      }
    } finally {
      setTimeout(() => setOtpMessage(null), 3000); // Clear the message after 3 seconds
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setRegiButton(true);

      const response = await axios.post(`${API_URL}/api/auth/register`, user);

      if (response.status === 201) {
        // Successful registration
        setTimeout(() => {
          setRegiButton(false);
        }, 2000);
        navigate("/lms/login");
      } else if (response.status === 409) {
        // User already exists
        setError("User already exists");
      }
    } catch (error) {
      // Handle server errors
      setRegiButton(false);
      setError(`${error.response.data.message}`);
    } finally {
      setRegiButton(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500">
      {otpMessage && (
        <p className="sticky top-0 bg-blue-500 text-white p-2 rounded shadow-md">
          {otpMessage}
        </p>
      )}
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Account Registration
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        <div className="mb-4">
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            id="name"
            placeholder="Enter Name"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className={labelStyle}>
            Phone No
          </label>
          <input
            type="number"
            name="phoneNumber"
            minLength={10}
            value={user.phoneNumber}
            id="phoneNumber"
            placeholder="Enter Phone Number"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <div className=" flex md:flex-row flex-col">
            <input
              type="email"
              name="gmail"
              value={user.gmail}
              id="email"
              placeholder="Enter Email"
              required
              className={inputStyle}
              onChange={handleChange}
            />
            <input
              onClick={handleOtp}
              type="button"
              value="Send OTP"
              className="bg-blue-50 hover:bg-blue-100 px-4 md:ml-1 rounded border border-teal-700 font-bold cursor-pointer hover:text-red-700 hover:border-red-600 transition-all duration-300 animate-pulse md:w-auto w-full py-2 mt-2 md:mt-0 hover:animate-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="otp" className={labelStyle}>
            OTP
          </label>
          <input
            type="number"
            name="otp"
            value={user.otp}
            id="otp"
            placeholder="Enter OTP"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            minLength={8}
            name="password"
            id="password"
            value={user.password}
            placeholder="Enter Password"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className={labelStyle}>
            Address
          </label>
          <textarea
            rows={3}
            name="address"
            value={user.address}
            id="address"
            placeholder="Enter Address"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        Already have an account?{" "}
        <Link
          to={"/lms/login"}
          className="text-blue-500 hover:text-blue-700 hover:underline no-underline dashed mb-2"
        >
          {" "}
          Login
        </Link>
        <button
          type="submit"
          className="bg-blue-500 mt-4 mb-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full border border-purple-900 transition-all duration-300"
        >
          {regiButton ? "Please wait.." : "Sign up"}
        </button>
        {error && <b className="text-red-500">{error}</b>}
      </form>
    </div>
  );
};

// CSS classes
const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none border border-black border-green-600 focus:border-red-700 hover:border-violet-600 transition-all duration-300";

export default Registration;
