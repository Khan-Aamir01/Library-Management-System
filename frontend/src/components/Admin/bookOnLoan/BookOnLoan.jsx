import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

export default function BookOnLoan() {
  const [loanedBooks, setLoanedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoanedBooks = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/borrow/status/Borrowed`
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

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Loaned Books</h1>
      <div className="bg-slate-300 shadow-md rounded px-2 py-2 md:px-8 md:pt-6 md:pb-8 mb-4 w-11/12 flex flex-col text-center">
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
            </tr>
          </thead>
          <tbody>
            {loanedBooks.map((book, index) => (
              <tr key={index}>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 cursor-pointer"
                  onClick={() => showBookDetails(book.bookId)}
                >
                  {book.bookId}
                </td>
                <td
                  className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 cursor-pointer"
                  onClick={() => showProfile(book.userId)}
                >
                  {book.userId}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {format(new Date(book.borrowDate), "dd-MM-yyyy")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
