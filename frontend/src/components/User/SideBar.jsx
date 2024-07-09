import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div className="bg-slate-600 flex justify-between p-2">
      <div className="w-1/4 flex flex-col gap-3 mt-2 p-6">
        <SideBarLink to={"/allbooks"} label={"All"} />
        <SideBarLink to={"/latest"} label={"Latest"} />
        <SideBarLink to={"/latest"} label={"Popular"} />
        <SideBarLink to={"/latest"} label={"School"} />
        <SideBarLink to={"/latest"} label={"College"} />
        <SideBarLink to={"/latest"} label={"Higher Edu.."} />
      </div>
      <div className="w-11/12 bg-slate-500 p-6">
        <h1>Information</h1>
      </div>
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
