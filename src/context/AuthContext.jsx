// ✅ Archivo: /src/context/AuthContext.jsx
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";

// Definición del contexto
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "guest"
  );
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  const login = (newToken, role) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("role", role);
    setToken(newToken);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUserRole("guest");
    setIsLoggedIn(false);
  };

  const contextValue = {
    token,
    isLoggedIn,
    userRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
