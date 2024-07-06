import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Name, setName] = useState("");
  const [Author_Name, setAuthorName] = useState("");
  const [Categories, setCategories] = useState("");
  const [isPhysical, setIsPhysical] = useState("");
  const [isEbook, setIsEbook] = useState("");
  const [Availability, setAvailability] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [DownloadUrl, setDownloadUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !["true", "false", ""].includes(isPhysical.toLowerCase()) ||
      !["true", "false", ""].includes(isEbook.toLowerCase())
    ) {
      alert("Enter 'True' or 'False' for P-Book and E-Book Availability.");
      return;
    }

    const createBook = {
      Name,
      Author_Name,
      Categories,
      isPhysical: isPhysical.toLowerCase(),
      isEbook: isEbook.toLowerCase(),
      Availability,
      ImageUrl,
      DownloadUrl,
    };

    try {
      await axios.put(`http://localhost:3000/api/books/${id}`, createBook);
      navigate(`/books/singlebook/${id}`);
    } catch (error) {
      console.log("Error while adding book: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Update Book</h1>
      <form
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="name" className={labelStyle}>
            Name
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            value={Name}
            placeholder="Book Name"
            className={inputStyle}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author_name" className={labelStyle}>
            Author Name
          </label>
          <input
            type="text"
            name="Author_Name"
            id="author_name"
            value={Author_Name}
            placeholder="Author Name"
            className={inputStyle}
            onChange={(e) => {
              setAuthorName(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categories" className={labelStyle}>
            Categories
          </label>
          <input
            type="text"
            name="Categories"
            id="categories"
            value={Categories}
            placeholder="Categories"
            className={inputStyle}
            onChange={(e) => {
              setCategories(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isPhysical" className={labelStyle}>
            P-Book Available
          </label>
          <input
            type="text"
            name="isPhysical"
            id="isPhysical"
            value={isPhysical}
            placeholder="Enter True or False"
            className={inputStyle}
            onChange={(e) => {
              setIsPhysical(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="isEbook" className={labelStyle}>
            E-Book Available
          </label>
          <input
            type="text"
            name="isEbook"
            id="isEbook"
            value={isEbook}
            placeholder="Enter True or False"
            className={inputStyle}
            onChange={(e) => {
              setIsEbook(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="availability" className={labelStyle}>
            Book Qty
          </label>
          <input
            type="number"
            name="Availability"
            id="availability"
            value={Availability}
            placeholder="Total books"
            className={inputStyle}
            onChange={(e) => {
              setAvailability(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className={labelStyle}>
            Book Image
          </label>
          <input
            type="text"
            name="ImageUrl"
            id="imageUrl"
            value={ImageUrl}
            placeholder="Enter Image Link"
            className={inputStyle}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="downloadUrl" className={labelStyle}>
            Book PDF
          </label>
          <input
            type="text"
            name="DownloadUrl"
            id="downloadUrl"
            value={DownloadUrl}
            placeholder="Enter Pdf Link"
            className={inputStyle}
            onChange={(e) => {
              setDownloadUrl(e.target.value);
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

// Common Styles for label and input tags
const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
