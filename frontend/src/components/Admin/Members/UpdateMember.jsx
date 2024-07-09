import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Old Value
  const [user, setUser] = useState(null);

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
        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
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
      await axios.put(`http://localhost:3000/api/user/${id}`, updateMember);
      navigate(`/admin/members/singlemember/${id}`);
    } catch (error) {
      console.log("Error Fetch: " + error.message);
      setMessage("An error occurred while updating the member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Update Member</h1>
      {message && <p className="text-red-500 mb-4">{message}</p>}
      <form
        className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="image" className={labelStyle}>
          Image:
        </label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Member Image Link"
          className={inputStyle}
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <label htmlFor="name" className={labelStyle}>
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Member Name"
          className={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="gmail" className={labelStyle}>
          Gmail:
        </label>
        <input
          type="email"
          name="gmail"
          id="gmail"
          placeholder="Member Gmail"
          className={inputStyle}
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <label htmlFor="password" className={labelStyle}>
          Password:
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Member Password"
          className={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="address" className={labelStyle}>
          Address:
        </label>
        <input
          type="text"
          name="address"
          id="address"
          placeholder="Member Address"
          className={inputStyle}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="phoneNumber" className={labelStyle}>
          Phone Number:
        </label>
        <input
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="Member Phone Number"
          className={inputStyle}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            {loading ? "Updating.." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Common Styles for label and input tags
const labelStyle = "block text-gray-700 text-sm font-bold mb-2";
const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4";
