import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Loader } from "../Loader/Loader";

export const SingleBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  // to change the update and delete button while processing
  const [borrow, setBorrow] = useState(false);
  const [download, setDownload] = useState(false);

  useEffect(() => {
    const getSingleBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/books/${id}`
        );
        const singleBookData = response.data;
        setBook(singleBookData);
      } catch (error) {
        console.log("Error While Fetching Books" + error.message);
      }
    };
    getSingleBook();
  }, [id]);

  if (!book) {
    return <Loader />;
  }

  const handleBorrow = async (id) => {
    setBorrow(true);
    navigate(``);
  };

  const handleDownload = async (id) => {
    setDownload(true);
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Book Information</h1>
      <div
        key={book._id}
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 flex justify-start gap-10 flex-col"
      >
        <div className="flex flex-col justify-center items-center">
          <img
            src={book.ImageUrl}
            alt={book.Name}
            className="w-36 h-48 object-cover rounded-t-lg border-2 border-red-400"
          />
          <button
            onClick={() => handleBorrow(book._id)}
            className="w-36 bg-green-400 my-1 p-2 rounded border font-bold border-blue-600 hover:bg-green-600 transition-all "
          >
            {borrow ? "Wait" : "Borrow"}
          </button>
          <button
            onClick={() => {
              handleDownload(book._id);
            }}
            className="w-36 bg-red-400 my-1 p-2 rounded border font-bold border-blue-600 hover:bg-red-600 transition-all"
          >
            {download ? "Wait" : "Download"}
          </button>
        </div>
        <div className="">
          <b>Name:</b> {book.Name}
          <br />
          <b>Author:</b> {book.Author_Name}
          <br />
          <b>Categories:</b> {book.Categories}
          <br />
          <b>P-Book:</b> {book.isPhysical.toString()}
          <br />
          <b>E-Book:</b> {book.isEbook.toString()}
          <br />
          <b>Downloads:</b> {book.Downloads}
          <br />
          <b>Available:</b> {book.Availability}
        </div>
      </div>
    </div>
  );
};
