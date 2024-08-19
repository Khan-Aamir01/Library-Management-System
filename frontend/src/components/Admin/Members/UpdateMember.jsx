import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function UpdateMember() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Value for Update
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Error handlers
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // get Old Value
  useEffect(() => {
    const fetchUserOldData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/user/${id}`);
        const data = response.data;
        setImage(data.image);
        setName(data.name);
        setGmail(data.gmail);
        setPassword(data.password);
        setAddress(data.address);
        setPhoneNumber(data.phoneNumber);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchUserOldData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateMember = {
      name,
      image,
      gmail,
      password,
      address,
      phoneNumber,
    };

    try {
      await axios.put(`${API_URL}/api/user/${id}`, updateMember);
      navigate(`/admin/members/singlemember/${id}`);
    } catch (error) {
      console.log("Error Fetch: " + error.message);
      setMessage("An error occurred while updating the member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-800 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-white">
        Update Member
      </h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form
        className="bg-[rgb(14,30,49)] shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-200 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Member Image Link"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-200 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Member Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gmail" className="block text-gray-200 text-sm font-bold mb-2">
            Gmail
          </label>
          <input
            type="email"
            name="gmail"
            id="gmail"
            placeholder="Member Gmail"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-200 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Member Password"
            minLength={8}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block text-gray-200 text-sm font-bold mb-2">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Member Address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-200 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Member Phone Number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline border-gray-600 focus:border-blue-500 hover:border-blue-400 transition-all duration-300 bg-transparent"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            {loading ? "Updating..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/members")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
