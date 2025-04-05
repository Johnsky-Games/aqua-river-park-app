// ✅ Archivo: /src/context/AuthContextDefinition.tsx
import { createContext } from "react";

export interface AuthContextType {
  token: string;
  isLoggedIn: boolean;
  userRole: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface LoginResponse {
  token: string;
  role: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
