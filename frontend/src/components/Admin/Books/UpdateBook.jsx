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
    <div className="flex flex-col items-center py-8 bg-slate-800">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Update Book
      </h1>
      <form
        className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12"
        onSubmit={handleSubmit}
      >
        {error && <div className="text-red-400 mb-4">{error}</div>}

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="Name"
            id="name"
            value={Name}
            placeholder="Book Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="author_name"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Author Name
          </label>
          <input
            type="text"
            name="Author_Name"
            id="author_name"
            value={Author_Name}
            placeholder="Author Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={(e) => setAuthorName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="categories"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Categories
          </label>
          <select
            name="categories"
            id="categories"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-[rgb(14,30,49)] leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300"
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
          <label
            htmlFor="std"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Standard
          </label>
          {Categories === "school" && (
            <select
              name="std"
              id="std"
              value={std}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-[rgb(14,30,49)] leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-[rgb(14,30,49)] leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-[rgb(14,30,49)] leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 bg-transparent leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300"
              onChange={(e) => setStd(e.target.value)}
            />
          )}
        </div>

        <div className="mb-4 text-white">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            P-Book Available
          </label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="isPhysical"
                value="true"
                checked={isPhysical === "true"}
                onChange={(e) => setIsPhysical(e.target.value)}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isPhysical"
                value="false"
                checked={isPhysical === "false"}
                onChange={(e) => setIsPhysical(e.target.value)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4 text-white">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            E-Book Available
          </label>
          <div className="flex">
            <label className="mr-4">
              <input
                type="radio"
                name="isEbook"
                value="true"
                checked={isEbook === "true"}
                onChange={(e) => setIsEbook(e.target.value)}
                className="mr-2"
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isEbook"
                value="false"
                checked={isEbook === "false"}
                onChange={(e) => setIsEbook(e.target.value)}
                className="mr-2"
              />
              No
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="availability"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Availability
          </label>
          <input
            type="text"
            name="Availability"
            id="availability"
            value={Availability}
            placeholder="Availability"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="image_url"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Image URL
          </label>
          <input
            type="text"
            name="ImageUrl"
            id="image_url"
            value={ImageUrl}
            placeholder="Image URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="download_url"
            className="block text-gray-200 text-sm font-bold mb-2"
          >
            Download URL
          </label>
          <input
            type="text"
            name="DownloadUrl"
            id="download_url"
            value={DownloadUrl}
            placeholder="Download URL"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            onChange={(e) => setDownloadUrl(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/books")}
            className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
