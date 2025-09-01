import React, { useState, useEffect } from "react";
import { FaPlay, FaStop, FaMicrophone, FaGavel, FaUsers } from "react-icons/fa";

const EventControls = ({ selectedProject, projects }) => {
  // Controls State
  const [isPresenting, setIsPresenting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isBidding, setIsBidding] = useState(false);
  const [points, setPoints] = useState("");

  // Timer Logic
  useEffect(() => {
    let interval;
    if (isPresenting) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPresenting]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle Points
  const handleAllotPoints = () => {
    if (!points || isNaN(points)) {
      alert("Please enter a valid number");
      return;
    }

    if (!selectedProject) {
      alert("Please select a project first!");
      return;
    }

    const project = projects.find((p) => p.id === selectedProject);
    if (!project) return;

    console.log(`Allotted ${points} points to each member of ${project.title}:`, project.members);

    setPoints("");
    alert(`✅ ${points} points allotted to every participant of ${project.title}`);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Event Controls</h2>
      <div className="space-y-6">
        
        {/* Presenting Controls */}
        <div className="p-6 rounded-xl bg-gray-800/50 border border-purple-500/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-purple-400">
            <FaMicrophone className="mr-2" /> Presenting
          </h3>
          {isPresenting ? (
            <div className="flex items-center justify-between">
              <span className="text-green-400 font-mono text-xl">{formatTime(timer)}</span>
              <button
                onClick={() => setIsPresenting(false)}
                className="px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 transition"
              >
                <FaStop className="inline mr-2" /> Stop Presenting
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setIsPresenting(true); setTimer(0); }}
              className="w-full px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
            >
              <FaPlay className="inline mr-2" /> Start Presenting
            </button>
          )}
        </div>

        {/* Bidding Controls */}
        <div className="p-6 rounded-xl bg-gray-800/50 border border-purple-500/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-yellow-400">
            <FaGavel className="mr-2" /> Bidding
          </h3>
          {isBidding ? (
            <button
              onClick={() => setIsBidding(false)}
              className="w-full px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-red-500 to-pink-600 hover:opacity-90 transition"
            >
              <FaStop className="inline mr-2" /> Stop Bidding
            </button>
          ) : (
            <button
              onClick={() => setIsBidding(true)}
              className="w-full px-5 py-3 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition"
            >
              <FaPlay className="inline mr-2" /> Start Bidding
            </button>
          )}
        </div>

        {/* Allot Points Controls */}
        <div className="p-6 rounded-xl bg-gray-800/50 border border-purple-500/20 shadow-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center text-green-400">
            <FaUsers className="mr-2" /> Allot Points
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Enter points"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-gray-700 text-white outline-none border border-gray-600"
            />
            <button
              onClick={handleAllotPoints}
              className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition"
            >
              Allot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventControls;
