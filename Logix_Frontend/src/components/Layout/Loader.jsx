import React from "react";
import Logo from "../../../src/assets/logix.png"

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#0D0D0D] z-50">
      <div className="relative w-52 h-52 rounded-full flex items-center neon-purple-shadow justify-center">
        <div className="absolute w-full h-full border-[6px] border-purple-500 neon-purple-shadow border-b-transparent border-l-transparent rounded-full animate-spin-reverse"></div>

        <img src={Logo} alt="Logo" className="w-48 h-32" />
      </div>
    </div>
  );
};

export default Loader;
