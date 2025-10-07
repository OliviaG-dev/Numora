# 🔮 Numora - Documentation Technique des Utilitaires

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── Header/         # En-tête de navigation
│   ├── HomeSection/    # Section d'accueil
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
│   ├── numerology/     # Calculs numérologiques
│   │   ├── index.ts    # Point d'entrée avec tous les exports
│   │   ├── types.ts    # Types TypeScript
│   │   ├── core.ts     # Calculs de base (Chemin de Vie, Expression, etc.)
│   │   ├── business.ts # Calculs business
│   │   ├── challenges.ts # Défis, Cycles, Périodes de réalisation
│   │   ├── karmic.ts   # Nombres karmiques, Dettes karmiques
│   │   ├── personal.ts # Dates personnelles (Année/Mois/Jour)
│   │   └── utils.ts    # Fonctions utilitaires communes
│   └── matrixDestiny/  # Calculs Matrix Destiny
│       ├── matrixDestiny.ts      # Calculs principaux (méthode traditionnelle)
│       ├── matrixRelations.ts    # Relations du cœur
│       ├── getMatrixMeaning.ts   # Significations des domaines spéciaux
│       ├── getBaseNumberMeaning.ts
│       ├── getCentralMissionMeaning.ts
│       ├── getExternalRelationsMeaning.ts
│       ├── getFeminineLineMeaning.ts
│       └── getMasculineLineMeaning.ts
├── data/               # Données JSON
│   ├── numerology/     # Données numérologiques
│   │   ├── Basique/    # Données de base
│   │   ├── Dates/      # Données de dates
│   │   ├── Karmique/   # Données karmiques
│   │   ├── DateBusiness/ # Données business dates
│   │   └── NameBusiness/ # Données business noms
│   ├── matrixDestiny/  # Données Matrix Destiny
│   │   ├── baseNumber.json
│   │   ├── centralMission.json
│   │   ├── externalRelations.json
│   │   ├── feminineLine.json
│   │   ├── masculineLine.json
│   │   ├── matrixMoneyLove.json
│   │   └── matrixRelationsHeart.json
│   └── index.ts        # Exports centralisés
├── lib/                # Bibliothèques externes
│   └── supabase.ts     # Client Supabase et authentification
├── config/             # Configuration
│   └── supabase.ts     # Configuration Supabase
├── contexts/           # Contextes React
│   └── AuthContext.tsx # Contexte d'authentification
├── docs/               # Documentation
│   ├── numerology-guide.md        # Guide utilisateur
│   ├── numerology-api.md          # Documentation API
│   ├── fonctionsdoc.md            # Documentation des fonctions (CE FICHIER)
│   ├── matrix-destiny-methods.md  # Méthodes Matrix Destiny
│   ├── matrix-destiny-traditional.md
│   ├── matrix-destiny-technical.md
│   ├── matrix-destiny-features.md
│   ├── matrix-destiny-calculations.md
│   ├── supabase-auth.md
│   ├── SUPABASE_SETUP.md
│   └── README.md                  # Index de la documentation
└── README.md           # Documentation générale
```

---

# 📚 Documentation des Utilitaires

## 🔢 Module: `utils/numerology`

Ce module contient tous les calculs numérologiques de base, organisés en fichiers spécialisés.

### 📦 Point d'entrée: `index.ts`

Exporte toutes les fonctions et types du module numerology. Utiliser ce fichier pour importer les fonctions:

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateKarmicDebts,
  // ... etc
} from "@/utils/numerology";
```

---

## 🎯 Module: `core.ts` - Calculs de Base

### `calculateLifePathNumber(dateString: string, reduce?: boolean): number`

Calcule le Chemin de Vie à partir de la date de naissance.

**Paramètres:**

- `dateString`: Date au format "YYYY-MM-DD"
- `reduce`: Si false, retourne la valeur brute avant réduction (défaut: true)

**Retour:** Nombre du Chemin de Vie (1-9, 11, 22, 33)

**Exemple :**

```typescript
import { calculateLifePathNumber } from "@/utils/numerology";

const lifePath = calculateLifePathNumber("1990-03-15"); // Retourne 1
const lifePathRaw = calculateLifePathNumber("1990-03-15", false); // Retourne 28
```

---

### `calculateExpressionNumber(fullName: string, reduce?: boolean): number`

Calcule le Nombre d'Expression à partir du nom complet.

**Paramètres:**

- `fullName`: Nom complet (prénoms + nom de famille)
- `reduce`: Si false, retourne la valeur brute avant réduction (défaut: true)

**Retour:** Nombre d'Expression (1-9, 11, 22, 33)

**Note:** Normalise automatiquement les caractères accentués (é → e, à → a, etc.)

**Exemple :**

```typescript
import { calculateExpressionNumber } from "@/utils/numerology";

const expression = calculateExpressionNumber("Marie Dupont"); // Retourne 9
const expression2 = calculateExpressionNumber("Marie Désiré"); // Même résultat que "Marie Desire"
const expressionRaw = calculateExpressionNumber("Marie Dupont", false); // Retourne 54
```

---

### `calculateSoulUrgeNumber(fullName: string, reduce?: boolean): number`

Calcule le Nombre de l'Âme (voyelles du nom complet).

**Paramètres:**

- `fullName`: Nom complet
- `reduce`: Si false, retourne la valeur brute avant réduction (défaut: true)

**Retour:** Nombre de l'Âme (1-9, 11, 22, 33)

**Exemple :**

```typescript
import { calculateSoulUrgeNumber } from "@/utils/numerology";

const soulUrge = calculateSoulUrgeNumber("Marie Dupont"); // Retourne 5
```

---

### `calculatePersonalityNumber(fullName: string, reduce?: boolean): number`

Calcule le Nombre de Personnalité (consonnes du nom complet).

**Paramètres:**

- `fullName`: Nom complet
- `reduce`: Si false, retourne la valeur brute avant réduction (défaut: true)

**Retour:** Nombre de Personnalité (1-9, 11, 22, 33)

**Exemple :**

```typescript
import { calculatePersonalityNumber } from "@/utils/numerology";

const personality = calculatePersonalityNumber("Marie Dupont"); // Retourne 4
```

---

### `calculateBirthdayNumber(day: number): number`

Calcule le Nombre du Jour de Naissance.

**Paramètres:**

- `day`: Jour de naissance (1-31)

**Retour:** Nombre du Jour de Naissance (1-9)

**Exemple :**

```typescript
import { calculateBirthdayNumber } from "@/utils/numerology";

const birthday = calculateBirthdayNumber(15); // Retourne 6
```

---

## 🚧 Module: `challenges.ts` - Défis et Cycles

### `calculateChallengeNumbers(day: number, month: number, year: number): ChallengeNumbersResult`

Calcule les quatre nombres de défi (jeunesse, maturité, sagesse, principal).

**Paramètres:**

- `day`: Jour de naissance (1-31)
- `month`: Mois de naissance (1-12)
- `year`: Année de naissance

**Retour:** Objet contenant les 4 défis avec leurs descriptions

**Structure du retour:**

```typescript
{
  first: {
    number: number;
    description: string;
  }
  second: {
    number: number;
    description: string;
  }
  third: {
    number: number;
    description: string;
  }
  fourth: {
    number: number;
    description: string;
  }
}
```

**Exemple :**

```typescript
import { calculateChallengeNumbers } from "@/utils/numerology";

const challenges = calculateChallengeNumbers(15, 3, 1990);
// Retourne {
//   first: { number: 3, description: "..." },
//   second: { number: 5, description: "..." },
//   third: { number: 2, description: "..." },
//   fourth: { number: 2, description: "..." }
// }
```

---

### `calculateLifeCycles(day: number, month: number, year: number): LifeCyclesResult`

Calcule les trois cycles de vie numérologiques.

**Paramètres:**

- `day`: Jour de naissance (1-31)
- `month`: Mois de naissance (1-12)
- `year`: Année de naissance

**Retour:** Objet contenant les 3 cycles de vie

**Structure du retour:**

```typescript
{
  firstCycle: number; // Naissance → ~28 ans
  secondCycle: number; // 29 → ~56 ans
  thirdCycle: number; // 57 ans → fin de vie
}
```

**Exemple :**

```typescript
import { calculateLifeCycles } from "@/utils/numerology";

const cycles = calculateLifeCycles(15, 3, 1990);
// Retourne { firstCycle: 3, secondCycle: 6, thirdCycle: 1 }
```

---

### `calculateRealizationPeriods(day: number, month: number, year: number): RealizationPeriodsResult`

Calcule les quatre périodes de réalisation (pinacles).

**Paramètres:**

- `day`: Jour de naissance (1-31)
- `month`: Mois de naissance (1-12)
- `year`: Année de naissance

**Retour:** Objet contenant les 4 périodes de réalisation

**Structure du retour:**

```typescript
{
  firstPeriod: number; // jusqu'à ~30 ans
  secondPeriod: number; // 30 → 39 ans
  thirdPeriod: number; // 39 → 48 ans
  fourthPeriod: number; // 48 ans → fin de vie
}
```

**Exemple :**

```typescript
import { calculateRealizationPeriods } from "@/utils/numerology";

const periods = calculateRealizationPeriods(15, 3, 1990);
// Retourne { firstPeriod: 9, secondPeriod: 6, thirdPeriod: 6, fourthPeriod: 4 }
```

---

## 🔮 Module: `karmic.ts` - Analyses Karmiques

### `calculateKarmicNumbers(dateString: string): KarmicNumbersResult`

Calcule les nombres karmiques (chiffres manquants dans la date de naissance).

**Paramètres:**

- `dateString`: Date de naissance au format "YYYY-MM-DD"

**Retour:** Objet contenant les nombres présents, manquants et leurs définitions

**Structure du retour:**

```typescript
{
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  karmicDefinitions: Array<{
    number: number;
    summary: string;
    challenge: string;
    details: string;
    keywords: string[];
  }>;
}
```

**Exemple :**

```typescript
import { calculateKarmicNumbers } from "@/utils/numerology";

const karmicNumbers = calculateKarmicNumbers("1990-03-15");
// Retourne les chiffres manquants dans la date (ex: 4, 6, 7, 8)
```

---

### `calculateCycleKarmicNumbers(fullName: string): CycleKarmicNumbersResult`

Calcule les cycles karmiques (lettres manquantes dans le nom complet).

**Paramètres:**

- `fullName`: Nom complet

**Retour:** Objet contenant les nombres présents, manquants et leurs définitions

**Exemple :**

```typescript
import { calculateCycleKarmicNumbers } from "@/utils/numerology";

const cycleKarmic = calculateCycleKarmicNumbers("Marie Dupont");
// Retourne les nombres manquants dans le nom
```

---

### `checkKarmicDebt(value: number): KarmicDebtResult`

Vérifie si un nombre est une dette karmique (13, 14, 16, 19).

**Paramètres:**

- `value`: Nombre à tester (avant réduction)

**Retour:** Objet indiquant si c'est une dette karmique

**Structure du retour:**

```typescript
{
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}
```

**Exemple :**

```typescript
import { checkKarmicDebt } from "@/utils/numerology";

const debt = checkKarmicDebt(13);
// Retourne { number: 13, isKarmicDebt: true, karmicDebtType: 13 }

const noDebt = checkKarmicDebt(28);
// Retourne { number: 28, isKarmicDebt: false }
```

---

### `analyzeCoreNumbers(coreNumbers: number[]): KarmicDebtResult[]`

Analyse plusieurs nombres principaux pour détecter les dettes karmiques.

**Paramètres:**

- `coreNumbers`: Tableau de nombres à analyser (avant réduction)

**Retour:** Tableau de résultats pour chaque nombre

**Exemple :**

```typescript
import { analyzeCoreNumbers } from "@/utils/numerology";

const analysis = analyzeCoreNumbers([13, 28, 19, 45]);
// Retourne un tableau avec les résultats pour chaque nombre
```

---

### `calculateKarmicDebts(birthDate: string, fullName: string): KarmicDebtsResult`

Calcule les dettes karmiques pour un profil numérologique complet.

**Paramètres:**

- `birthDate`: Date de naissance au format "YYYY-MM-DD"
- `fullName`: Nom complet

**Retour:** Objet contenant les dettes karmiques de tous les nombres principaux

**Structure du retour:**

```typescript
{
  lifePathDebt: KarmicDebtResult;
  expressionDebt: KarmicDebtResult;
  soulUrgeDebt: KarmicDebtResult;
  personalityDebt: KarmicDebtResult;
  birthdayDebt: KarmicDebtResult;
  allDebts: KarmicDebtResult[];
}
```

**Exemple :**

```typescript
import { calculateKarmicDebts } from "@/utils/numerology";

const karmicDebts = calculateKarmicDebts("1990-03-15", "Marie Dupont");
// Analyse tous les nombres principaux pour les dettes karmiques

if (karmicDebts.lifePathDebt.isKarmicDebt) {
  console.log(
    `Dette karmique ${karmicDebts.lifePathDebt.karmicDebtType} détectée dans le Chemin de Vie`
  );
}
```

---

## 📅 Module: `personal.ts` - Dates Personnelles

### `calculatePersonalYear(day: number, month: number, year: number): number`

Calcule l'année personnelle.

**Paramètres:**

- `day`: Jour de naissance (1-31)
- `month`: Mois de naissance (1-12)
- `year`: Année en cours

**Retour:** Nombre de l'année personnelle (1-9)

**Exemple :**

```typescript
import { calculatePersonalYear } from "@/utils/numerology";

const personalYear = calculatePersonalYear(15, 3, 2024);
// Retourne le nombre de l'année personnelle pour 2024
```

---

### `calculatePersonalMonth(personalYear: number, month: number): number`

Calcule le mois personnel.

**Paramètres:**

- `personalYear`: Année personnelle calculée
- `month`: Mois en cours (1-12)

**Retour:** Nombre du mois personnel (1-9)

**Exemple :**

```typescript
import { calculatePersonalMonth } from "@/utils/numerology";

const personalMonth = calculatePersonalMonth(5, 10);
// Retourne le nombre du mois personnel
```

---

### `calculatePersonalDay(personalMonth: number, day: number): number`

Calcule le jour personnel.

**Paramètres:**

- `personalMonth`: Mois personnel calculé
- `day`: Jour en cours (1-31)

**Retour:** Nombre du jour personnel (1-9)

**Exemple :**

```typescript
import { calculatePersonalDay } from "@/utils/numerology";

const personalDay = calculatePersonalDay(7, 15);
// Retourne le nombre du jour personnel
```

---

### `calculatePersonalNumbers(birthDay: number, birthMonth: number, currentDate?: Date): PersonalNumbersResult`

Calcule tous les nombres personnels (année, mois, jour) en une seule fois.

**Paramètres:**

- `birthDay`: Jour de naissance (1-31)
- `birthMonth`: Mois de naissance (1-12)
- `currentDate`: Date actuelle (optionnelle, utilise la date du jour par défaut)

**Retour:** Objet contenant l'année, le mois et le jour personnels

**Structure du retour:**

```typescript
{
  year: {
    number: number;
    description: string;
  }
  month: {
    number: number;
    description: string;
  }
  day: {
    number: number;
    description: string;
  }
}
```

**Exemple :**

```typescript
import { calculatePersonalNumbers } from "@/utils/numerology";

const personalNumbers = calculatePersonalNumbers(15, 3);
// Retourne { year: {...}, month: {...}, day: {...} }

// Avec une date spécifique
const customDate = new Date("2024-12-25");
const personalNumbers2 = calculatePersonalNumbers(15, 3, customDate);
```

---

### `getDateVibration(date: Date, allowMaster?: boolean): number`

Calcule la vibration d'une date donnée.

**Paramètres:**

- `date`: Date à analyser
- `allowMaster`: Si true, préserve les nombres maîtres (11, 22, 33) (défaut: false)

**Retour:** Nombre de vibration de la date (1-9, ou 11, 22, 33 si allowMaster=true)

**Exemple :**

```typescript
import { getDateVibration } from "@/utils/numerology";

const vibe = getDateVibration(new Date("2026-02-14")); // Retourne 6
const vibeMaster = getDateVibration(new Date("2026-02-14"), true); // Retourne 6 ou nombre maître si applicable
```

---

## 💼 Module: `business.ts` - Calculs Business

### `calculateWordValue(word: string): number`

Calcule la valeur numérique d'un mot ou nom pour les analyses business.

**Paramètres:**

- `word`: Mot ou nom à analyser

**Retour:** Valeur numérique brute

**Exemple :**

```typescript
import { calculateWordValue } from "@/utils/numerology";

const value = calculateWordValue("Innovation"); // Retourne la somme des valeurs des lettres
```

---

### `calculateBusinessNumbers(fullName: string): BusinessNumbersResult`

Calcule les nombres business (Expression, Actif, Héréditaire).

**Paramètres:**

- `fullName`: Nom complet (prénom + nom ou nom d'entreprise)

**Retour:** Les trois nombres business avec leurs valeurs brutes et réduites

**Structure du retour:**

```typescript
{
  expression: {
    raw: number;
    value: number;
  } // Toutes les lettres
  active: {
    raw: number;
    value: number;
  } // Premier mot
  hereditary: {
    raw: number;
    value: number;
  } // Dernier mot
}
```

**Exemple :**

```typescript
import { calculateBusinessNumbers } from "@/utils/numerology";

const businessNumbers = calculateBusinessNumbers("Tech Innovations");
// Retourne {
//   expression: { raw: 185, value: 5 },
//   active: { raw: 48, value: 3 },
//   hereditary: { raw: 137, value: 2 }
// }
```

---

### `analyzeBusinessName(fullName: string): BusinessNameAnalysis`

Analyse complète d'un nom business avec les données associées.

**Paramètres:**

- `fullName`: Nom complet à analyser

**Retour:** Analyse complète avec les nombres et leurs descriptions

**Exemple :**

```typescript
import { analyzeBusinessName } from "@/utils/numerology";

const analysis = analyzeBusinessName("Tech Innovations");
// Retourne une analyse complète du nom d'entreprise
```

---

## 🛠️ Module: `utils.ts` - Utilitaires Communs

### `getLetterValue(letter: string): number`

Obtient la valeur numérologique d'une lettre (A=1, B=2, ..., I=9, J=1, etc.).

**Paramètres:**

- `letter`: Lettre à convertir (A-Z)

**Retour:** Valeur numérologique (1-9), ou 0 si la lettre est invalide

**Exemple :**

```typescript
import { getLetterValue } from "@/utils/numerology";

const value = getLetterValue("A"); // Retourne 1
const value2 = getLetterValue("M"); // Retourne 4
```

---

### `reduceToSingleDigit(num: number, allowMasterNumbers?: boolean): number`

Réduit un nombre à un chiffre ou nombre maître.

**Paramètres:**

- `num`: Nombre à réduire
- `allowMasterNumbers`: Si true, préserve les nombres maîtres (11, 22, 33) (défaut: true)

**Retour:** Nombre réduit (1-9, ou 11, 22, 33 si allowMasterNumbers=true)

**Exemple :**

```typescript
import { reduceToSingleDigit } from "@/utils/numerology";

const reduced = reduceToSingleDigit(28); // Retourne 1 (2+8=10, 1+0=1)
const master = reduceToSingleDigit(29); // Retourne 11 (2+9=11, nombre maître)
const noMaster = reduceToSingleDigit(29, false); // Retourne 2 (11 → 1+1=2)
```

---

### `normalizeName(name: string): string`

Normalise un nom en supprimant les accents et en mettant en majuscules.

**Paramètres:**

- `name`: Nom à normaliser

**Retour:** Nom normalisé (majuscules, sans accents)

**Exemple :**

```typescript
import { normalizeName } from "@/utils/numerology";

const normalized = normalizeName("Marie Désiré"); // Retourne "MARIE DESIRE"
const normalized2 = normalizeName("François"); // Retourne "FRANCOIS"
```

---

### Fonctions de Validation

#### `validateDateString(dateString: string): void`

Valide le format d'une date (YYYY-MM-DD).

**Throws:** Error si le format est invalide

```typescript
import { validateDateString } from "@/utils/numerology";

validateDateString("1990-03-15"); // OK
validateDateString("15/03/1990"); // Erreur: Format invalide
```

---

#### `validateName(name: string): void`

Valide qu'un nom n'est pas vide.

**Throws:** Error si le nom est vide

```typescript
import { validateName } from "@/utils/numerology";

validateName("Marie"); // OK
validateName(""); // Erreur: Le nom ne peut pas être vide
```

---

#### `validateDay(day: number): void`

Valide un jour de naissance (1-31).

**Throws:** Error si le jour est invalide

```typescript
import { validateDay } from "@/utils/numerology";

validateDay(15); // OK
validateDay(32); // Erreur: Le jour doit être entre 1 et 31
```

---

#### `validateMonth(month: number): void`

Valide un mois (1-12).

**Throws:** Error si le mois est invalide

```typescript
import { validateMonth } from "@/utils/numerology";

validateMonth(3); // OK
validateMonth(13); // Erreur: Le mois doit être entre 1 et 12
```

---

#### `validateYear(year: number): void`

Valide une année (1900-2100).

**Throws:** Error si l'année est invalide

```typescript
import { validateYear } from "@/utils/numerology";

validateYear(1990); // OK
validateYear(1800); // Erreur: L'année doit être entre 1900 et 2100
```

---

## 🔮 Module: `utils/matrixDestiny`

Ce module contient tous les calculs pour la Matrix Destiny selon la méthode traditionnelle.

### 📦 Point d'entrée: `matrixDestiny.ts`

#### `calculateMatrixDestiny(day: number, month: number, year: number): MatrixDestiny`

Calcule la Matrix Destiny complète selon la méthode traditionnelle.

**Paramètres:**

- `day`: Jour de naissance (1-31)
- `month`: Mois de naissance (1-12)
- `year`: Année de naissance

**Retour:** Objet MatrixDestiny complet avec tous les calculs

**Structure du retour:**

```typescript
{
  base: {
    day: number;
    month: number;
    year: number;
    lifeMission: number;
  };
  center: {
    mission: number;
    maleLine: { dayMonth: number; mission: number; dayYear: number };
    femaleLine: { monthYear: number; mission: number; monthDay: number };
  };
  chakras: Record<string, { physique: number; energy: number; emotions: number }>;
  cycles: Record<string, number>;
  special: { love: number; money: number; balance: number };
  commonEnergyZone: { physics: number; energy: number; emotions: number };
  heartLine: { physique: number; energy: number; emotions: number };
  karmicLines: { ... };
  externalRelations: { personalPower: number; socialInfluence: number };
}
```

**Exemple :**

```typescript
import { calculateMatrixDestiny } from "@/utils/matrixDestiny/matrixDestiny";

const matrix = calculateMatrixDestiny(15, 3, 1990);
// Retourne la Matrix Destiny complète

console.log(matrix.base.lifeMission); // Mission de vie
console.log(matrix.special.love); // Domaine de l'amour
console.log(matrix.chakras.anahata); // Chakra du cœur
```

---

### 📖 Module: `getMatrixMeaning.ts`

#### `getMatrixMeaning(number: number, category: "love" | "money" | "pivot"): string`

Récupère la signification d'un nombre pour une catégorie de la Matrix Destiny.

**Paramètres:**

- `number`: Le nombre (1-22)
- `category`: "love" (Amour), "money" (Argent), ou "pivot" (Balance)

**Retour:** Signification du nombre pour la catégorie

**Exemple :**

```typescript
import { getMatrixMeaning } from "@/utils/matrixDestiny/getMatrixMeaning";

const loveMeaning = getMatrixMeaning(7, "love");
// Retourne la signification du nombre 7 pour l'amour

const moneyMeaning = getMatrixMeaning(7, "money");
// Retourne la signification du nombre 7 pour l'argent
```

---

### 💝 Module: `matrixRelations.ts`

#### `getRelationMeaning(number: number, type: "interior" | "exterior"): string`

Récupère la signification d'un nombre pour les relations du cœur.

**Paramètres:**

- `number`: Le nombre (1-22)
- `type`: "interior" (Relations intérieures) ou "exterior" (Relations extérieures)

**Retour:** Signification du nombre pour le type de relation

**Exemple :**

```typescript
import { getRelationMeaning } from "@/utils/matrixDestiny/matrixRelations";

const interiorMeaning = getRelationMeaning(10, "interior");
// Retourne la signification du nombre 10 pour les relations intérieures

const exteriorMeaning = getRelationMeaning(10, "exterior");
// Retourne la signification du nombre 10 pour les relations extérieures
```

---

### 📚 Autres Modules de Significations

Les modules suivants fournissent des significations détaillées pour différents aspects de la Matrix Destiny:

- `getBaseNumberMeaning.ts`: Significations des nombres de base
- `getCentralMissionMeaning.ts`: Significations de la mission centrale
- `getExternalRelationsMeaning.ts`: Significations des relations extérieures
- `getFeminineLineMeaning.ts`: Significations de la ligne féminine
- `getMasculineLineMeaning.ts`: Significations de la ligne masculine

**Usage similaire:**

```typescript
import { getBaseNumberMeaning } from "@/utils/matrixDestiny/getBaseNumberMeaning";
import { getCentralMissionMeaning } from "@/utils/matrixDestiny/getCentralMissionMeaning";
// ... etc

const baseMeaning = getBaseNumberMeaning(5);
const centralMeaning = getCentralMissionMeaning(7);
```

---

---

# 📝 Types TypeScript

## Module: `utils/numerology/types.ts`

Ce module contient tous les types TypeScript utilisés dans les calculs numérologiques.

### Types de Base

```typescript
// Chaînes représentant les nombres numérologiques
type NumerologyNumber = string; // "1" à "9", "11", "22", "33"

type NumerologyKey =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "11"
  | "22"
  | "33";
```

### Types pour les Résultats

```typescript
// Résultat des défis numérologiques
interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

// Résultat des nombres karmiques
interface KarmicNumberResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

interface KarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  karmicDefinitions: KarmicNumberResult[];
}

// Résultat des cycles karmiques
interface CycleKarmicResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

interface CycleKarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  cycleKarmicDefinitions: CycleKarmicResult[];
}

// Dette karmique
interface KarmicDebtResult {
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}

type KarmicDebtType = 13 | 14 | 16 | 19;

// Nombres business
interface BusinessNumbersResult {
  expression: { raw: number; value: number };
  active: { raw: number; value: number };
  hereditary: { raw: number; value: number };
}

interface BusinessNameAnalysis {
  fullName: string;
  numbers: BusinessNumbersResult;
  expression: { number: number; raw: number };
  active: { number: number; raw: number };
  hereditary: { number: number; raw: number };
}

// Nombres personnels
interface PersonalNumbersResult {
  year: { number: number; description: string };
  month: { number: number; description: string };
  day: { number: number; description: string };
}

// Cycles de vie
interface LifeCyclesResult {
  firstCycle: number; // Naissance → ~28 ans
  secondCycle: number; // 29 → ~56 ans
  thirdCycle: number; // 57 ans → fin de vie
}

// Périodes de réalisation
interface RealizationPeriodsResult {
  firstPeriod: number; // jusqu'à ~30 ans
  secondPeriod: number; // 30 → 39 ans
  thirdPeriod: number; // 39 → 48 ans
  fourthPeriod: number; // 48 ans → fin de vie
}
```

### Types Matrix Destiny

```typescript
interface MatrixDestiny {
  base: {
    day: number;
    month: number;
    year: number;
    lifeMission: number;
  };
  center: {
    mission: number;
    maleLine: {
      dayMonth: number;
      mission: number;
      dayYear: number;
    };
    femaleLine: {
      monthYear: number;
      mission: number;
      monthDay: number;
    };
  };
  chakras: Record<
    string,
    {
      physique: number;
      energy: number;
      emotions: number;
    }
  >;
  cycles: Record<string, number>;
  special: {
    love: number;
    money: number;
    balance: number;
  };
  commonEnergyZone?: {
    physics: number;
    energy: number;
    emotions: number;
  };
  heartLine?: {
    physique: number;
    energy: number;
    emotions: number;
  };
  karmicLines: {
    financialKarmicTail: { primary: number; secondary: number };
    karmicLife: { primary: number; secondary: number };
    talentZone: { primary: number; secondary: number };
    socialConnection: number;
    parents: { primary: number; secondary: number };
    feminineAncestry: {
      primary: number;
      secondary: number;
      tertiary: number;
      quaternary: number;
    };
    masculineAncestry: {
      primary: number;
      secondary: number;
      tertiary: number;
      quaternary: number;
    };
  };
  externalRelations: {
    personalPower: number;
    socialInfluence: number;
  };
}

type MatrixCategory = "love" | "money" | "pivot";
type RelationType = "interior" | "exterior";
```

---

# 🚀 Exemples d'Utilisation Complets

## Exemple 1: Profil Numérologique Complet

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
  calculateLifeCycles,
  calculateRealizationPeriods,
  calculateKarmicDebts,
  calculatePersonalNumbers,
} from "@/utils/numerology";

// Données de l'utilisateur
const birthDate = "1990-03-15";
const fullName = "Marie Dupont";
const birthDay = 15;
const birthMonth = 3;
const birthYear = 1990;

// Calculs de base
const lifePath = calculateLifePathNumber(birthDate);
const expression = calculateExpressionNumber(fullName);
const soulUrge = calculateSoulUrgeNumber(fullName);
const personality = calculatePersonalityNumber(fullName);
const birthday = calculateBirthdayNumber(birthDay);

// Défis et cycles
const challenges = calculateChallengeNumbers(birthDay, birthMonth, birthYear);
const lifeCycles = calculateLifeCycles(birthDay, birthMonth, birthYear);
const realizationPeriods = calculateRealizationPeriods(
  birthDay,
  birthMonth,
  birthYear
);

// Analyses karmiques
const karmicDebts = calculateKarmicDebts(birthDate, fullName);

// Nombres personnels
const personalNumbers = calculatePersonalNumbers(birthDay, birthMonth);

// Affichage des résultats
console.log("=== PROFIL NUMÉROLOGIQUE ===");
console.log(`Nom: ${fullName}`);
console.log(`Date de naissance: ${birthDate}`);
console.log("\n--- Nombres de Base ---");
console.log(`Chemin de Vie: ${lifePath}`);
console.log(`Expression: ${expression}`);
console.log(`Âme: ${soulUrge}`);
console.log(`Personnalité: ${personality}`);
console.log(`Jour de Naissance: ${birthday}`);

console.log("\n--- Dettes Karmiques ---");
if (karmicDebts.lifePathDebt.isKarmicDebt) {
  console.log(
    `Dette karmique détectée: ${karmicDebts.lifePathDebt.karmicDebtType}`
  );
}

console.log("\n--- Nombres Personnels (Aujourd'hui) ---");
console.log(`Année personnelle: ${personalNumbers.year.number}`);
console.log(`Mois personnel: ${personalNumbers.month.number}`);
console.log(`Jour personnel: ${personalNumbers.day.number}`);
```

---

## Exemple 2: Analyse Business

```typescript
import {
  calculateBusinessNumbers,
  analyzeBusinessName,
} from "@/utils/numerology";

const companyName = "Tech Innovations Sarl";

// Calcul des nombres business
const businessNumbers = calculateBusinessNumbers(companyName);

console.log("=== ANALYSE BUSINESS ===");
console.log(`Nom de l'entreprise: ${companyName}`);
console.log("\n--- Nombres Business ---");
console.log(
  `Expression: ${businessNumbers.expression.value} (brut: ${businessNumbers.expression.raw})`
);
console.log(
  `Actif: ${businessNumbers.active.value} (brut: ${businessNumbers.active.raw})`
);
console.log(
  `Héréditaire: ${businessNumbers.hereditary.value} (brut: ${businessNumbers.hereditary.raw})`
);

// Analyse complète
const analysis = analyzeBusinessName(companyName);
console.log("\n--- Analyse Complète ---");
console.log(analysis);
```

---

## Exemple 3: Matrix Destiny

```typescript
import { calculateMatrixDestiny } from "@/utils/matrixDestiny/matrixDestiny";
import { getMatrixMeaning } from "@/utils/matrixDestiny/getMatrixMeaning";
import { getRelationMeaning } from "@/utils/matrixDestiny/matrixRelations";

const day = 15;
const month = 3;
const year = 1990;

// Calcul de la Matrix Destiny complète
const matrix = calculateMatrixDestiny(day, month, year);

console.log("=== MATRIX DESTINY ===");
console.log(`Date de naissance: ${day}/${month}/${year}`);
console.log("\n--- Nombres de Base ---");
console.log(`Jour: ${matrix.base.day}`);
console.log(`Mois: ${matrix.base.month}`);
console.log(`Année: ${matrix.base.year}`);
console.log(`Mission de Vie: ${matrix.base.lifeMission}`);

console.log("\n--- Centre de la Matrix ---");
console.log(`Mission Centrale: ${matrix.center.mission}`);
console.log(
  `Ligne Masculine: ${matrix.center.maleLine.dayMonth} - ${matrix.center.maleLine.mission} - ${matrix.center.maleLine.dayYear}`
);
console.log(
  `Ligne Féminine: ${matrix.center.femaleLine.monthYear} - ${matrix.center.femaleLine.mission} - ${matrix.center.femaleLine.monthDay}`
);

console.log("\n--- Domaines Spéciaux ---");
console.log(`Amour: ${matrix.special.love}`);
console.log(getMatrixMeaning(matrix.special.love, "love"));
console.log(`\nArgent: ${matrix.special.money}`);
console.log(getMatrixMeaning(matrix.special.money, "money"));
console.log(`\nBalance: ${matrix.special.balance}`);
console.log(getMatrixMeaning(matrix.special.balance, "pivot"));

console.log("\n--- Ligne du Cœur ---");
if (matrix.heartLine) {
  console.log(`Physique: ${matrix.heartLine.physique}`);
  console.log(getRelationMeaning(matrix.heartLine.physique, "interior"));
  console.log(`\nÉnergie: ${matrix.heartLine.energy}`);
  console.log(getRelationMeaning(matrix.heartLine.energy, "exterior"));
}

console.log("\n--- Chakras ---");
Object.entries(matrix.chakras).forEach(([name, values]) => {
  console.log(
    `${name}: Physique=${values.physique}, Énergie=${values.energy}, Émotions=${values.emotions}`
  );
});
```

---

## Exemple 4: Validation et Gestion d'Erreurs

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  validateDateString,
  validateName,
} from "@/utils/numerology";

try {
  // Validation de la date
  const birthDate = "1990-03-15";
  validateDateString(birthDate);

  const lifePath = calculateLifePathNumber(birthDate);
  console.log(`Chemin de Vie: ${lifePath}`);
} catch (error) {
  console.error("Erreur de date:", error.message);
}

try {
  // Validation du nom
  const fullName = "Marie Dupont";
  validateName(fullName);

  const expression = calculateExpressionNumber(fullName);
  console.log(`Expression: ${expression}`);
} catch (error) {
  console.error("Erreur de nom:", error.message);
}

// Gestion d'erreurs avec dates invalides
try {
  calculateLifePathNumber("15/03/1990"); // Format incorrect
} catch (error) {
  console.error("Format invalide:", error.message);
  // Erreur: Format de date invalide. Utilisez "YYYY-MM-DD"
}

// Gestion d'erreurs avec nom vide
try {
  calculateExpressionNumber(""); // Nom vide
} catch (error) {
  console.error("Nom invalide:", error.message);
  // Erreur: Le nom ne peut pas être vide
}
```

---

## Exemple 5: Utilisation des Utilitaires

```typescript
import {
  getLetterValue,
  reduceToSingleDigit,
  normalizeName,
  LETTER_VALUES,
  MASTER_NUMBERS,
} from "@/utils/numerology";

// Valeurs des lettres
console.log("=== VALEURS DES LETTRES ===");
console.log(`A = ${getLetterValue("A")}`); // 1
console.log(`M = ${getLetterValue("M")}`); // 4
console.log(`Z = ${getLetterValue("Z")}`); // 8

// Réduction de nombres
console.log("\n=== RÉDUCTION DE NOMBRES ===");
console.log(`28 → ${reduceToSingleDigit(28)}`); // 1 (2+8=10, 1+0=1)
console.log(`29 → ${reduceToSingleDigit(29)}`); // 11 (nombre maître)
console.log(`29 (sans maître) → ${reduceToSingleDigit(29, false)}`); // 2

// Normalisation de noms
console.log("\n=== NORMALISATION ===");
console.log(`"Marie Désiré" → "${normalizeName("Marie Désiré")}"`); // "MARIE DESIRE"
console.log(`"François" → "${normalizeName("François")}"`); // "FRANCOIS"

// Constantes
console.log("\n=== CONSTANTES ===");
console.log("Nombres Maîtres:", MASTER_NUMBERS); // [11, 22, 33]
console.log("Table de conversion:", LETTER_VALUES);
```

---

# 📊 Index des Fonctions par Catégorie

## Calculs de Base

- `calculateLifePathNumber()` - Chemin de vie
- `calculateExpressionNumber()` - Expression
- `calculateSoulUrgeNumber()` - Âme
- `calculatePersonalityNumber()` - Personnalité
- `calculateBirthdayNumber()` - Jour de naissance

## Défis et Cycles

- `calculateChallengeNumbers()` - 4 nombres de défi
- `calculateLifeCycles()` - 3 cycles de vie
- `calculateRealizationPeriods()` - 4 périodes de réalisation

## Analyses Karmiques

- `calculateKarmicNumbers()` - Nombres karmiques (chiffres manquants)
- `calculateCycleKarmicNumbers()` - Cycles karmiques (lettres manquantes)
- `checkKarmicDebt()` - Vérification dette karmique
- `analyzeCoreNumbers()` - Analyse de plusieurs nombres
- `calculateKarmicDebts()` - Dettes karmiques complètes

## Dates Personnelles

- `calculatePersonalYear()` - Année personnelle
- `calculatePersonalMonth()` - Mois personnel
- `calculatePersonalDay()` - Jour personnel
- `calculatePersonalNumbers()` - Tous les nombres personnels
- `getDateVibration()` - Vibration d'une date

## Calculs Business

- `calculateWordValue()` - Valeur d'un mot
- `calculateBusinessNumbers()` - Expression, Actif, Héréditaire
- `analyzeBusinessName()` - Analyse complète

## Matrix Destiny

- `calculateMatrixDestiny()` - Calcul complet de la Matrix
- `getMatrixMeaning()` - Significations (love, money, pivot)
- `getRelationMeaning()` - Relations du cœur (interior, exterior)
- `getBaseNumberMeaning()` - Nombres de base
- `getCentralMissionMeaning()` - Mission centrale
- `getExternalRelationsMeaning()` - Relations extérieures
- `getFeminineLineMeaning()` - Ligne féminine
- `getMasculineLineMeaning()` - Ligne masculine

## Utilitaires

- `getLetterValue()` - Valeur d'une lettre
- `reduceToSingleDigit()` - Réduction de nombre
- `normalizeName()` - Normalisation de nom
- `validateDateString()` - Validation de date
- `validateName()` - Validation de nom
- `validateDay()` - Validation de jour
- `validateMonth()` - Validation de mois
- `validateYear()` - Validation d'année

---

# 🔑 Constantes Disponibles

```typescript
// Valeurs numérologiques des lettres
LETTER_VALUES = {
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

// Nombres maîtres (non réduits)
MASTER_NUMBERS = [11, 22, 33];

// Dettes karmiques reconnues
KARMIC_DEBT_NUMBERS = [13, 14, 16, 19];
```

---

# ✅ Bonnes Pratiques

## 1. Imports

Toujours importer depuis le point d'entrée principal:

```typescript
// ✅ BON
import { calculateLifePathNumber } from "@/utils/numerology";

// ❌ ÉVITER
import { calculateLifePathNumber } from "@/utils/numerology/core";
```

## 2. Gestion d'Erreurs

Toujours entourer les appels de try/catch:

```typescript
try {
  const lifePath = calculateLifePathNumber(birthDate);
  // Utiliser le résultat
} catch (error) {
  console.error("Erreur de calcul:", error.message);
  // Gérer l'erreur proprement
}
```

## 3. Validation

Valider les entrées avant les calculs:

```typescript
// Valider avant de calculer
validateDateString(birthDate);
validateName(fullName);

const lifePath = calculateLifePathNumber(birthDate);
const expression = calculateExpressionNumber(fullName);
```

## 4. Types TypeScript

Utiliser les types exportés pour une meilleure sécurité de type:

```typescript
import type {
  KarmicDebtResult,
  BusinessNumbersResult,
  PersonalNumbersResult,
} from "@/utils/numerology";

const karmicDebts: KarmicDebtResult = calculateKarmicDebts(birthDate, fullName);
```

## 5. Paramètres Optionnels

Profiter des paramètres `reduce` pour obtenir les valeurs brutes:

```typescript
// Valeur réduite (défaut)
const lifePath = calculateLifePathNumber("1990-03-15"); // 1

// Valeur brute (avant réduction)
const lifePathRaw = calculateLifePathNumber("1990-03-15", false); // 28

// Utile pour détecter les dettes karmiques
if (
  lifePathRaw === 13 ||
  lifePathRaw === 14 ||
  lifePathRaw === 16 ||
  lifePathRaw === 19
) {
  console.log("Dette karmique détectée!");
}
```

---

# 📚 Documentation Complémentaire

Pour plus d'informations, consultez:

- **[Numerology API](./numerology-api.md)** - Documentation technique complète
- **[Numerology Guide](./numerology-guide.md)** - Guide utilisateur
- **[Matrix Destiny Methods](./matrix-destiny-methods.md)** - Méthodes de calcul Matrix
- **[Matrix Destiny Technical](./matrix-destiny-technical.md)** - Implémentation technique
- **[Supabase Auth](./supabase-auth.md)** - Authentification
- **[README](./README.md)** - Index général de la documentation

---

_Documentation mise à jour - Décembre 2024_
