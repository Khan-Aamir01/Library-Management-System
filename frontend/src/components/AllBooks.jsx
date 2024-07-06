import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Loading } from "./Loading";

export const AllBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        const bookData = response.data;
        setBooks(bookData);
        isDataFetched(true);
      } catch (error) {
        console.log("Error While Fetching Books" + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const singleBookHandler = (bookid) => {
    navigate(`/books/singlebook/${bookid}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-8 bg-slate-500 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-white">All Book</h1>
        <div className=" px-2 flex flex-wrap justify-center">
          {books.map((book, index) => (
            <div
              onClick={() => singleBookHandler(book._id)}
              key={index}
              className="py-2 m-1 px-2 bg-slate-300 bg-opacity-50 rounded-lg border-2 border-slate-300 hover:border-red-400 transition-all"
              style={{ minWidth: "150px", maxWidth: "150px" }}
            >
              <img
                src={book.ImageUrl}
                alt={book.Name}
                className="w-36 h-48 object-cover rounded-t-lg "
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
    </>
  );
};
