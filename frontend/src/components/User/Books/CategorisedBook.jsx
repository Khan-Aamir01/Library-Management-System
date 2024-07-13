import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Loader from "../Loader/Loader";

export default function Categorised() {
  const navigate = useNavigate();
  const { categorise, classId } = useParams();
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/category/${categorise}`
        );
        const data = response.data;
        // filter the books according to class example std = 5th then it gives only 5th class books
        const filteredBooks = data.filter((book) =>
          book.std.toLowerCase().includes(classId.toLocaleLowerCase())
        );
        setBooks(filteredBooks);
        setLoader(false);
        // Set Total Books
        setMessage(`Total ${filteredBooks.length} Books`);
      } catch (e) {
        setLoader(false);
        setError("Server Error");
      }
    };
    fetchBook();
  }, []);

  const singleBookHandler = (bookname, id) => {
    navigate(`/lms/${bookname}/${id}`);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-white">
        {`${categorise.charAt(0).toUpperCase()}${categorise.slice(1)}`} Books
      </h1>
      {loader && <Loader />}
      {message && <b className="mb-1">{message}</b>}
      {error && <b className="mb-1">{error}</b>}
      <div className="px-2 mt-2 flex flex-wrap justify-center">
        {books.map((book) => (
          <div
            onClick={() => singleBookHandler(book.Name, book._id)}
            key={book._id}
            className="py-2 m-1 px-2 bg-slate-300 bg-opacity-50 rounded-lg border-2 border-slate-300 hover:border-red-400 transition-all"
            style={{ minWidth: "150px", maxWidth: "150px" }}
          >
            <img
              src={book.ImageUrl}
              alt={book.Name}
              className="w-36 h-48 object-cover rounded-t-lg"
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
