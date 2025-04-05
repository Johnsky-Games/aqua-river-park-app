// ✅ Archivo: /src/context/AuthContextDefinition.jsx
import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  userRole: "guest",
  login: (token, role) => {},
  logout: () => {},
});
