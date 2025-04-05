// ✅ Archivo: /src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[]; // Roles permitidos (opcional)
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { isLoggedIn, userRole } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(userRole)) return <Navigate to="/" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
