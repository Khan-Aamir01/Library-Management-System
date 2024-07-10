import { Link } from "react-router-dom";
export const SchoolInventroy = () => {
  return (
    <div className="w-11/12 bg-slate-500 p-6">
      <h1 className="font-bold text-xl text-white px-4">Select Your Class</h1>
      <div className="flex justify-start flex-wrap gap-1">
        <NavigationLink to={"/lms/school/class5"} label={"Class-5"} />
        <NavigationLink to={"/lms/school/class6"} label={"Class-6"} />
        <NavigationLink to={"/lms/school/class7"} label={"Class-7"} />
        <NavigationLink to={"/lms/school/class8"} label={"Class-8"} />
        <NavigationLink to={"/lms/school/class9"} label={"Class-9"} />
        <NavigationLink to={"/lms/school/class10"} label={"Class-10"} />
      </div>
    </div>
  );
};
const NavigationLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-white hover:bg-gray-700 px-4 py-2 rounded transition duration-300"
    >
      {label}
    </Link>
  );
};
