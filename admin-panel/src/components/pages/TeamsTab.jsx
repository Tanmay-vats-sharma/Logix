import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeams } from "../../redux/features/teamSlice";

const TeamsTab = () => {
  const dispatch = useDispatch();
  const storeTeams = useSelector((state) => state.teams?.list || []);
  const storeLoading = useSelector((state) => state.teams?.loading);
  const storeError = useSelector((state) => state.teams?.error);

  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (storeTeams.length > 0) {
      setTeams(storeTeams);
      setFilteredTeams(storeTeams);
      hasFetched.current = true;
      return;
    }
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      try {
        const result = await dispatch(fetchTeams({ limit: 10000 }));
        const teamList = result?.payload?.teams || [];
        setTeams(teamList);
        setFilteredTeams(teamList);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchData();
  }, [dispatch, storeTeams]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTeams(teams);
      return;
    }

    // Split IDs by comma and trim spaces
    const ids = searchTerm
      .split(",")
      .map((id) => id.trim().toLowerCase())
      .filter(Boolean);

    const filtered = teams.filter((team) => {
      const tId = (team.teamId ?? team._id ?? "").toString().toLowerCase();
      return ids.includes(tId);
    });

    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const getMemberName = (m) => {
    if (!m) return "";
    if (typeof m === "string") return m;
    return m.name || m.fullName || m.username || "";
  };

  const getMemberRoll = (m) => {
    if (!m || typeof m === "string") return "";
    return (
      m.rollNumber ||
      m.roll_no ||
      m.roll ||
      m.rollNo ||
      m.registrationNumber ||
      ""
    );
  };

  const getMemberBranch = (m) => {
    if (!m || typeof m === "string") return "";
    return m.branch || m.department || "";
  };

  const getMemberSection = (m) => {
    if (!m || typeof m === "string") return "";
    return m.section || "";
  };

  const buildMemberList = (team) => {
    const members = Array.isArray(team.members) ? [...team.members] : [];
    const leader = team.leader;

    if (leader) {
      const leaderId = typeof leader === "object" ? leader._id : leader;
      const exists = members.some(
        (m) => (typeof m === "object" ? m._id : m) === leaderId
      );
      if (!exists) {
        members.unshift(leader);
      }
    }
    return members;
  };

  const handleCopyAll = async () => {
    if (!filteredTeams.length) {
      alert("No matching teams available to copy.");
      return;
    }
    const headers = [
      "Team ID",
      "Team Name",
      "Member Name",
      "Roll Number",
      "Branch",
      "Section",
    ];
    const rows = [];

    for (const team of filteredTeams) {
      const teamIdValue = team.teamId ?? team._id ?? "";
      const teamNameValue = team.teamName ?? team.name ?? "";
      const leaderId =
        team && typeof team.leader === "object"
          ? team.leader._id
          : team?.leader || null;

      const members = buildMemberList(team);

      if (members.length === 0) {
        rows.push([teamIdValue, teamNameValue, "", "", "", ""].join("\t"));
      } else {
        for (const m of members) {
          const name = getMemberName(m);
          const isLeader =
            (typeof m === "object" && m._id === leaderId) || m === leaderId;
          const displayName = isLeader && name ? `${name} (Leader)` : name;

          const roll = getMemberRoll(m);
          const branch = getMemberBranch(m);
          const section = getMemberSection(m);

          rows.push(
            [
              teamIdValue,
              teamNameValue,
              displayName,
              roll,
              branch,
              section,
            ].join("\t")
          );
        }
      }
    }

    const text = [headers.join("\t"), ...rows].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      alert(
        `✅ Copied ${rows.length} rows (${filteredTeams.length} teams). Paste into Google Sheets / Excel.`
      );
    } catch (err) {
      alert("❌ Failed to copy to clipboard.");
    }
  };

  return (
    <div className="bg-gray-900 text-white shadow-lg rounded-xl p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h2 className="text-xl font-bold">All Registered Teams</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Team IDs (comma separated)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-lg text-black w-64 bg-white"
          />
          <button
            onClick={handleCopyAll}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
          >
            Copy All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-gray-200">
              <th className="px-4 py-3">Team ID</th>
              <th className="px-4 py-3">Team Name</th>
              <th className="px-4 py-3">Members</th>
              <th className="px-4 py-3">Roll Numbers</th>
              <th className="px-4 py-3">Branch</th>
              <th className="px-4 py-3">Section</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team) => {
                const members = buildMemberList(team);
                return (
                  <tr
                    key={team._id}
                    className="border-t border-gray-700 hover:bg-gray-800"
                  >
                    <td className="px-4 py-3">{team.teamId ?? team._id}</td>
                    <td className="px-4 py-3">{team.teamName ?? team.name}</td>
                    <td className="px-4 py-3">
                      {members.map((m, idx) => {
                        const name = getMemberName(m);
                        const isLeader =
                          (typeof m === "object" ? m._id : m) ===
                            (typeof team.leader === "object"
                              ? team.leader?._id
                              : team.leader) && name;
                        return (
                          <div key={idx}>
                            {isLeader ? `${name} (Leader)` : name}
                          </div>
                        );
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {members.map((m, idx) => (
                        <div key={idx}>{getMemberRoll(m) || "N/A"}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3">
                      {members.map((m, idx) => (
                        <div key={idx}>{getMemberBranch(m) || "N/A"}</div>
                      ))}
                    </td>
                    <td className="px-4 py-3">
                      {members.map((m, idx) => (
                        <div key={idx}>{getMemberSection(m) || "N/A"}</div>
                      ))}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  {storeLoading ? "Loading..." : storeError || "No teams found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-right text-gray-300">
        Total Teams: {filteredTeams?.length}
      </div>
    </div>
  );
};

export default TeamsTab;
