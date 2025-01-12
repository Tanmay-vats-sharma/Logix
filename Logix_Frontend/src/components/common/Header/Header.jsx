import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../button";
import Logo from "../../../assets/logix.png";
import HamburgerMenu from "./Hamburger";
import ProgressBar from "./ProgressScrollbar";

const Navbar = ({ id }) => {
  const location = useLocation();
  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Leaderboard", path: "/leaderboard" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const navbarLeft = document
      .querySelector(".navbar")
      .getBoundingClientRect().left;
    setHoverStyle({ left: left - navbarLeft, width: width, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setHoverStyle({ ...hoverStyle, opacity: 0 });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div
        id={id}
        className="fixed w-full px-2 flex items-center z-[1] text-white animate-navbar bg-[#1b1c1d] border-gray-50"
      >
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
              <Link
                key={index}
                to={item.path}
                className={`item rounded-lg w-28 flex justify-center items-center text-white text-lg cursor-pointer relative z-20 ${
                  isActive(item.path)
                    ? "h-[100%] rounded-none border-b-2 border-purple-500"
                    : ""
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button className="text-white text-4xl" onClick={toggleMenu}>
              {isMenuOpen ? "☰" : "☰"}
            </button>
          </div>
        </div>

        {!isMobile && <Button height="30px" width="100px" value="Join us" />}

        {isMenuOpen && (
          <HamburgerMenu
            isMenuOpen={isMenuOpen}
            menuItems={menuItems}
            toggleMenu={toggleMenu}
          />
        )}
      </div>
      <ProgressBar />
    </div>
  );
};

export default Navbar;
