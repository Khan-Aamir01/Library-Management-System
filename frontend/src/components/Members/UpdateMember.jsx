import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Value for Update
  name, gmail, address, phoneNumber
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // error handlers
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    e.preventDefault();
    setLoading(true);

    const updateMember = async () => {
      image, name, gmail, password, address, phoneNumber;
    };

    try {
      await axios.put(`http://localhost:3000/api/user/${id}`, updateMember);
      navigate(`/members/singlemember/${id}`);
    } catch (e) {
      console.log("Erro Fetch" + e.message);
    }
  };
  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Update Member</h1>
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
          onChange={(e) => {
            setImage(e.target.value);
          }}
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
          onChange={(e) => {
            setName(e.target.value);
          }}
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
