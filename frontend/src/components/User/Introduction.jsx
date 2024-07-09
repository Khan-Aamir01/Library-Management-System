import { Outlet } from "react-router-dom";
export const Introduction = () => {
  return (
    <>
      <div className="relative bg-[url('https://th.bing.com/th/id/OIP.tS4lU1IhRqQA-HoSBGbe7QHaD2?rs=1&pid=ImgDetMain')] bg-cover bg-center flex flex-col justify-center items-center md:justify-center md:items-start text-white p-4">
        <div className="absolute inset-0 bg-slate-900 opacity-50"></div>
        <div className="z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Discover the Future of Learning
          </h1>
          <div className="w-full max-w-md">
            <input
              type="search"
              name="search"
              id="search"
              className="w-full p-3 rounded-lg border border-gray-300 outline-none ring-2 focus:ring-indigo-500 text-black text-md"
              placeholder="Search for books"
            />
          </div>
          <p className="text-sm md:text-sm lg:text-xl font-bold mt-4 max-w-2xl text-center text-shadow-lg">
            Join a Revolutionary Movement for Integrated Digital Learning in
            India
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
};
