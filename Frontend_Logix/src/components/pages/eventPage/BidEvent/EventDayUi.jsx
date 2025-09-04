import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FaMicrophone, FaClock, FaGavel, FaTrophy } from "react-icons/fa";
import CurrentPresenter from "./CurrentPresenter";
import ProjectQueue from "./ProjectQueue";
import Leaderboard from "./Leaderboard";
import UserPoints from "./UserPoints";
import ActiveBiddingIndicator from "./ActiveBiddingIndicator";

const EventDayUI = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "AI Campus Navigator", team: "Tech Wizards", status: "presenting", bids: 0, currentBid: 0 },
    { id: 2, name: "Eco Packaging Solution", team: "Green Innovators", status: "next", bids: 0, currentBid: 0 },
    { id: 3, name: "Virtual Study Buddy", team: "Code Crusaders", status: "waiting", bids: 0, currentBid: 0 },
    { id: 4, name: "Smart Waste Mgmt", team: "Eco Warriors", status: "waiting", bids: 0, currentBid: 0 },
    { id: 5, name: "AR Classroom", team: "Vision Squad", status: "waiting", bids: 0, currentBid: 0 }
  ]);

  const [userPoints, setUserPoints] = useState(1000);
  const [leaderboard, setLeaderboard] = useState([]);
  const [bidAmount, setBidAmount] = useState(50);
  const [activeBidProject, setActiveBidProject] = useState(null);

  useEffect(() => {
    const sorted = [...projects].sort((a, b) => b.bids - a.bids);
    setLeaderboard(sorted);
  }, [projects]);

  const handleBid = (projectId) => {
    if (userPoints >= bidAmount && bidAmount > 0 && bidAmount <= 150) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? { ...p, bids: p.bids + bidAmount, currentBid: bidAmount }
            : p
        )
      );
      setUserPoints((prev) => prev - bidAmount);
      setActiveBidProject(projectId);
      setBidAmount(50);
    }
  };

  const moveToNextProject = () => {
    setProjects((prev) => {
      const updated = [...prev];
      const currentIndex = updated.findIndex((p) => p.status === "presenting");
      if (currentIndex >= 0) updated[currentIndex].status = "completed";
      const nextIndex = updated.findIndex((p) => p.status === "next");
      if (nextIndex >= 0) updated[nextIndex].status = "presenting";
      const waitingIndex = updated.findIndex((p) => p.status === "waiting");
      if (waitingIndex >= 0) updated[waitingIndex].status = "next";
      return updated;
    });
    setActiveBidProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            InnovateX Live Bidding
          </h1>
          <p className="text-gray-400 mt-2">Bid on projects to show your support</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CurrentPresenter
              projects={projects}
              bidAmount={bidAmount}
              setBidAmount={setBidAmount}
              handleBid={handleBid}
              userPoints={userPoints}
              activeBidProject={activeBidProject}
              moveToNextProject={moveToNextProject}
            />
            <ProjectQueue projects={projects} />
          </div>

          <div className="space-y-6 h-fit sticky top-6">
            <Leaderboard leaderboard={leaderboard} />
            <UserPoints userPoints={userPoints} />
            <ActiveBiddingIndicator
              activeBidProject={activeBidProject}
              projects={projects}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDayUI;
