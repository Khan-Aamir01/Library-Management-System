import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
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
      await axios.post("http://localhost:3000/api/auth/login", user);
      navigate("/lms");
    } catch (error) {
      setError(`Server error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Account Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        <div className="mb-4">
          <label htmlFor="email" className={labelStyle}>
            Email
          </label>
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
        </div>
        <div className="mb-4">
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            id="password"
            placeholder="Enter Password"
            required
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
        <Link
          to={"/lms/registration"}
          className="text-blue-500 hover:text-blue-700 underline hover:no-underline dashed mb-2"
        >
          Don't have an account? Signup here
        </Link>
        <button
          type="submit"
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Log in
        </button>
        {error && <b>Enter Correct Information</b>}
      </form>
    </div>
  );
}

// CSS classes
const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
