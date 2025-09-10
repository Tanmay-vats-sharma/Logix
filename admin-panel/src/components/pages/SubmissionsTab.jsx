import React from "react";
import { FileCheck } from "lucide-react";

const SubmissionsTab = () => {
  const submissions = [
    { team: "HTML Heroes", round: 2, question: 3, time: "09:58:42", status: "On Time" },
    { team: "Web Warriors", round: 2, question: 3, time: "09:59:21", status: "On Time" },
    { team: "Style Sprinters", round: 2, question: 3, time: "10:00:05", status: "5s Late" },
    { team: "CSS Masters", round: 2, question: 3, time: "10:02:15", status: "Too Late" },
  ];

  // Dynamic badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case "On Time":
        return "bg-green-600/20 text-green-400 border border-green-600/50";
      case "5s Late":
        return "bg-yellow-600/20 text-yellow-400 border border-yellow-600/50";
      case "Too Late":
        return "bg-red-600/20 text-red-400 border border-red-600/50";
      default:
        return "bg-gray-600/20 text-gray-300 border border-gray-600/50";
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <FileCheck className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold">Team Submissions</h2>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">Team Name</th>
                <th className="px-5 py-3 text-left">Round</th>
                <th className="px-5 py-3 text-left">Question</th>
                <th className="px-5 py-3 text-left">Submission Time</th>
                <th className="px-5 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-100">
                    {submission.team}
                  </td>
                  <td className="px-5 py-3">{submission.round}</td>
                  <td className="px-5 py-3">{submission.question}</td>
                  <td className="px-5 py-3">{submission.time}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                        submission.status
                      )}`}
                    >
                      {submission.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Submissions */}
        <div className="flex justify-end mt-4">
          <span className="text-sm text-gray-400">
            Total Submissions:{" "}
            <span className="text-blue-400 font-semibold">
              {submissions.length}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubmissionsTab;
