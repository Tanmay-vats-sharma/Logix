import React, { useState, useEffect } from "react";
import { Clock, Settings, Play, SkipForward, RefreshCcw } from "lucide-react";
import { getChannel } from "../../utils/ably";
import CodeRunner from "./CodeRunner";

const EventControlTab = () => {
  const channel = getChannel("event-control");

  const [timeLeft, setTimeLeft] = useState(60); // default 1 min for typing
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [timeInput, setTimeInput] = useState(60); // input also in seconds
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [adminPreviewCode, setAdminPreviewCode] = useState("");

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isTimerRunning && timeLeft <= 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  // Format purely in seconds
  const formatTime = (seconds) => {
    return `${seconds.toString().padStart(2, "0")}s`;
  };

  const handleApplySettings = () => {
    setTimeLeft(timeInput);
    setIsTimerRunning(false);
  };

const handleStartQuestion = () => {
  console.log("handleStartQuestion triggered");
  console.log("textInput:", textInput);

  if (!textInput.trim()) {
    alert("Please enter the text for typing.");
    return;
  }

  const data = {
    text: textInput,
    time: timeInput,
  };

  setTimeLeft(timeInput);
  setIsTimerRunning(true);

  console.log("Publishing start-question with data:", data);
  channel.publish("start-question", data);
};

const handleSendViewCodeEvent = (action) => {
  const data = {
    action,
    message: action,
  };

  console.log("Publishing view-code with data:", data);
  channel.publish("view-code", data);
};

const handleAdminViewCode = () => {
  setAdminPreviewCode(textInput || "");
  setIsCodeModalOpen(true);
};


  return (
    <div className="p-6 min-h-screen bg-gray-950 text-gray-100">
      {/* Text Input */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-5 mb-6 border border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="text-indigo-400" size={22} />
          <h2 className="text-xl font-semibold">Typing Text</h2>
        </div>
        <textarea
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Enter the text that participants will type..."
          className="w-full h-32 p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />
      </div>

      {/* Question Controls */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="text-purple-400" size={22} />
          <h2 className="text-xl font-semibold">Typing Controls</h2>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-400 text-sm mb-1">Time Remaining</p>
          <div
            className={`text-5xl font-extrabold tracking-wide ${
              timeLeft === 0 ? "text-red-500" : "text-purple-400"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                handleStartQuestion();
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-green-500/30 font-semibold"
            >
              <Play size={18} /> Start Typing
            </button>
            <button
              onClick={() => handleSendViewCodeEvent("open")}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-indigo-500/30 font-semibold"
            >
              <Play size={18} /> Send Show Code
            </button>
            <button
              onClick={handleAdminViewCode}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-cyan-500/30 font-semibold"
            >
              <Play size={18} /> Admin View Code
            </button>
            <button
              onClick={() => handleSendViewCodeEvent("close")}
              className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-slate-400/30 font-semibold"
            >
              <SkipForward size={18} /> Hide Code
            </button>
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-yellow-400/30 font-semibold">
              <SkipForward size={18} /> Skip Question
            </button>
            <button
              onClick={() => {
                setTimeLeft(timeInput); // reset to applied seconds
                setIsTimerRunning(false);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-red-500/30 font-semibold"
            >
              <RefreshCcw size={18} /> Reset Timer
            </button>
          </div>
        </div>

        {/* Time Input */}
        <div className="mb-6">
          <label
            htmlFor="time-input"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Set Time (seconds)
          </label>
          <input
            id="time-input"
            type="number"
            min="1"
            max="3600"
            value={timeInput}
            onChange={(e) => setTimeInput(Number(e.target.value))}
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Apply Settings */}
        <button
          onClick={handleApplySettings}
          className="w-48 bg-indigo-600 hover:bg-indigo-500 transition-all px-5 py-3 rounded-lg shadow-md shadow-indigo-500/30 font-semibold"
        >
          Apply Settings
        </button>
      </div>

      {isCodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-4xl rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-100">Code Preview (Admin)</h2>
              <button
                type="button"
                onClick={() => setIsCodeModalOpen(false)}
                className="rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-200 transition hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto px-6 py-5">
              {adminPreviewCode ? (
                <div className="h-[60vh]">
                  <CodeRunner code={adminPreviewCode} />
                </div>
              ) : (
                <pre className="whitespace-pre-wrap break-words rounded-lg bg-gray-950 p-4 text-sm text-gray-100">
                  No text available to preview.
                </pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventControlTab;
