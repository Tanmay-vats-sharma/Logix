import React from "react";
import {
  Users,
  UserCheck,
  Trophy,
  HelpCircle,
  Activity,
} from "lucide-react"; // For modern dashboard icons

const DashboardTab = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Teams */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-blue-500/30 transition-all duration-300">
          <Users size={32} className="text-blue-400 mb-2" />
          <div className="text-gray-400 text-sm">Total Teams</div>
          <div className="text-3xl font-bold text-blue-400">24</div>
        </div>

        {/* Total Students */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-green-500/30 transition-all duration-300">
          <UserCheck size={32} className="text-green-400 mb-2" />
          <div className="text-gray-400 text-sm">Total Students</div>
          <div className="text-3xl font-bold text-green-400">72</div>
        </div>

        {/* Current Round */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-purple-500/30 transition-all duration-300">
          <Trophy size={32} className="text-purple-400 mb-2" />
          <div className="text-gray-400 text-sm">Current Round</div>
          <div className="text-3xl font-bold text-purple-400">2/5</div>
        </div>

        {/* Active Question */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center hover:scale-105 hover:shadow-red-500/30 transition-all duration-300">
          <HelpCircle size={32} className="text-red-400 mb-2" />
          <div className="text-gray-400 text-sm">Active Question</div>
          <div className="text-3xl font-bold text-red-400">3</div>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-gray-700 flex items-center gap-2">
          <Activity className="text-blue-400" size={22} />
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Activity</th>
                <th className="py-3 px-4 text-left">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-700/40 transition duration-200">
                <td className="py-3 px-4">10:23 AM</td>
                <td className="py-3 px-4 font-medium text-blue-400">Round 2 Started</td>
                <td className="py-3 px-4 text-gray-300">Question 3 displayed</td>
              </tr>
              <tr className="hover:bg-gray-700/40 transition duration-200">
                <td className="py-3 px-4">10:15 AM</td>
                <td className="py-3 px-4 font-medium text-red-400">Team Disqualified</td>
                <td className="py-3 px-4 text-gray-300">
                  Team "CSS Masters" failed to submit in time
                </td>
              </tr>
              <tr className="hover:bg-gray-700/40 transition duration-200">
                <td className="py-3 px-4">10:05 AM</td>
                <td className="py-3 px-4 font-medium text-green-400">Round 2 Question 2</td>
                <td className="py-3 px-4 text-gray-300">Completed by 18 teams</td>
              </tr>
              <tr className="hover:bg-gray-700/40 transition duration-200">
                <td className="py-3 px-4">09:45 AM</td>
                <td className="py-3 px-4 font-medium text-yellow-400">Round 2 Started</td>
                <td className="py-3 px-4 text-gray-300">Question 2 displayed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
