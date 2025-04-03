import { createContext, useContext } from "react";

export interface AuthContextType {
  isLoggedIn: boolean;
  userRole: "client" | "admin";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userRole: "client",
  login: async () => {},
  logout: () => {},
  isLoading: false,
});

export const useAuth = () => useContext(AuthContext);
