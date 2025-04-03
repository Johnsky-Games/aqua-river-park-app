import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";
import Login from "../pages/Login";
import AdminDashboard from "../pages/AdminDashboard";
import Perfil from "../pages/Perfil";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* 🔒 Protegido para cualquier usuario logeado */}
      <Route element={<PrivateRoute />}>
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      {/* 🔐 Protegido solo para admin */}
      <Route element={<PrivateRoute requiredRole="admin" />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
