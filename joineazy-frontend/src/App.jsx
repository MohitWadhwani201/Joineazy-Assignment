import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAssignment from "./pages/CreateAssignment";
import AdminAssignments from "./pages/AdminAssignments";
import AssignmentsList from "./pages/AssignmentsList";
import GroupCreate from "./pages/GroupCreate";
import MyGroups from "./pages/MyGroups";
import AssignmentDetails from "./pages/AssignmentDetails";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";
import AdminReports from "./pages/AdminReports";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
        if (user) {
            if (user.role === 'admin') navigate('/admin');
            else navigate('/student');
        }
    }, [user]);

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Navigate to={user ? (user.role === "admin" ? "/admin" : "/student") : "/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student routes (protected + role) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleRoute roles={["student"]} />}>
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/assignments" element={<AssignmentsList />} />
              <Route path="/student/assignments/:id" element={<AssignmentDetails />} />
              <Route path="/student/groups/create" element={<GroupCreate />} />
              <Route path="/student/groups" element={<MyGroups />} />
            </Route>

            <Route element={<RoleRoute roles={["admin"]} />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/assignments" element={<AdminAssignments />} />
              <Route path="/admin/assignments/create" element={<CreateAssignment />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
