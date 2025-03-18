import React, { useEffect, useState } from "react";

const Cursor = () => {
  const [cursorStyle, setCursorStyle] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isInteractiveElementHovered, setIsInteractiveElementHovered] =
    useState(false);
  const [isDesktop, setIsDesktop] = useState(true); 

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth > 768); 
    };

    checkIsDesktop();

    window.addEventListener("resize", checkIsDesktop);

    let timer;

    const handleMouseMove = (e) => {
      setCursorStyle({
        x: e.clientX,
        y: e.clientY,
      });

      setIsMoving(true);

      clearTimeout(timer);

      timer = setTimeout(() => {
        setIsMoving(false);
      }, 800);
    };

    const handleHeaderEnter = () => {
      setIsHeaderHovered(true);
    };

    const handleHeaderLeave = () => {
      setIsHeaderHovered(false);
    };

    const handleInteractiveEnter = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") {
        setIsInteractiveElementHovered(true);
      }
    };

    const handleInteractiveLeave = () => {
      setIsInteractiveElementHovered(false);
    };

    document.addEventListener("mousemove", handleMouseMove);

    document.body.addEventListener("mouseenter", handleInteractiveEnter, true);
    document.body.addEventListener("mouseleave", handleInteractiveLeave, true);

    const headerElement = document.getElementById("Header");
    if (headerElement) {
      headerElement.addEventListener("mouseenter", handleHeaderEnter);
      headerElement.addEventListener("mouseleave", handleHeaderLeave);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener(
        "mouseenter",
        handleInteractiveEnter,
        true
      );
      document.body.removeEventListener(
        "mouseleave",
        handleInteractiveLeave,
        true
      );

      if (headerElement) {
        headerElement.removeEventListener("mouseenter", handleHeaderEnter);
        headerElement.removeEventListener("mouseleave", handleHeaderLeave);
      }

      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);

  if (
    !isDesktop ||
    isHeaderHovered ||
    isInteractiveElementHovered ||
    !isMoving
  ) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-[9999]"
      style={{
        left: `${cursorStyle.x}px`,
        top: `${cursorStyle.y}px`,
        transition: "transform 0.1s ease-in-out",
      }}
    />
  );
};

export default Cursor;
