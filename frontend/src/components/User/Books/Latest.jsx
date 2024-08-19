import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Loader from "../Loader/Loader";
const API_URL = import.meta.env.VITE_APP_API_URL;
export default function Latest() {
  const [latestBook, setLatestBook] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/books/latest`);
        const data = response.data;
        data.reverse();
        const onlySixBook = data.slice(0, 5);
        setLatestBook(onlySixBook);
        setLoader(false);
        if (onlySixBook.length === 0) {
          setError("0 Books");
        }
      } catch (e) {
        setError("Error While Fetching Data " + e.message);
        setLoader(false);
      }
    };
    fetchBooks();
  }, []);

  const singleBookHandler = (bookname, id) => {
    navigate(`/lms/${bookname}/${id}`);
  };

  if (loader) {
    return <Loader />;
  }

  return (
    <>
      <h1 className="font-bold text-xl text-white">Latest</h1>
      <div className="flex gap-4 flex-wrap mt-2 justify-center md:justify-normal">
        {error && <h1>{error}</h1>}
        {latestBook.map((book, index) => (
          <div
            onClick={() => singleBookHandler(book.Name, book._id)}
            key={index}
            className="py-2 m-1 px-2 bg-[rgb(97,151,139)] bg-opacity-50 hover:bg-opacity-40 cursor-pointer text-white rounded-lg border-2 border-slate-300 hover:border-slate-400 transition-all flex gap-2 min-w-full md:min-w-36"
          >
            <img
              src={book.ImageUrl}
              alt={book.Name}
              className="h-28 object-cover rounded-t-lg"
            />
            <div className="p-2">
              <b>Name:</b> {book.Name}
              <br />
              <b>Auther:</b> {book.Author_Name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
