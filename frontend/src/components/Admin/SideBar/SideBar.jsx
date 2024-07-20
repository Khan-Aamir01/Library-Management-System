import { IoBookSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  const handleLogout = () => {
    localStorage.removeItem("userToken");
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-600 flex flex-col gap-10 p-6 justify-start items-center min-h-screen">
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
            to={"/lms/login"}
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
