import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70 z-0"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center">
        <div className="bg-gradient-to-r from-green-300 to-purple-600 blur-3xl opacity-50 w-3/4 h-3/4 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center text-white">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-6">
          Welcome to LMS
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8">
          Manage your library with ease and efficiency.
        </p>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <Link
            to="/lms"
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-lg font-semibold rounded shadow-lg hover:from-blue-400 hover:to-indigo-400 transition-all duration-300 transform hover:scale-105"
          >
            User Portal
          </Link>
          <Link
            to="/admin/login"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-lg font-semibold rounded shadow-lg hover:from-green-400 hover:to-teal-400 transition-all duration-300 transform hover:scale-105"
          >
            Admin Portal
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm z-10">
        <p>
          &copy; {new Date().getFullYear()} Library Management System. All
          Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
