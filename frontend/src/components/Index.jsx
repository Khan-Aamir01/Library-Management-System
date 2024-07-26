import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900">
      <h1 className="text-4xl font-bold mb-8 text-gray-400">Welcome to LMS</h1>
      <div className="space-x-4">
        <Link
          to="/lms"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
        >
          User
        </Link>
        <Link
          to="/admin"
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
