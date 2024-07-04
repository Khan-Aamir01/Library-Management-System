import { IoBookSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-600 flex flex-col gap-10 p-6 justify-start items-center min-h-screen">
        {/* Application Logo and Name Section */}
        <div className="flex flex-col items-center justify-center">
          {/* Application Icon */}
          <IoBookSharp className="text-6xl text-white" />
          {/* Application Name */}
          <h1 className="text-3xl text-white mt-2">Library System</h1>
        </div>

        {/* Navigation Links Section */}
        <div className="flex flex-col gap-3 mt-2">
          <SideBarLink to={"/"} label="Welcome" />
          <SideBarLink to={"/books"} label="Book Inventory" />
          <SideBarLink to={"/users"} label="Library Members" />
          <SideBarLink to={"/fine"} label="Late Fees" />
          <SideBarLink to={"/borrowed"} label="Books on Loan" />
          <SideBarLink to={"/borrow"} label="Pending Requests" />
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const SideBarLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
    >
      {label}
    </Link>
  );
};
