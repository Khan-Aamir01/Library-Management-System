import { useNavigate } from "react-router-dom";

export const SchoolInventory = () => {
  const navigate = useNavigate();

  const singleClassHandler = (categorise, classId) => {
    navigate(`/admin/books/${categorise}/class/${classId}`);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Select Class</h1>
      <div className="px-2 mt-2 flex flex-wrap justify-center">
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "5th")}
          label="5th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "6th")}
          label="6th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "7th")}
          label="7th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "8th")}
          label="8th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "9th")}
          label="9th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("school", "10th")}
          label="10th"
        />
      </div>
    </div>
  );
};

const SchoolNavigation = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="py-2 m-1 px-2 bg-slate-300 bg-opacity-50 rounded-lg border-2 border-slate-300 hover:border-red-400 transition-all"
    >
      {label}
    </button>
  );
};
