import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { MdOutlineBookmarkRemove } from "react-icons/md";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function BookOnLoan() {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanedBooks = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/borrow/status/Borrowed`
        );
        setLoanedBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLoanedBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Function to navigate to the user's profile page
  const showProfile = (id) => {
    navigate(`/admin/members/singlemember/${id}`);
  };

  // Function to navigate to the book detail page
  const showBookDetails = (id) => {
    navigate(`/admin/books/singlebook/${id}`);
  };

  // Function to handle the return process
  const handleReturn = async (borrowId) => {
    try {
      await axios.put(`${API_URL}/api/borrow/${borrowId}/changeStatustoReturn`);
      const { data } = await axios.get(`${API_URL}/api/borrow/status/Borrowed`);
      setLoanedBooks(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col md:justify-start justify-center items-center py-8 bg-slate-500 px-2">
      <h1 className="text-3xl font-bold mb-6 text-white">All Loaned Books</h1>
      <div className="bg-slate-300 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 w-full flex flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {loanedBooks.length} Borrowed
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
                Date
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Return
              </th>
            </tr>
          </thead>
          <tbody>
            {loanedBooks.map((book, index) => (
              <tr key={index}>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 cursor-pointer"
                  onClick={() => showBookDetails(book.bookId)}
                >
                  {book.bookName}
                </td>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 cursor-pointer"
                  onClick={() => showProfile(book.userId)}
                >
                  {book.userName}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {format(new Date(book.borrowDate), "dd-MM-yyyy")}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleReturn(book._id)}
                  >
                    <MdOutlineBookmarkRemove />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
