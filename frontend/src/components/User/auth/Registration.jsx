import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

const Registration = () => {
  const navigate = useNavigate();
  const [otpMessage, setOtpMessage] = useState(null);
  const [error, setError] = useState(null);
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
      setOtpMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
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
        setTimeout(() => {
          setRegiButton(false);
        }, 2000);
        navigate("/lms/login");
      } else if (response.status === 409) {
        setError("User already exists");
      }
    } catch (error) {
      setRegiButton(false);
      setError(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setRegiButton(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-6 bg-slate-800">
      {otpMessage && (
        <p className="sticky top-0 bg-blue-500 text-white p-2 rounded shadow-md">
          {otpMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
          Account Registration
        </h1>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            id="name"
            placeholder="Enter Name"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Email
          </label>
          <div className="flex md:flex-row flex-col">
            <input
              type="email"
              name="gmail"
              value={user.gmail}
              id="email"
              placeholder="Enter Email"
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
              onChange={handleChange}
            />
            <input
              onClick={handleOtp}
              type="button"
              value="Send OTP"
              className="bg-blue-500 hover:bg-blue-600 px-4 md:ml-2 rounded border border-blue-600 font-bold cursor-pointer text-white hover:text-white transition-all duration-300 animate-pulse md:w-auto w-full py-2 mt-2 md:mt-0"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            OTP
          </label>
          <input
            type="text"
            name="otp"
            value={user.otp}
            id="otp"
            placeholder="Enter OTP"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Address
          </label>
          <textarea
            rows={3}
            name="address"
            value={user.address}
            id="address"
            placeholder="Enter Address"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            to={"/lms/login"}
            className="text-blue-400 hover:text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
        <button
          type="submit"
          className="bg-teal-500 mt-4 mb-2 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full border border-teal-600 transition-all duration-300"
        >
          {regiButton ? "Please wait.." : "Sign up"}
        </button>
        {error && <b className="text-red-500 mt-2">{error}</b>}
      </form>
    </div>
  );
};

export default Registration;
