import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GiArchiveResearch } from "react-icons/gi";
import Loader from "../Loader/Loader";

const API_URL = import.meta.env.VITE_APP_API_URL;

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
        const response = await axios.get(`${API_URL}/api/books`);
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
        setError("Server Problem " + error);
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
    <div className="px-4 py-4 flex flex-col items-center justify-start text-white">
      <div className="border w-full max-w-md flex justify-center items-center bg-[rgb(14,30,49)] rounded-lg shadow-md">
        <input
          type="search"
          placeholder="Search books by name..."
          autoFocus
          className="w-full p-2 rounded-l-lg outline-none bg-slate-900 border-none text-white text-md bg-transparent"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="p-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition duration-300 ease-in-out">
          <GiArchiveResearch className="text-3xl" />
        </button>
      </div>
      <h1 className="font-bold mt-2">All Books</h1>
      {loader && <Loader />}
      <div className="mt-2 flex gap-4 flex-wrap justify-center w-full">
        {notFound && <p>{notFound}</p>}
        {error && <p>{error}</p>}
        {filteredBooks.map((book) => (
          <div
            onClick={() => singleBookHandler(book.Name, book._id)}
            key={book._id}
            className="py-2 m-1 px-2 bg-[rgb(97,151,139)] bg-opacity-50 hover:bg-opacity-40 cursor-pointer text-white rounded-lg border-2 border-slate-300 hover:border-slate-400 transition-all flex gap-2 w-full"
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
