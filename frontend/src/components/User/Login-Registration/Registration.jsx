import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    image:
      "https://static.vecteezy.com/system/resources/previews/000/578/616/original/vector-book-reading-logo-and-symbols-template-icons-app.jpg",
    gmail: "",
    password: "",
    address: "",
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
      await axios.post("http://localhost:3000/api/auth/register", user);
      navigate("/lms/login");
    } catch (error) {
      setError(`Server error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
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
        <Link
          to={"/lms/login"}
          className="text-blue-500 hover:text-blue-700 underline hover:no-underline dashed mb-2"
        >
          Already have an account? Login
        </Link>
        <button
          type="submit"
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign up
        </button>
        {error && <b>Enter Correct Information</b>}
      </form>
    </div>
  );
};

// CSS classes
const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";

export default Registration;
