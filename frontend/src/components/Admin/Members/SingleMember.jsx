import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { TiUserDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SingleMember() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [books, setBooks] = useState({});
  const [borrowData, setBorrowData] = useState([]);
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const [userRes, booksRes, borrowRes, fineRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/user/${id}`),
          axios.get(`http://localhost:3000/api/books`),
          axios.get(`http://localhost:3000/api/user/${id}/borrow`),
          axios.get(`http://localhost:3000/api/user/${id}/fine`),
        ]);
        setUserData(userRes.data);
        setBorrowData(borrowRes.data);
        setBooks(
          booksRes.data.reduce((acc, book) => {
            acc[book._id] = book.Name;
            return acc;
          }, {})
        );
        setFines(fineRes.data);
        setLoading(false);
      } catch (e) {
        setError("User Not Found: " + e.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, borrowData]);

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

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/user/${userData._id}`);
    navigate("/admin/members");
  };

  const handleUpdate = () => {
    navigate(`/admin/members/update/${userData._id}`);
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
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
            <strong>Fine:</strong>{" "}
            {fines.reduce((acc, fine) => acc + fine.amount, 0)}₹
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
          <button
            onClick={handleUpdate}
            className="bg-green-400 hover:bg-green-600 transition px-3 py-2 font-bold mt-2 mb-2 rounded"
            aria-label="Update User"
          >
            <GrUpdate />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-400 hover:bg-red-600 transition px-3 py-2 font-bold m-2 rounded"
            aria-label="Delete User"
          >
            <TiUserDelete />
          </button>
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
                    {books[borrow.bookId] || borrow.bookId}
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
                    {fine ? `${fine.amount}₹` : "N/A"}
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
