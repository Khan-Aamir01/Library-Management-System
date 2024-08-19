import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [otpButton, setOtpButton] = useState(false);
  const navigate = useNavigate();

  const sendResetPasswordOtp = async () => {
    try {
      setOtpButton(true);
      const response = await axios.post(`${API_URL}/api/sendpasswordotp`, {
        email,
      });
      setUpdateError(response.data.message);
    } catch (error) {
      if (error.response.data.message) {
        setUpdateError(error.response.data.message);
      } else {
        setUpdateError("An error occurred. Please try again.");
      }
    } finally {
      setOtpButton(false);
      setTimeout(() => setUpdateError(null), 3000); // Clear the message after 3 seconds
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_URL}/api/resetuserpassword`, {
        email,
        otp,
        newPassword,
      });
      alert(response.data.message);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userId");
      navigate("/lms/login");
    } catch (error) {
      if (error.response.data) {
        setUpdateError(error.response.data.message);
      } else {
        setUpdateError("An error occurred. Please try again.");
      }
    } finally {
      setTimeout(() => setUpdateError(null), 3000);
    }
  };

  const handleCancelButton = () => {
    if (localStorage.getItem("userToken")) {
      navigate("/lms/profile");
    } else {
      navigate("/lms/login");
    }
  };

  return (
    <div className="flex flex-col items-center py-6 bg-slate-800">
      <form
        onSubmit={handleUpdate}
        className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 md:w-1/2"
      >
        {updateError && (
          <div className="text-red-500 mb-4">
            <p>{updateError}</p>
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold mb-3 text-white text-center">
          Change Password
        </h1>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            required
          />
        </div>

        <input
          onClick={sendResetPasswordOtp}
          type="button"
          value={otpButton ? "Sending" : "Send OTP"}
          className="bg-teal-500 hover:bg-teal-600 px-4 rounded border border-teal-600 font-bold cursor-pointer hover:text-white transition-all duration-300 w-full py-2 my-2"
          disabled={otpButton}
        />

        <div className="mb-4">
          <label
            htmlFor="otp"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            OTP
          </label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="new-password"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            id="new-password"
            minLength={8}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            required
          />
        </div>

        <div className="flex space-x-4 w-full mt-4">
          <input
            onClick={handleCancelButton}
            type="button"
            value="Cancel"
            className="w-full bg-red-500 text-white font-semibold py-2 rounded cursor-pointer hover:bg-red-600 transition"
          />
          <input
            type="submit"
            value="Submit"
            className="w-full bg-teal-500 text-white font-semibold py-2 rounded cursor-pointer hover:bg-teal-600 transition"
          />
        </div>

        <p className="mt-4 text-center text-gray-400">
          For further assistance or updates, please reach out to the librarian.
        </p>
      </form>
    </div>
  );
};

export default ForgetPassword;
