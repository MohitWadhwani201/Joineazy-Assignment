import React, { useEffect, useState } from "react";
import { fetchAdminAssignments, deleteAssignment } from "../services/assignmentService";

export default function AdminAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminAssignments();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete assignment?")) return;
    try {
      await deleteAssignment(id);
      setMsg("Deleted");
      load();
    } catch (err) {
      setMsg(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Assignments (Admin)</h1>
      <div className="space-y-3">
        {assignments.map(a => (
          <div key={a._id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.description}</p>
              <p className="text-xs text-gray-500">Due: {a.dueDate ? new Date(a.dueDate).toLocaleString() : "-"}</p>
            </div>
            <div className="flex flex-col items-end">
              <a href={a.oneDriveLink} target="_blank" rel="noreferrer" className="text-indigo-600">OneDrive</a>
              <div className="mt-2">
                <button onClick={()=>handleDelete(a._id)} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
