import React, { useEffect, useState } from "react";
import { getMyGroups } from "../services/groupService";
import { addMember } from "../services/groupService";

export default function MyGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMyGroups();
        setGroups(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async (groupId) => {
    const email = adding[groupId];
    if (!email) return setMsg("Enter email to add");
    try {
      await addMember(groupId, { email });
      setMsg("Member added (or invited)");
      // refresh
      const data = await getMyGroups();
      setGroups(data);
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to add member");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">My Groups</h1>
      <div className="space-y-3">
        {groups.length === 0 && <div className="bg-white p-4 rounded shadow">No groups yet</div>}
        {groups.map(g => (
          <div key={g._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{g.name}</h3>
                <p className="text-sm text-gray-500">Leader: {g.leader?.name || "—"}</p>
                <p className="text-sm text-gray-600">Members: {g.members?.map(m => m.name).join(", ")}</p>
              </div>
            </div>

            <div className="mt-3">
              <input
                placeholder="Member email to add"
                className="border p-2 rounded w-full"
                value={adding[g._id] || ""}
                onChange={(e)=> setAdding(prev => ({ ...prev, [g._id]: e.target.value }))}
              />
              <div className="mt-2">
                <button onClick={()=>handleAdd(g._id)} className="bg-indigo-600 text-white px-3 py-1 rounded">Add Member</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </div>
  );
}
