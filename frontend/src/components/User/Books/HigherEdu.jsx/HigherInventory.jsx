import { Link } from "react-router-dom";
export const HigherInventory = () => {
  return (
    <div className="w-11/12 bg-slate-500 p-6">
      <h1 className="font-bold text-xl text-white px-4">Select Your Class</h1>
      <div className="flex justify-start flex-wrap gap-1">
        <NavigationLink to={"/lms/school/class11"} label={"Class-11"} />
        <NavigationLink to={"/lms/school/class12"} label={"Class-12"} />
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
