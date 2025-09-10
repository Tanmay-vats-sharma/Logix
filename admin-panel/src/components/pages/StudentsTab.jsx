import React from "react";
import { Users } from "lucide-react";

const StudentsTab = () => {
  const students = [
    { id: 101, name: "John Smith", email: "john@example.com", team: "HTML Heroes", college: "Tech University" },
    { id: 102, name: "Emma Johnson", email: "emma@example.com", team: "HTML Heroes", college: "Tech University" },
    { id: 103, name: "Michael Brown", email: "michael@example.com", team: "HTML Heroes", college: "Tech University" },
    { id: 104, name: "Sarah Williams", email: "sarah@example.com", team: "CSS Masters", college: "Design Institute" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <Users className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold">All Participating Students</h2>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
              <tr>
                <th className="px-5 py-3 text-left">ID</th>
                <th className="px-5 py-3 text-left">Name</th>
                <th className="px-5 py-3 text-left">Email</th>
                <th className="px-5 py-3 text-left">Team</th>
                <th className="px-5 py-3 text-left">College</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-100">{student.id}</td>
                  <td className="px-5 py-3">{student.name}</td>
                  <td className="px-5 py-3">{student.email}</td>
                  <td className="px-5 py-3">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-xs font-medium">
                      {student.team}
                    </span>
                  </td>
                  <td className="px-5 py-3">{student.college}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Students */}
        <div className="flex justify-end mt-4">
          <span className="text-sm text-gray-400">
            Total Students:{" "}
            <span className="text-blue-400 font-semibold">{students.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default StudentsTab;
