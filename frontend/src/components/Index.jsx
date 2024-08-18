import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/005/117/205/non_2x/black-open-book-on-the-table-gray-background-vector.jpg')] bg-cover bg-center bg-no-repeat">
      <h1 className="text-4xl font-bold my-8 text-white">Welcome to LMS</h1>
      <div className="space-x-4">
        <Link
          to="/lms"
          className="px-6 py-2 bg-blue-500 border border-black text-white rounded hover:bg-blue-600 transition duration-200"
        >
          User
        </Link>
        <Link
          to="/admin/login"
          className="px-6 py-2 bg-green-500 text-white rounded border border-black hover:bg-green-600 transition duration-200"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
