import { motion, AnimatePresence } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, type: "spring", stiffness: 100, damping: 10 }
  }),
  exit: { opacity: 0, x: -100 }
};

const ProjectQueue = ({ projects }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-lg">
    <h2 className="text-xl font-bold mb-4">Project Queue</h2>
    <div className="space-y-3">
      <AnimatePresence>
        {projects.filter((p) => p.status !== "presenting").map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            className={`p-4 rounded-lg flex justify-between ${project.status === "next" ? "bg-purple-900/30 border-l-4 border-purple-500" : "bg-gray-700/30"}`}
          >
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm text-gray-400">{project.team}</p>
            </div>
            <span className="text-purple-400">{project.bids} bids</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  </div>
);

export default ProjectQueue;
