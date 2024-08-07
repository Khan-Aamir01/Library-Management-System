import { FaBookOpenReader } from "react-icons/fa6";
import { PiAddressBookLight } from "react-icons/pi";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const isLogin = !!localStorage.getItem("userToken");
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-between py-4 px-8 bg-slate-600">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/lms")}
        >
          <FaBookOpenReader className="text-4xl text-white cursor-pointer" />
          <h1 className="font-bold text-white">Library Management System</h1>
        </div>
        <div className="flex items-center">
          <PiAddressBookLight
            onClick={() => {
              !isLogin ? navigate("/lms/login") : navigate("/lms/profile");
            }}
            className="text-3xl text-white cursor-pointer"
          />
        </div>
      </div>
      <Outlet />
    </>
  );
}
