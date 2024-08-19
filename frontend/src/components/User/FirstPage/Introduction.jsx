import { Outlet, useNavigate } from "react-router-dom";
import { GiArchiveResearch } from "react-icons/gi";

export default function Introduction() {
  const navigate = useNavigate();
  const onSearchClick = () => {
    navigate("/lms/allbooks");
  };

  return (
    <>
      <div className="relative bg-[url('https://th.bing.com/th/id/OIP.tS4lU1IhRqQA-HoSBGbe7QHaD2?rs=1&pid=ImgDetMain')] bg-cover bg-center flex flex-col justify-center items-center md:justify-center md:items-start text-white px-8 py-8">
        <div className="absolute inset-0 bg-slate-900 opacity-75"></div>
        <div className="z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-teal-300 opacity-80">
            Discover the Future of Learning
          </h1>
          <div className="border w-full max-w-md flex justify-center items-center bg-[rgb(14,30,49)] rounded-lg shadow-md">
            <input
              type="search"
              placeholder="Search books..."
              className="w-full p-2 rounded-l-lg outline-none bg-slate-900 border-none text-white text-md bg-transparent"
              onClick={onSearchClick}
            />
            <button className="p-2 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition duration-300 ease-in-out">
              <GiArchiveResearch className="text-3xl" onClick={onSearchClick} />
            </button>
          </div>
          <p className="text-sm md:text-sm lg:text-xl font-bold mt-6 max-w-2xl text-center text-teal-300 opacity-65">
            Join a Revolutionary Movement for Integrated Digital Learning in
            India
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
}
