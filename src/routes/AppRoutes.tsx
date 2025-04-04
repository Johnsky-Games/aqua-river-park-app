import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clientes";
// ...otros imports
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
      </Route>
    </Routes>
  );
}
