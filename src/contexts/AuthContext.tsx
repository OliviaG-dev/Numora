import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { auth } from "../lib/supabase";
import type { User } from "../types/auth";
import { AuthContext, type AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur actuel au chargement
    const getInitialUser = async () => {
      try {
        const { user: currentUser } = await auth.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    getInitialUser();

    // Écouter les changements d'état d'authentification
    const {
      data: { subscription },
    } = auth.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) => {
    setLoading(true);
    try {
      const result = await auth.signUp(email, password, userData);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const result = await auth.signIn(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const result = await auth.signOut();
      return result;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
