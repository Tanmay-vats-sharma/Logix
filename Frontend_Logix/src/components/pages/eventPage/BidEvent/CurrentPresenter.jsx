import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaGavel, FaMicrophone } from "react-icons/fa";

const CurrentPresenter = ({ projects, bidAmount, setBidAmount, handleBid, userPoints, activeBidProject, moveToNextProject }) => {
  const increaseBid = () => setBidAmount((prev) => Math.min(prev + 5, 150));
  const decreaseBid = () => setBidAmount((prev) => Math.max(prev - 5, 5));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaMicrophone className="text-purple-400 mr-2" /> Currently Presenting
      </h2>

      <AnimatePresence mode="wait">
        {projects.filter((p) => p.status === "presenting").map((project) => (
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
                <h3 className="text-2xl font-bold">{project.name}</h3>
                <p className="text-purple-400">{project.team}</p>
              </div>
              <div className="bg-purple-600/20 px-3 py-1 rounded-full flex items-center">
                <FaClock className="mr-1" /> <span>5:00</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span>Total Bids:</span>
                <span className="text-xl text-purple-400 font-bold">{project.bids}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Current Highest Bid:</span>
                <span className="text-lg text-yellow-400 font-bold">{project.currentBid}</span>
              </div>

              <div className="mt-6 bg-gray-700/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span>Your Bid Amount:</span>
                  <span className="text-lg font-bold text-purple-400">{bidAmount}</span>
                </div>
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <button onClick={decreaseBid} disabled={bidAmount <= 5} className="bg-purple-600 px-3 py-2 rounded-lg">-</button>
                  <div className="w-24 text-center bg-gray-600 py-2 rounded-lg">{bidAmount} pts</div>
                  <button onClick={increaseBid} disabled={bidAmount >= 150} className="bg-purple-600 px-3 py-2 rounded-lg">+</button>
                </div>
                <button
                  onClick={() => handleBid(project.id)}
                  disabled={userPoints < bidAmount || activeBidProject !== null}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center"
                >
                  <FaGavel className="mr-2" /> Place Bid
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <button
        onClick={moveToNextProject}
        disabled={activeBidProject !== null}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Complete Bidding & Move to Next Project
      </button>
    </div>
  );
};

export default CurrentPresenter;
