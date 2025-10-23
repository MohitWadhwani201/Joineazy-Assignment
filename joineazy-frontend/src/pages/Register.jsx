import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await register(name, email, password, role); // res.user should have role
      const userRole = res.user.role;

      // Role-based redirect
      if (userRole === "admin") {
        navigate("/admin");
      } else if (userRole === "student") {
        navigate("/student");
      } else {
        navigate("/"); // fallback
      }
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Register</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex items-center space-x-2">
          <label className="text-sm">Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="student">Student</option>
            <option value="admin">Professor (Admin)</option>
          </select>
        </div>
        <button className="w-full bg-indigo-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
