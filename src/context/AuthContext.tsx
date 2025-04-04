// 📁 src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  userRole: string;
  login: (newToken: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [userRole, setUserRole] = useState(() => localStorage.getItem("role") || "");

  const isLoggedIn = !!token;

  const login = (newToken: string, role: string) => {
    setToken(newToken);
    setUserRole(role);
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", role);
  };

  const logout = () => {
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
