# Matrix Destiny - Documentation Technique

## Vue d'ensemble

Cette documentation technique décrit l'implémentation de la méthode Grabovoi pour le calcul de la Matrix Destiny dans l'application Numora.

## Architecture

### Fichiers principaux

- `src/utils/matrixDestiny/matrixDestiny.ts` - Logique de calcul principale
- `src/utils/matrixDestiny/matrixRelations.ts` - Relations du cœur
- `src/utils/matrixDestiny/getMatrixMeaning.ts` - Significations des domaines spéciaux
- `src/components/ReadingDetailSection/tabs/MatrixTab.tsx` - Interface utilisateur
- `src/components/ReadingDetailSection/ReadingDetailSection.css` - Styles CSS

### Interface TypeScript

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
    financialKarmicTail: {
      primary: number;
      secondary: number;
    };
    karmicLife: {
      primary: number;
      secondary: number;
    };
    talentZone: {
      primary: number;
      secondary: number;
    };
    socialConnection: number;
    parents: {
      primary: number;
      secondary: number;
    };
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
}
```

## Fonctions principales

### `calculateMatrixDestiny(day, month, year)`

Fonction principale qui calcule la Matrix Destiny selon la méthode traditionnelle.

**Paramètres :**

- `day: number` - Jour de naissance
- `month: number` - Mois de naissance
- `year: number` - Année de naissance

**Retour :** `MatrixDestiny` - Structure complète de la Matrix

### `calculateChakrasTraditional(...)`

Calcule les valeurs des 7 chakras principaux selon la méthode traditionnelle.

**Chakras calculés :**

- Sahasrara (Couronne) - Mission et vibration spirituelle
- Ajna (3ème Œil) - Destin et égrégores
- Vishuddha (Gorge) - Communication et expression
- Anahata (Cœur) - Relations et amour (utilise heartLine)
- Manipura (Plexus Solaire) - Statut et possessions
- Svadhisthana (Sacré) - Amour des enfants et joie
- Muladhara (Racine) - Corps et matière

### `calculateAgeCycles(day, month, year)`

Calcule les cycles de vie selon la méthode traditionnelle (cycles de 5 ans).

### `calculateSpecialDomainsTraditional(...)`

Calcule les domaines spéciaux (amour, argent, balance) basés sur les lignes karmiques.

### `getRelationMeaning(number, type)`

Récupère la signification d'un nombre pour les relations du cœur.

**Paramètres :**

- `number: number` - Le nombre (1-22)
- `type: "interior" | "exterior"` - Type de relation

### `getMatrixMeaning(number, category)`

Récupère la signification d'un nombre pour les domaines spéciaux.

**Paramètres :**

- `number: number` - Le nombre (1-22)
- `category: "love" | "money" | "pivot"` - Catégorie du domaine

## Formules mathématiques

### Réduction des nombres

```typescript
function reduceNumber(n: number): number {
  while (n > 9) {
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}
```

### Somme réduite

```typescript
function sumReduce(...nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
}
```

## Méthode Traditionnelle - Principes

### 1. Nombres de base

- **Jour** : Réduit à la plage Matrix (1-22)
- **Mois** : Réduit à la plage Matrix (1-22)
- **Année** : Réduit à la plage Matrix (1-22)
- **Mission de vie** : `reduceToMatrixNumber(day + month + year)`

### 2. Centre de la Matrix

- **Mission centrale** : `sumReduce(dayValue, monthValue, yearValue, lifeMission)`
- **Ligne masculine** : Jour + Mois, Mission, Jour + Année
- **Ligne féminine** : Mois + Année, Mission, Mission + Jour

### 3. Calcul des chakras

Chaque chakra utilise des formules spécifiques :

```typescript
chakra = {
  physique: calculatePhysiqueValue(...),
  energy: calculateEnergyValue(...),
  emotions: calculateEmotionsValue(...),
};
```

### 4. Ligne du cœur

- **Physique** : `parents.primary + maleLine.mission`
- **Énergie** : `maleLine.mission + talentZone.primary`
- **Émotions** : `physique + énergie`

### 5. Lignes karmiques

- **Queue karmique financière** : Dettes liées à l'argent
- **Vie karmique** : Expériences des vies antérieures
- **Zone de talent** : Dons naturels hérités
- **Parents** : Relations karmiques parentales
- **Antécédents** : Héritage des lignées maternelle et paternelle

### 6. Cycles de vie

Les cycles sont calculés par tranches de 5 ans :

- Cycle 1 : 0-5 ans
- Cycle 2 : 5-10 ans
- Cycle 3 : 10-15 ans
- etc.

### 7. Domaines spéciaux

- **Amour** : Basé sur les lignes karmiques
- **Argent** : Basé sur les lignes karmiques
- **Balance** : Point d'équilibre (pivot)

## Utilisation dans l'interface

### MatrixTab.tsx

```typescript
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny/matrixDestiny";
import { getRelationMeaning } from "../../../utils/matrixDestiny/matrixRelations";
import { getMatrixMeaning } from "../../../utils/matrixDestiny/getMatrixMeaning";

const matrixDestiny = useMemo(() => {
  if (!readingData) return null;

  const [year, month, day] = readingData.birthDate.split("-").map(Number);
  return calculateMatrixDestiny(day, month, year);
}, [readingData]);
```

### Affichage des résultats

Les résultats sont affichés dans plusieurs sections :

1. **Nombres de base** - Jour, mois, année, mission de vie
2. **Centre de la Matrix** - Mission, lignes masculine et féminine
3. **Lignes karmiques** - 6 lignes avec badges primaires et secondaires
4. **Chakras** - 7 chakras avec leurs 3 dimensions
5. **Domaines spéciaux** - Amour, argent et balance (avec descriptions)
6. **Ligne du cœur** - Physique et énergie (avec descriptions)
7. **Schéma visuel** - Diagramme avec positionnement des nombres

## Styles CSS

### Classes principales

- `.matrix-section` - Section principale
- `.matrix-method-info` - Information sur la méthode
- `.matrix-base-section` - Nombres de base
- `.matrix-center-section` - Centre de la Matrix
- `.matrix-karmic-section` - Lignes karmiques
- `.matrix-chakras-section` - Chakras
- `.matrix-special-section` - Domaines spéciaux
- `.matrix-health-section` - Ligne du cœur
- `.matrix-visual-section` - Schéma visuel

### Responsive design

Les styles sont adaptés pour :

- Desktop (1200px+)
- Tablet (768px-1199px)
- Mobile (<768px)

## Tests et validation

### Tests unitaires recommandés

```typescript
describe("calculateMatrixDestiny", () => {
  it("should calculate correct base numbers", () => {
    const result = calculateMatrixDestiny(15, 3, 1990);
    expect(result.base.day).toBe(6);
    expect(result.base.month).toBe(3);
    expect(result.base.year).toBe(1);
    expect(result.base.lifeMission).toBe(1);
  });

  it("should calculate correct chakras", () => {
    const result = calculateMatrixDestiny(15, 3, 1990);
    expect(result.chakras.sahasrara.physique).toBeDefined();
    expect(result.chakras.ajna.energy).toBeDefined();
    // ... autres tests
  });
});
```

## Performance

### Optimisations

- Utilisation de `useMemo` pour éviter les recalculs
- Calculs en une seule passe
- Mise en cache des résultats

### Complexité

- **Temps** : O(1) pour les calculs de base
- **Espace** : O(1) pour la structure de données
- **Cycles** : O(n) où n = nombre d'âges (100 max)

## Maintenance

### Ajout de nouvelles méthodes

Pour ajouter une nouvelle méthode de calcul :

1. Créer une nouvelle fonction `calculateMatrixDestiny[MethodName]`
2. Ajouter un paramètre de sélection de méthode
3. Mettre à jour l'interface utilisateur
4. Ajouter les tests correspondants

### Debugging

- Utiliser les logs de développement
- Vérifier les calculs intermédiaires
- Valider avec des données de test connues

## Structure des fichiers

### Organisation des modules

```
src/utils/matrixDestiny/
├── matrixDestiny.ts          # Calculs principaux Matrix Destiny
├── matrixRelations.ts        # Relations du cœur (interior/exterior)
└── getMatrixMeaning.ts       # Significations des domaines spéciaux
```

### Données JSON

```
src/data/matrixDestiny/
├── matrixRelationsHeart.json # Descriptions des relations du cœur
└── matrixMoneyLove.json      # Descriptions amour/argent/pivot
```

## Ressources

- [Documentation Matrix Destiny](https://matrix-destiny.com)
- [Méthode traditionnelle](https://numerology.com/matrix-destiny)
- [Code source sur GitHub](https://github.com/numora/matrix-destiny)

---

_Dernière mise à jour : Décembre 2024_
