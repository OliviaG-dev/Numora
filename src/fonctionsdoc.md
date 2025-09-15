# 🔮 Numora - Documentation du Code

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Header/         # En-tête de navigation
│   ├── HeroSection/    # Section d'accueil
│   ├── LoginSection/   # Formulaire de connexion
│   ├── SignupSection/  # Formulaire d'inscription
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
│   └── numerology.ts   # Calculs numérologiques
├── data/               # Données JSON
│   ├── numerology/     # Données numérologiques
│   │   ├── LifePathData.json
│   │   ├── ExpressionNumberData.json
│   │   ├── ChallengeData.json
│   │   ├── SoulUrgeData.json
│   │   ├── PersonalityData.json
│   │   └── BirthdayData.json
│   └── index.ts        # Exports centralisés
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

## 🎨 Composants Principaux

### `ReadingDetailSection`

Composant principal pour l'affichage détaillé des lectures numérologiques.

**Fonctionnalités :**

- Affichage des informations personnelles
- Calculs automatiques de tous les nombres
- Tooltips explicatifs pour chaque section
- Design responsive et harmonieux
- Animations et effets visuels

**Sections incluses :**

- Chemin de Vie (avec tooltip)
- Nombre d'Expression (avec tooltip)
- Nombres Personnels (Âme, Personnalité, Jour)
- Nombres de Défi (avec tooltips)

### `NewReadingSection`

Composant pour la création de nouvelles lectures.

**Fonctionnalités :**

- Formulaire de saisie des données
- Validation des champs
- Gestion des états de connexion
- Messages d'avertissement pour les utilisateurs non connectés

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

## 🚀 Utilisation Complète

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
} from "./utils/numerology";
import { lifePathData, expressionData } from "./data";

// Calculer les nombres
const lifePath = calculateLifePathNumber("1990-03-15");
const expression = calculateExpressionNumber("Marie Dupont");

// Récupérer les informations
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];

// Afficher les résultats
console.log(`Chemin de Vie ${lifePath}: ${lifePathInfo.title}`);
console.log(`Expression ${expression}: ${expressionInfo.title}`);
```

## 📚 Documentation

- **[Guide de Numérologie](./docs/numerology-guide.md)** - Explication des concepts
- **[API Documentation](./docs/numerology-api.md)** - Documentation technique
- **[Exemples d'Utilisation](./examples/README.md)** - Exemples pratiques

## 🆕 Nouvelles Fonctionnalités

### Normalisation des Caractères Accentués

**Problème résolu :** Les caractères accentués (é, è, à, etc.) sont maintenant normalisés automatiquement dans tous les calculs numérologiques.

**Impact :** "Désiré" et "desire" donnent maintenant le même résultat.

### Tooltips Explicatifs

**Ajouté :** Des tooltips informatifs pour toutes les sections principales :

- Chemin de Vie
- Nombre d'Expression
- Nombres Personnels (Âme, Personnalité, Jour)
- Nombres de Défi

### Design Harmonisé

**Améliorations :**

- Layout horizontal pour les Nombres Personnels
- Cartes de défis avec design cohérent
- Couleurs harmonisées (doré, violet, ambre)
- Suppression des effets hover pour un design plus sobre

### Page ReadingDetail

**Nouvelle page :** Affichage complet des lectures numérologiques avec :

- Informations personnelles
- Tous les calculs numérologiques
- Design responsive et élégant
- Navigation fluide

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

### 3. Génération de Rapport

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

## 🚀 Intégration

### React Component

```typescript
import React, { useState } from "react";
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
} from "../utils/numerology";
import { lifePathData, expressionData } from "../data";

const NumerologyCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    try {
      const lifePath = calculateLifePathNumber(birthDate);
      const expression = calculateExpressionNumber(fullName);

      setResults({
        lifePath: { number: lifePath, info: lifePathData[lifePath.toString()] },
        expression: {
          number: expression,
          info: expressionData[expression.toString()],
        },
      });
    } catch (error) {
      console.error("Erreur:", error.message);
    }
  };

  return <div>{/* Interface utilisateur */}</div>;
};
```

---

_Documentation pour l'application Numora - Votre compagnon numérique de numérologie_ 🔮✨
