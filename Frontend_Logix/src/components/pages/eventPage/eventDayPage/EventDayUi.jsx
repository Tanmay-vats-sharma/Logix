import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaClock, FaTrophy, FaChevronUp, FaChevronDown, FaGavel } from 'react-icons/fa';

const EventDayUI = () => {
  // Sample projects data
  const [projects, setProjects] = useState([
    { id: 1, name: 'AI Campus Navigator', team: 'Tech Wizards', status: 'presenting', bids: 0, currentBid: 0 },
    { id: 2, name: 'Eco Packaging Solution', team: 'Green Innovators', status: 'next', bids: 0, currentBid: 0 },
    { id: 3, name: 'Virtual Study Buddy', team: 'Code Crusaders', status: 'waiting', bids: 0, currentBid: 0 },
    { id: 4, name: 'Smart Waste Mgmt', team: 'Eco Warriors', status: 'waiting', bids: 0, currentBid: 0 },
    { id: 5, name: 'AR Classroom', team: 'Vision Squad', status: 'waiting', bids: 0, currentBid: 0 }
  ]);

  const [userPoints, setUserPoints] = useState(1000); // User starts with 1000 points
  const [leaderboard, setLeaderboard] = useState([]);
  const [bidAmount, setBidAmount] = useState(50); // Default bid amount
  const [activeBidProject, setActiveBidProject] = useState(null);

  // Initialize leaderboard
  useEffect(() => {
    const sorted = [...projects].sort((a, b) => b.bids - a.bids);
    setLeaderboard(sorted);
  }, [projects]);

  const handleBid = (projectId) => {
    if (userPoints >= bidAmount && bidAmount > 0 && bidAmount <= 150) {
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId 
            ? { 
                ...project, 
                bids: project.bids + bidAmount,
                currentBid: bidAmount
              } 
            : project
        )
      );
      setUserPoints(prev => prev - bidAmount);
      setActiveBidProject(projectId);
      setBidAmount(50); // Reset to default after bidding
    }
  };

  const moveToNextProject = () => {
    setProjects(prev => {
      const updated = [...prev];
      // Move current presenter to done
      const currentIndex = updated.findIndex(p => p.status === 'presenting');
      if (currentIndex >= 0) {
        updated[currentIndex].status = 'completed';
        updated[currentIndex].currentBid = 0; // Reset current bid
      }
      // Move next presenter to current
      const nextIndex = updated.findIndex(p => p.status === 'next');
      if (nextIndex >= 0) {
        updated[nextIndex].status = 'presenting';
      }
      // Move first waiting to next
      const waitingIndex = updated.findIndex(p => p.status === 'waiting');
      if (waitingIndex >= 0) {
        updated[waitingIndex].status = 'next';
      }
      return updated;
    });
    setActiveBidProject(null); // Reset active bidding project
  };

  const increaseBid = () => {
    if (bidAmount < 150) {
      setBidAmount(prev => Math.min(prev + 5, 150));
    }
  };

  const decreaseBid = () => {
    if (bidAmount > 5) {
      setBidAmount(prev => Math.max(prev - 5, 5));
    }
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }),
    exit: { opacity: 0, x: -100 }
  };

  const leaderboardItemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { type: "spring", stiffness: 300, damping: 25 }
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
          {/* Current Presenter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <FaMicrophone className="text-purple-400 mr-2" />
                Currently Presenting
              </h2>
              
              <AnimatePresence mode="wait">
                {projects.filter(p => p.status === 'presenting').map(project => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-700/30 p-6 rounded-lg border border-purple-500/30"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                        <p className="text-purple-400">{project.team}</p>
                      </div>
                      <div className="bg-purple-600/20 px-3 py-1 rounded-full flex items-center">
                        <FaClock className="mr-1" />
                        <span>5:00</span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Total Bids:</span>
                        <span className="text-xl font-bold text-purple-400">{project.bids}</span>
                      </div>
                      
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Current Highest Bid:</span>
                        <span className="text-lg font-bold text-yellow-400">{project.currentBid}</span>
                      </div>
                      
                      <div className="mt-6 bg-gray-700/50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-gray-400">Your Bid Amount:</span>
                          <span className="text-lg font-bold text-purple-400">{bidAmount}</span>
                        </div>
                        
                        <div className="flex items-center justify-center space-x-4 mb-4">
                          <button
                            onClick={decreaseBid}
                            disabled={bidAmount <= 5}
                            className={`p-2 rounded-full ${bidAmount > 5 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'}`}
                          >
                            -
                          </button>
                          <div className="w-24 text-center px-3 py-2 bg-gray-600 rounded-lg">
                            {bidAmount} pts
                          </div>
                          <button
                            onClick={increaseBid}
                            disabled={bidAmount >= 150}
                            className={`p-2 rounded-full ${bidAmount < 150 ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-600 cursor-not-allowed'}`}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-xs text-center text-gray-400 mb-3">
                          Max 150 points per bid
                        </div>
                        
                        <button
                          onClick={() => handleBid(project.id)}
                          disabled={userPoints < bidAmount || bidAmount <= 0 || activeBidProject !== null}
                          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${userPoints >= bidAmount && bidAmount > 0 && activeBidProject === null
                            ? 'bg-purple-600 hover:bg-purple-700'
                            : 'bg-gray-700 cursor-not-allowed'}`}
                        >
                          <FaGavel className="mr-2" />
                          Place Bid
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                onClick={moveToNextProject}
                disabled={activeBidProject !== null}
                className={`mt-6 w-full py-3 rounded-lg font-medium transition-colors ${activeBidProject === null
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-700 cursor-not-allowed'}`}
              >
                Complete Bidding & Move to Next Project
              </button>
            </div>

            {/* Project Queue */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Project Queue</h2>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {projects.filter(p => p.status !== 'presenting').map((project, index) => (
                    <motion.div
                      key={project.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={itemVariants}
                      className={`p-4 rounded-lg flex justify-between items-center ${project.status === 'next' 
                        ? 'bg-purple-900/30 border-l-4 border-purple-500' 
                        : 'bg-gray-700/30'}`}
                    >
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-gray-400">{project.team}</p>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3 text-purple-400">{project.bids} bids</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${project.status === 'next' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-gray-600/50'}`}>
                          {project.status === 'next' ? 'Next Up' : 
                           project.status === 'completed' ? 'Completed' : 'Waiting'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaTrophy className="text-yellow-400 mr-2" />
              Bidding Leaderboard
            </h2>
            
            <div className="space-y-3">
              <AnimatePresence>
                {leaderboard.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={leaderboardItemVariants}
                    className={`p-4 rounded-lg flex items-center ${index < 3 ? 'bg-gradient-to-r from-gray-700/50 to-gray-800/50' : 'bg-gray-700/30'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${index < 3 
                      ? ['bg-yellow-500', 'bg-gray-400', 'bg-amber-700'][index] 
                      : 'bg-gray-600'}`}>
                      <span className="font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.team}</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-purple-400 font-bold">{project.bids}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* User Points Count */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Your remaining points:</span>
                <span className="text-xl font-bold text-purple-400">{userPoints}</span>
              </div>
              <div className="mt-2 h-2 bg-gray-600 rounded-full">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" 
                  style={{ width: `${(userPoints / 1000) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Active Bidding Indicator */}
            {activeBidProject && (
              <div className="mt-4 p-3 bg-purple-900/30 rounded-lg border border-purple-500/50 flex items-center">
                <div className="animate-pulse mr-2 h-3 w-3 rounded-full bg-purple-400"></div>
                <span className="text-sm">
                  Active bidding on: {projects.find(p => p.id === activeBidProject)?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDayUI;