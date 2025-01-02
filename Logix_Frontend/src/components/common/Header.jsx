import React, { useEffect, useState } from "react";
import Button from "./button";
import Logo from "../../assets/logix.png";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const menuItems = ["home", "about", "event", "contact"];

  const handleMouseEnter = (e, index) => {
    const { left, width } = e.target.getBoundingClientRect();
    const navbarLeft = document
      .querySelector(".navbar")
      .getBoundingClientRect().left;
    setHoverStyle({ left: left - navbarLeft, width: width, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverStyle({ ...hoverStyle, opacity: 0 });
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="fixed w-full px-2 flex items-center z-[1] text-white animate-navbar bg-zinc-800/40 border-gray-50">
      <div className="w-11/12 h-full flex items-center">
        <div className="h-14 w-28">
          <img src={Logo} alt="" className="h-[100%] w-[100%]" />
        </div>
        <div className="navbar w-3/6 z-[10] h-full flex justify-evenly items-center relative">
        
          <div
            className="hover-bg absolute h-8 bg-purple-500 rounded-lg neon-purple-shadow transition-all duration-300 pointer-events-none"
            style={{
              left: hoverStyle.left,
              width: hoverStyle.width,
              opacity: hoverStyle.opacity,
              zIndex: 1, 
            }}
          ></div>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`item h-8 rounded-lg w-24 flex justify-center items-center text-white text-lg cursor-pointer relative z-20 ${
                activeIndex === index
                  ? "h-[100%] rounded-none border-b-2 border-purple-500"
                  : ""
              }`}
              onMouseEnter={(e) => handleMouseEnter(e, index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <Button height="30px" width="80px" value="Join us" />
    </div>
  );
};

export default Navbar;
