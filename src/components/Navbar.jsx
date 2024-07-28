import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold self-start">
        <div className="flex items-center gap-2">
          <img
            onClick={() => navigate(-1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_left}
            alt=""
          />
          <img
            onClick={() => navigate(1)}
            className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
            src={assets.arrow_right}
            alt=""
          />
        </div>
        <div className="flex items-center gap-4 pr-4">
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Explore premium
          </p>
          <p className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
            Install App
          </p>
          <p className="bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center">
            E
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2 mt-2">
        <p className="px-4 py-1 bg-white text-black flex justify-center items-center rounded-full cursor-pointer">
          All
        </p>
        <p className="px-4 py-1 bg-black flex justify-center items-center rounded-full text-white cursor-pointer">
          Music
        </p>
        <p className="px-4 py-1 bg-black flex justify-center items-center rounded-full text-white cursor-pointer">
          Podcasts
        </p>
      </div>
    </>
  );
};

export default Navbar;
