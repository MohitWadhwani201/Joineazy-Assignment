import React, { useState } from "react";
import { createAssignment } from "../services/assignmentService";
import { useNavigate } from "react-router-dom";

export default function CreateAssignment() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [link, setLink] = useState("");
  const [assignedGroupsCsv, setAssignedGroupsCsv] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const assignedGroups = assignedGroupsCsv.split(",").map(s=>s.trim()).filter(Boolean);
      await createAssignment({ title, description: desc, dueDate, oneDriveLink: link, assignedGroups });
      setMsg("Assignment created");
      setTimeout(()=>navigate("/admin/assignments"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Create Assignment</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full border p-2 rounded" required />
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" />
        <input value={dueDate} onChange={(e)=>setDueDate(e.target.value)} type="datetime-local" className="w-full border p-2 rounded" />
        <input value={link} onChange={(e)=>setLink(e.target.value)} placeholder="OneDrive link" className="w-full border p-2 rounded" />
        <input value={assignedGroupsCsv} onChange={(e)=>setAssignedGroupsCsv(e.target.value)} placeholder="assigned group IDs comma separated (optional)" className="w-full border p-2 rounded" />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Create</button>
      </form>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
