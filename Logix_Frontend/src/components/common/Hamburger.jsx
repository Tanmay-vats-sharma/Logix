import React from "react";
import { Link } from "react-router-dom";
import Button from "./button";

const HamburgerMenu = ({ isMenuOpen, toggleMenu, menuItems }) => {
  return (
    <>
      {isMenuOpen && (
        <div className="fixed flex-col items-center top-16 right-4 w-3/4 max-w-sm bg-zinc-800 text-white rounded-lg shadow-lg p-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={`/${item.path}`} 
              className="flex justify-center py-2 text-xl border-b border-gray-700 last:border-b-0 mb-2"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <div className="mt-4 flex justify-center">
            <Button height="40px" width="70%" value="Join us" />
          </div>
        </div>
      )}
    </>
  );
};

export default HamburgerMenu;
