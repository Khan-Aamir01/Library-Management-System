import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="bg-slate-600 flex justify-between p-2">
      <div className="w-1/4 flex flex-col gap-3 mt-2 p-6">
        <SideBarLink to={"/lms/allbooks"} label={"All"} />
        <SideBarLink to={"/lms"} label={"Latest"} />
        <SideBarLink to={"/lms/popular"} label={"Popular"} />
        <SideBarLink to={"/lms/school"} label={"School"} />
        <SideBarLink to={"/lms/college"} label={"College"} />
        <SideBarLink to={"/lms/highereducation"} label={"Higher Edu.."} />
      </div>
      <div className="w-11/12 bg-slate-500 p-6">
        <Outlet />
      </div>
    </div>
  );
}

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
