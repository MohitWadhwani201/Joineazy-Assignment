import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function AdminReports() {
  const { token } = useAuth();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [groupStatus, setGroupStatus] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/assignments/admin", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setAssignments(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  const viewReport = (assignmentId) => {
    axios
      .get(`http://localhost:3000/api/assignments/${assignmentId}/group-status`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setSelectedAssignment(res.data.assignment);
        setGroupStatus(res.data.groupStatus);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assignment Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {assignments.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-gray-500">Due: {new Date(a.dueDate).toLocaleDateString()}</p>
            <button
              className="mt-2 inline-block text-indigo-600"
              onClick={() => viewReport(a.id)}
            >
              View Report
            </button>
          </div>
        ))}
      </div>

      {selectedAssignment && (
        <div className="bg-white p-4 rounded shadow mt-6">
          <h2 className="font-semibold mb-3">{selectedAssignment.title} - Group Status</h2>
          {groupStatus.map((g) => (
            <div key={g.groupId} className="border-b py-2">
              <p className="font-semibold">{g.groupName} - {g.groupSubmitted ? "Submitted" : "Pending"}</p>
              <ul className="pl-4 list-disc">
                {g.membersStatus.map((m) => (
                  <li key={m.id}>
                    {m.name} ({m.email}) - {m.hasSubmitted ? "Submitted" : "Not Submitted"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
