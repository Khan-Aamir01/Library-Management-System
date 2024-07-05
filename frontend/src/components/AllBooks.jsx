import { useState, useEffect } from "react";
import axios from "axios";

export const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        // Name, Author_Name, categories, isPhysical, isEbook, Downloads, Availability, ImageUrl, DownloadUrl, Date
        const bookData = response.data;
        setBooks(bookData);
      } catch (error) {
        console.log("Error While Fetching Books" + error.message);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="px-5 bg-slate-500">
      <h1 className="py-2 px-4 text-lg text-white">All Books</h1>
      <div className=" px-2 flex flex-wrap justify-start">
        {books.map((book, index) => (
          <div
            // Name, Author_Name, categories, isPhysical, isEbook, Downloads, Availability, ImageUrl, DownloadUrl, Date
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
  );
};
