import { useNavigate } from "react-router-dom";

export const CollegeInventory = () => {
  const navigate = useNavigate();

  const singleClassHandler = (categorise, classId) => {
    navigate(`/lms/books/${categorise}/class/${classId}`);
  };

  return (
    <div className="flex flex-col items-center py-8 bg-slate-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Select Class</h1>
      <div className="px-2 mt-2 flex flex-wrap justify-center">
        <SchoolNavigation
          onClick={() => singleClassHandler("college", "11th")}
          label="11th"
        />
        <SchoolNavigation
          onClick={() => singleClassHandler("college", "12th")}
          label="12th"
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
