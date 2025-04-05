import { useEffect, useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
const [isLoading, setIsLoading] = useState(true); // ← NUEVO

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"client" | "admin">("client");

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Credenciales inválidas");

      const data = await response.json();

      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      setUserRole(data.role);
    } catch (error) {
      console.error("Error en login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole("client");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/api/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Token inválido");
          return res.json();
        })
        .then((data) => {
          setIsLoggedIn(true);
          setUserRole(data.role);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setIsLoading(false)); // ← FIN del loading
    } else {
      setIsLoading(false); // ← si no hay token
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
