import { Link, Outlet } from "react-router-dom";

// Navigation Part/Header
export default function BookInventory() {
  return (
    <div className="w-11/12">
      {/* Book Inventory Header(Navigation Menu) */}
      <div className="py-5 px-5 flex justify-start items-center gap-1 bg-slate-700">
        <BookLink to={"/admin/books"} label="All Books" />
        <BookLink to={"/admin/books/school"} label="School" />
        <BookLink to={"/admin/books/college"} label="College" />
        <BookLink to={"/admin/books/highereducation"} label="Higher Edu" />
        <BookLink to={"/admin/books/add"} label="Add Book" />
      </div>
      {/* Book Component show here in outlet according to navigation */}
      <Outlet />
    </div>
  );
}

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
