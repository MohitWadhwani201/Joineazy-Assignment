import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

export default function AdminDashboard() {
	const { user, token } = useAuth();
	const [assignments, setAssignments] = useState([]);

	useEffect(() => {
		if (user?.role === "admin" && token) {
			axios.get("http://localhost:3000/api/assignments/admin", { headers: { Authorization: `Bearer ${token}` } })
				.then((res) => {
					if (Array.isArray(res.data)) setAssignments(res.data);
					else setAssignments([]);
				})
				.catch((err) => {
					console.error("Failed to fetch assignments:", err);
					setAssignments([]);
				});
		}
	}, [user, token]);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Assignments</h3>
					<p className="text-sm text-gray-500">Manage all assignments</p>
					<Link to="/admin/assignments" className="mt-2 inline-block text-indigo-600">
						Manage
					</Link>
				</div>
				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Create Assignment</h3>
					<p className="text-sm text-gray-500">Add new assignments</p>
					<Link to="/admin/assignments/create" className="mt-2 inline-block text-indigo-600">
						Create
					</Link>
				</div>
				<div className="bg-white p-4 rounded shadow">
					<h3 className="font-semibold">Reports</h3>
					<p className="text-sm text-gray-500">View group-wise submission status</p>
					<Link to="/admin/reports" className="mt-2 inline-block text-indigo-600">
						View Reports
					</Link>
				</div>
			</div>

			<h2 className="text-xl font-semibold mb-3">Recent Assignments</h2>
			<div className="bg-white p-4 rounded shadow">
				{assignments.length === 0 ? (
					<p>No assignments yet.</p>
				) : (
					assignments.map((a) => (
						<div key={a.id} className="border-b last:border-b-0 py-2 flex justify-between items-center">
							<div>
								<p className="font-semibold">{a.title || "Untitled"}</p>
								<p className="text-sm text-gray-500">
									Due: {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A"}
								</p>
								<p className="text-sm text-gray-500">
									{a.totalGroups && a.totalGroups > 0
										? `Submitted Groups: ${a.submittedGroups ?? 0}/${
												a.totalGroups
										  }`
										: "Assigned to all"}
								</p>
							</div>
							<Link to={`/admin/assignments`} className="text-indigo-600">
								View
							</Link>
						</div>
					))
				)}
			</div>
		</div>
	);
}
