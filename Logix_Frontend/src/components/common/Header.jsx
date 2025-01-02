import React, { useState, useEffect } from "react";
import Button from "./button";
import Logo from "../../assets/logix.png";
import HamburgerMenu from "./Hamburger";

const Navbar = ({id}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = ["home", "about", "event", "contact","leaderboard"];


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div id={id} className="fixed w-full px-2 flex items-center z-[1] text-white animate-navbar bg-zinc-800/40 border-gray-50">
      <div className="w-11/12 h-full flex items-center justify-between md:justify-start">
        <div className="h-14 w-28 mr-10 ml-3">
          <img src={Logo} alt="Logo" className="h-[100%] w-[100%]" />
        </div>

        <div className="navbar h-full hidden md:flex w-4/6 justify-evenly items-center relative">
          <div
            className="hover-bg hover:h-8 absolute h-8 bg-purple-500 rounded-lg neon-purple-shadow transition-all duration-300 pointer-events-none"
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
              className={`item  rounded-lg w-28 flex justify-center items-center text-white text-lg cursor-pointer relative z-20 ${
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

        <div className="md:hidden">
          <button className="text-white text-4xl" onClick={toggleMenu}>
            {isMenuOpen ? "☰" : "☰"}
          </button>
        </div>
      </div>

      {!isMobile && <Button height="30px" width="100px" value="Join us" />}

      {isMenuOpen && <HamburgerMenu isMenuOpen={isMenuOpen} menuItems={menuItems} toggleMenu={toggleMenu} ></HamburgerMenu>}
    </div>
  );
};

export default Navbar;
