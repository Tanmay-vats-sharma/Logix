import React, { useState, useEffect } from "react";
import { Clock, Settings, Play, SkipForward, RefreshCcw } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRounds } from "../../redux/features/roundsSlice";
import { getChannel } from "../../utils/ably";

const EventControlTab = () => {
  const dispatch = useDispatch();
  const { rounds, loading, error } = useSelector((state) => state.rounds);

  const channel = getChannel("event-control");

  useEffect(() => {
    dispatch(getAllRounds());
  }, [dispatch]);

  const [timeLeft, setTimeLeft] = useState(600); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeRound, setActiveRound] = useState(rounds[0]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [timeInput, setTimeInput] = useState(600); // input also in seconds

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
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
  console.log("activeRound:", activeRound);
  console.log("selectedQuestion:", selectedQuestion);

  if (!activeRound || !selectedQuestion) {
    alert("Please select a round and a question first.");
    return;
  }

  const questionObj = activeRound?.questions?.find(
    q => String(q._id) === String(selectedQuestion)
  );

  if (!questionObj) {
    console.error("Question not found in active round questions");
    return;
  }

  const data = {
    round: activeRound,
    question: questionObj,
    time: timeInput,
  };

  console.log("Publishing start-question with data:", data);
  channel.publish("start-question", data);
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
          {rounds?.map((round) => (
            <button
              key={round?._id}
              onClick={() => setActiveRound(round)}
              className={`px-5 py-2 rounded-full transition-all duration-300 text-sm font-semibold shadow-md ${
                activeRound?._id === round?._id
                  ? "bg-indigo-600 text-white shadow-indigo-500/40 scale-105"
                  : "bg-gray-800 text-gray-300 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/40"
              }`}
            >
              {round?.name}
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
              onClick={() => {
                handleStartQuestion();
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-all px-6 py-2.5 rounded-lg shadow-md shadow-green-500/30 font-semibold"
            >
              <Play size={18} /> Start Question
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
            onChange={(e) => {
              setSelectedQuestion(e.target.value);
            }}
          >
            <option>Select question</option>
            {activeRound?.questions?.map((question, index) => (
              <option key={index} value={question?._id}>
                {question?.description}
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
    </div>
  );
};

export default EventControlTab;
