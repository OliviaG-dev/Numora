# 🔮 Numora - Documentation du Code

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
├── pages/              # Pages de l'application
├── utils/              # Fonctions utilitaires
│   └── numerology.ts   # Calculs numérologiques
├── data/               # Données JSON
│   ├── numerology/     # Données numérologiques
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

Calcule le Nombre d'Expression à partir du nom complet.

**Exemple :**

```typescript
import { calculateExpressionNumber } from "./utils/numerology";

const expression = calculateExpressionNumber("Marie Dupont"); // Retourne 9
```

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
