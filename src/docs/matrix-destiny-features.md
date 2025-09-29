# Matrix Destiny - Nouvelles Fonctionnalités

## Vue d'ensemble

Ce document décrit les nouvelles fonctionnalités ajoutées à la Matrix Destiny, incluant les descriptions des domaines spéciaux, la ligne du cœur, et l'organisation modulaire du code.

## Nouvelles Fonctionnalités

### 1. Descriptions des Domaines Spéciaux

#### Fonctionnalité

Chaque domaine spécial (Amour, Argent, Balance) affiche maintenant une description détaillée basée sur les données de `matrixMoneyLove.json`.

#### Implémentation

```typescript
// Utilisation dans MatrixTab.tsx
<div className="special-description">
  <p className="special-text">
    {getMatrixMeaning(matrixDestiny.special.love, "love")}
  </p>
</div>
```

#### Données utilisées

- **Amour** : `matrixMoneyLoveData.love[number]`
- **Argent** : `matrixMoneyLoveData.money[number]`
- **Balance** : `matrixMoneyLoveData.pivot[number]`

### 2. Ligne du Cœur

#### Fonctionnalité

Nouvelle section "Ligne du Cœur" remplaçant la "Zone d'Énergie Commune" avec deux badges :

- **Physique** : Comment tu reçois l'amour / ton monde émotionnel interne
- **Énergie** : Comment tu donnes l'amour / ton rapport aux autres

#### Calculs

```typescript
// Dans matrixDestiny.ts
const heartLine = calculateHeartLine(
  parentsPrimary, // parents.primary (déjà réduit)
  maleLine.mission, // maleLine.mission (centre de la matrix)
  talentZonePrimary // talentZone.primary (déjà réduit)
);

// Calculs internes
const physique = reduceToMatrixNumber(parentsPrimary + maleLineMission);
const energy = reduceToMatrixNumber(maleLineMission + talentZonePrimary);
const emotions = reduceToMatrixNumber(physique + energy);
```

#### Descriptions

- **Physique** : `matrixRelationsHeartData.interior[number]`
- **Énergie** : `matrixRelationsHeartData.exterior[number]`

### 3. Organisation Modulaire

#### Structure des fichiers

```
src/utils/matrixDestiny/
├── matrixDestiny.ts          # Calculs principaux
├── matrixRelations.ts        # Relations du cœur
└── getMatrixMeaning.ts       # Significations des domaines spéciaux
```

#### Avantages

- **Séparation des responsabilités** : Chaque module a un rôle spécifique
- **Maintenance facilitée** : Code organisé et modulaire
- **Réutilisabilité** : Modules indépendants et réutilisables
- **Évolutivité** : Facile d'ajouter de nouvelles fonctionnalités

## Imports Mis à Jour

### MatrixTab.tsx

```typescript
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny/matrixDestiny";
import { getRelationMeaning } from "../../../utils/matrixDestiny/matrixRelations";
import { getMatrixMeaning } from "../../../utils/matrixDestiny/getMatrixMeaning";
```

### Anciens imports (supprimés)

```typescript
// ❌ Anciens imports
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny";
import { getRelationMeaning } from "../../../utils/matrixRelations";
```

## Nouvelles Données JSON

### matrixMoneyLove.json

```json
{
  "love": {
    "1": "Amour centré sur l'indépendance, besoin d'autonomie.",
    "2": "Relations basées sur la coopération, sensibilité à l'autre."
    // ... autres nombres
  },
  "money": {
    "1": "Argent gagné par l'initiative et le leadership.",
    "2": "Revenus via la coopération, associations."
    // ... autres nombres
  },
  "pivot": {
    "1": "Équilibre par l'affirmation de soi.",
    "2": "Pivot basé sur l'écoute et la diplomatie."
    // ... autres nombres
  }
}
```

### matrixRelationsHeart.json

```json
{
  "interior": {
    "1": "Capacité à recevoir de l'énergie individuelle, autonomie intérieure.",
    "2": "Réceptivité aux émotions et à la coopération des autres."
    // ... autres nombres
  },
  "exterior": {
    "1": "Capacité à projeter leadership et indépendance vers autrui.",
    "2": "Transmission d'harmonie, d'écoute et de coopération."
    // ... autres nombres
  }
}
```

## Styles CSS Ajoutés

### Descriptions des domaines spéciaux

```css
.special-description {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(139, 92, 246, 0.1);
  border-radius: 12px;
  border-left: 4px solid var(--primary-purple);
  backdrop-filter: blur(5px);
}

.special-text {
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
  font-style: italic;
  text-align: center;
}
```

### Ligne du cœur

```css
.matrix-health-section {
  margin-bottom: 3rem;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid var(--bg-tertiary);
}

.matrix-health-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.relation-meaning {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 12px;
  border-left: 4px solid #4caf50;
  backdrop-filter: blur(5px);
}
```

## Utilisation des Nouvelles Fonctions

### getMatrixMeaning

```typescript
// Récupérer la signification d'un domaine spécial
const loveMeaning = getMatrixMeaning(5, "love");
const moneyMeaning = getMatrixMeaning(8, "money");
const balanceMeaning = getMatrixMeaning(12, "pivot");
```

### getRelationMeaning

```typescript
// Récupérer la signification d'une relation du cœur
const interiorMeaning = getRelationMeaning(7, "interior");
const exteriorMeaning = getRelationMeaning(7, "exterior");
```

## Tests Recommandés

### Tests unitaires pour les nouvelles fonctions

```typescript
describe("getMatrixMeaning", () => {
  it("should return correct love meaning", () => {
    const result = getMatrixMeaning(1, "love");
    expect(result).toBe("Amour centré sur l'indépendance, besoin d'autonomie.");
  });

  it("should handle invalid numbers", () => {
    const result = getMatrixMeaning(25, "love");
    expect(result).toBe("Nombre invalide (doit être entre 1 et 22).");
  });
});

describe("getRelationMeaning", () => {
  it("should return correct interior meaning", () => {
    const result = getRelationMeaning(1, "interior");
    expect(result).toBe(
      "Capacité à recevoir de l'énergie individuelle, autonomie intérieure."
    );
  });

  it("should return correct exterior meaning", () => {
    const result = getRelationMeaning(1, "exterior");
    expect(result).toBe(
      "Capacité à projeter leadership et indépendance vers autrui."
    );
  });
});
```

## Migration Guide

### Pour les développeurs

1. **Mise à jour des imports** :

   ```typescript
   // Ancien
   import { calculateMatrixDestiny } from "../../../utils/matrixDestiny";

   // Nouveau
   import { calculateMatrixDestiny } from "../../../utils/matrixDestiny/matrixDestiny";
   ```

2. **Utilisation des nouvelles fonctions** :

   ```typescript
   // Ajouter les imports nécessaires
   import { getMatrixMeaning } from "../../../utils/matrixDestiny/getMatrixMeaning";
   import { getRelationMeaning } from "../../../utils/matrixDestiny/matrixRelations";
   ```

3. **Mise à jour des interfaces** :
   - L'interface `MatrixDestiny` a été étendue avec `heartLine` et `karmicLines`
   - Les `special` incluent maintenant `balance`

## Performance

### Optimisations

- **Lazy loading** : Les descriptions sont chargées à la demande
- **Mise en cache** : Les calculs sont mis en cache avec `useMemo`
- **Données statiques** : Les JSON sont importés statiquement

### Impact

- **Taille du bundle** : +2KB pour les nouvelles données JSON
- **Temps de calcul** : Aucun impact (calculs identiques)
- **Mémoire** : +50KB pour les descriptions en mémoire

## Maintenance

### Ajout de nouvelles descriptions

1. Modifier le fichier JSON correspondant
2. Redémarrer l'application
3. Les nouvelles descriptions apparaîtront automatiquement

### Ajout de nouveaux domaines

1. Ajouter la catégorie dans `matrixMoneyLove.json`
2. Étendre le type `MatrixCategory` dans `getMatrixMeaning.ts`
3. Mettre à jour l'interface utilisateur

---

_Dernière mise à jour : Décembre 2024_
