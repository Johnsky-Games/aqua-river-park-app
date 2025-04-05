import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Clientes from "../pages/Clients";
import Home from "../pages/Home"; // Import the Home component
// ...otros imports
import Login from "../pages/Login"; // Import the Login component
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
            </>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
