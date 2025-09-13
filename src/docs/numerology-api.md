# 🔧 API Documentation - Numerology Functions

## 📋 Vue d'ensemble

Ce document décrit les fonctions de calcul numérologique disponibles dans l'application Numora.

## 🛤️ `calculateLifePathNumber(dateString: string): number`

### **Description**

Calcule le Chemin de Vie en numérologie à partir de la date de naissance.

### **Paramètres**

- `dateString` (string) : Date de naissance au format "YYYY-MM-DD"

### **Valeur de retour**

- `number` : Le nombre du Chemin de Vie (1-9, 11, 22, ou 33)

### **Exemples**

```typescript
import { calculateLifePathNumber } from "../utils/numerology";

// Exemple 1: Date normale
const lifePath1 = calculateLifePathNumber("1990-03-15");
console.log(lifePath1); // 1

// Exemple 2: Date avec nombre maître
const lifePath2 = calculateLifePathNumber("1985-07-22");
console.log(lifePath2); // 7

// Exemple 3: Date avec nombre maître 11
const lifePath3 = calculateLifePathNumber("1992-11-11");
console.log(lifePath3); // 7
```

### **Logique de calcul**

1. **Extraction** : Supprime les tirets et convertit en tableau de chiffres
2. **Somme initiale** : Additionne tous les chiffres
3. **Réduction** : Continue à additionner jusqu'à obtenir 1-9 ou un nombre maître
4. **Nombres maîtres** : 11, 22, 33 ne sont pas réduits

### **Gestion d'erreurs**

```typescript
try {
  const result = calculateLifePathNumber("invalid-date");
} catch (error) {
  console.error(error.message); // "Format de date invalide. Utilisez 'YYYY-MM-DD'"
}
```

### **Cas d'erreur**

- Format de date invalide
- Caractères non numériques
- Date vide ou null

---

## 🎭 `calculateExpressionNumber(fullName: string): number`

### **Description**

Calcule le Nombre d'Expression en numérologie à partir du nom complet.

### **Paramètres**

- `fullName` (string) : Nom complet (prénoms + nom de famille)

### **Valeur de retour**

- `number` : Le nombre d'Expression (1-9, 11, 22, ou 33)

### **Exemples**

```typescript
import { calculateExpressionNumber } from "../utils/numerology";

// Exemple 1: Nom simple
const expression1 = calculateExpressionNumber("Marie Dupont");
console.log(expression1); // 9

// Exemple 2: Nom avec caractères spéciaux
const expression2 = calculateExpressionNumber("Jean-Pierre O'Connor");
console.log(expression2); // 8

// Exemple 3: Nom avec accents
const expression3 = calculateExpressionNumber("François Müller");
console.log(expression3); // 7
```

### **Logique de calcul**

1. **Normalisation** : Convertit en majuscules et supprime les caractères non alphabétiques
2. **Conversion** : Applique la correspondance lettres-chiffres
3. **Somme** : Additionne toutes les valeurs
4. **Réduction** : Continue jusqu'à obtenir 1-9 ou un nombre maître

### **Correspondance Lettres-Chiffres**

```typescript
const letterValues = {
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  G: 7,
  H: 8,
  I: 9,
  J: 1,
  K: 2,
  L: 3,
  M: 4,
  N: 5,
  O: 6,
  P: 7,
  Q: 8,
  R: 9,
  S: 1,
  T: 2,
  U: 3,
  V: 4,
  W: 5,
  X: 6,
  Y: 7,
  Z: 8,
};
```

### **Gestion d'erreurs**

```typescript
try {
  const result = calculateExpressionNumber("");
} catch (error) {
  console.error(error.message); // "Aucune lettre valide trouvée dans le nom"
}
```

### **Cas d'erreur**

- Nom vide ou null
- Aucune lettre valide trouvée
- Caractères non alphabétiques uniquement

---

## 🔄 Fonction de Réduction Commune

### **`reduceNumber(num: number): number`**

Fonction interne utilisée par les deux calculs principaux pour réduire un nombre à sa forme finale.

```typescript
const reduceNumber = (num: number): number => {
  // Nombres maîtres (ne pas réduire)
  if ([11, 22, 33].includes(num)) return num;

  // Nombres de base (1-9)
  if (num < 10) return num;

  // Réduction : additionner les chiffres du nombre
  const numDigits = num.toString().split("").map(Number);
  return reduceNumber(sumDigits(numDigits));
};
```

---

## 📊 Types TypeScript

```typescript
// Types pour les données numérologiques
export interface LifePathData {
  [key: string]: LifePathDetail;
}

export interface LifePathDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

export interface ExpressionData {
  [key: string]: ExpressionDetail;
}

export interface ExpressionDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}
```

---

## 🧪 Tests et Validation

### **Tests de validation**

```typescript
// Test Chemin de Vie
console.assert(calculateLifePathNumber("1990-03-15") === 1);
console.assert(calculateLifePathNumber("1985-07-22") === 7);
console.assert(calculateLifePathNumber("1992-11-11") === 7);

// Test Nombre d'Expression
console.assert(calculateExpressionNumber("Marie Dupont") === 9);
console.assert(calculateExpressionNumber("Jean Martin") === 5);
```

### **Tests d'erreur**

```typescript
// Test format invalide
try {
  calculateLifePathNumber("invalid-date");
  console.assert(false, "Devrait lever une erreur");
} catch (error) {
  console.assert(error.message.includes("Format de date invalide"));
}

// Test nom vide
try {
  calculateExpressionNumber("");
  console.assert(false, "Devrait lever une erreur");
} catch (error) {
  console.assert(error.message.includes("Aucune lettre valide"));
}
```

---

## 🚀 Utilisation dans l'Application

### **Intégration avec les données**

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
} from "../utils/numerology";
import { lifePathData, expressionData } from "../data";

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

### **Gestion des erreurs dans l'UI**

```typescript
const handleCalculation = (date: string, name: string) => {
  try {
    const lifePath = calculateLifePathNumber(date);
    const expression = calculateExpressionNumber(name);

    setResults({ lifePath, expression });
    setError(null);
  } catch (error) {
    setError(error.message);
    setResults(null);
  }
};
```

---

## 📝 Notes de Développement

### **Performance**

- Les fonctions sont optimisées pour des calculs rapides
- Pas de boucles infinies grâce à la récursion contrôlée
- Validation d'entrée pour éviter les erreurs

### **Maintenabilité**

- Code bien documenté avec JSDoc
- Types TypeScript pour la sécurité
- Gestion d'erreurs robuste
- Tests de validation inclus

### **Extensibilité**

- Structure modulaire pour ajouter de nouveaux calculs
- Types génériques pour les données
- Fonctions utilitaires réutilisables

---

_Cette documentation technique vous aide à comprendre et utiliser les fonctions numérologiques dans le développement de l'application Numora._
