import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";

// Functional component to display all members
export default function AllMembers() {
  // State variables to manage users, error, loading, and message states
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  // useEffect to fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        // Make a GET request to the API to fetch all users
        const response = await axios.get("http://localhost:3000/api/user");
        const data = response.data;
        // Update the users state with the fetched data
        setUsers(data);
        // If no users are found, set a message
        if (data.length === 0) {
          setMessage("There are zero members");
        }
      } catch (e) {
        // If there's an error, set the error state
        setError("Error While Fetching Users " + e.message);
      } finally {
        // Set loading to false once the request is complete
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  // Function to navigate to the user's profile page
  const showProfile = (id) => {
    navigate(`/admin/members/singlemember/${id}`);
  };

  // If there's an error, show an alert with the error message
  if (error) {
    return alert(error);
  }

  // If data is still loading, show a loader component
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-center px-4 py-8 bg-slate-500">
      <h1 className="text-3xl font-bold mb-6 text-white">All Members</h1>
      <div className="bg-slate-300 shadow-md rounded px-4 py-4 md:px-8 md:pt-6 md:pb-8 mb-4 w-full max-w-11/12 flex justify-around gap-4 flex-col text-center">
        <table className="w-full">
          <caption className="font-bold mb-2">
            Total {users.length} Members
          </caption>
          <thead>
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Profile
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Name
              </th>
              <th className="px-2 py-1 md:px-4 md:py-2 border border-black">
                Phone No
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400 flex justify-center items-center">
                  <img
                    className="w-12 md:w-14 rounded-full cursor-pointer object-cover h-12 md:h-14"
                    src={user.image}
                    alt={`Profile of ${user.name}`}
                    onClick={() => showProfile(user._id)}
                  />
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
                  {user.name}
                </td>
                <td className="border px-2 py-1 md:px-4 md:py-2 border-slate-400">
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
}
