# 📚 Documentation Numora

## 📖 Guide de Numérologie

- **[Guide de Numérologie](./numerology-guide.md)** - Explication complète des 6 calculs numérologiques principaux avec exemples et applications pratiques

## 🔧 Documentation Technique

- **[API Documentation](./numerology-api.md)** - Documentation technique complète des 6 fonctions de calcul numérologique avec intégration des données JSON

## 🎯 Utilisation

### Pour les Utilisateurs

Consultez le [Guide de Numérologie](./numerology-guide.md) pour comprendre :

- **🛤️ Chemin de Vie** - Mission de vie et destinée
- **🎭 Nombre d'Expression** - Talents et potentiel
- **💫 Nombre de l'Âme** - Motivations profondes
- **🎭 Nombre de Personnalité** - Image extérieure
- **🎂 Jour de Naissance** - Talents naturels
- **⚔️ Nombres de Défi** - Leçons de vie par périodes
- Comment interpréter vos résultats complets

### Pour les Développeurs

Consultez l'[API Documentation](./numerology-api.md) pour :

- Utiliser les 6 fonctions de calcul numérologique
- Comprendre la logique de calcul pour chaque nombre
- Gérer les erreurs et validation
- Intégrer avec les données JSON (LifePathData, ExpressionData, ChallengeData)
- Utiliser les descriptions enrichies des défis

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

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
} from "../utils/numerology";
import { lifePathData, expressionData, challengeData } from "../data";

// Calculer tous les nombres
const lifePath = calculateLifePathNumber("1990-03-15");
const expression = calculateExpressionNumber("Marie Dupont");
const soulUrge = calculateSoulUrgeNumber("Marie Dupont");
const challenges = calculateChallengeNumbers(15, 3, 1990);

// Récupérer les informations (descriptions de défis automatiquement enrichies)
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];
const challengeInfo = challengeData[challenges.fourth.number.toString()];
```

---

_Documentation pour l'application Numora - Votre compagnon numérique de numérologie_ 🔮✨
