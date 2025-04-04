import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FullPageLoader from "../components/FullPageLoader";

export default function PrivateRoute({
  requiredRole,
}: {
  requiredRole?: "admin" | "client";
}) {
  const { isLoggedIn, userRole, isLoading } = useAuth();

  if (isLoading) return <FullPageLoader />;

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (requiredRole && userRole !== requiredRole)
    return <Navigate to="/" replace />;

  return <Outlet />;
}
