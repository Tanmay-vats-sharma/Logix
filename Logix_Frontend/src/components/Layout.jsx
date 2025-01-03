import React from "react";
import Cursor from "../components/Cursor.jsx";
import Header from "../components/common/Header/Header.jsx";
import Dotsbox from "./common/Dots.jsx";
import { Outlet } from "react-router-dom";
import BackToTopButton from "../components/BackToTopButton"; 
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Dotsbox />
      <Cursor />
      <Header id="Header" />
      <main className="flex-grow flex items-center justify-center gap-3">
        <Outlet />
      </main>
      <BackToTopButton /> 
    </div>
  );
}

export default Layout;
