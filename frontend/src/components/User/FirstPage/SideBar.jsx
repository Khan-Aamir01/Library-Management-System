import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="bg-slate-900 flex md:flex-row flex-col justify-between p-2">
      <div className="md:w-1/4 flex md:flex-col flex-wrap md:gap-3 gap-1 md:mt-2 md:p-6 mb-2">
        <SideBarLink to={"/lms/allbooks"} label={"All"} />
        <SideBarLink to={"/lms"} label={"Latest"} />
        <SideBarLink to={"/lms/popular"} label={"Popular"} />
        <SideBarLink to={"/lms/school"} label={"School"} />
        <SideBarLink to={"/lms/college"} label={"College"} />
        <SideBarLink to={"/lms/highereducation"} label={"Higher Edu.."} />
      </div>
      <div className="md:w-11/12 bg-slate-800 p-6 flex flex-col items-center md:items-start">
        <Outlet />
      </div>
    </div>
  );
}

const SideBarLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-white font-bold hover:bg-teal-600 bg-teal-700 px-4 py-2 rounded transition duration-300"
    >
      {label}
    </Link>
  );
};
