import React, { useState, useEffect } from "react";

// Accept initialHtml, initialCss and autoOpen to prefill and auto-run submitted code
const CodeRunner = ({ initialHtml = "", initialCss = "", autoOpen = false, onClose }) => {
  const [htmlCode, setHtmlCode] = useState(initialHtml);
  const [cssCode, setCssCode] = useState(initialCss);
  const [showModal, setShowModal] = useState(autoOpen);
  const [isValid, setIsValid] = useState(true);
  const [srcDoc, setSrcDoc] = useState("");

  // 🔹 Basic validation
  const validateCode = (html) => {
    if (!html || html.trim() === "") return false;

    // simple check (you can make it stronger)
    if (!html.includes("<") || !html.includes(">")) return false;

    return true;
  };

  const handleRun = () => {
    const valid = validateCode(htmlCode);

    if (!valid) {
      setIsValid(false);
      setShowModal(true);
      return;
    }

    // If the provided htmlCode already contains a full HTML document (<!DOCTYPE> or <html>),
    // use it directly as srcDoc. Otherwise wrap it into a minimal document and inject CSS.
    const trimmed = htmlCode.trim().toLowerCase();
    let finalCode;
    if (trimmed.startsWith("<!doctype") || trimmed.startsWith("<html")) {
      finalCode = htmlCode;
    } else {
      finalCode = `
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              ${cssCode}
            </style>
          </head>
          <body>
            ${htmlCode}
          </body>
        </html>
      `;
    }

    setSrcDoc(finalCode);
    setIsValid(true);
    setShowModal(true);
  };

  // if autoOpen is true, run immediately on mount
  useEffect(() => {
    if (autoOpen) {
      handleRun();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">HTML CSS Runner</h1>

      {/* HTML Input */}
      <textarea
        placeholder="Enter HTML here..."
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
        className="w-full h-40 p-3 mb-4 bg-gray-800 border border-gray-700 rounded"
      />

      {/* CSS Input */}
      <textarea
        placeholder="Enter CSS here..."
        value={cssCode}
        onChange={(e) => setCssCode(e.target.value)}
        className="w-full h-40 p-3 mb-4 bg-gray-800 border border-gray-700 rounded"
      />

      <button
        onClick={handleRun}
        className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Run Code
      </button>

      {/* 🔥 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white text-black w-[90%] h-[80%] rounded-lg overflow-hidden relative">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setShowModal(false);
                if (typeof onClose === 'function') onClose();
              }}
              className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white rounded"
            >
              X
            </button>

            {/* Content */}
            {!isValid ? (
              <div className="flex items-center justify-center h-full text-3xl font-bold">
                booo! 👻
              </div>
            ) : (
              <iframe
                srcDoc={srcDoc}
                title="preview"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeRunner;