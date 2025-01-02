import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const menuItems = ["home", "about", "event","contact"];

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
  }

  return (
    <div className="fixed w-full  z-[1] text-white animate-navbar  border-gray-50">
      <div className="navbar w-3/6  z-[-1] h-full bg-zinc-800/40 flex justify-evenly items-center relative">
        <div
          className="hover-bg absolute h-10 bg-purple-500 neon-purple-shadow rounded transition-all duration-300 pointer-events-none"
          style={{
            left: hoverStyle.left,
            width: hoverStyle.width,
            opacity: hoverStyle.opacity,
          }}
        ></div>
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`item h-10 w-24 flex justify-center items-center text-white text-lg cursor-pointer relative z-10 ${
              activeIndex === index ? "bg-purple-500 neon-purple-shadow" : ""
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
  );
};

export default Navbar;
