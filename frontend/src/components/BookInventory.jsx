import { Link, Outlet } from "react-router-dom";

export const BookInventory = () => {
  return (
    <div className="w-11/12">
      {/* Book Inventory Header */}
      <div className="py-5 px-5 flex justify-start items-center gap-1 bg-slate-700">
        <BookLink to={"/books"} label="All Books" />
        <BookLink to={"/books/add"} label="Add Book" />
      </div>
      {/* Book Inventory All Book and Add Book Component */}
      <Outlet />
    </div>
  );
};

// Styling for single navigation link button
const BookLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="text-gray-50 text-lg rounded-md hover:bg-slate-600 py-2 px-4 transition"
    >
      {label}
    </Link>
  );
};
