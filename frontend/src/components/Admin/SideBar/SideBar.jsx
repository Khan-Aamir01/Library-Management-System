import { useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex relative">
      {/* for small devices */}
      <div className="absolute p-6 md:hidden">
        <button
          className="text-white bg-gray-800 p-2 rounded hover:bg-gray-700 transition duration-300"
          onClick={toggleMenu}
        >
          <MdMenuBook className="text-3xl" />
        </button>
      </div>

      {/* Sidebar for small devices */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-slate-600 p-6 flex flex-col gap-10 transition-transform duration-300 md:hidden overflow-y-auto border-r ${
          isMenuOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        {/* Application Logo and Name Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Application Icon */}
          <IoBookSharp className="text-6xl text-white" />

          {/* Application Name */}
          <h1 className="text-3xl text-white mt-2">Library System</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col gap-3 mt-2 w-full">
          <button
            onClick={toggleMenu}
            className="text-white text-left hover:bg-black bg-gray-700 px-4 py-2 rounded transition duration-300"
          >
            Cancel
          </button>
          <SideBarLink to={"/admin"} label="Welcome" onClick={toggleMenu} />
          <SideBarLink
            to={"/admin/books"}
            label="Book Inventory"
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/members"}
            label="Library Members"
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/bookrequest"}
            label="Pending Requests"
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/borrowed"}
            label="Loaned Books"
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/fine"}
            label="Late Fees"
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/login"}
            label="Logout"
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          />
        </div>
      </div>

      {/* Sidebar for large devices */}
      <div className="w-1/4 bg-slate-600 border-r md:flex flex-col gap-10 p-6 justify-start items-center min-h-screen hidden">
        {/* Application Logo and Name Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Application Icon */}
          <IoBookSharp className="text-6xl text-white" />

          {/* Application Name */}
          <h1 className="text-3xl text-white mt-2">Library System</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col gap-3 mt-2 w-full">
          <SideBarLink to={"/admin"} label="Welcome" />
          <SideBarLink to={"/admin/books"} label="Book Inventory" />
          <SideBarLink to={"/admin/members"} label="Library Members" />
          <SideBarLink to={"/admin/bookrequest"} label="Pending Requests" />
          <SideBarLink to={"/admin/borrowed"} label="Loaned Books" />
          <SideBarLink to={"/admin/fine"} label="Late Fees" />
          <SideBarLink
            to={"/admin/login"}
            label="Logout"
            onClick={handleLogout}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

// Style for single navigation link button
const SideBarLink = ({ to, label, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-white hover:bg-black bg-gray-700 px-4 py-2 rounded transition duration-300"
    >
      {label}
    </Link>
  );
};
