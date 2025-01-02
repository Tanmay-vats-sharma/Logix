import React from "react";
import Cursor from "../components/Cursor.jsx"; 
import Header from "../components/common/Header";

function Layout({ children }) {
  return (
    <div className="flex flex-col">
      <Cursor /> 
      <Header id="Header"/>
      <main className="flex-grow flex items-center justify-center gap-3">
        {children}
      </main>
    </div>
  );
}

export default Layout;
