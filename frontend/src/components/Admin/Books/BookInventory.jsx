import { Link, Outlet } from "react-router-dom";

// Navigation Part/Header
export default function BookInventory() {
  return (
    <div className="w-full">
      {/* Book Inventory Header(Navigation Menu) */}
      <div className="py-5 px-20 md:px-5 flex md:justify-start justify-center items-center gap-1 bg-[rgb(24,37,53)] flex-wrap-reverse ">
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
      className="text-gray-50 text-lg rounded-md bg-[rgb(40,55,73)] hover:bg-slate-900 py-2 px-4 transition"
    >
      {label}
    </Link>
  );
};
