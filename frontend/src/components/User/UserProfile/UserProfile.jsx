import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

// icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [borrowData, setBorrowData] = useState([]);
  const [fines, setFines] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // data to send otp and reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateError, setUpdateError] = useState(null);

  const [otpButton, setOtpButton] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("userToken");
      if (token) {
        try {
          const profileRes = await axios.get(
            `${API_URL}/api/auth/userProfile`,
            {
              headers: { "user-Token": token },
            }
          );
          const id = profileRes.data._id;

          const [userRes, borrowRes, fineRes] = await Promise.all([
            axios.get(`${API_URL}/api/user/${id}`),
            axios.get(`${API_URL}/api/user/${id}/borrow`),
            axios.get(`${API_URL}/api/user/${id}/fine`),
          ]);
          setUserData(userRes.data);
          setBorrowData(borrowRes.data);
          setFines(fineRes.data);
          setLoading(false);
        } catch (e) {
          setError("User Not Found");
          setLoading(false);
          localStorage.removeItem("userToken");
          localStorage.removeItem("userId");
          navigate("/lms/login");
        }
      } else {
        navigate("/lms/login");
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-black-500">
        <h1>{error}</h1>
      </div>
    );
  }

  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/user/${userData._id}`);
      setShowDelete(!showDelete);
      navigate("/lms");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server sends a specific message display that
        alert(error.response.data.message);
        setShowDelete(!showDelete);
      } else {
        // If no specific message, fall back to the error message
        alert("Please Contact With Librarian");
      }
    }
  };

  const sendResetPasswordOtp = async () => {
    try {
      setOtpButton(true);
      const response = await axios.post(`${API_URL}/api/sendpasswordotp`, {
        email,
      });
      setUpdateError(response.data.message);
      setOtpButton(false);
    } catch (error) {
      setOtpButton(false);
      if (error.response.data.message) {
        // If the server sent a specific error message
        setUpdateError(error.response.data.message);
      } else {
        // For other errors, show a general message
        setOtpButton(true);
        setUpdateError("An error occurred. Please try again.");
      }
    } finally {
      setOtpButton(false);
      setTimeout(() => setUpdateError(null), 3000); // Clear the message after 3 seconds
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_URL}/api/resetuserpassword`, {
        email,
        otp,
        newPassword,
      });
      alert(response.data.message);
      setShowUpdate(!showUpdate);
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
    } // Clear the message after 3 seconds}
  };

  const handleShowUpdate = () => {
    setShowUpdate(!showUpdate);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/lms");
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      {/* delete account  */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/[0.5]">
          <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-56 object-cover"
              src="https://static.vecteezy.com/system/resources/previews/007/696/083/non_2x/sad-faced-boy-raising-one-hand-flat-character-illustration-don-t-leave-me-alone-please-don-t-go-away-ill-be-missing-you-free-vector.jpg"
              alt="Sad face"
            />
            <div className="p-4 text-center">
              <p className="text-gray-800 font-semibold mb-4">
                Are you sure you want to leave?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDelete(!showDelete)}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* update password */}
      {showUpdate && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/[0.5] p-2">
          <div className="flex flex-col items-start justify-center max-w-sm p-6 bg-white rounded-lg shadow-md">
            {updateError && (
              <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white py-2 px-4 rounded z-50">
                <p>{updateError}</p>
              </div>
            )}

            <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Update Password
            </h1>
            <label htmlFor="email" className="text-gray-700 font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none border border-green-600 focus:border-red-700 hover:border-violet-600 transition-all duration-300"
            />
            <input
              onClick={sendResetPasswordOtp}
              type="button"
              value={otpButton ? "Sending" : "Send OTP"}
              className="bg-blue-50 hover:bg-blue-100 px-4 rounded border border-teal-700 font-bold cursor-pointer hover:text-red-700 hover:border-red-600 transition-all duration-300 animate-pulse w-full py-2 my-2 hover:animate-none"
            />
            <label htmlFor="otp" className="text-gray-700 font-semibold">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              placeholder="Enter OTP"
              onChange={(e) => setOtp(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none border border-green-600 focus:border-red-700 hover:border-violet-600 transition-all duration-300"
            />
            <label
              htmlFor="new-password"
              className="text-gray-700 font-semibold mt-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="new-password"
              minLength={8}
              placeholder="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none border border-green-600 focus:border-red-700 hover:border-violet-600 transition-all duration-300"
            />
            <div className="flex space-x-4 w-full mt-4">
              <input
                onClick={handleShowUpdate}
                type="button"
                value="Cancel"
                className="w-full bg-red-500 text-white font-semibold py-2 rounded cursor-pointer hover:bg-red-600 transition"
              />
              <input
                onClick={handleUpdate}
                type="button"
                value="Submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded cursor-pointer hover:bg-green-600 transition"
              />
            </div>
            <p className="mt-4 text-center text-gray-600">
              For further assistance or updates, please reach out to the
              librarian.
            </p>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-white">User Information</h1>
      <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-2xl flex flex-wrap md:items-start justify-center gap-4 md:justify-normal">
        <div>
          <img
            className="w-52 object-cover"
            src={userData.image}
            alt={userData.name}
          />
        </div>
        <div>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Phone No:</strong> {userData.phoneNumber}
          </p>
          <p>
            <strong>Fine:</strong> ₹
            {fines.reduce((acc, fine) => acc + fine.amount, 0)}
          </p>
          <p>
            <strong>Email:</strong> {userData.gmail}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
          <p>
            <strong>Date of Join:</strong>{" "}
            {format(new Date(userData.dateOfJoin), "dd-MM-yyyy")}
          </p>
          <div className="flex flex-wrap md:items-center md:flex-row flex-col gap-4 mt-2">
            <button
              title="Update Account"
              onClick={handleShowUpdate}
              className="bg-green-400 hover:bg-green-600 transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Update
            </button>
            <button
              title="Delete Account"
              onClick={handleShowDelete}
              className="bg-red-400 hover:bg-red-600 transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Delete
            </button>
            <button
              title="Logout"
              onClick={handleLogout}
              className="bg-yellow-400 hover:bg-yellow-600 transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-slate-300 w-11/12 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 flex flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {borrowData.length} Books
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Book
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Start
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                End
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Fine
              </th>
            </tr>
          </thead>
          <tbody>
            {borrowData.map((borrow) => {
              const fine = fines.find(
                (fine) => fine.bookId === borrow.bookId && fine.userId === id
              );
              return (
                <tr key={borrow._id}>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                    {borrow.bookName}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                    {borrow.borrowDate
                      ? format(new Date(borrow.borrowDate), "dd-MM-yy")
                      : borrow.status}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                    {borrow.returnDate
                      ? format(new Date(borrow.returnDate), "dd-MM-yy")
                      : borrow.status}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                    {fine ? `₹${fine.amount}` : "N/A"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
