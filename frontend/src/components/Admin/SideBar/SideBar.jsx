import { useState } from "react";
import { IoBookSharp } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState("welcome");
  const navigate = useNavigate();
  const location = useLocation();

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
        className={`fixed top-0 left-0 w-64 h-full bg-slate-600 p-6 flex flex-col gap-10 transition-transform duration-300 md:hidden overflow-y-auto border-r ${
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
            className="text-white text-left px-4 py-2 rounded bg-gray-700 hover:bg-black border border-teal-300 hover:border-red-500"
          >
            Cancel
          </button>
          <SideBarLink
            to={"/admin"}
            label="Welcome"
            selected={location.pathname === "/admin"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/books"}
            label="Book Inventory"
            selected={location.pathname === "/admin/books"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/members"}
            label="Library Members"
            selected={location.pathname === "/admin/members"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/bookrequest"}
            label="Pending Requests"
            selected={location.pathname === "/admin/bookrequest"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/borrowed"}
            label="Loaned Books"
            selected={location.pathname === "/admin/borrowed"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/fine"}
            label="Late Fees"
            selected={location.pathname === "/admin/fine"}
            onClick={toggleMenu}
          />
          <SideBarLink
            to={"/admin/login"}
            label="Logout"
            selected={location.pathname === "/admin/login"}
            onClick={() => {
              handleLogout();
              toggleMenu();
            }}
          />
        </div>
      </div>

      {/* Sidebar for large devices */}
      <div className="w-1/4 bg-slate-600 border-r border-violet-500 md:flex flex-col gap-10 p-6 justify-start items-center hidden">
        {/* Application Logo and Name Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Application Icon */}
          <IoBookSharp className="text-6xl text-white" />

          {/* Application Name */}
          <h1 className="text-3xl text-white mt-2">Library System</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col gap-3 mt-2 w-full">
          <SideBarLink
            to={"/admin"}
            label="Welcome"
            selected={location.pathname === "/admin"}
          />
          <SideBarLink
            to={"/admin/books"}
            label="Book Inventory"
            selected={location.pathname === "/admin/books"}
          />
          <SideBarLink
            to={"/admin/members"}
            label="Library Members"
            selected={location.pathname === "/admin/members"}
          />
          <SideBarLink
            to={"/admin/bookrequest"}
            label="Pending Requests"
            selected={location.pathname === "/admin/bookrequest"}
          />
          <SideBarLink
            to={"/admin/borrowed"}
            label="Loaned Books"
            selected={location.pathname === "/admin/borrowed"}
          />
          <SideBarLink
            to={"/admin/fine"}
            label="Late Fees"
            selected={location.pathname === "/admin/fine"}
          />
          <SideBarLink
            to={"/admin/login"}
            label="Logout"
            selected={location.pathname === "/admin/login"}
            onClick={handleLogout}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

// Style for single navigation link button
const SideBarLink = ({ to, label, onClick, selected }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`text-white px-4 py-2 border rounded transition-all duration-300 ${
        selected
          ? "bg-black border-red-700"
          : "bg-gray-700 border-teal-300 hover:bg-black hover:border-red-500"
      }`}
    >
      {label}
    </Link>
  );
};
