import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { TiUserDelete } from "react-icons/ti";
import { GrUpdate } from "react-icons/gr";

export const SingleMember = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/${id}`
        );
        setUserData(response.data);
        setLoading(false);
      } catch (e) {
        setError("User Not Found");
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        <h1>{error}</h1>
      </div>
    );
  }

  const handleDelete = async () => {
    await axios.delete(`http://localhost:3000/api/user/${userData._id}`);
    navigate("/admin/members");
  };

  const handleUpdate = async () => {
    navigate(`/admin/members/update/${userData._id}`);
  };

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">User Information</h1>
      <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-2xl flex items-start gap-4">
        <div>
          <img
            className="w-52 object-cover"
            src={userData.image}
            alt={userData.name}
          />
        </div>
        <div>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>Phone No:</strong> {userData.phoneNumber}
          </p>
          <p>
            <strong>Fine:</strong> 20$
          </p>
          <p>
            <strong>Email:</strong> {userData.gmail}
          </p>
          <p>
            <strong>Address:</strong> {userData.address}
          </p>
          <p>
            <strong>Date of Join:</strong>{" "}
            {format(new Date(userData.dateOfJoin), "dd-MM-yyyy")}
          </p>
          <button
            onClick={handleUpdate}
            className="bg-green-400 hover:bg-green-600 transition px-3 py-2 font-bold mt-2 mb-2 rounded"
          >
            <GrUpdate />
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-400 hover:bg-red-600 transition px-3 py-2 font-bold m-2 rounded"
          >
            <TiUserDelete />
          </button>
        </div>
      </div>
    </div>
  );
};
