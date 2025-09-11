// RenderingComponent.jsx
import React from "react";
import DOMPurify from "dompurify";

const RenderingComponent = ({ html }) => {
  const cleanHtml = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });

  return (
    <div
      className="w-full h-full bg-white text-black overflow-auto rounded-xl shadow-md"
      style={{ margin: 0, padding: 0 }}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

export default RenderingComponent;
