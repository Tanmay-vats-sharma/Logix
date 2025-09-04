import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

const leaderboardItemVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
  transition: { type: "spring", stiffness: 300, damping: 25 },
};

const Leaderboard = ({ leaderboard }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg h-fit sticky top-6">
    <h2 className="text-xl font-bold mb-4 flex items-center">
      <FaTrophy className="text-yellow-400 mr-2" />
      Leaderboard
    </h2>

    {/* Scrollable container */}
    <div className="space-y-3 max-h-96 overflow-y-auto pr-2 
                scrollbar-thin scrollbar-thumb-purple-500 
                scrollbar-track-gray-800 hover:scrollbar-thumb-purple-400 rounded-lg">
      <AnimatePresence>
        {leaderboard.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={leaderboardItemVariants}
            className={`p-4 rounded-lg flex items-center ${index < 3
                ? "bg-gradient-to-r from-gray-700/50 to-gray-800/50"
                : "bg-gray-700/30"
              }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${index < 3
                  ? ["bg-yellow-500", "bg-gray-400", "bg-amber-700"][index]
                  : "bg-gray-600"
                }`}
            >
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
  </div>
);

export default Leaderboard;
