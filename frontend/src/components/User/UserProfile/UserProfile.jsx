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

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/lms");
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-800 min-h-screen">
      {/* delete account  */}
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-800/[0.5]">
          <div className="max-w-xs bg-[rgb(14,30,49)] shadow-md rounded-lg overflow-hidden">
            <img
              className="w-full h-56 object-cover"
              src="https://static.vecteezy.com/system/resources/previews/007/696/083/non_2x/sad-faced-boy-raising-one-hand-flat-character-illustration-don-t-leave-me-alone-please-don-t-go-away-ill-be-missing-you-free-vector.jpg"
              alt="Sad face"
            />
            <div className="p-4 text-center">
              <p className="text-gray-200 font-semibold mb-4">
                Are you sure you want to leave?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all duration-300"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowDelete(!showDelete)}
                  className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-all duration-300"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-6 text-white">User Information</h1>
      <div className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-2xl flex flex-wrap md:items-start justify-center gap-4 md:justify-normal text-white">
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
              onClick={() => navigate("/lms/forgetpassword")}
              className="bg-teal-500 hover:bg-teal-600 text-white transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Update
            </button>
            <button
              title="Delete Account"
              onClick={handleShowDelete}
              className="bg-red-500 hover:bg-red-700 text-white transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Delete
            </button>
            <button
              title="Logout"
              onClick={handleLogout}
              className="bg-gray-500 hover:bg-gray-700 text-white transition px-3 py-2 font-semibold rounded md:w-auto w-full"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[rgb(14,25,40)] w-11/12 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 flex flex-col text-center text-white">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {borrowData.length} Books
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border">Book</th>
              <th className="px-2 py-1 md:px-4 md:py-2 border">Start</th>
              <th className="px-2 py-1 md:px-4 md:py-2 border">End</th>
              <th className="px-2 py-1 md:px-4 md:py-2 border">Fine</th>
            </tr>
          </thead>
          <tbody>
            {borrowData.map((borrow) => {
              const fine = fines.find(
                (fine) => fine.bookId === borrow.bookId && fine.userId === id
              );
              return (
                <tr key={borrow._id}>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-500">
                    {borrow.bookName}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-500">
                    {borrow.borrowDate
                      ? format(new Date(borrow.borrowDate), "dd-MM-yy")
                      : borrow.status}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-500">
                    {borrow.returnDate
                      ? format(new Date(borrow.returnDate), "dd-MM-yy")
                      : borrow.status}
                  </td>
                  <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-500">
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
