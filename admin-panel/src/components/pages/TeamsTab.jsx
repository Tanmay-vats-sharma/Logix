import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTeams } from "../../redux/features/teamSlice";

const TeamsTab = () => {
  const [teams, setTeams] = useState([]);
  const dispatch = useDispatch();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const result = await dispatch(fetchTeams());
        setTeams(result.payload.teams || []);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-green-100 bg-green-600 rounded-md">
            {status}
          </span>
        );
      case "Disqualified":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-red-100 bg-red-600 rounded-md">
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold text-gray-100 bg-gray-600 rounded-md">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">All Registered Teams</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200">
          Add New Team
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Team Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Members</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.length > 0 ? (
              teams.map((team) => (
                <tr
                  key={team._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-4 py-3 text-sm">{team._id}</td>
                  <td className="px-4 py-3 text-sm font-medium">{team.name}</td>
                  <td className="px-4 py-3 text-sm">
                    {Array.isArray(team.members)
                      ? team.members.map((m) => m.name).join(", ")
                      : "No Members"}
                  </td>
                  <td className="px-4 py-3 text-sm">{getStatusBadge(team.status)}</td>
                  <td className="px-4 py-3">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-md transition-all duration-200">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center px-4 py-6 text-gray-400 italic"
                >
                  No teams registered yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsTab;
