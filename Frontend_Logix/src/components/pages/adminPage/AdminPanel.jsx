import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaCalendarAlt, FaTrophy, FaCogs, FaPlay, FaStop, FaMicrophone, FaGavel } from "react-icons/fa";
import EventModal from "./EventModal";
import EventControls from "./EventControls";

const data = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", events: ["AI Campus Navigator", "Eco Packaging Solution"] },
    { id: 2, name: "Bob Smith", email: "bob@example.com", events: ["Virtual Study Buddy"] },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", events: ["AR Classroom", "Smart Waste Mgmt"] }
  ],
  events: [
    { id: 1, title: "AI Campus Navigator", organizer: "Tech Wizards", participants: 10 },
    { id: 2, title: "Eco Packaging Solution", organizer: "Green Innovators", participants: 7 },
    { id: 3, title: "Virtual Study Buddy", organizer: "Code Crusaders", participants: 5 },
    { id: 4, title: "Smart Waste Mgmt", organizer: "Eco Warriors", participants: 8 },
    { id: 5, title: "AR Classroom", organizer: "Vision Squad", participants: 6 }
  ],
  projects: [
    { id: 1, title: "Blockchain Voting System", members: ["Naman", "Tanmay", "Gaurav", "Ayush"] },
    { id: 2, title: "AI Tutor", members: ["Frank", "Grace", "Heidi"] },
    { id: 3, title: "IoT Farming", members: ["Ivan", "Judy", "Karl", "Leo"] }
  ]
};

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("users");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={() => setIsModalOpen(false)}
        />

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Manage live event: users, events, projects & controls</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg">
              <div className="flex items-center justify-between mb-4 space-x-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedTab("users")}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "users" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                  >
                    <FaUsers className="mr-2" /> Users
                  </button>
                  <button
                    onClick={() => setSelectedTab("events")}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "events" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                  >
                    <FaCalendarAlt className="mr-2" /> Events
                  </button>
                  <button
                    onClick={() => setSelectedTab("controls")}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedTab === "controls" ? "bg-purple-600" : "bg-gray-700 hover:bg-gray-600"
                      }`}
                  >
                    <FaCogs className="mr-2" /> Controls
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-2 rounded-lg font-medium transition-colors bg-gray-700 hover:bg-gray-600"
                >
                  <FaCalendarAlt className="mr-2" /> Add Event
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {{
                    users: (
                      <>
                        <h2 className="text-xl font-bold mb-4">Registered Users</h2>
                        {data.users.map((u) => (
                          <div
                            key={u.id}
                            className="bg-gray-700/30 p-4 mb-3 rounded-lg border border-purple-500/20"
                          >
                            <h3 className="font-bold text-white">{u.name}</h3>
                            <p className="text-sm text-gray-400">{u.email}</p>
                            <p className="text-sm mt-1">
                              Events:{" "}
                              <span className="text-purple-400">{u.events.join(", ")}</span>
                            </p>
                          </div>
                        ))}
                      </>
                    ),
                    events: (
                      <>
                        <h2 className="text-xl font-bold mb-4">All Events</h2>
                        {data.events.map((e) => (
                          <div
                            key={e.id}
                            className="bg-gray-700/30 p-4 mb-3 rounded-lg border border-purple-500/20"
                          >
                            <h3 className="font-bold text-white">{e.title}</h3>
                            <p className="text-sm text-gray-400">Organizer: {e.organizer}</p>
                            <p className="text-sm">
                              Participants:{" "}
                              <span className="text-purple-400">{e.participants}</span>
                            </p>
                          </div>
                        ))}
                      </>
                    ),
                    controls: (
                      <EventControls
                        selectedProject={selectedProject}
                        projects={data.projects}
                      />
                    ),
                  }[selectedTab] || null}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Sidebar Projects */}
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 shadow-lg h-fit sticky top-6">
            <h2 className="text-xl font-bold flex items-center mb-4">
              <FaTrophy className="text-yellow-400 mr-2" /> Projects
            </h2>

            <div className="space-y-3">
              {data.projects.map((project, index) => {
                const isSelected = selectedProject === project.id;
                return (
                  <motion.div
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`p-4 rounded-lg cursor-pointer ${isSelected ? "bg-purple-600 border-purple-400" : "bg-gray-700/30 hover:bg-gray-600/40"
                      }`}
                  >
                    <h3 className="font-medium text-white">{project.title}</h3>
                    <div className="text-sm text-gray-300 mt-2">
                      Members: {project.members.join(", ")}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
