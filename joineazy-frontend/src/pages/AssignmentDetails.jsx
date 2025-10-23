import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStudentAssignments, confirmSubmission } from "../services/assignmentService";
import { getMyGroups } from "../services/groupService";

export default function AssignmentDetails() {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const assignments = await fetchStudentAssignments();
        const found = assignments.find(a => a._id === id);
        setAssignment(found || null);

        const myGroups = await getMyGroups();
        setGroups(myGroups);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async () => {
    if (!selectedGroup) return setMsg("Select a group");
    try {
      await confirmSubmission(selectedGroup, id);
      setMsg("Submission confirmed!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to confirm");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{assignment.title}</h2>
      <p className="text-sm text-gray-600 mb-2">{assignment.description}</p>
      <a href={assignment.oneDriveLink} target="_blank" rel="noreferrer" className="text-indigo-600">Open OneDrive Link</a>

      <div className="mt-4">
        <label className="block text-sm mb-1">Select Group (to confirm submission)</label>
        <select value={selectedGroup} onChange={(e)=>setSelectedGroup(e.target.value)} className="border p-2 rounded w-full">
          <option value="">-- select group --</option>
          {groups.map(g => <option key={g._id} value={g._id}>{g.name}</option>)}
        </select>
        <div className="flex items-center space-x-2 mt-3">
          <button onClick={submit} className="bg-green-600 text-white px-3 py-1 rounded">Yes, I have submitted (Confirm)</button>
        </div>
        {msg && <div className="mt-3 text-sm">{msg}</div>}
      </div>
    </div>
  );
}

