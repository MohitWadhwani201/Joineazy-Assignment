import React, { useState } from "react";
import { createGroup } from "../services/groupService";
import { useNavigate } from "react-router-dom";

export default function GroupCreate() {
  const [name, setName] = useState("");
  const [membersCsv, setMembersCsv] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const members = membersCsv.split(",").map(s => s.trim()).filter(Boolean);
      await createGroup({ name, members });
      setMsg("Group created!");
      setTimeout(()=> navigate("/student/groups"), 800);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create group");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Create Group</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Group Name" className="w-full border p-2 rounded" />
        <input value={membersCsv} onChange={(e)=>setMembersCsv(e.target.value)} placeholder="Member emails or IDs, comma separated" className="w-full border p-2 rounded" />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Create</button>
      </form>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}

