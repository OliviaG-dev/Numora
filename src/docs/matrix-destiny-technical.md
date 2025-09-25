# Matrix Destiny - Documentation Technique

## Vue d'ensemble

Cette documentation technique décrit l'implémentation de la méthode Grabovoi pour le calcul de la Matrix Destiny dans l'application Numora.

## Architecture

### Fichiers principaux

- `src/utils/matrixDestiny.ts` - Logique de calcul principale
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
    maleLine: number;
    femaleLine: number;
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
  };
}
```

## Fonctions principales

### `calculateMatrixDestiny(day, month, year, name?)`

Fonction principale qui calcule la Matrix Destiny selon la méthode Grabovoi.

**Paramètres :**

- `day: number` - Jour de naissance
- `month: number` - Mois de naissance
- `year: number` - Année de naissance
- `name?: string` - Nom complet (optionnel)

**Retour :** `MatrixDestiny` - Structure complète de la Matrix

### `calculateChakrasGrabovoi(day, month, year, name?)`

Calcule les valeurs des 7 chakras principaux selon la méthode Grabovoi.

**Chakras calculés :**

- Sahasrara (Couronne) - Vibration +7
- Ajna (3ème Œil) - Vibration +6
- Vishuddha (Gorge) - Vibration +5
- Anahata (Cœur) - Vibration +4
- Manipura (Plexus Solaire) - Vibration +3
- Svadhisthana (Sacré) - Vibration +2
- Muladhara (Racine) - Vibration +1

### `calculateLifeCyclesGrabovoi(day, month, year)`

Calcule les cycles de vie selon la méthode Grabovoi (cycles de 9 ans).

### `calculateSpecialDomains(day, month, year, name?)`

Calcule les domaines spéciaux (amour, argent) basés sur les vibrations.

### `calculateNameVibration(name)`

Calcule la vibration d'un nom selon la méthode Grabovoi.

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

## Méthode Grabovoi - Principes

### 1. Vibrations de base

- **Vibration de base** : `sumReduce(day, month, year)`
- **Vibration temporelle** : `sumReduce(day, month)`
- **Vibration spatiale** : `sumReduce(month, year)`
- **Vibration du destin** : `sumReduce(day, year)`

### 2. Calcul des chakras

Chaque chakra utilise une combinaison de ces vibrations avec un facteur de correction :

```typescript
chakra = {
  physique: reduceNumber(baseVibration + chakraNumber),
  energy: reduceNumber(timeVibration + chakraNumber),
  emotions: reduceNumber(spaceVibration + chakraNumber),
};
```

### 3. Cycles de vie

Les cycles sont calculés par tranches de 9 ans :

- Cycle 1 : 1-9 ans
- Cycle 2 : 10-18 ans
- Cycle 3 : 19-27 ans
- etc.

### 4. Domaines spéciaux

- **Amour** : `reduceNumber(day + month + 7)`
- **Argent** : `reduceNumber(month + year + 8)`

## Utilisation dans l'interface

### MatrixTab.tsx

```typescript
const matrixDestiny = useMemo(() => {
  if (!readingData) return null;

  const [year, month, day] = readingData.birthDate.split("-").map(Number);
  const fullName =
    `${readingData.firstGivenName} ${readingData.secondGivenName} ${readingData.thirdGivenName} ${readingData.familyName}`.trim();
  return calculateMatrixDestiny(day, month, year, fullName);
}, [readingData]);
```

### Affichage des résultats

Les résultats sont affichés dans plusieurs sections :

1. **Nombres de base** - Jour, mois, année, mission de vie
2. **Centre de la Matrix** - Mission, lignes masculine et féminine
3. **Chakras** - 7 chakras avec leurs 3 dimensions
4. **Cycles de vie** - Cycles de 9 ans
5. **Domaines spéciaux** - Amour et argent
6. **Schéma visuel** - Diagramme avec positionnement des nombres

## Styles CSS

### Classes principales

- `.matrix-section` - Section principale
- `.matrix-method-info` - Information sur la méthode
- `.matrix-base-section` - Nombres de base
- `.matrix-center-section` - Centre de la Matrix
- `.matrix-chakras-section` - Chakras
- `.matrix-cycles-section` - Cycles de vie
- `.matrix-special-section` - Domaines spéciaux
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

## Ressources

- [Documentation Grabovoi](https://grigori-grabovoi.com)
- [Formation Matrix Destiny](https://matrix-destiny.com)
- [Code source sur GitHub](https://github.com/numora/matrix-destiny)

---

_Dernière mise à jour : Décembre 2024_
