# Documentation de l'Arbre de Vie Kabbalistique

## Vue d'ensemble

L'Arbre de Vie est une fonctionnalité de numérologie kabbalistique qui cartographie les 10 Sephiroth (sphères) et les 22 chemins qui les relient, basés sur la date de naissance d'une personne.

## Architecture

### Structure des fichiers

```
src/
├── components/ReadingDetailSection/tabs/
│   ├── ArbreTab.tsx              # Composant principal
│   └── ArbreTab.css              # Styles de l'Arbre de Vie
├── data/arbreDeVie/
│   └── sephirothData.json        # Interprétations des 10 Sephiroth
├── utils/arbreDeVie/
│   ├── calculateSephiroth.ts     # Calculs des valeurs
│   ├── getSephiraMeaning.ts      # Récupération des significations
│   └── index.ts                  # Exports centralisés
└── docs/
    └── arbre-de-vie.md           # Cette documentation
```

## Les 10 Sephiroth

L'Arbre de Vie kabbalistique est composé de 10 sphères (Sephiroth) qui représentent différents aspects de l'existence :

| #   | Nom      | Hébreu     | Signification  | Calcul            |
| --- | -------- | ---------- | -------------- | ----------------- |
| 1   | Kether   | כֶּתֶר     | La Couronne    | Chemin de vie     |
| 2   | Chokhmah | חָכְמָה    | La Sagesse     | Jour + Mois       |
| 3   | Binah    | בִּינָה    | L'Intelligence | Année réduite     |
| 4   | Chesed   | חֶסֶד      | La Miséricorde | Jour de naissance |
| 5   | Gevurah  | גְּבוּרָה  | La Rigueur     | Mois de naissance |
| 6   | Tipheret | תִּפְאֶרֶת | La Beauté      | Chemin de vie     |
| 7   | Netzach  | נֶצַח      | La Victoire    | Jour de naissance |
| 8   | Hod      | הוֹד       | La Splendeur   | Mois de naissance |
| 9   | Yesod    | יְסוֹד     | Le Fondement   | Jour + Mois       |
| 10  | Malkuth  | מַלְכוּת   | Le Royaume     | Total date réduit |

## Les 3 Piliers

L'Arbre de Vie est structuré selon trois piliers verticaux :

### Pilier de la Miséricorde (Gauche)

- **Sephiroth** : Chokhmah, Chesed, Netzach
- **Énergie** : Expansion, créativité, générosité
- **Caractère** : Masculin actif (Yang)

### Pilier de la Rigueur (Droite)

- **Sephiroth** : Binah, Gevurah, Hod
- **Énergie** : Contraction, discipline, structure
- **Caractère** : Féminin réceptif (Yin)

### Pilier de l'Équilibre (Centre)

- **Sephiroth** : Kether, Tipheret, Yesod, Malkuth
- **Énergie** : Harmonie, unification
- **Caractère** : Équilibre parfait

## Les 22 Chemins

Les 22 chemins relient les Sephiroth entre elles et sont associés aux 22 arcanes majeurs du Tarot :

### Types de chemins

1. **Chemins horizontaux** (3) : Relient les piliers opposés
2. **Chemins verticaux** (7+7) : Suivent les piliers de gauche et de droite
3. **Chemins centraux** (3) : Suivent le pilier de l'équilibre
4. **Chemins diagonaux** (6) : Créent l'équilibre dynamique

## Méthode de calcul

### Calcul des Sephiroth

La fonction `calculateSephirothValues()` prend une date de naissance et calcule :

```typescript
// Exemple : 15/03/1990
const sephirothValues = calculateSephirothValues("1990-03-15");

// Résultat :
{
  kether: 1,      // Chemin de vie : 1+5+0+3+1+9+9+0 = 28 → 10 → 1
  chokhmah: 9,    // Jour + Mois : 15 + 3 = 18 → 9
  binah: 1,       // Année : 1990 → 19 → 10 → 1
  chesed: 6,      // Jour : 15 → 6
  gevurah: 3,     // Mois : 3
  tipheret: 1,    // Chemin de vie
  netzach: 6,     // Jour : 15 → 6
  hod: 3,         // Mois : 3
  yesod: 9,       // Jour + Mois : 18 → 9
  malkuth: 1      // Total : 1+5+3+1+9+9+0 = 28 → 10 → 1
}
```

### Calcul des chemins significatifs

La fonction `getSignificantPaths()` identifie les 5 chemins les plus importants :

```typescript
const significantPaths = getSignificantPaths(sephirothValues);
// Retourne les chemins avec les valeurs les plus élevées
```

### Analyse des piliers

La fonction `calculatePillarBalance()` calcule l'équilibre entre les trois piliers :

```typescript
const pillarBalance = calculatePillarBalance(sephirothValues);
// Résultat :
{
  mercy: 9,        // Pilier de la Miséricorde
  severity: 7,     // Pilier de la Rigueur
  equilibrium: 3   // Pilier de l'Équilibre
}
```

## Utilisation dans le composant

### Import

```typescript
import {
  analyzeTreeOfLife,
  type TreeOfLifeAnalysis,
} from "../../../utils/arbreDeVie/calculateSephiroth";
```

### Calcul

```typescript
const treeAnalysis = useMemo(() => {
  if (!readingData?.birthDate) return null;
  return analyzeTreeOfLife(readingData.birthDate, fullName);
}, [readingData]);
```

### Résultat

```typescript
{
  sephirothValues: { kether: 1, chokhmah: 9, ... },
  significantPaths: [{ path: {...}, value: 9 }, ...],
  pillarBalance: { mercy: 9, severity: 7, equilibrium: 3 },
  dominantPillar: "mercy" // ou "severity" ou "equilibrium"
}
```

## Visualisation

Le composant `ArbreTab` crée une visualisation interactive de l'Arbre de Vie :

### Éléments visuels

1. **SVG avec chemins** : Les 22 chemins reliant les Sephiroth
2. **Sphères interactives** : Les 10 Sephiroth avec leurs valeurs
3. **Cartes d'interprétation** : Détails pour chaque Sephira
4. **Analyse des piliers** : Force dominante de la personne

### Interactivité

- **Hover sur les sphères** : Animation et mise en évidence
- **Click sur une sphère** : Activation et scroll vers l'interprétation
- **Chemins animés** : Visualisation des connexions énergétiques

## Données JSON

### Structure des données Sephiroth

```json
{
  "1": {
    "name": "Kether",
    "hebrewName": "כֶּתֶר",
    "title": "La Couronne",
    "subtitle": "Connexion Divine & Mission Suprême",
    "description": "...",
    "domain": "Connexion divine, but suprême, mission de vie",
    "keywords": ["Conscience divine", "Unité cosmique", ...],
    "strengths": "...",
    "challenges": "...",
    "guidance": "..."
  },
  ...
}
```

## Personnalisation

### Ajouter de nouvelles interprétations

1. Modifier `src/data/arbreDeVie/sephirothData.json`
2. Ajouter les nouvelles clés dans l'interface `SephiraMeaning`

### Modifier les calculs

1. Éditer `src/utils/arbreDeVie/calculateSephiroth.ts`
2. Ajuster les formules dans `calculateSephirothValues()`

### Personnaliser les styles

1. Modifier `src/components/ReadingDetailSection/tabs/ArbreTab.css`
2. Ajuster les couleurs, tailles, animations

## Philosophie kabbalistique

L'Arbre de Vie représente :

- **La descente de la lumière divine** : De Kether (couronne) à Malkuth (royaume)
- **L'équilibre des forces** : Entre expansion et contraction
- **Le parcours de l'âme** : De la source divine à l'incarnation terrestre
- **Les 22 lettres hébraïques** : Associées aux 22 chemins

## Références

- Numérologie kabbalistique moderne
- Sefer Yetzirah (Livre de la Formation)
- Système des Sephiroth
- Correspondances avec le Tarot de Marseille

## Notes de développement

### Performance

- Les calculs sont mémorisés avec `useMemo`
- Les rendus SVG sont optimisés
- Les interprétations sont chargées dynamiquement

### Accessibilité

- Tooltips informatifs
- Contraste des couleurs
- Navigation au clavier possible

### Responsive

- Adaptation mobile avec breakpoints
- Tailles ajustées pour petits écrans
- Simplification de la visualisation mobile

## TODO Future

- [ ] Ajouter des interprétations détaillées pour les 22 chemins
- [ ] Créer des animations pour les transitions entre Sephiroth
- [ ] Implémenter un mode "méditation" interactif
- [ ] Ajouter des correspondances avec les chakras
- [ ] Créer une vue 3D de l'Arbre de Vie
