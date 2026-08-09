import { Routes, Route } from "react-router-dom";

import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import MainLayout from "../components/MainLayout";

import Home from "../pages/Home";
import Contact from "../pages/Contact";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import Login from "../pages/Admin/Login";
import Messages from "../pages/Admin/Messages";

import ProtectedRoute from "../api/auth/ProtectedRoute";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages with Navbar/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />

        {/* Projects */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Route>

      {/* Admin Auth */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/messages"
        element={
          <ProtectedRoute>
            <Messages />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
