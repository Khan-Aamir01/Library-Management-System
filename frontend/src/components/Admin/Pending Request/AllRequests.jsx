import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export const AllRequests = () => {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState({});
  const [users, setUsers] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [borrowRes, booksRes, usersRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/borrow`),
          axios.get(`http://localhost:3000/api/books`),
          axios.get(`http://localhost:3000/api/user`),
        ]);

        setRequests(borrowRes.data);
        // This reduce function transforms the array of book objects (booksRes.data) into an object (books) where each book's ID is used as the key
        // and the book's name (from the 'Name' property of each book object) is used as the corresponding value.
        // Example result: { id1: 'name1', id2: 'name2', ... }
        setBooks(
          booksRes.data.reduce((acc, book) => {
            acc[book._id] = book.Name;
            return acc;
          }, {})
        );
        setUsers(
          usersRes.data.reduce((acc, user) => {
            acc[user._id] = user.name;
            return acc;
          }, {})
        );
        setLoader(false);
      } catch (e) {
        setError("Error fetching data: " + e.message);
        setLoader(false);
      }
    };
    fetchRequests();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Requests</h1>
      <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-11/12 flex flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {requests.length} Requests
            {error && <p>{error}</p>}
          </caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border border-black">Book</th>
              <th className="px-4 py-2 border border-black">Member</th>
              <th className="px-4 py-2 border border-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border px-4 py-2 border-slate-400 flex flex-col items-center">
                  {books[request.bookId] || request.bookId}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {users[request.userId] || request.userId}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {request.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
