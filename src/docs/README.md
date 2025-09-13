# 📚 Documentation Numora

## 📖 Guide de Numérologie

- **[Guide de Numérologie](./numerology-guide.md)** - Explication complète des concepts numérologiques, différences entre Chemin de Vie et Nombre d'Expression

## 🔧 Documentation Technique

- **[API Documentation](./numerology-api.md)** - Documentation technique des fonctions de calcul numérologique

## 🎯 Utilisation

### Pour les Utilisateurs

Consultez le [Guide de Numérologie](./numerology-guide.md) pour comprendre :

- Qu'est-ce que le Chemin de Vie
- Qu'est-ce que le Nombre d'Expression
- Les différences entre les deux
- Comment interpréter vos résultats

### Pour les Développeurs

Consultez l'[API Documentation](./numerology-api.md) pour :

- Utiliser les fonctions de calcul
- Comprendre la logique de calcul
- Gérer les erreurs
- Intégrer avec les données

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
} from "../utils/numerology";
import { lifePathData, expressionData } from "../data";

// Calculer
const lifePath = calculateLifePathNumber("1990-03-15");
const expression = calculateExpressionNumber("Marie Dupont");

// Récupérer les informations
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];
```

---

_Documentation pour l'application Numora - Votre compagnon numérique de numérologie_ 🔮✨
