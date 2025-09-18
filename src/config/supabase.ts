// Configuration Supabase
// Remplacez ces valeurs par vos vraies clés Supabase depuis votre dashboard Supabase

export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || "your_supabase_project_url",
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "your_supabase_anon_key",
};

// Instructions pour configurer Supabase :
// 1. Créez un projet sur https://supabase.com
// 2. Allez dans Settings > API
// 3. Copiez l'URL du projet et la clé anon
// 4. Créez un fichier .env à la racine du projet avec :
//    VITE_SUPABASE_URL=votre_url_supabase
//    VITE_SUPABASE_ANON_KEY=votre_cle_anon
