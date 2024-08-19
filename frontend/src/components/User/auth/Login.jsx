import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loginButton, setLoginButton] = useState(false);
  const [user, setUser] = useState({
    gmail: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoginButton(true);
      const response = await axios.post(`${API_URL}/api/auth/login`, user);
      const { token, userId } = response.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userId", userId);
      navigate(`/lms/profile`);
      if (response.status === 200) {
        // Successful borrow
        setTimeout(() => {
          setLoginButton(false);
        }, 2000);
      }
    } catch (error) {
      setLoginButton(false);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="flex flex-col items-center py-6 bg-slate-800">
      <form
        onSubmit={handleSubmit}
        className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
          Account Login
        </h1>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Email
          </label>
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
            name="password"
            value={user.password}
            id="password"
            placeholder="Enter Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={handleChange}
          />
        </div>
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            to={"/lms/registration"}
            className="text-blue-400 hover:text-blue-600 hover:underline"
          >
            Create one
          </Link>
        </p>
        <p className="text-right text-gray-400">
          <Link
            to={"/lms/forgetpassword"}
            className="text-blue-400 hover:text-blue-600 hover:underline"
          >
            Forget Password
          </Link>
        </p>
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
