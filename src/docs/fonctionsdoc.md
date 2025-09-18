# 🔮 Numora - Documentation du Code

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Header/         # En-tête de navigation
│   ├── HeroSection/    # Section d'accueil
│   ├── LoginSection/   # Formulaire de connexion (Supabase)
│   ├── SignupSection/  # Formulaire d'inscription (Supabase)
│   ├── NewReadingSection/ # Création de nouvelles lectures
│   ├── ReadingDetailSection/ # Affichage détaillé des lectures
│   ├── ReadingsSection/ # Liste des lectures
│   ├── ProfileSection/ # Profil utilisateur
│   ├── SettingsSection/ # Paramètres
│   └── NumerologyBackground/ # Arrière-plan numérologique
├── pages/              # Pages de l'application
│   ├── Home/           # Page d'accueil
│   ├── Login/          # Page de connexion
│   ├── Signup/         # Page d'inscription
│   ├── NewReading/     # Page de création de lecture
│   ├── ReadingDetail/  # Page de détail de lecture
│   ├── Readings/       # Page des lectures
│   ├── Profile/        # Page de profil
│   └── Settings/       # Page des paramètres
├── utils/              # Fonctions utilitaires
│   └── numerology.ts   # Calculs numérologiques + Dettes karmiques
├── data/               # Données JSON
│   ├── numerology/     # Données numérologiques
│   │   ├── LifePathData.json
│   │   ├── ExpressionNumberData.json
│   │   ├── ChallengeData.json
│   │   ├── SoulUrgeData.json
│   │   ├── PersonalityData.json
│   │   ├── BirthdayData.json
│   │   ├── KarmicNumberData.json
│   │   ├── CycleKarmicData.json
│   │   └── KarmicDebtsData.json
│   └── index.ts        # Exports centralisés
├── lib/                # Bibliothèques externes
│   └── supabase.ts     # Client Supabase et authentification
├── config/             # Configuration
│   └── supabase.ts     # Configuration Supabase
├── contexts/           # Contextes React
│   └── AuthContext.tsx # Contexte d'authentification
├── docs/               # Documentation
│   ├── numerology-guide.md    # Guide utilisateur
│   ├── numerology-api.md      # Documentation technique
│   └── README.md              # Index de la documentation
├── examples/           # Exemples d'utilisation
│   ├── numerology-example.ts  # Exemples pratiques
│   └── README.md              # Guide des exemples
└── README.md           # Ce fichier
```

## 🔧 Fonctions Principales

### `calculateLifePathNumber(dateString: string): number`

Calcule le Chemin de Vie à partir de la date de naissance.

**Exemple :**

```typescript
import { calculateLifePathNumber } from "./utils/numerology";

const lifePath = calculateLifePathNumber("1990-03-15"); // Retourne 1
```

### `calculateExpressionNumber(fullName: string): number`

Calcule le Nombre d'Expression à partir du nom complet. **Mise à jour :** Normalise automatiquement les caractères accentués.

**Exemple :**

```typescript
import { calculateExpressionNumber } from "./utils/numerology";

const expression = calculateExpressionNumber("Marie Dupont"); // Retourne 9
const expression2 = calculateExpressionNumber("Marie Désiré"); // Même résultat que "Marie Desire"
```

### `calculateSoulUrgeNumber(fullName: string): number`

Calcule le Nombre de l'Âme (voyelles du nom complet).

**Exemple :**

```typescript
import { calculateSoulUrgeNumber } from "./utils/numerology";

const soulUrge = calculateSoulUrgeNumber("Marie Dupont"); // Retourne 5
```

### `calculatePersonalityNumber(fullName: string): number`

Calcule le Nombre de Personnalité (consonnes du nom complet).

**Exemple :**

```typescript
import { calculatePersonalityNumber } from "./utils/numerology";

const personality = calculatePersonalityNumber("Marie Dupont"); // Retourne 4
```

### `calculateBirthdayNumber(day: number): number`

Calcule le Nombre du Jour de Naissance.

**Exemple :**

```typescript
import { calculateBirthdayNumber } from "./utils/numerology";

const birthday = calculateBirthdayNumber(15); // Retourne 6
```

### `calculateChallengeNumbers(day: number, month: number, year: number): ChallengeNumbersResult`

Calcule les quatre nombres de défi (jeunesse, maturité, sagesse, principal).

**Exemple :**

```typescript
import { calculateChallengeNumbers } from "./utils/numerology";

const challenges = calculateChallengeNumbers(15, 3, 1990);
// Retourne { first: {...}, second: {...}, third: {...}, fourth: {...} }
```

### `calculateKarmicNumbers(fullName: string): KarmicNumbersResult`

Calcule les nombres karmiques à partir du nom complet.

**Exemple :**

```typescript
import { calculateKarmicNumbers } from "./utils/numerology";

const karmicNumbers = calculateKarmicNumbers("Marie Dupont");
// Retourne { karmicNumbers: [...], hasKarmicNumbers: boolean }
```

### `calculateCycleKarmicNumbers(birthDate: string): CycleKarmicNumbersResult`

Calcule les nombres karmiques des cycles de vie.

**Exemple :**

```typescript
import { calculateCycleKarmicNumbers } from "./utils/numerology";

const cycleKarmic = calculateCycleKarmicNumbers("1990-03-15");
// Retourne { firstCycle: {...}, secondCycle: {...}, thirdCycle: {...} }
```

### `calculateKarmicDebts(birthDate: string, fullName: string): KarmicDebtResult`

Calcule les dettes karmiques pour un profil numérologique complet.

**Exemple :**

```typescript
import { calculateKarmicDebts } from "./utils/numerology";

const karmicDebts = calculateKarmicDebts("1990-03-15", "Marie Dupont");
// Retourne { lifePathDebt: {...}, expressionDebt: {...}, soulUrgeDebt: {...}, ... }
```

## 🎨 Composants Principaux

### `ReadingDetailSection`

Composant principal pour l'affichage détaillé des lectures numérologiques.

**Fonctionnalités :**

- Affichage des informations personnelles
- Calculs automatiques de tous les nombres
- Tooltips explicatifs pour chaque section
- Design responsive et harmonieux
- Animations et effets visuels
- **Nouveau :** Authentification Supabase intégrée
- **Nouveau :** Sections Karmiques (Nombres karmiques, Cycles karmiques, Dettes karmiques)
- **Nouveau :** Accordéons exclusifs (un seul ouvert à la fois)

**Sections incluses :**

- **Basiques :** Chemin de Vie, Expression, Personnels (Âme, Personnalité, Jour)
- **Dates :** Jour de naissance, Défis, Cycles de vie, Périodes de réalisation
- **Karmique :** Nombres karmiques, Cycles karmiques, Dettes karmiques
- **Matrix Destiny :** Matrice de destinée
- **Arbre de Vie :** Arbre de vie numérologique

### `NewReadingSection`

Composant pour la création de nouvelles lectures.

**Fonctionnalités :**

- Formulaire de saisie des données
- Validation des champs
- Gestion des états de connexion
- Messages d'avertissement pour les utilisateurs non connectés

### `LoginSection` & `SignupSection`

Composants d'authentification intégrés avec Supabase.

**Fonctionnalités :**

- **Inscription** avec email et mot de passe
- **Connexion** sécurisée
- **Gestion d'erreurs** avec messages utilisateur
- **États de chargement** pendant les opérations
- **Validation** des formulaires
- **Redirection** automatique après authentification

### `AuthContext`

Contexte React pour la gestion globale de l'authentification.

**Fonctionnalités :**

- **État global** de l'utilisateur connecté
- **Fonctions d'authentification** (signUp, signIn, signOut)
- **Écoute des changements** d'état d'authentification
- **Gestion des sessions** Supabase
- **Protection des routes** basée sur l'authentification

## 📊 Données Disponibles

### Chemin de Vie

```typescript
import { lifePathData } from "./data";

const info = lifePathData["1"]; // Informations pour le Chemin de Vie 1
console.log(info.title); // "Le Leader"
```

### Nombre d'Expression

```typescript
import { expressionData } from "./data";

const info = expressionData["9"]; // Informations pour l'Expression 9
console.log(info.title); // "L'Humaniste"
```

### Nombres Karmiques

```typescript
import { karmicNumberData } from "./data";

const info = karmicNumberData["13"]; // Informations pour le nombre karmique 13
console.log(info.title); // "Le Travailleur"
```

### Cycles Karmiques

```typescript
import { cycleKarmicData } from "./data";

const info = cycleKarmicData["13"]; // Informations pour le cycle karmique 13
console.log(info.title); // "Le Travailleur"
```

### Dettes Karmiques

```typescript
import { karmicDebtsData } from "./data";

const info = karmicDebtsData["13"]; // Informations pour la dette karmique 13
console.log(info.summary); // "Dette karmique du travail et de la discipline"
```

## 🚀 Utilisation Complète

### Calculs Numérologiques de Base

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
} from "./utils/numerology";
import { lifePathData, expressionData } from "./data";

// Calculer les nombres
const lifePath = calculateLifePathNumber("1990-03-15");
const expression = calculateExpressionNumber("Marie Dupont");
const soulUrge = calculateSoulUrgeNumber("Marie Dupont");
const personality = calculatePersonalityNumber("Marie Dupont");
const birthday = calculateBirthdayNumber(15);
const challenges = calculateChallengeNumbers(15, 3, 1990);

// Récupérer les informations
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];

// Afficher les résultats
console.log(`Chemin de Vie ${lifePath}: ${lifePathInfo.title}`);
console.log(`Expression ${expression}: ${expressionInfo.title}`);
```

### Calculs Karmiques

```typescript
import {
  calculateKarmicNumbers,
  calculateCycleKarmicNumbers,
  calculateKarmicDebts,
} from "./utils/numerology";
import { karmicNumberData, cycleKarmicData, karmicDebtsData } from "./data";

// Calculer les nombres karmiques
const karmicNumbers = calculateKarmicNumbers("Marie Dupont");
const cycleKarmic = calculateCycleKarmicNumbers("1990-03-15");
const karmicDebts = calculateKarmicDebts("1990-03-15", "Marie Dupont");

// Analyser les dettes karmiques
if (karmicDebts.lifePathDebt.isKarmicDebt) {
  const debtInfo =
    karmicDebtsData[karmicDebts.lifePathDebt.karmicDebtType!.toString()];
  console.log(`Dette karmique détectée: ${debtInfo.summary}`);
}
```

### Authentification Supabase

```typescript
import { useAuth } from "./contexts/AuthContext";

const MyComponent = () => {
  const { user, isAuthenticated, signIn, signOut } = useAuth();

  const handleLogin = async () => {
    const { data, error } = await signIn("user@example.com", "password");
    if (error) {
      console.error("Erreur de connexion:", error.message);
    } else {
      console.log("Connexion réussie:", data);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Bienvenue, {user?.email}!</p>
          <button onClick={signOut}>Déconnexion</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Connexion</button>
      )}
    </div>
  );
};
```

## 📚 Documentation

- **[Guide de Numérologie](./docs/numerology-guide.md)** - Explication des concepts
- **[API Documentation](./docs/numerology-api.md)** - Documentation technique
- **[Exemples d'Utilisation](./examples/README.md)** - Exemples pratiques

## 🆕 Nouvelles Fonctionnalités

### 🔐 Authentification Supabase

**Ajouté :** Système d'authentification complet avec Supabase :

- **Inscription** et **connexion** sécurisées
- **Gestion des sessions** automatique
- **Protection des routes** basée sur l'authentification
- **Contexte React** global pour l'état utilisateur
- **Gestion d'erreurs** robuste avec messages utilisateur

### 🔮 Dettes Karmiques

**Nouvelle fonctionnalité :** Calcul et analyse des dettes karmiques :

- **Détection automatique** des dettes karmiques (13, 14, 16, 19)
- **Analyse complète** des nombres principaux
- **Descriptions détaillées** des leçons à apprendre
- **Interface dédiée** dans l'onglet "Karmique"

### 🎭 Sections Karmiques

**Ajouté :** Trois nouvelles sections dans l'onglet "Karmique" :

- **Nombres Karmiques** : Analyse des nombres karmiques du nom
- **Cycles Karmiques** : Nombres karmiques des cycles de vie
- **Dettes Karmiques** : Détection et analyse des dettes karmiques

### 🎨 Interface Améliorée

**Améliorations :**

- **Accordéons exclusifs** : Un seul accordéon ouvert à la fois
- **Tooltips informatifs** pour toutes les sections
- **Design harmonisé** avec largeur fixe (1200px) et responsive
- **Navigation par onglets** améliorée
- **États de chargement** pour l'authentification

### 📊 Données Enrichies

**Ajouté :** Nouvelles données JSON :

- `KarmicNumberData.json` : Descriptions des nombres karmiques
- `CycleKarmicData.json` : Descriptions des cycles karmiques
- `KarmicDebtsData.json` : Descriptions des dettes karmiques

### 🔧 Fonctions Étendues

**Nouvelles fonctions :**

- `calculateKarmicNumbers()` : Calcul des nombres karmiques
- `calculateCycleKarmicNumbers()` : Calcul des cycles karmiques
- `calculateKarmicDebts()` : Calcul des dettes karmiques
- `checkKarmicDebt()` : Vérification d'une dette karmique
- `analyzeCoreNumbers()` : Analyse des nombres principaux

### 🛡️ Sécurité Renforcée

**Améliorations :**

- **Variables d'environnement** pour les clés API
- **Gestion d'erreurs** TypeScript robuste
- **Validation** des formulaires d'authentification
- **Sessions sécurisées** avec Supabase

## 🧪 Tests

```typescript
import { runExamples } from "./examples/numerology-example";

// Exécuter tous les exemples
runExamples();
```

## 🔍 Validation

Les fonctions incluent une validation complète :

- Format de date correct (YYYY-MM-DD)
- Nom non vide avec au moins une lettre
- Gestion des erreurs avec messages explicites

## 📝 Types TypeScript

### Types de Base

```typescript
interface LifePathDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

interface ExpressionNumberDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

interface SoulUrgeData {
  [key: string]: string[];
}

interface PersonalityData {
  [key: string]: string[];
}

interface BirthdayData {
  [key: string]: string[];
}

interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}
```

### Types Karmiques

```typescript
interface KarmicNumberDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

interface CycleKarmicDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

interface KarmicDebtDetail {
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

interface KarmicDebtResult {
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}

interface KarmicNumbersResult {
  karmicNumbers: Array<{
    number: number;
    isKarmic: boolean;
    karmicType?: 13 | 14 | 16 | 19;
  }>;
  hasKarmicNumbers: boolean;
}

interface CycleKarmicNumbersResult {
  firstCycle: {
    number: number;
    isKarmic: boolean;
    karmicType?: 13 | 14 | 16 | 19;
  };
  secondCycle: {
    number: number;
    isKarmic: boolean;
    karmicType?: 13 | 14 | 16 | 19;
  };
  thirdCycle: {
    number: number;
    isKarmic: boolean;
    karmicType?: 13 | 14 | 16 | 19;
  };
}
```

### Types d'Authentification

```typescript
interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
  };
}

interface AuthError {
  message: string;
  status?: number;
}

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
```

## 🎯 Cas d'Usage

### 1. Calcul Simple

```typescript
const lifePath = calculateLifePathNumber("1990-03-15");
const expression = calculateExpressionNumber("Marie Dupont");
```

### 2. Analyse Complète

```typescript
import { calculateNumerologyAnalysis } from "./examples/numerology-example";

const results = calculateNumerologyAnalysis("1990-03-15", "Marie Dupont");
```

### 3. Analyse Karmique

```typescript
// Analyser les dettes karmiques
const karmicDebts = calculateKarmicDebts("1990-03-15", "Marie Dupont");

if (karmicDebts.lifePathDebt.isKarmicDebt) {
  console.log(
    `Dette karmique détectée dans le Chemin de Vie: ${karmicDebts.lifePathDebt.karmicDebtType}`
  );
}

// Analyser les nombres karmiques
const karmicNumbers = calculateKarmicNumbers("Marie Dupont");
if (karmicNumbers.hasKarmicNumbers) {
  console.log("Nombres karmiques détectés dans le nom");
}
```

### 4. Authentification Utilisateur

```typescript
import { useAuth } from "./contexts/AuthContext";

const ProtectedComponent = () => {
  const { isAuthenticated, user, signOut } = useAuth();

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter</div>;
  }

  return (
    <div>
      <h1>Bienvenue, {user?.email}</h1>
      <button onClick={signOut}>Déconnexion</button>
    </div>
  );
};
```

### 5. Génération de Rapport

```typescript
import { generateNumerologyReport } from "./examples/numerology-example";

const htmlReport = generateNumerologyReport("1990-03-15", "Marie Dupont");
```

## 🔮 Concepts Clés

### Chemin de Vie

- **Source** : Date de naissance
- **Révèle** : Mission de vie, leçons à apprendre
- **Nature** : Destinée, karma

### Nombre d'Expression

- **Source** : Nom complet
- **Révèle** : Talents naturels, potentiel
- **Nature** : Capacités innées

### Nombres Karmiques

- **Source** : Nom complet (avant réduction)
- **Révèle** : Leçons karmiques à apprendre
- **Nature** : Dettes du passé à résoudre
- **Nombres** : 13, 14, 16, 19

### Dettes Karmiques

- **Source** : Nombres principaux (avant réduction)
- **Révèle** : Défis spécifiques liés au karma
- **Nature** : Leçons importantes de cette vie
- **Types** : 13 (travail), 14 (liberté), 16 (ego), 19 (indépendance)

## 📊 Exemples de Calculs

### Chemin de Vie

```
Date : 15/03/1990
1 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 28
28 → 2 + 8 = 10
10 → 1 + 0 = 1
Résultat : 1 (Le Leader)
```

### Nombre d'Expression

```
Nom : MARIE DUPONT
M(4) + A(1) + R(9) + I(9) + E(5) + D(4) + U(3) + P(7) + O(6) + N(5) + T(2) = 54
54 → 5 + 4 = 9
Résultat : 9 (L'Humaniste)
```

### Dette Karmique

```
Chemin de Vie (avant réduction) : 28
28 n'est pas une dette karmique (13, 14, 16, 19)
Résultat : Pas de dette karmique

Expression (avant réduction) : 54
54 n'est pas une dette karmique
Résultat : Pas de dette karmique

Exemple avec dette karmique :
Chemin de Vie : 13
13 est une dette karmique
Résultat : Dette karmique 13 (Le Travailleur)
```

## 🚀 Intégration

### React Component avec Authentification

```typescript
import React, { useState } from "react";
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateKarmicDebts,
} from "../utils/numerology";
import { lifePathData, expressionData, karmicDebtsData } from "../data";
import { useAuth } from "../contexts/AuthContext";

const NumerologyCalculator = () => {
  const { isAuthenticated, user } = useAuth();
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    try {
      const lifePath = calculateLifePathNumber(birthDate);
      const expression = calculateExpressionNumber(fullName);
      const karmicDebts = calculateKarmicDebts(birthDate, fullName);

      setResults({
        lifePath: { number: lifePath, info: lifePathData[lifePath.toString()] },
        expression: {
          number: expression,
          info: expressionData[expression.toString()],
        },
        karmicDebts: karmicDebts,
      });
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  if (!isAuthenticated) {
    return <div>Veuillez vous connecter pour utiliser le calculateur</div>;
  }

  return (
    <div>
      <h1>Calculateur Numérologique</h1>
      <p>Bienvenue, {user?.email}</p>
      {/* Interface utilisateur */}
    </div>
  );
};
```

### Configuration Supabase

```typescript
// src/config/supabase.ts
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
};

// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config/supabase";

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);
```

---

_Documentation pour l'application Numora - Votre compagnon numérique de numérologie_ 🔮✨
