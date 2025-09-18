import { createContext } from "react";
import type { User, AuthError } from "../types/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) => Promise<{ data: unknown; error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: unknown; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
