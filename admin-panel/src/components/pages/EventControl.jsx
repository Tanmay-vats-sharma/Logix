import React, { useState, useEffect } from "react";
import { Clock, Settings, Play, SkipForward, RefreshCcw } from "lucide-react";

const EventControlTab = () => {
  const questions = [
    "Question 1: Create a responsive navbar",
    "Question 2: Style a registration form",
    "Question 3: Implement a CSS grid layout",
    "Question 4: Create an animated button",
    "Question 5: Build a card component",
  ];

  const rounds = ["Round 1", "Round 2", "Round 3", "Round 4", "Round 5"];

  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeRound, setActiveRound] = useState("Round 1");

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="p-6 min-h-screen bg-gray-950 text-gray-100">
      {/* Round Selection */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-5 mb-6 border border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="text-indigo-400" size={22} />
          <h2 className="text-xl font-semibold">Round Selection</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {rounds.map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold shadow-md ${
                activeRound === round
                  ? "bg-indigo-600 text-white shadow-indigo-500/40 scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/40"
              }`}
            >
              {round}
            </button>
          ))}
        </div>
      </div>

      {/* Question Controls */}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="text-purple-400" size={22} />
          <h2 className="text-xl font-semibold">Question Controls</h2>
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
              onClick={() => setIsTimerRunning(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-green-500/30 font-semibold"
            >
              <Play size={18} /> Start Question
            </button>
            <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-yellow-400/30 font-semibold">
              <SkipForward size={18} /> Skip Question
            </button>
            <button
              onClick={() => {
                setTimeLeft(600);
                setIsTimerRunning(false);
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-red-500/30 font-semibold"
            >
              <RefreshCcw size={18} /> Reset Timer
            </button>
          </div>
        </div>

        {/* Question Selection */}
        <div className="mb-5">
          <label
            htmlFor="question-select"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Select Question
          </label>
          <select
            id="question-select"
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {questions.map((question, index) => (
              <option key={index} value={index + 1}>
                {question}
              </option>
            ))}
          </select>
        </div>

        {/* Time Input */}
        <div className="mb-6">
          <label
            htmlFor="time-input"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Set Time (minutes)
          </label>
          <input
            id="time-input"
            type="number"
            min="1"
            max="60"
            defaultValue="10"
            className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        {/* Apply Settings */}
        <button className="w-48 bg-indigo-600 hover:bg-indigo-500 transition-all px-5 py-3 rounded-lg shadow-md shadow-indigo-500/30 font-semibold">
          Apply Settings
        </button>
      </div>
    </div>
  );
};

export default EventControlTab;
