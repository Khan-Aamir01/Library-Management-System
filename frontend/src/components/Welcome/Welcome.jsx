import React from "react";

export const Welcome = () => {
  return (
    <div className="bg-gray-500 min-h-screen flex items-center justify-center w-11/12 p-5 ">
      <div className="px-6 py-8 bg-gray-400 shadow-lg rounded-lg ">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Welcome, Admin!
        </h2>
        <p className="text-gray-800 mb-6">
          You are now logged in as an administrator of the library management
          system.
        </p>
        <div className="mb-6">
          <p className="text-gray-800 mb-2">
            Here are some tasks you can perform:
          </p>
          <ul className="list-disc list-inside text-gray-800">
            <li>Manage books: Add, edit, or remove books from the library.</li>
            <li>
              Manage users: View and manage user accounts and permissions.
            </li>
            <li>Other Tasks</li>
          </ul>
        </div>
        <p className="text-gray-800">
          Explore the navigation menu to get started!
        </p>
      </div>
    </div>
  );
};
