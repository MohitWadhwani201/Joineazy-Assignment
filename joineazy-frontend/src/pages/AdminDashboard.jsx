import React from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Assignments</h3>
          <Link to="/admin/assignments" className="mt-2 inline-block text-indigo-600">Manage</Link>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Create Assignment</h3>
          <Link to="/admin/assignments/create" className="mt-2 inline-block text-indigo-600">Create</Link>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-sm text-gray-500">View group-wise submission status</p>
        </div>
      </div>
    </div>
  );
}
