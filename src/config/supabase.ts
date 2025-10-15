// Configuration Supabase
// Remplacez ces valeurs par vos vraies clés Supabase depuis votre dashboard Supabase

// Vérification des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validation des variables d'environnement
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "⚠️ Variables d'environnement Supabase manquantes!\n" +
      "Veuillez configurer VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY\n" +
      "Pour Vercel: https://vercel.com/docs/concepts/projects/environment-variables"
  );
}

// Valeurs par défaut pour éviter les erreurs au build (ne fonctionneront pas en prod)
const defaultUrl = "https://placeholder.supabase.co";
const defaultKey = "placeholder_key";

export const supabaseConfig = {
  url: supabaseUrl || defaultUrl,
  anonKey: supabaseAnonKey || defaultKey,
};

// Instructions pour configurer Supabase :
// 1. Créez un projet sur https://supabase.com
// 2. Allez dans Settings > API
// 3. Copiez l'URL du projet et la clé anon
// 4. Pour le développement local, créez un fichier .env à la racine :
//    VITE_SUPABASE_URL=votre_url_supabase
//    VITE_SUPABASE_ANON_KEY=votre_cle_anon
// 5. Pour Vercel, ajoutez les variables dans Settings > Environment Variables
//    Voir VERCEL_DEPLOYMENT.md pour plus de détails
