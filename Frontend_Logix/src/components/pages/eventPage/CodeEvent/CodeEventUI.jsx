// CodeEventDayUI.jsx
import React, { useState, useEffect } from "react";
import CodeEditorPage from "./CodeEditor";
import RenderingComponent from "./RenderingComponent";
import CodeEditorData from "../../../../constants/CodeEditor.json";
import useAbly from "../../../../hooks/useAbly";
import { submitSubmission } from "../../../../services/submissionService";

const CodeEventDayUI = () => {
  const [round, setRound] = useState(CodeEditorData?.round?.name || "Round");
  const [question, setQuestion] = useState(
    CodeEditorData?.question?.description || ""
  );
  const [code, setCode] = useState(
    CodeEditorData?.question?.text || "<!-- Code will appear here -->"
  );

  // ✅ Team info from localStorage
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const savedTeam = localStorage.getItem("team");
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  // Timer from admin
  const [time, setTime] = useState(CodeEditorData?.time || 30);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [lockSubmitButton, setLockSubmitButton] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Trigger startTimer after 10 seconds of page load
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTimeLeft(CodeEditorData?.time || 30);
  //     setIsRunning(true);
  //     setSubmitted(false);
  //     setLockSubmitButton(false)
  //   }, 10000);
  //   return () => clearTimeout(timer);
  // }, []);

  useAbly("event-control", "start-question", (data) => {
    console.log("Received start-question data:", data);
    setRound(data?.round?.name || "Round");
    setQuestion(data?.question?.description || "");
    setCode(data?.question?.text || "<!-- Code will appear here -->");
    setTime(data?.time || 30);
    setTimeLeft(data?.time || 30);
    setIsRunning(true);
    setIsLocked(false);
    setSubmitted(false);
    setLockSubmitButton(false);
  });

  // Countdown
  useEffect(() => {
    if (!isRunning || submitted) return;
    if (timeLeft <= 0) {
      setIsRunning(false);
      setLockSubmitButton(true);
      setIsLocked(true);
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
  const handleSubmit =  async () => {
    setSubmitted(true);
    setIsRunning(false);
    setLockSubmitButton(true);
    const response = await submitSubmission({timeTaken: time - timeLeft});
    console.log("Submission response:", response);
    alert("✅ Code submitted early!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <header className="mb-6 text-center flex justify-around">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Style Sprint
          </h1>
          <p className="text-gray-400 mt-2">{round}</p>
          <p className="text-gray-300">{question}</p>
          </div>
          

          {/* ✅ Show team info */}
          {team && (
            <div className="mt-4 text-gray-200">
              <p className="text-2xl">
                <span className="font-bold text-violet-500 text-2xl">Team Name:</span>   {team?.team?.teamName}
              </p>
              <p className="text-2xl">
                <span className="font-bold text-violet-500 text-2xl">Team ID:</span>   {team?.team?.teamId}
              </p>
            </div>
          )}
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
            disabled={lockSubmitButton || submitted}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              lockSubmitButton
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
              isLocked={isLocked || submitted}
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
