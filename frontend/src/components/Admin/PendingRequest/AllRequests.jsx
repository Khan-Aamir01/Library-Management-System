import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

// Icons
import { AiOutlineFileDone } from "react-icons/ai";
import { MdIncompleteCircle } from "react-icons/md";
import { RiPassExpiredLine } from "react-icons/ri";

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [books, setBooks] = useState({});
  const [users, setUsers] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [clickedRequests, setClickedRequests] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const [borrowRes, booksRes, usersRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/borrow`),
          axios.get(`http://localhost:3000/api/books`),
          axios.get(`http://localhost:3000/api/user`),
        ]);

        setRequests(borrowRes.data);
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

  const handleBorrowRequest = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/borrow/${id}/changeStatustoBorrow`
      );
      // Fetch updated requests data
      const { data } = await axios.get(`http://localhost:3000/api/borrow`);
      setRequests(data);
    } catch (e) {
      console.log(e);
      setError("Error updating status: " + e.message);
    }
  };

  const handleStatusClick = (request) => {
    if (request.status === "Waiting") {
      handleBorrowRequest(request._id);
    } else {
      const statusMessage = request.status;
      setClickedRequests(() => ({ [request._id]: statusMessage }));
      setTimeout(() => {
        setClickedRequests(() => ({ [request._id]: false }));
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Requests</h1>
      <div className="bg-slate-300 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 w-11/12 flex flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {requests.length} Requests
            {error && <p>{error}</p>}
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Book
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Member
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {books[request.bookId] || request.bookId}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {users[request.userId] || request.userId}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {request.status === "Waiting" && (
                    <MdIncompleteCircle
                      className="cursor-pointer w-full text-4xl"
                      onClick={() => handleStatusClick(request)}
                    />
                  )}
                  {request.status === "Borrowed" && (
                    <AiOutlineFileDone
                      className="cursor-pointer w-full text-4xl"
                      onClick={() => handleStatusClick(request)}
                    />
                  )}
                  {request.status === "Expired" && (
                    <RiPassExpiredLine
                      className="cursor-pointer w-full text-4xl"
                      onClick={() => handleStatusClick(request)}
                    />
                  )}
                  {clickedRequests[request._id] && (
                    <div className="text-red-500 mt-2">
                      {`Book Already ${clickedRequests[request._id]}`}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
