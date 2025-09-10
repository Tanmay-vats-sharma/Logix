import { useEffect } from "react";
import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../redux/features/studentSlice";

const StudentsTab = () => {
  const dispatch = useDispatch();

  // Redux state
  const { list: students = [], loading = false, error = null } =
    useSelector((state) => state.students || {});

  useEffect(() => {
    if (students.length === 0) {
      dispatch(fetchAllStudents());
    }
  }, [dispatch, students.length]);

  // Copy all student data in formatted text
  const copyToClipboard = () => {
    if (students.length === 0) return;

    const headers = [
      "Name",
      "Roll Number",
      "Branch",
      "Section",
      "Phone",
      "College Email",
      "Personal Email",
    ];

    const rows = students.map(
      (s) =>
        `${s.name}\t${s.rollNumber}\t${s.branch}\t${s.section}\t${s.phoneNumber}\t${s.collegeEmail}\t${s.personalEmail}`
    );

    const text = [headers.join("\t"), ...rows].join("\n");
    navigator.clipboard.writeText(text)
      .then(() => alert("Student data copied to clipboard!"))
      .catch(() => alert("Failed to copy data."));
  };

  return (
    <div className="p-6 min-h-screen bg-gray-900 text-gray-100">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5">
          <Users className="text-blue-400" size={24} />
          <h2 className="text-xl font-semibold">All Participating Students</h2>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() =>
              window.open(
                "https://docs.google.com/spreadsheets/d/1OQ3poRIfRylazy_qzivIZws6GvqSe1hL9cH0ZasVluc/edit?gid=0#gid=0",
                "_blank"
              )
            }
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Open Google Sheet
          </button>

          <button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Copy All Data
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-gray-400">Loading students...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : students.length === 0 ? (
          <p className="text-gray-400">No students found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-md">
            <table className="min-w-full text-sm text-gray-300">
              <thead className="bg-gray-700 text-gray-200 uppercase text-xs">
                <tr>
                  <th className="px-5 py-3 text-left">Name</th>
                  <th className="px-5 py-3 text-left">Roll Number</th>
                  <th className="px-5 py-3 text-left">Branch</th>
                  <th className="px-5 py-3 text-left">Section</th>
                  <th className="px-5 py-3 text-left">Phone</th>
                  <th className="px-5 py-3 text-left">College Email</th>
                  <th className="px-5 py-3 text-left">Personal Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr
                    key={s._id}
                    className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-5 py-3 font-medium text-gray-100">{s.name}</td>
                    <td className="px-5 py-3">{s.rollNumber}</td>
                    <td className="px-5 py-3">{s.branch}</td>
                    <td className="px-5 py-3">{s.section}</td>
                    <td className="px-5 py-3">{s.phoneNumber}</td>
                    <td className="px-5 py-3">{s.collegeEmail}</td>
                    <td className="px-5 py-3">{s.personalEmail}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total Students */}
            <div className="flex justify-end mt-4">
              <span className="text-sm text-gray-400">
                Total Students:{" "}
                <span className="text-blue-400 font-semibold">{students.length}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsTab;
