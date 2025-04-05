// ✅ Archivo: /src/context/AuthContext.tsx
import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition";

interface LoginResponse {
  token: string;
  role: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState<string>(() => localStorage.getItem("role") || "");

  const isLoggedIn: boolean = !!token;

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error de autenticación");
      }

      const data: LoginResponse = await response.json();
      setToken(data.token);
      setUserRole(data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error de login:", error.message);
        throw error;
      } else {
        console.error("Error desconocido durante el login", error);
        throw new Error("Error inesperado durante el login");
      }
    }
  };

  const logout = (): void => {
    setToken("");
    setUserRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, isLoggedIn, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
