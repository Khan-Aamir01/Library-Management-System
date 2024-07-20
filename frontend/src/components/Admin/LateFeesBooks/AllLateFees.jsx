import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function LateFeesBooks() {
  const [fineBooks, setFineBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanedBooks = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/fine`);
        setFineBooks(data);
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

  // Function to handle the pay the late fee process
  const handlePay = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/fine/${id}`);
      const { data } = await axios.get(`http://localhost:3000/api/fine`);
      setFineBooks(data);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Late Books</h1>
      <div className="bg-slate-300 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 w-11/12 flex flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {fineBooks.length} Books
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
                Fine
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Pay
              </th>
            </tr>
          </thead>
          <tbody>
            {fineBooks.map((book, index) => (
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
                  {book.amount}
                </td>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 cursor-pointer"
                  onClick={() => handlePay(book._id)}
                >
                  Pay
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
