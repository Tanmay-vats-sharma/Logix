import React, { useEffect, useState } from "react";
import { FileCheck, Search, X } from "lucide-react";
import { getSubmissions, updateCorrectSubmission } from "../../services/submissionService";

const SubmissionsTab = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [correctValue, setCorrectValue] = useState("");
  const [error, setError] = useState("");

  // Fetch submissions from API
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getSubmissions();
      setSubmissions(data?.submissions || []);
    } catch (err) {
      console.error("Failed to load submissions:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalOpen = (submission) => {
    setSelectedSubmission(submission);
    setCorrectValue(submission?.correctSubmission ?? 0);
    setError("");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSubmission(null);
    setCorrectValue("");
    setError("");
  };

  const handleUpdate = async () => {
    if (!selectedSubmission?.id) return;

    // validation
    if (Number(correctValue) > Number(selectedSubmission?.submission ?? 0)) {
      setError("❌ Correct submissions cannot exceed total submissions.");
      return;
    }

    try {
      await updateCorrectSubmission(selectedSubmission.id, Number(correctValue));
      fetchData(); // refresh after update
      handleModalClose();
    } catch (err) {
      console.error("Failed to update submission:", err?.message);
      setError("⚠️ Failed to update. Please try again.");
    }
  };

  // Filter submissions by teamId or teamName
  const filteredSubmissions = submissions.filter(
    (s) =>
      String(s?.teamId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      s?.teamName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <FileCheck className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold">Team Submissions</h2>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by Team ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
          {loading ? (
            <p className="p-4 text-gray-400">Loading submissions...</p>
          ) : (
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3 text-left">Team Name</th>
                  <th className="px-5 py-3 text-left">Team ID</th>
                  <th className="px-5 py-3 text-left">Submissions</th>
                  <th className="px-5 py-3 text-left">Time Taken</th>
                  <th className="px-5 py-3 text-left">Correct Submissions</th>
                  <th className="px-5 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions?.length > 0 ? (
                  filteredSubmissions.map((submission, index) => (
                    <tr
                      key={submission?._id || index}
                      className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-5 py-3 font-medium text-gray-100">
                        {submission?.teamName || "Unknown"}
                      </td>
                      <td className="px-5 py-3">{submission?.teamId || "N/A"}</td>
                      <td className="px-5 py-3">{submission?.submission ?? 0}</td>
                      <td className="px-5 py-3">{submission?.timeTaken ?? 0} sec</td>
                      <td className="px-5 py-3">{submission?.correctSubmission ?? 0}</td>
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleModalOpen(submission)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center px-5 py-6 text-gray-400">
                      No submissions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Total Submissions */}
        {!loading && (
          <div className="flex justify-end mt-4">
            <span className="text-sm text-gray-400">
              Total Submissions:{" "}
              <span className="text-blue-400 font-semibold">
                {filteredSubmissions?.length || 0}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-96 relative">
            <button
              onClick={handleModalClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              Update Correct Submissions
            </h3>
            <input
              type="number"
              value={correctValue}
              min={0}
              max={selectedSubmission?.submission ?? 0}
              onChange={(e) => {
                setCorrectValue(e.target.value);
                setError(""); // clear error when editing
              }}
              className="w-full px-3 py-2 mb-2 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="text-red-400 text-sm mb-3">{error}</p>
            )}
            <div className="flex justify-end gap-2">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsTab;
