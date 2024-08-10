import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export default function UpdateBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Author_Name, setAuthorName] = useState("");
  const [Categories, setCategories] = useState("");
  const [std, setStd] = useState("");
  const [isPhysical, setIsPhysical] = useState("");
  const [isEbook, setIsEbook] = useState("");
  const [Availability, setAvailability] = useState("");
  const [ImageUrl, setImageUrl] = useState("");
  const [DownloadUrl, setDownloadUrl] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/books/${id}`);
        const book = response.data;
        setName(book.Name);
        setAuthorName(book.Author_Name);
        setCategories(book.Categories);
        setStd(book.std);
        setIsPhysical(book.isPhysical.toString());
        setIsEbook(book.isEbook.toString());
        setAvailability(book.Availability);
        setImageUrl(book.ImageUrl);
        setDownloadUrl(book.DownloadUrl);
      } catch (error) {
        setError("Error fetching book data: " + error.message);
      }
    };
    fetchBookData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const updatedBook = {
      Name,
      Author_Name,
      Categories,
      std,
      isPhysical: isPhysical.toLowerCase(),
      isEbook: isEbook.toLowerCase(),
      Availability,
      ImageUrl,
      DownloadUrl,
    };

    try {
      await axios.put(`${API_URL}/api/books/${id}`, updatedBook);
      setLoading(false);
      navigate(`/admin/books/singlebook/${id}`);
    } catch (error) {
      setError("Update Unsuccessful: " + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Update Book</h1>
      <form
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-red-500 mb-4">{error}</div>}
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categories" className={labelStyle}>
            Categories
          </label>
          <select
            name="categories"
            id="categories"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 outline-none bg-blue-50"
            value={Categories}
            onChange={(e) => {
              setCategories(e.target.value);
              setStd("");
            }}
          >
            <option value="school">School</option>
            <option value="college">College</option>
            <option value="highereducation">Higher Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="std" className={labelStyle}>
            Standard
          </label>
          {Categories === "school" && (
            <select
              name="std"
              id="std"
              value={std}
              className={inputStyle}
              onChange={(e) => setStd(e.target.value)}
            >
              <option value="">Select Standard</option>
              <option value="5th">5th</option>
              <option value="6th">6th</option>
              <option value="7th">7th</option>
              <option value="8th">8th</option>
              <option value="9th">9th</option>
              <option value="10th">10th</option>
            </select>
          )}
          {Categories === "college" && (
            <select
              name="std"
              id="std"
              value={std}
              className={inputStyle}
              onChange={(e) => setStd(e.target.value)}
            >
              <option value="">Select Standard</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </select>
          )}
          {Categories === "highereducation" && (
            <select
              name="std"
              id="std"
              value={std}
              className={inputStyle}
              onChange={(e) => setStd(e.target.value)}
            >
              <option value="">Select Program</option>
              <option value="mbbs">MBBS</option>
              <option value="aiml">AI & ML</option>
              <option value="be">B.E.</option>
              <option value="bsc-it">B.Sc. IT</option>
            </select>
          )}
          {Categories === "other" && (
            <input
              type="text"
              name="std"
              id="std"
              value={std}
              placeholder="Enter custom standard"
              className={inputStyle}
              onChange={(e) => setStd(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4">
          <label className={labelStyle}>P-Book Available</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="isPhysical"
                value="true"
                checked={isPhysical === "true"}
                onChange={(e) => setIsPhysical(e.target.value)}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isPhysical"
                value="false"
                checked={isPhysical === "false"}
                onChange={(e) => setIsPhysical(e.target.value)}
              />{" "}
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className={labelStyle}>E-Book Available</label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="isEbook"
                value="true"
                checked={isEbook === "true"}
                onChange={(e) => setIsEbook(e.target.value)}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isEbook"
                value="false"
                checked={isEbook === "false"}
                onChange={(e) => setIsEbook(e.target.value)}
              />{" "}
              No
            </label>
          </div>
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
            onChange={(e) => setAvailability(e.target.value)}
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
            onChange={(e) => setImageUrl(e.target.value)}
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
            placeholder="Enter PDF Link"
            className={inputStyle}
            onChange={(e) => setDownloadUrl(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}

const labelStyle =
  "block text-gray-700 text-sm font-bold mb-2 text-start tracking-wider";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-blue-50";
