import React from "react";
import Cursor from "../components/Cursor.jsx";
import Header from "../components/common/Header";
import Dotsbox from "./common/Dots.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col">
      <Dotsbox />
      <Cursor />
      <Header id="Header" />
      <main className="flex-grow flex items-center justify-center gap-3">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
