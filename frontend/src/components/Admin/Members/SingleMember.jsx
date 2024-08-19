import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

import { TiUserDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function SingleMember() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [borrowData, setBorrowData] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
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
        setError("User Not Found: " + e.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-800">
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

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/user/${userData._id}`);
      navigate("/lms");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // If the server sends a specific message display that
        alert(error.response.data.message);
      } else {
        // If no specific message, fall back to the error message
        alert("Please Contact With Librarian");
      }
    }
  };

  const handleUpdate = () => {
    navigate(`/admin/members/update/${userData._id}`);
  };

  return (
    <div className="flex flex-col justify-start items-center py-8">
      {/* User Info */}
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
              onClick={handleUpdate}
              className="bg-teal-500 hover:bg-teal-600 text-white transition px-3 py-2 font-semibold rounded md:w-auto w-full"
              aria-label="Update User"
            >
              <GrUpdate className="inline-block mr-2" />
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white transition px-3 py-2 font-semibold rounded md:w-auto w-full"
              aria-label="Delete User"
            >
              <TiUserDelete className="inline-block mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>
      {/* Borrowed Books Table */}
      <div className="bg-[rgb(14,25,40)] w-11/12 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 flex flex-col text-center text-white">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {borrowData.length} Books
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                Book
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                Start
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                End
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
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
