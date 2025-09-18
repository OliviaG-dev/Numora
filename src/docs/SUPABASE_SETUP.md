# Configuration Supabase pour Numora

## 🚀 Étapes de configuration

### 1. Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation
5. Donnez un nom à votre projet (ex: "numora-app")
6. Créez un mot de passe sécurisé pour la base de données
7. Choisissez une région proche de vos utilisateurs
8. Cliquez sur "Create new project"

### 2. Récupérer les clés API

1. Dans votre dashboard Supabase, allez dans **Settings** > **API**
2. Copiez les valeurs suivantes :
   - **Project URL** (ex: `https://your-project-id.supabase.co`)
   - **anon public** key (commence par `eyJ...`)

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine de votre projet avec le contenu suivant :

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Important :** Remplacez les valeurs par vos vraies clés Supabase !

### 4. Configurer l'authentification

1. Dans votre dashboard Supabase, allez dans **Authentication** > **Settings**
2. Configurez les paramètres suivants :
   - **Site URL** : `http://localhost:5173` (pour le développement)
   - **Redirect URLs** : `http://localhost:5173/**`
3. Activez les providers d'authentification que vous souhaitez utiliser (Email, Google, etc.)

### 5. Tester l'application

1. Redémarrez votre serveur de développement :
   ```bash
   npm run dev
   ```
2. Allez sur `http://localhost:5173`
3. Testez l'inscription et la connexion

## 📁 Structure des fichiers créés

```
src/
├── config/
│   └── supabase.ts          # Configuration Supabase
├── lib/
│   └── supabase.ts          # Client Supabase et fonctions d'auth
├── contexts/
│   └── AuthContext.tsx      # Contexte d'authentification React
└── components/
    ├── LoginSection/        # Modifié pour utiliser Supabase
    ├── SignupSection/       # Modifié pour utiliser Supabase
    ├── Header/              # Modifié pour utiliser Supabase
    └── ReadingDetailSection/ # Modifié pour utiliser Supabase
```

## 🔧 Fonctionnalités implémentées

- ✅ **Inscription** avec email et mot de passe
- ✅ **Connexion** avec email et mot de passe
- ✅ **Déconnexion** automatique
- ✅ **Gestion d'état** d'authentification globale
- ✅ **Protection des routes** basée sur l'authentification
- ✅ **Gestion des erreurs** d'authentification
- ✅ **Interface utilisateur** avec états de chargement

## 🚨 Sécurité

- Les clés API sont stockées dans des variables d'environnement
- Seule la clé `anon` est exposée côté client (sécurisée par Supabase)
- L'authentification est gérée par Supabase (JWT, sessions, etc.)

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide d'authentification](https://supabase.com/docs/guides/auth)
- [Variables d'environnement Vite](https://vitejs.dev/guide/env-and-mode.html)

## 🆘 Dépannage

### Erreur "Invalid API key"

- Vérifiez que vos variables d'environnement sont correctement définies
- Redémarrez votre serveur de développement

### Erreur "Email not confirmed"

- Vérifiez votre boîte email pour le lien de confirmation
- Ou désactivez la confirmation d'email dans Supabase (développement uniquement)

### Erreur CORS

- Vérifiez que votre URL de site est correctement configurée dans Supabase
- Assurez-vous que les URLs de redirection incluent votre domaine
