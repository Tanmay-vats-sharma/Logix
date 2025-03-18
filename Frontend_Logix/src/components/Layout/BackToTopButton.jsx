import React, { useState, useEffect } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    const winHeight = window.innerHeight;

    const scrollPercentage = (scrollTop / (docHeight - winHeight)) * 100;

    if (scrollPercentage > 25) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 flex justify-center items-center text-2xl bg-purple-800  w-14 h-14 text-white rounded-full shadow-lg ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300`}
    >
      ↑
    </button>
  );
};

export default BackToTopButton;
