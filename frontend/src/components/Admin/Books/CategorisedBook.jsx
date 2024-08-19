import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Categorised() {
  const navigate = useNavigate();
  const { categorise, classId } = useParams();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/books/category/${categorise}`
        );
        const data = response.data;
        // filter the books according to class example std = 5th then it gives only 5th class books
        const filteredBooks = data.filter((book) =>
          book.std.toLowerCase().includes(classId.toLocaleLowerCase())
        );
        setBooks(filteredBooks);
        // Set How Many Books
        setMessage(`Total ${filteredBooks.length} Books`);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchBook();
  }, []);

  const singleBookHandler = (bookid) => {
    navigate(`/admin/books/singlebook/${bookid}`);
  };

  return (
    <div className="flex flex-col items-center py-4 text-white">
      <h1 className="text-3xl font-bold mb-2 text-white">{classId} Books</h1>
      {message && <b className="mb-1">{message}</b>}
      <div className="flex flex-wrap justify-center">
        {books.map((book, index) => (
          <div
            onClick={() => singleBookHandler(book._id)}
            key={index}
            className="py-2 m-1 px-2 bg-[rgb(97,151,139)] bg-opacity-50 hover:bg-opacity-40 cursor-pointer text-white rounded-lg border-2 border-slate-300 hover:border-slate-400 transition-all flex gap-2 min-w-full md:min-w-36"
          >
            <img
              src={book.ImageUrl}
              alt={book.Name}
              className="h-28 object-cover rounded-t-lg "
            />
            <div className="p-2">
              <b>Name:</b> {book.Name}
              <br />
              <b>Author:</b> {book.Author_Name}
              <br />
              <b>Available:</b> {book.Availability}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
