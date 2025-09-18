# 🔐 Documentation Authentification Supabase

## 📋 Vue d'ensemble

Ce document décrit l'intégration de l'authentification Supabase dans l'application Numora. Le système d'authentification permet aux utilisateurs de s'inscrire, se connecter et gérer leurs sessions de manière sécurisée.

## 🏗️ Architecture

### Structure des Fichiers

```
src/
├── config/
│   └── supabase.ts          # Configuration Supabase
├── lib/
│   └── supabase.ts          # Client Supabase et fonctions d'auth
├── contexts/
│   └── AuthContext.tsx      # Contexte d'authentification React
└── components/
    ├── LoginSection/        # Composant de connexion
    └── SignupSection/       # Composant d'inscription
```

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Configuration Supabase

```typescript
// src/config/supabase.ts
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};
```

## 🔧 Client Supabase

### Initialisation

```typescript
// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config/supabase";

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);
```

### Types TypeScript

```typescript
export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface AuthError {
  message: string;
  status?: number;
}
```

## 🔐 Fonctions d'Authentification

### Inscription

```typescript
async signUp(email: string, password: string, userData?: { full_name?: string }) {
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
        message: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      }
    };
  }
}
```

### Connexion

```typescript
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
        message: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      }
    };
  }
}
```

### Déconnexion

```typescript
async signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error: unknown) {
    return {
      error: {
        message: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      }
    };
  }
}
```

### Récupération de l'Utilisateur Actuel

```typescript
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
        message: error instanceof Error ? error.message : 'Une erreur inattendue s\'est produite'
      }
    };
  }
}
```

### Écoute des Changements d'État

```typescript
onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback((session?.user as User) || null);
  });
}
```

## 🎯 Contexte React

### AuthContext

```typescript
// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, User, AuthError } from "../lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (
    email: string,
    password: string,
    userData?: { full_name?: string }
  ) => Promise<{ data: any; error: AuthError | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  // ... autres fonctions

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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
};
```

### Intégration dans l'Application

```typescript
// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
```

## 🎨 Composants d'Authentification

### Composant de Connexion

```typescript
// src/components/LoginSection/LoginSection.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const LoginSection: React.FC<LoginSectionProps> = ({ onNavigate }) => {
  const { signIn, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await signIn(formData.email, formData.password);

      if (error) {
        setErrors({ general: error.message });
      } else {
        console.log("Connexion réussie:", data);
        onNavigate("home");
      }
    } catch (error: unknown) {
      setErrors({ general: "Erreur de connexion. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleLogin}>{/* Interface de connexion */}</form>;
};
```

### Composant d'Inscription

```typescript
// src/components/SignupSection/SignupSection.tsx
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const SignupSection: React.FC<SignupSectionProps> = ({ onNavigate }) => {
  const { signUp, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const { data, error } = await signUp(formData.email, formData.password, {
        full_name: fullName,
      });

      if (error) {
        setErrors({ general: error.message });
      } else {
        console.log("Inscription réussie:", data);
        onNavigate("login");
      }
    } catch (error: unknown) {
      setErrors({ general: "Erreur d'inscription. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  return <form onSubmit={handleSubmit}>{/* Interface d'inscription */}</form>;
};
```

## 🛡️ Protection des Routes

### Composant Protégé

```typescript
import { useAuth } from "../contexts/AuthContext";

const ProtectedComponent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter pour accéder à cette page</div>;
  }

  return <div>Contenu protégé</div>;
};
```

### Utilisation dans les Composants

```typescript
const MyComponent = () => {
  const { isAuthenticated, user, signOut } = useAuth();

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenue, {user?.email}!</p>
          <button onClick={signOut}>Déconnexion</button>
        </div>
      ) : (
        <div>
          <p>Veuillez vous connecter</p>
        </div>
      )}
    </div>
  );
};
```

## 🔧 Gestion des Erreurs

### Types d'Erreurs

```typescript
interface AuthError {
  message: string;
  status?: number;
}
```

### Gestion des Erreurs dans les Composants

```typescript
const handleAuth = async () => {
  try {
    const { data, error } = await signIn(email, password);

    if (error) {
      // Afficher l'erreur à l'utilisateur
      setErrors({ general: error.message });
    } else {
      // Succès
      console.log("Authentification réussie:", data);
    }
  } catch (error: unknown) {
    // Erreur inattendue
    setErrors({ general: "Une erreur inattendue s'est produite" });
  }
};
```

## 🚀 Déploiement

### Variables d'Environnement en Production

1. **Supabase Dashboard** : Récupérez vos clés API
2. **Variables d'environnement** : Configurez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`
3. **Redémarrage** : Redémarrez votre application

### Configuration Supabase

1. **Site URL** : Configurez l'URL de votre application
2. **Redirect URLs** : Ajoutez les URLs de redirection
3. **Email Templates** : Personnalisez les emails d'authentification

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide d'authentification](https://supabase.com/docs/guides/auth)
- [Variables d'environnement Vite](https://vitejs.dev/guide/env-and-mode.html)

---

_Documentation d'authentification pour l'application Numora_ 🔐✨
