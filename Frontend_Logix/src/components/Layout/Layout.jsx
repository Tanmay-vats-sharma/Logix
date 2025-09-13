import React, { useState, useEffect } from "react";
import Cursor from "./Cursor.jsx";
import Header from "../common/Header/Header.jsx";
import Dotsbox from "./Dots.jsx";
import { Outlet } from "react-router-dom";
import BackToTopButton from "./BackToTopButton.jsx";
import Loader from "./Loader.jsx";
import { ToastContainer } from "react-toastify";

function Layout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    // Check if the document is already loaded
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000} // closes in 3s
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" // light, dark, colored
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Dotsbox />
          <Cursor />
          {/* <Header id="Header" /> */}
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
