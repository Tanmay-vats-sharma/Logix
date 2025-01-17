import React, { useState, useEffect } from "react";
import Cursor from "./Cursor.jsx";
import Header from "../common/Header/Header.jsx";
import Dotsbox from "../common/Dots.jsx";
import { Outlet } from "react-router-dom";
import BackToTopButton from "./BackToTopButton.jsx";
import Loader from "./Loader.jsx";

function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dotsbox />
          <Cursor />
          <Header id="Header" />
          <main className="flex-grow flex items-center justify-center gap-3">
            <Outlet />
          </main>
          <BackToTopButton />
        </>
      )}
    </div>
  );
}

export default Layout;
