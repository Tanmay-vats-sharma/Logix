// CodeEventDayUI.jsx
import React, { useState, useEffect } from "react";
import CodeEditorPage from "./CodeEditor";
import RenderingComponent from "./RenderingComponent";

const CodeEventDayUI = ({ adminData }) => {
  // Extract props from adminData
  const [round, setRound] = useState(adminData?.round?.name || "Round");
  const [question, setQuestion] = useState(adminData?.question?.description || "");
  const [code, setCode] = useState(adminData?.question?.starterCode || "<!-- Code will appear here -->");

  // Timer from admin
  const [timeLeft, setTimeLeft] = useState(adminData?.time || 300);
  const [isRunning, setIsRunning] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Countdown
  useEffect(() => {
    if (!isRunning || submitted) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, submitted, timeLeft]);

  // Format seconds → mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Submissions
  const handleSubmit = () => {
    setSubmitted(true);
    setIsRunning(false);
    alert("✅ Code submitted early!");
  };

  const handleAutoSubmit = () => {
    setSubmitted(true);
    setIsRunning(false);
    alert("⏰ Time’s up! Auto-submitting...");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            InnovateX Code Battle
          </h1>
          <p className="text-gray-400 mt-2">{round}</p>
          <p className="text-gray-300">{question}</p>
        </header>

        {/* Round & Timer */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
            <span className="text-lg">🏆 {round}</span>
          </div>
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700 font-mono text-xl text-green-400">
            ⏳ {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              submitted
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
            }`}
          >
            {submitted ? "Submitted" : "Submit Early"}
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor */}
          <div className="rounded-xl border border-gray-700 shadow-lg bg-gray-800/40 p-2 h-[70vh] w-[45vw]">
            <CodeEditorPage
              code={code}
              onCodeChange={setCode}
              isLocked={!isRunning}
            />
          </div>

          {/* Live Render */}
          <div className="rounded-xl border border-gray-700 shadow-lg bg-gray-100 p-2 h-[70vh] w-[45vw]">
            <RenderingComponent html={code} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEventDayUI;
