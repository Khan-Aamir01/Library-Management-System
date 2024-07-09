import { FaBookOpenReader } from "react-icons/fa6";
import { RiMapPinUserFill } from "react-icons/ri";
import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <div className="flex justify-between py-4 px-8 bg-slate-600">
        <div className="flex items-center gap-4">
          <FaBookOpenReader className="text-4xl text-white" />
          <h1 className="font-bold text-white">Library Management Syatem</h1>
        </div>
        <div className="flex items-center">
          <RiMapPinUserFill className="text-3xl text-white" />
        </div>
      </div>
      <Outlet />
    </>
  );
};
