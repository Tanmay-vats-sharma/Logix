import React, { useState, useEffect } from "react";
import CodeEditorPage from "./CodeEditor";
import RenderingComponent from "./RenderingComponent";

const CodeEventDayUI = () => {
  const [code, setCode] = useState(`<div class="waiting-screen">
  <div class="overlay">
    <h1 class="title">Welcome to <span class="highlight">Logix</span></h1>
    <p class="subtitle">Ultimate Code Battle</p>
    <div class="message-box">
      <h2>Please wait...</h2>
      <p>The event will begin shortly</p>
      <p class="small">Stay tuned for the next round!</p>
    </div>
    <div class="loader"></div>
  </div>
</div>

<style>
  body {
    margin: 0;
    padding: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #0f172a, #1e293b); /* Dark gradient */
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .waiting-screen {
    text-align: center;
    padding: 20px;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .highlight {
    background: linear-gradient(90deg, #a855f7, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }

  .subtitle {
    color: #9ca3af;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  .message-box {
    background: rgba(255, 255, 255, 0.05); /* Dark translucent */
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    max-width: 400px;
    margin: 0 auto 2rem;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.2); /* purple glow */
  }

  .message-box h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #60a5fa; /* blue accent */
  }

  .message-box p {
    margin: 5px 0;
    color: #d1d5db;
  }

  .message-box .small {
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .loader {
    width: 40px;
    height: 40px;
    margin: 0 auto;
    border: 4px solid rgba(255, 255, 255, 0.1);
    border-top-color: #a855f7; /* purple spinner */
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .title {
      font-size: 1.5rem;
    }
    .message-box {
      padding: 15px;
    }
  }
</style>

  `);

  // Round Info
  const [round, setRound] = useState(1);

  // Timer (5 minutes = 300 seconds for example)
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Countdown logic
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

  // Submit handlers
  const handleSubmit = () => {
    setSubmitted(true);
    setIsRunning(false);
    alert("✅ Code submitted early! Bonus points awarded!");
  };

  const handleAutoSubmit = () => {
    setSubmitted(true);
    setIsRunning(false);
    alert("⏰ Time’s up! Auto-submitting your code...");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            InnovateX Code Battle
          </h1>
          <p className="text-gray-400 mt-2">
            Showcase your code and bid for the best!
          </p>
        </header>

        {/* Round & Timer */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
            <span className="text-lg">🏆 Round {round}</span>
          </div>
          <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700 font-mono text-xl text-green-400">
            ⏳ {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitted}
            className={`px-6 py-2 rounded-lg font-semibold transition ${submitted
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              }`}
          >
            {submitted ? "Submitted" : "Submit Early"}
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Editor */}
          <div className="rounded-xl border border-gray-700 shadow-lg bg-gray-800/40 p-2 h-[70vh] w-[45vw]">
            <CodeEditorPage code={code} onCodeChange={setCode} isLocked={!isRunning}/>
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
