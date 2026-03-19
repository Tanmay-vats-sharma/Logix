// TypingUI.jsx
import React, { useState, useEffect, useRef } from "react";
import useAbly from "../../../../hooks/useAbly";
import { submitSubmission } from "../../../../services/submissionService";
import CodeRunner from "./CodeRunner";

const calculateTypingStats = ({ typedChars, totalTextLength, typoCount, elapsedSeconds }) => {
  const safeTyped = Math.max(typedChars, 0);
  const safeTotal = Math.max(totalTextLength, 0);
  const safeTypos = Math.max(typoCount, 0);
  const safeElapsed = Math.max(elapsedSeconds, 0);

  const completion = safeTotal > 0 ? safeTyped / safeTotal : 0;
  const precision = safeTyped + safeTypos > 0 ? safeTyped / (safeTyped + safeTypos) : 0;
  const accuracy = completion * precision * 100;
  const elapsedMinutes = safeElapsed / 60;
  const wpm = elapsedMinutes > 0 ? (safeTyped / 5) / elapsedMinutes : 0;

  return {
    wpm: Math.round(wpm),
    accuracy: Math.round(accuracy),
    typos: safeTypos,
    completion,
    precision,
    typedChars: safeTyped,
  };
};

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
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [codePreviewText, setCodePreviewText] = useState("");
  const [isQualificationModalOpen, setIsQualificationModalOpen] = useState(false);
  const [qualificationStatus, setQualificationStatus] = useState(null);
  const submitLockRef = useRef(false);
  const userInputRef = useRef("");
  const typosRef = useRef(0);
  const timeLeftRef = useRef(0);

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
    submitLockRef.current = false;
    userInputRef.current = "";
    typosRef.current = 0;
    timeLeftRef.current = data?.time || 60;
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

  useAbly("event-control", "view-code", (data) => {
    if (isPublic) return;
    const command = data?.action || data?.message;

    if (command === "close") {
      setIsCodeModalOpen(false);
      return;
    }

    const previewText = userInputRef.current || userInput;
    setCodePreviewText(previewText || "No text available to preview.");
    setIsCodeModalOpen(true);
  });

  useAbly("event-control", "qualify", (data) => {
    if (isPublic) return;

    const selectedRollNumbers = Array.isArray(data?.rollNumbers)
      ? data.rollNumbers.map((value) => String(value).trim())
      : [];

    const localRollNumbers = [];

    try {
      const studentRaw = localStorage.getItem("student");
      if (studentRaw) {
        const studentParsed = JSON.parse(studentRaw);
        const studentRoll =
          studentParsed?.registration?.rollNumber ||
          studentParsed?.student?.rollNumber ||
          studentParsed?.rollNumber;
        if (studentRoll) localRollNumbers.push(String(studentRoll).trim());
      }
    } catch (err) {
      // ignore parse errors
    }

    try {
      const teamRaw = localStorage.getItem("team");
      if (teamRaw) {
        const teamParsed = JSON.parse(teamRaw);
        const teamData = teamParsed?.team || teamParsed;
        const leaderRoll = teamData?.leader?.rollNumber;
        if (leaderRoll) localRollNumbers.push(String(leaderRoll).trim());

        const memberRolls = Array.isArray(teamData?.members)
          ? teamData.members.map((member) => member?.rollNumber).filter(Boolean)
          : [];
        localRollNumbers.push(...memberRolls.map((roll) => String(roll).trim()));
      }
    } catch (err) {
      // ignore parse errors
    }

    const uniqueLocalRolls = [...new Set(localRollNumbers)];
    const isSelected = uniqueLocalRolls.some((roll) => selectedRollNumbers.includes(roll));

    setQualificationStatus(isSelected ? "selected" : "not-selected");
    setIsQualificationModalOpen(true);
  });

  useEffect(() => {
    userInputRef.current = userInput;
  }, [userInput]);

  useEffect(() => {
    typosRef.current = typos;
  }, [typos]);

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // Timer
  useEffect(() => {
    if (isPublic || !isRunning || submitted) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        timeLeftRef.current = next;
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, submitted, timeLeft]);

  const elapsedSeconds = Math.max(time - timeLeft, 0);
  const displayStats = calculateTypingStats({
    typedChars: userInput.length,
    totalTextLength: textToType.length,
    typoCount: typos,
    elapsedSeconds,
  });

  // Format time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle key down
  const handleKeyDown = (e) => {
    if (!isRunning || submitted) return;

    // Prevent browser from scrolling the page on Space while typing.
    if (e.key === ' ') {
      e.preventDefault();
    }

    if (e.key === 'Backspace') {
      // Allow backspace
      setUserInput(prev => {
        const next = prev.slice(0, -1);
        userInputRef.current = next;
        return next;
      });
      setCurrentError(false); // reset error on backspace
      return;
    }

    // Handle Enter key for newlines
    if (e.key === 'Enter') {
      const expected = textToType[userInput.length];
      if (expected === '\n') {
        setUserInput(prev => prev + '\n');
        setCurrentError(false);
        if (userInput.length + 1 === textToType.length) {
          handleSubmit();
        }
      } else {
        setTypos(prev => prev + 1);
        setCurrentError(true);
      }
      e.preventDefault(); // prevent form submission
      return;
    }

    if (e.key.length === 1) { // printable character
      const expected = textToType[userInput.length];
      if (e.key === expected) {
        const nextInput = userInput + e.key;
        userInputRef.current = nextInput;
        setUserInput(nextInput);
        setCurrentError(false);
        if (nextInput.length === textToType.length) {
          handleSubmit({ nextInput });
        }
      } else {
        setTypos(prev => {
          const next = prev + 1;
          typosRef.current = next;
          return next;
        });
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
  const handleSubmit = async (options = {}) => {
    if (isPublic || submitted || submitLockRef.current) return;
    submitLockRef.current = true;
    setSubmitted(true);
    setIsRunning(false);

    const nextInput = typeof options.nextInput === "string" ? options.nextInput : userInputRef.current;
    const latestTypos = typosRef.current;
    const latestTimeLeft = timeLeftRef.current;
    const timeTaken = Math.max(time - latestTimeLeft, 0);
    const statsToSend = calculateTypingStats({
      typedChars: nextInput.length,
      totalTextLength: textToType.length,
      typoCount: latestTypos,
      elapsedSeconds: timeTaken,
    });

    const payload = {
      // event / round info
      round,
      question,

      // the text and user input
      textToType,
      userInput: nextInput,

      // timing
      timeConfigured: time,
      timeLeftAtSubmit: latestTimeLeft,
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
      alert("✅ Typing test submitted!");
    } catch (err) {
      console.error("Submission failed:", err);
      submitLockRef.current = false;
      setSubmitted(false);
      setIsRunning(true);
      alert("⚠️ Failed to submit typing test. Please try again.");
    }
  };

  // Render text with highlights
  const renderText = () => {
    const chars = textToType.split('');
    const rendered = chars.map((char, i) => {
      let className = '';
      if (i < userInput.length) {
        className = 'bg-green-500 text-white'; // since only correct are added
      } else if (i === userInput.length && currentError) {
        className = 'bg-red-500 text-white'; // highlight current expected letter in red on error
      } else if (i === userInput.length) {
        className = 'bg-yellow-500/30 text-white';
      }
      const isCursor = i === userInput.length;

      // Show cursor before newline since newline itself is not visible.
      if (isCursor && char === '\n') {
        return (
          <span key={i}>
            <span className="inline-block w-[2px] h-5 align-middle bg-yellow-300 animate-pulse mr-[1px]" />
            {char}
          </span>
        );
      }

      return (
        <span key={i} className={className}>
          {char}
          {isCursor && <span className="inline-block w-[2px] h-5 align-middle bg-yellow-300 animate-pulse ml-[1px]" />}
        </span>
      );
    });

    if (userInput.length === chars.length) {
      rendered.push(
        <span key="cursor-end" className="inline-block w-[2px] h-5 align-middle bg-yellow-300 animate-pulse ml-[1px]" />
      );
    }

    return rendered;
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
              <span>WPM: {displayStats.wpm}</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span>Accuracy: {displayStats.accuracy}%</span>
            </div>
            <div className="bg-gray-800 px-6 py-3 rounded-lg shadow-md border border-gray-700">
              <span>Typos: {displayStats.typos}</span>
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

        {/* Code Preview Modal triggered from admin event-control:view-code */}
        {isCodeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-4xl rounded-xl border border-gray-700 bg-gray-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-gray-100">Code Preview</h2>
                <button
                  type="button"
                  onClick={() => setIsCodeModalOpen(false)}
                  className="rounded-md bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-200 transition hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
              <div className="max-h-[70vh] overflow-auto px-6 py-5">
                {codePreviewText ? (
                  <div className="h-[60vh]">
                    <CodeRunner code={codePreviewText} />
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

        {isQualificationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-700 bg-gray-900 p-6 shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-gray-100 mb-3">Qualification Result</h2>
              {qualificationStatus === "selected" ? (
                <p className="text-green-400 text-lg">You are selected for the next round.</p>
              ) : (
                <p className="text-yellow-300 text-lg">Better luck next time.</p>
              )}
              <button
                type="button"
                onClick={() => setIsQualificationModalOpen(false)}
                className="mt-5 rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingUI;