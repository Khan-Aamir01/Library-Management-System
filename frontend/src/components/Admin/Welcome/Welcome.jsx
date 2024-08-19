import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_APP_API_URL;

export default function Welcome() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminProfile = async () => {
      const token = localStorage.getItem("adminAuth");
      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/auth/adminProfile`, {
          headers: { "admin-Token": token },
        });
        setAdmin(response.data);
      } catch (error) {
        localStorage.removeItem("adminAuth");
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    adminProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full text-white">Loading...</div>
    );
  }

  return admin ? (
    <div className=" flex items-center justify-center w-full">
      <div className="px-6 py-8 text-white bg-[rgb(14,25,40)] shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">
          Welcome, {admin.name}!
        </h2>
        <p className="mb-6">
          You are now logged in as an administrator of the library management
          system.
        </p>
        <div className="mb-6">
          <p className="mb-2">
            Here are some tasks you can perform:
          </p>
          <ul className="list-disc list-inside">
            <li>Manage books: Add, edit, or remove books from the library.</li>
            <li>
              Manage users: View and manage user accounts and permissions.
            </li>
            <li>Other Tasks</li>
          </ul>
        </div>
        <p>
          Explore the navigation menu to get started!
        </p>
      </div>
    </div>
  ) : null;
}
