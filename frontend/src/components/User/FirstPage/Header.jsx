import { FaBookOpenReader } from "react-icons/fa6";
import { PiAddressBookLight } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLogin = !!localStorage.getItem("userToken");
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between py-4 px-8  bg-[rgb(0,23,57)] sticky top-0 z-50">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/lms")}
        >
          <FaBookOpenReader className="text-4xl text-teal-400 cursor-pointer" />
          <h1 className="font-bold text-teal-300">Library Management System</h1>
        </div>
        <div className="flex items-center">
          <PiAddressBookLight
            onClick={() => {
              !isLogin ? navigate("/lms/login") : navigate("/lms/profile");
            }}
            className="text-3xl text-teal-400 cursor-pointer"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}
