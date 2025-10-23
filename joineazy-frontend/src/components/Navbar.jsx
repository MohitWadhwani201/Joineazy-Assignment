import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Joineazy</Link>

        <div className="flex items-center space-x-4">
          {!user && (
            <>
              <Link to="/login" className="px-3 py-1 rounded bg-indigo-600 text-white">Login</Link>
              <Link to="/register" className="px-3 py-1 rounded border">Register</Link>
            </>
          )}

          {user && user.role === "student" && (
            <>
              <Link to="/student" className="text-sm">Dashboard</Link>
              <Link to="/student/assignments" className="text-sm">Assignments</Link>
              <Link to="/student/groups" className="text-sm">My Groups</Link>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin" className="text-sm">Admin</Link>
              <Link to="/admin/assignments" className="text-sm">Assignments</Link>
              <Link to="/admin/assignments/create" className="text-sm">Create</Link>
            </>
          )}

          {user ? (
            <>
              <div className="text-sm text-gray-600">Hi, {user.name}</div>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="px-3 py-1 rounded border"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
