import React, { useEffect, useState } from "react";
import { fetchStudentAssignments, confirmSubmission } from "../services/assignmentService";

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState({}); // track which assignments are being confirmed
  const [msg, setMsg] = useState("");

  useEffect(() => {
  const load = async () => {
    try {
      const data = await fetchStudentAssignments();
      setAssignments(data.assignments || []); // <-- important
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  load();
}, []);


  const handleConfirm = async (assignmentId) => {
    setConfirming((prev) => ({ ...prev, [assignmentId]: true }));
    setMsg("");
    try {
      // Call your backend API to confirm submission
      await confirmSubmission(assignmentId); // you may need to pass groupId too if required
      setMsg("Submission confirmed successfully!");

      // Refresh assignments
      const data = await fetchStudentAssignments();
      setAssignments(data.assignments);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Failed to confirm submission");
    } finally {
      setConfirming((prev) => ({ ...prev, [assignmentId]: false }));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Assignments</h1>
      {msg && <div className="text-green-600 mb-2">{msg}</div>}
      <div className="space-y-3">
        {assignments.length === 0 && <div className="bg-white p-4 rounded shadow">No assignments found</div>}
        {assignments.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-xs text-gray-500">Due: {a.dueDate ? new Date(a.dueDate).toLocaleString() : "—"}</p>
              <p className="text-xs text-gray-500">Status: {a.overallStatus}</p>
            </div>
            <div className="flex flex-col items-end">
              <a href={a.oneDriveLink} target="_blank" rel="noreferrer" className="text-indigo-600">Open OneDrive</a>
              <button
                onClick={() => handleConfirm(a.id)}
                disabled={confirming[a.id] || a.overallStatus === "Submitted"}
                className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm disabled:bg-gray-400"
              >
                {a.overallStatus === "Submitted" ? "Submitted" : confirming[a.id] ? "Confirming..." : "Confirm"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
