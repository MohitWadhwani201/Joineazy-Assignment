import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchStudentAssignments } from "../services/assignmentService";

export default function AssignmentsList() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchStudentAssignments();
        setAssignments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Assignments</h1>
      <div className="space-y-3">
        {assignments.length === 0 && <div className="bg-white p-4 rounded shadow">No assignments found</div>}
        {assignments.map((a) => (
          <div key={a._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-xs text-gray-500">Due: {a.dueDate ? new Date(a.dueDate).toLocaleString() : "—"}</p>
            </div>
            <div className="flex flex-col items-end">
              <a href={a.oneDriveLink} target="_blank" rel="noreferrer" className="text-indigo-600">Open OneDrive</a>
              <Link to={`/student/assignments/${a._id}`} className="mt-2 bg-indigo-600 text-white px-3 py-1 rounded text-sm">Confirm</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
