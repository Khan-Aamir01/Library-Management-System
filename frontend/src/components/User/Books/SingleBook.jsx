import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loader from "../Loader/Loader";

export default function SingleBook() {
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [book, setBook] = useState(null);
  // to change the borrow and download button while processing
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
        alert("Book Not Found");
      }
    };
    getSingleBook();
  }, []);

  if (!book) {
    return <Loader />;
  }

  const handleBorrow = async (book) => {
    if (book.isPhysical === true && book.Availability > 0) {
      setBorrow(true);
      try {
        const response = await axios.post(`http://localhost:3000/api/borrow`, {
          userId,
          bookId: book._id,
        });
        if (response.status === 201) {
          // Successful borrow
          setTimeout(() => {
            setBorrow(false);
          }, 2000);
          alert("Book borrowed successfully");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Book already borrowed
          alert(error.response.data.message || "Book already borrowed");
        } else if (error.response && error.response.status === 404) {
          // User or book not found
          alert(error.response.data.message || "User or book not found");
        } else {
          // Other errors
          alert("Please login");
        }
        setBorrow(false);
      }
    } else {
      alert("Book is not available");
    }
  };

  const handleDownload = (book) => {
    try {
      if (book.isEbook === false) {
        alert("E-Book not available");
      } else {
        setDownload(true);
        setTimeout(() => {
          setDownload(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
    }
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
            onClick={() => handleBorrow(book)}
            className="w-36 bg-green-400 my-1 p-2 rounded border font-bold border-blue-600 hover:bg-green-600 transition-all "
          >
            {borrow ? "Waiting" : "Borrow"}
          </button>

          <a
            href={book.DownloadUrl}
            download
            onClick={() => handleDownload(book)}
            className="w-36 bg-red-400 my-1 p-2 rounded border font-bold border-blue-600 hover:bg-red-600 transition-all text-center"
          >
            {download ? "Downloading" : "Download"}
          </a>
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
          <b>Available:</b> {book.Availability}
        </div>
      </div>
    </div>
  );
}
