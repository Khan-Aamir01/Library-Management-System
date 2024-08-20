import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginButton, setLoginButton] = useState(false);
  const [admin, setAdmin] = useState({
    gmail: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginButton(true);
      localStorage.removeItem("adminAuth");
      const response = await axios.post(
        `${API_URL}/api/auth/adminlogin`,
        admin
      );
      if (response.status === 200) {
        const token = response.data.token;
        if (token) {
          localStorage.setItem("adminAuth", token);
          navigate("/admin");
        } else {
          setLoginButton(false);
          setError("Login failed. Please check your email and password.");
        }
      }
    } catch (error) {
      setLoginButton(false);
      setError("Login failed. Please check your email and password.");
    }
  };

  const handleChange = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-2xl opacity-30 absolute top-20 left-20"></div>
        <div className="w-72 h-72 bg-gradient-to-r from-teal-500 to-green-600 rounded-full blur-2xl opacity-30 absolute bottom-20 right-20"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-[rgb(14,30,49)] shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">
          LMS Admin Login
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
          <input
            type="email"
            name="gmail"
            value={admin.gmail}
            id="email"
            placeholder="Enter Email"
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
            name="password"
            value={admin.password}
            id="password"
            placeholder="Enter Password"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 mt-4 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded w-full border border-teal-600 transition-all duration-300"
        >
          {loginButton ? "Please wait.." : "Log in"}
        </button>
        {error && <b className="text-red-500 mt-2">{error}</b>}
      </form>
    </div>
  );
}

// CSS classes
const labelStyle = "block text-gray-200 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent";
