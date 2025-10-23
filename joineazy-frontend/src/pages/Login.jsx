import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

 const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
        await login(email, password); // role-based redirect is handled in App.jsx useEffect
    } catch (error) {
        setErr(error.response?.data?.message || "Login failed");
    }
};


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl mb-4">Login</h2>
      {err && <div className="bg-red-100 text-red-700 p-2 rounded mb-3">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
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
        <button className="w-full bg-indigo-600 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-3 text-sm">
        Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link>
      </p>
    </div>
  );
}
