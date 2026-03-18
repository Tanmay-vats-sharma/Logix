// TypingUI.jsx
import React, { useState, useEffect, useRef } from "react";
import useAbly from "../../../../hooks/useAbly";
import { submitSubmission } from "../../../../services/submissionService";

const TypingUI = ({ isPublic }) => {
  const [round, setRound] = useState("Round");
  const [question, setQuestion] = useState("");
  const [textToType, setTextToType] = useState("");
  const [userInput, setUserInput] = useState("");
  const [time, setTime] = useState(60); // default 1 min
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [typos, setTypos] = useState(0);
  const [currentError, setCurrentError] = useState(false);
  // finalStats stores the latest calculated stats shown on UI
  const [finalStats, setFinalStats] = useState({ wpm: 0, accuracy: 0, typos: 0, completion: 0, precision: 0, typedChars: 0 });
  const finalStatsRef = useRef(finalStats);

  // Team info
  const [team, setTeam] = useState(null);
  useEffect(() => {
    if (!isPublic) {
      const savedTeam = localStorage.getItem("team");
      if (savedTeam) {
        setTeam(JSON.parse(savedTeam));
      }
    }
  }, [isPublic]);

  // Ably listener
  useAbly("event-control", "start-question", (data) => {
    if (isPublic) return;
    setRound("Typing Round");
    setQuestion("Type the given text as fast and accurately as possible");
    setTextToType(data?.text || "");
    setTime(data?.time || 60);
    setTimeLeft(data?.time || 60);
    setIsRunning(true);
    setSubmitted(false);
    setUserInput("");
    setTypos(0);
    setCurrentError(false);
    setStartTime(Date.now());
  });

  // Timer
  useEffect(() => {
    if (isPublic || !isRunning || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, submitted, timeLeft]);

  // Calculate stats (used to update finalStats via useEffect)
  const calculateStats = () => {
    const typed = userInput.length;
    const totalTextLength = textToType.length;
    const completion = totalTextLength > 0 ? (typed / totalTextLength) : 0;
    const precision = (typed + typos) > 0 ? (typed / (typed + typos)) : 0;
    const accuracy = completion * precision * 100;
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 / 60 : 0; // in minutes
    const wpm = timeElapsed > 0 ? (typed / 5) / timeElapsed : 0; // standard: 5 chars per word
    return { wpm: Math.round(wpm), accuracy: Math.round(accuracy), typos, completion, precision, typedChars: typed };
  };

  // Keep finalStats in sync with what UI shows. Do NOT recalculate during submit.
  // Also update when `timeLeft` or `isRunning` changes so time-based stats (WPM) stay current.
  useEffect(() => {
    const stats = calculateStats();
    const newStats = { wpm: stats.wpm, accuracy: stats.accuracy, typos: stats.typos, completion: stats.completion, precision: stats.precision, typedChars: stats.typedChars };
    setFinalStats(newStats);
    finalStatsRef.current = newStats; // keep ref in sync for immediate reads
  }, [userInput, typos, textToType, startTime, timeLeft, isRunning]);

  // Format time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle key down
  const handleKeyDown = (e) => {
    if (!isRunning || submitted) return;

    if (e.key === 'Backspace') {
      // Allow backspace
      setUserInput(prev => prev.slice(0, -1));
      setCurrentError(false); // reset error on backspace
      return;
    }

    if (e.key.length === 1) { // printable character
      const expected = textToType[userInput.length];
      if (e.key === expected) {
        setUserInput(prev => prev + e.key);
        setCurrentError(false);
        if (userInput.length + 1 === textToType.length) {
          handleSubmit();
        }
      } else {
        setTypos(prev => prev + 1);
        setCurrentError(true);
        e.preventDefault(); // prevent typing wrong letter
      }
    } else {
      // Ignore other keys like shift, ctrl, etc.
      e.preventDefault();
    }
  };

  // Capture typing without rendering an input box.
  useEffect(() => {
    if (isPublic || !isRunning || submitted) return;
    const onKeyDown = (e) => handleKeyDown(e);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPublic, isRunning, submitted, userInput, textToType, currentError]);

  // Submit
  const handleSubmit = async () => {
    if (isPublic || submitted) return;
    // capture the latest stats snapshot from ref to guarantee it's the exact on-screen values
    const statsToSend = finalStatsRef.current;
    console.log("UI Stats:", statsToSend);

    setIsRunning(false);
    const timeTaken = time - timeLeft;

    const payload = {
      // event / round info
      round,
      question,

      // the text and user input
      textToType,
      userInput,

      // timing
      timeConfigured: time,
      timeLeftAtSubmit: timeLeft,
      timeTaken,
      startTime,
      endTime: Date.now(),

      // stats (from snapshot)
      typedChars: statsToSend.typedChars,
      completion: statsToSend.completion,
      precision: statsToSend.precision,
      wpm: statsToSend.wpm,
      accuracy: statsToSend.accuracy,
      typos: statsToSend.typos,

      // metadata
      isPublic: !!isPublic,
    };

    // attach team or student info when present in localStorage
    try {
      const team = localStorage.getItem("team");
      const student = localStorage.getItem("student");
      if (team) payload.team = JSON.parse(team);
      if (student) payload.student = JSON.parse(student);
    } catch (err) {
      // ignore parse errors
    }

    console.log("Payload Sent:", payload);

    try {
      const response = await submitSubmission(payload);
      console.log("Submission response:", response);
      // mark submitted only after successfully sending the payload
      setSubmitted(true);
      alert("✅ Typing test submitted!");
    } catch (err) {
      console.error("Submission failed:", err);
      alert("⚠️ Failed to submit typing test. Please try again.");
    }
  };

  // Render text with highlights
  const renderText = () => {
    return textToType.split('').map((char, i) => {
      let className = '';
      if (i < userInput.length) {
        className = 'bg-green-500 text-white'; // since only correct are added
      } else if (i === userInput.length && currentError) {
        className = 'bg-red-500 text-white'; // highlight current expected letter in red on error
      }
      return <span key={i} className={className}>{char}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        {isPublic ? (
          <header className="mb-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Keyboard Breaker
            </h1>
          </header>
        ) : (
          <header className="mb-6 text-center flex justify-around">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                Type Sprint
              </h1>
              <p className="text-gray-400 mt-2">{round}</p>
              <p className="text-gray-300">{question}</p>
            </div>
            {team && (
              <div className="mt-4 text-gray-200">
                <p className="text-2xl">
                  <span className="font-bold text-violet-500 text-2xl">Team Name:</span> {team?.team?.teamName}
                </p>
                <p className="text-2xl">
                  <span className="font-bold text-violet-500 text-2xl">Team ID:</span> {team?.team?.teamId}
                </p>
              </div>
            )}
          </header>
        )}

        {/* Stats and Timer */}
        {!isPublic && (
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span className="text-lg">🏆 {round}</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700 font-mono text-xl text-green-400">
              ⏳ {formatTime(timeLeft)}
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span>WPM: {finalStats.wpm}</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span>Accuracy: {finalStats.accuracy}%</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span>Typos: {finalStats.typos}</span>
            </div>
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                submitted ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90"
              }`}
            >
              {submitted ? "Submitted" : "Submit Early"}
            </button>
          </div>
        )}

        {/* Typing Area */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
            <pre className="text-lg mb-4 font-mono whitespace-pre-wrap">
              {renderText()}
            </pre>
            <p className="text-sm text-gray-300">
              Start typing directly on the keyboard. No input box required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingUI;