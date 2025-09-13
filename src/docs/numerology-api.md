# 🔧 API Documentation - Numerology Functions

## 📋 Vue d'ensemble

Ce document décrit toutes les fonctions de calcul numérologique disponibles dans l'application Numora. Le module inclut maintenant 6 fonctions principales pour des calculs numérologiques complets.

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

## 💫 `calculateSoulUrgeNumber(fullName: string): number`

### **Description**

Calcule le Nombre de l'Âme en numérologie à partir des voyelles du nom complet.

### **Paramètres**

- `fullName` (string) : Nom complet (prénoms + nom de famille)

### **Valeur de retour**

- `number` : Le nombre de l'Âme (1-9, 11, 22, ou 33)

### **Exemples**

```typescript
import { calculateSoulUrgeNumber } from "../utils/numerology";

// Exemple 1: Nom simple
const soulUrge1 = calculateSoulUrgeNumber("Marie Dupont");
console.log(soulUrge1); // 6

// Exemple 2: Nom avec caractères spéciaux
const soulUrge2 = calculateSoulUrgeNumber("Jean-Pierre O'Connor");
console.log(soulUrge2); // 3
```

### **Logique de calcul**

1. **Extraction des voyelles** : Garde seulement les lettres A, E, I, O, U
2. **Conversion** : Applique la correspondance lettres-chiffres
3. **Somme** : Additionne toutes les valeurs des voyelles
4. **Réduction** : Continue jusqu'à obtenir 1-9 ou un nombre maître

---

## 🎭 `calculatePersonalityNumber(fullName: string): number`

### **Description**

Calcule le Nombre de Personnalité en numérologie à partir des consonnes du nom complet.

### **Paramètres**

- `fullName` (string) : Nom complet (prénoms + nom de famille)

### **Valeur de retour**

- `number` : Le nombre de Personnalité (1-9, 11, 22, ou 33)

### **Exemples**

```typescript
import { calculatePersonalityNumber } from "../utils/numerology";

// Exemple 1: Nom simple
const personality1 = calculatePersonalityNumber("Marie Dupont");
console.log(personality1); // 3

// Exemple 2: Nom avec caractères spéciaux
const personality2 = calculatePersonalityNumber("Jean-Pierre O'Connor");
console.log(personality2); // 5
```

### **Logique de calcul**

1. **Extraction des consonnes** : Supprime les voyelles et garde les consonnes
2. **Conversion** : Applique la correspondance lettres-chiffres
3. **Somme** : Additionne toutes les valeurs des consonnes
4. **Réduction** : Continue jusqu'à obtenir 1-9 ou un nombre maître

---

## 🎂 `calculateBirthdayNumber(day: number): number`

### **Description**

Calcule le Nombre du Jour de Naissance en numérologie.

### **Paramètres**

- `day` (number) : Jour de naissance (1-31)

### **Valeur de retour**

- `number` : Le nombre du Jour de Naissance (1-9)

### **Exemples**

```typescript
import { calculateBirthdayNumber } from "../utils/numerology";

// Exemple 1: Jour simple
const birthday1 = calculateBirthdayNumber(15);
console.log(birthday1); // 6

// Exemple 2: Jour à réduire
const birthday2 = calculateBirthdayNumber(29);
console.log(birthday2); // 2 (2+9=11, 1+1=2)
```

### **Logique de calcul**

1. **Validation** : Vérifie que le jour est entre 1 et 31
2. **Réduction** : Réduit le jour à un chiffre (1-9)

---

## ⚔️ `calculateChallengeNumbers(day: number, month: number, year: number): ChallengeNumbersResult`

### **Description**

Calcule les 4 nombres de défi numérologiques à partir de la date de naissance.

### **Paramètres**

- `day` (number) : Jour de naissance (1-31)
- `month` (number) : Mois de naissance (1-12)
- `year` (number) : Année de naissance (1900-2100)

### **Valeur de retour**

- `ChallengeNumbersResult` : Objet contenant les 4 défis avec leurs descriptions

### **Exemples**

```typescript
import { calculateChallengeNumbers } from "../utils/numerology";

// Exemple 1: Date normale
const challenges1 = calculateChallengeNumbers(15, 3, 1990);
console.log(challenges1.first.number); // 3
console.log(challenges1.first.description); // "Défi de jeunesse (0-30 ans): ..."

// Exemple 2: Date avec défis différents
const challenges2 = calculateChallengeNumbers(22, 7, 1985);
console.log(challenges2.fourth.number); // 2
```

### **Logique de calcul**

1. **Validation** : Vérifie les paramètres de date
2. **Réduction** : Réduit jour, mois et année à des chiffres
3. **Calcul des défis** : Calcule 4 défis avec valeurs absolues
4. **Réduction finale** : Réduit tous les défis à 1-9

### **Structure du résultat**

```typescript
interface ChallengeNumbersResult {
  first: { number: number; description: string }; // Défi de jeunesse (0-30 ans)
  second: { number: number; description: string }; // Défi de maturité (30-60 ans)
  third: { number: number; description: string }; // Défi de sagesse (60+ ans)
  fourth: { number: number; description: string }; // Défi principal
}
```

---

## 🔄 Fonctions Utilitaires

### **`reduceToSingleDigit(num: number): number`**

Fonction interne utilisée par tous les calculs pour réduire un nombre à sa forme finale.

```typescript
function reduceToSingleDigit(num: number): number {
  // Nombres maîtres (ne pas réduire)
  if ([11, 22, 33].includes(num)) return num;

  // Nombres de base (1-9)
  if (num < 10) return num;

  // Réduction : additionner les chiffres du nombre
  const digits = num.toString().split("").map(Number);
  const sum = digits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(sum);
}
```

### **`getLetterValue(letter: string): number`**

Fonction utilitaire pour obtenir la valeur numérologique d'une lettre.

```typescript
function getLetterValue(letter: string): number {
  const LETTER_VALUES = {
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
  return LETTER_VALUES[letter] || 0;
}
```

### **`getChallengeDescription(challengeNumber: number): string`**

Fonction utilitaire pour obtenir la description détaillée d'un défi à partir des données JSON.

```typescript
// Import des données de défi
import challengeData from "../data/numerology/ChallengeData.json";

function getChallengeDescription(challengeNumber: number): string {
  const challengeInfo =
    challengeData[challengeNumber.toString() as keyof typeof challengeData];
  return challengeInfo?.description || "Défi inconnu";
}
```

**Fonctionnalités :**

- **Données externes** : Utilise les descriptions détaillées du fichier `ChallengeData.json`
- **Typage strict** : Accès sécurisé avec vérification TypeScript
- **Fallback** : Retourne "Défi inconnu" si le numéro n'existe pas
- **Descriptions enrichies** : Descriptions complètes au lieu de versions courtes

---

## 📊 Types TypeScript

```typescript
// Types pour les résultats de défis
export interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

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

export interface ChallengeData {
  [key: string]: ChallengeDetail;
}

export interface ChallengeDetail {
  description: string;
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

// Test Nombre de l'Âme
console.assert(calculateSoulUrgeNumber("Marie Dupont") === 6);
console.assert(calculateSoulUrgeNumber("Jean Martin") === 3);

// Test Nombre de Personnalité
console.assert(calculatePersonalityNumber("Marie Dupont") === 3);
console.assert(calculatePersonalityNumber("Jean Martin") === 2);

// Test Nombre du Jour de Naissance
console.assert(calculateBirthdayNumber(15) === 6);
console.assert(calculateBirthdayNumber(29) === 2);

// Test Nombres de Défi
const challenges = calculateChallengeNumbers(15, 3, 1990);
console.assert(challenges.first.number >= 1 && challenges.first.number <= 9);
console.assert(challenges.fourth.number >= 1 && challenges.fourth.number <= 9);
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
const personality = calculatePersonalityNumber("Marie Dupont");
const birthday = calculateBirthdayNumber(15);
const challenges = calculateChallengeNumbers(15, 3, 1990);

// Récupérer les informations
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];
const challengeInfo = challengeData[challenges.fourth.number.toString()];

// Afficher les résultats
console.log(`Chemin de Vie ${lifePath}: ${lifePathInfo.title}`);
console.log(`Expression ${expression}: ${expressionInfo.title}`);
console.log(`Âme ${soulUrge}: Motivations profondes`);
console.log(`Personnalité ${personality}: Image extérieure`);
console.log(`Jour de Naissance ${birthday}: Talents naturels`);
console.log(
  `Défi principal ${challenges.fourth.number}: ${challengeInfo.description}`
);

// Les descriptions de défi sont automatiquement chargées depuis ChallengeData.json
console.log(`Défi de jeunesse: ${challenges.first.description}`);
console.log(`Défi de maturité: ${challenges.second.description}`);
console.log(`Défi de sagesse: ${challenges.third.description}`);
```

**Note importante :** Les descriptions des défis sont automatiquement chargées depuis le fichier `ChallengeData.json` et incluent des descriptions détaillées et enrichies pour chaque numéro de défi.

### **Gestion des erreurs dans l'UI**

```typescript
const handleCalculation = (date: string, name: string) => {
  try {
    // Calculs complets
    const lifePath = calculateLifePathNumber(date);
    const expression = calculateExpressionNumber(name);
    const soulUrge = calculateSoulUrgeNumber(name);
    const personality = calculatePersonalityNumber(name);

    // Extraction du jour pour les calculs supplémentaires
    const day = parseInt(date.split("-")[2]);
    const birthday = calculateBirthdayNumber(day);
    const challenges = calculateChallengeNumbers(
      day,
      parseInt(date.split("-")[1]),
      parseInt(date.split("-")[0])
    );

    setResults({
      lifePath,
      expression,
      soulUrge,
      personality,
      birthday,
      challenges,
    });
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
- **Données externes** : Descriptions des défis chargées depuis `ChallengeData.json`
- **Séparation des données** : Logique de calcul séparée du contenu textuel

### **Extensibilité**

- Structure modulaire pour ajouter de nouveaux calculs
- Types génériques pour les données
- Fonctions utilitaires réutilisables

---

_Cette documentation technique vous aide à comprendre et utiliser les fonctions numérologiques dans le développement de l'application Numora._
