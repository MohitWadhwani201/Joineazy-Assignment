
import React from "react";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Assignments</h3>
          <p className="text-sm text-gray-500">View assignments and submission links</p>
          <Link to="/student/assignments" className="mt-3 inline-block text-indigo-600">Open</Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Groups</h3>
          <p className="text-sm text-gray-500">Create or manage your groups</p>
          <Link to="/student/groups" className="mt-3 inline-block text-indigo-600">Open</Link>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold">Create Group</h3>
          <p className="text-sm text-gray-500">Create a new group and invite members</p>
          <Link to="/student/groups/create" className="mt-3 inline-block text-indigo-600">Create</Link>
        </div>
      </div>
    </div>
  );
}
