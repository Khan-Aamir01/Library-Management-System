import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";

// Icons
import { MdIncompleteCircle } from "react-icons/md";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function AllRequests() {
  const [requests, setRequests] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const borrowRes = await axios.get(
          `${API_URL}/api/borrow/status/Waiting`
        );
        const data = borrowRes.data;
        setRequests(data);
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

  // Function to handle the waiting to borrow process
  const handleBorrowRequest = async (id) => {
    try {
      await axios.put(`${API_URL}/api/borrow/${id}/changeStatustoBorrow`);
      // Fetch updated requests data
      const { data } = await axios.get(`${API_URL}/api/borrow/status/Waiting`);
      setRequests(data);
    } catch (e) {
      setError("Error updating status: " + e.message);
    }
  };

  // Function to handle the download count increase and availability to dicrease process
  const handleDownloadCount = (id) => {
    axios.put(`${API_URL}/api/books/${id}/updateDownload`);
    axios.put(`${API_URL}/api/books/${id}/decrement`);
  };

  // Function to handle the Waiting to Borrowed process
  const handleStatusClick = (request) => {
    if (request.status === "Waiting") {
      handleBorrowRequest(request._id);
      handleDownloadCount(request.bookId);
    } else {
      setError("Book Already Borrowed");
    }
  };

  // Function to navigate to the user's profile page
  const showProfile = (id) => {
    navigate(`/admin/members/singlemember/${id}`);
  };

  // Function to navigate to the book detail page
  const showBookDetails = (id) => {
    navigate(`/admin/books/singlebook/${id}`);
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 px-2">
      <div className="shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 w-full flex flex-col text-center bg-[rgb(14,25,40)] text-white">
        <h1 className="text-3xl font-bold mb-6 text-white">All Requests</h1>
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {requests.length} Requests
            {error && <p>{error}</p>}
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                Book
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                Member
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-slate-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-500 cursor-pointer"
                  onClick={() => showBookDetails(request.bookId)}
                >
                  {request.bookName}
                </td>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-500 cursor-pointer"
                  onClick={() => showProfile(request.userId)}
                >
                  {request.userName}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-500">
                  <MdIncompleteCircle
                    className="cursor-pointer w-full text-4xl"
                    onClick={() => handleStatusClick(request)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
