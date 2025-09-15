import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams, deleteTeam } from "../../redux/features/teamSlice";

const TeamsTab = () => {
  // const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // search state
  const dispatch = useDispatch();
  const hasFetched = useRef(false);
  const { teams  } = useSelector((state) => state.teams || {});

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const result = await dispatch(fetchTeams());
        const teamList = result.payload.teams || [];
        // setTeams(teamList);
        setFilteredTeams(teamList); // keep backup
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  // Search filter (teamName string, teamId number)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTeams(teams);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = teams?.filter(
        (team) =>
          team.teamName?.toLowerCase().includes(lowerSearch) ||
          String(team.teamId).includes(lowerSearch) // number converted to string
      );
      setFilteredTeams(filtered);
    }
  }, [searchTerm, teams]);

  const handleRemove = (teamId) => {
    dispatch(deleteTeam(teamId));
    setFilteredTeams((prev) => prev.filter((team) => team?._id !== teamId));
  }

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">All Registered Teams</h2>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Team ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-72"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200">
            Add New Team
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Team Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Leader</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Leader Roll no.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams?.length > 0 ? (
              filteredTeams?.map((team) => (
                <tr
                  key={team._id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition duration-200"
                >
                  <td className="px-4 py-3 text-sm">{team?.teamId || "N/A"}</td>
                  <td className="px-4 py-3 text-sm font-medium">{team?.teamName}</td>
                  <td className="px-4 py-3 text-sm">{team?.leader?.name}</td>
                  <td className="px-4 py-3 text-sm">{team?.leader?.rollNumber || "N/A"}</td>
                  <td className="px-4 py-3 space-x-6">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded-md transition-all duration-200"
                      onClick={() => setSelectedTeam(team)}
                    >
                      Details
                    </button>
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded-md transition-all duration-200"
                      onClick={() => handleRemove(team?._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-6 text-gray-400 italic">
                  No teams found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 overflow-auto p-4">
          <div className="bg-gray-800 text-white rounded-xl p-6 w-full max-w-3xl relative">
            <h3 className="text-lg font-bold mb-4">Team Details: {selectedTeam.teamName}</h3>
            <p><strong>Team ID:</strong> {selectedTeam.teamId || "N/A"}</p>
            <p><strong>Leader Name:</strong> {selectedTeam.leader?.name}</p>
            <p><strong>Leader Roll No:</strong> {selectedTeam.leader?.rollNumber || "N/A"}</p>
            <p><strong>Leader Branch:</strong> {selectedTeam.leader?.branch}</p>
            <p><strong>Leader Section:</strong> {selectedTeam.leader?.section}</p>
            <p><strong>Leader Phone:</strong> {selectedTeam.leader?.phoneNumber}</p>
            <p><strong>Leader College Email:</strong> {selectedTeam.leader?.collegeEmail}</p>
            <p><strong>Leader Personal Email:</strong> {selectedTeam.leader?.personalEmail}</p>

            <p className="mt-4 font-semibold">Members:</p>
            <div className="max-h-64 overflow-y-auto border border-gray-700 rounded-md p-2">
              {selectedTeam.members.map((m) => (
                <div
                  key={m._id}
                  className="mb-2 p-2 border-b border-gray-700 last:border-b-0 rounded"
                >
                  <p><strong>Name:</strong> {m.name}</p>
                  <p><strong>Roll Number:</strong> {m.rollNumber}</p>
                  <p><strong>Branch:</strong> {m.branch}</p>
                  <p><strong>Section:</strong> {m.section}</p>
                  <p><strong>Phone:</strong> {m.phoneNumber}</p>
                  <p><strong>College Email:</strong> {m.collegeEmail}</p>
                  <p><strong>Personal Email:</strong> {m.personalEmail}</p>
                </div>
              ))}
            </div>

            <button
              className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl"
              onClick={() => setSelectedTeam(null)}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamsTab;
