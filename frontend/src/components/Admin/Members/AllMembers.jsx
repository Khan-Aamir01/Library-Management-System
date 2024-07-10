import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../Loader/Loader";

export const AllMembers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  // if users load slow then loading work
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user");
        const data = response.data;
        setUsers(data);
        if (data.length === 0) {
          setMessage("There are zero members");
        }
      } catch (e) {
        setError("Error While Fetching Users " + e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, [users]);

  const showProfile = (id) => {
    navigation(`/admin/members/singlemember/${id}`);
  };

  if (error) {
    return alert(error);
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">All Members</h1>
      <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-11/12 max-w-11/12 flex justify-around gap-10 flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {users.length} Members
          </caption>
          <thead>
            <tr>
              <th className="px-4 py-2 border border-black">Image</th>
              <th className="px-4 py-2 border border-black">Name</th>
              <th className="px-4 py-2 border border-black">Phone No</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2 border-slate-400 flex justify-center flex-col items-center">
                  <img
                    className="w-14 rounded-full cursor-pointer object-cover h-14"
                    src={user.image}
                    alt={`Profile of ${user.name}`}
                    onClick={() => showProfile(user._id)}
                  />
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {user.name}
                </td>
                <td className="border px-4 py-2 border-slate-400">
                  {user.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <h1>{message}</h1>}
      </div>
    </div>
  );
};
