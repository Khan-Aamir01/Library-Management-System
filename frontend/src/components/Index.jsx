import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('https://static.vecteezy.com/system/resources/previews/015/839/383/non_2x/polygon-digital-literacy-vector.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-950 opacity-50 z-0"></div>
      <div className="relative z-10 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold my-8 text-white">Welcome to LMS</h1>
        <div className="space-x-4">
          <Link
            to="/lms"
            className="px-6 py-2 font-bold bg-blue-700 text-white rounded border border-yellow-500 hover:bg-blue-600 transition duration-300"
          >
            User
          </Link>
          <Link
            to="/admin/login"
            className="px-6 py-2 font-bold bg-green-700 text-white rounded border border-yellow-500 hover:bg-green-600 transition duration-300"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
