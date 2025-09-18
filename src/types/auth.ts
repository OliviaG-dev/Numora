// Types d'authentification pour l'application Numora
import type { User as SupabaseUser } from "@supabase/supabase-js";

// Re-export du type User de Supabase
export type User = SupabaseUser;

export type AuthError = {
  message: string;
  status?: number;
};
