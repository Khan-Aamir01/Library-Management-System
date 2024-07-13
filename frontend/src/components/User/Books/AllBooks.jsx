import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { GiArchiveResearch } from "react-icons/gi";
import Loader from "../Loader/Loader";

export default function AllBooks() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        const data = response.data;

        // Sort books by name in alphabetical order
        const sortedBooks = data.sort((a, b) => a.Name.localeCompare(b.Name));

        setLoader(false);
        setBooks(sortedBooks);
        if (sortedBooks.length === 0) {
          setError("There are zero books");
        }
      } catch (error) {
        setLoader(false);
        setError("Server Problem");
      }
    };

    fetchBooks();
  }, []);

  // Search Books
  const filteredBooks = books.filter(
    (book) =>
      book.Name.toLowerCase().includes(search.toLowerCase()) ||
      book.Author_Name.toLowerCase().includes(search.toLowerCase())
  );

  // if the book not found after search
  useEffect(() => {
    if (filteredBooks.length === 0 && search !== "") {
      setNotFound("Book Not Found");
    } else {
      setNotFound(null);
    }
  }, [filteredBooks, search]);

  const singleBookHandler = (bookname, id) => {
    navigate(`/lms/${bookname}/${id}`);
  };

  return (
    <div className="bg-slate-500 px-8 py-4 flex flex-col items-center justify-start min-h-screen">
      {loader && <Loader />}
      <div className="flex justify-center items-center bg-white rounded-lg shadow-md">
        <input
          type="search"
          placeholder="Search books..."
          className="w-64 md:w-96 p-2 text-md border-none outline-none rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
          <GiArchiveResearch className="text-3xl" />
        </button>
      </div>

      <h1 className="md:float-left md:w-11/12 md:ml-2 font-bold">All Books</h1>
      <div className="mt-2 flex gap-4 flex-wrap md:justify-start justify-center w-11/12">
        {notFound && <p>{notFound}</p>}
        {error && <p>{error}</p>}
        {filteredBooks.map((book) => (
          <div
            onClick={() => singleBookHandler(book.Name, book._id)}
            key={book._id}
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
  );
}
