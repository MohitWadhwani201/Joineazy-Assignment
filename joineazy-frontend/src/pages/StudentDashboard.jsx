import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getMyGroups } from "../services/groupService";
import axios from "axios";

export default function StudentDashboard() {
	const { user, token } = useAuth();
	const [assignments, setAssignments] = useState([]);
	const [groups, setGroups] = useState([]);

	useEffect(() => {
		if (user?.role === "student") {
			// Fetch assignments
			axios.get("http://localhost:3000/api/assignments/student", {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((res) => {
					console.log("API response:", res.data); // debug
					const data = res.data.assignments || []; // always use the key from backend
					setAssignments(data);
				})
				.catch((err) => console.error(err));

			// Fetch groups using the API wrapper
			getMyGroups()
				.then((res) => {
					const groupsArray = Array.isArray(res) ? res : res.groups || [];
					setGroups(groupsArray);
				})
				.catch((err) => console.error(err));
		}
	}, [user, token]);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Assignments</h3>
					<p className="text-sm text-gray-500">View assignments and submission links</p>
					<Link to="/student/assignments" className="mt-3 inline-block text-indigo-600">
						Open
					</Link>
				</div>

				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Groups</h3>
					<p className="text-sm text-gray-500">View your groups and members</p>
					<Link to="/student/groups" className="mt-3 inline-block text-indigo-600">
						Open
					</Link>
				</div>

				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Create Group</h3>
					<p className="text-sm text-gray-500">Create a new group and invite members</p>
					<Link to="/student/groups/create" className="mt-3 inline-block text-indigo-600">
						Create
					</Link>
				</div>
			</div>

			<h2 className="text-xl font-semibold mb-3">Your Assignments</h2>
			<div className="bg-white p-4 rounded shadow">
				{assignments.length === 0 && <p>No assignments yet.</p>}
				{assignments.map((a) => (
					<div key={a.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
						<div>
							<p className="font-semibold">{a.title}</p>
							<p className="text-sm text-gray-500">
								Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "—"}
							</p>
							<p className="text-sm text-gray-500">Status: {a.overallStatus || "Pending"}</p>
						</div>
						<Link to={`/student/assignments`} className="text-indigo-600">
							View
						</Link>
					</div>
				))}
			</div>

			<h2 className="text-xl font-semibold mt-6 mb-3">Your Groups</h2>
			<div className="bg-white p-4 rounded shadow">
				{groups.length === 0 && <p>You are not part of any groups yet.</p>}
				{groups.map((g) => (
					<div key={g.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
						<div>
							<p className="font-semibold">{g.name}</p>
							<p className="text-sm text-gray-500">
								Leader: {g.leaderId === user.id ? "You" : g.Leader?.name || "Unknown"}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
