import { createClient } from "@supabase/supabase-js";
import type { User } from "@supabase/supabase-js";
import { supabaseConfig } from "../config/supabase";

// Re-export du type User de Supabase
export type { User };

// Type pour les erreurs d'authentification
export type AuthError = {
  message: string;
  status?: number;
};

// Création du client Supabase
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Fonctions d'authentification
export const auth = {
  // Inscription
  async signUp(
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Une erreur inattendue s'est produite",
        },
      };
    }
  },

  // Connexion
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error: unknown) {
      return {
        data: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Une erreur inattendue s'est produite",
        },
      };
    }
  },

  // Déconnexion
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: unknown) {
      return {
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Une erreur inattendue s'est produite",
        },
      };
    }
  },

  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error: unknown) {
      return {
        user: null,
        error: {
          message:
            error instanceof Error
              ? error.message
              : "Une erreur inattendue s'est produite",
        },
      };
    }
  },

  // Écouter les changements d'état d'authentification
  onAuthStateChange(callback: (user: User | null) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback((session?.user as User) || null);
    });
  },
};
