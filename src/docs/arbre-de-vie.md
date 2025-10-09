# Documentation de l'Arbre de Vie Kabbalistique

## Vue d'ensemble

L'Arbre de Vie est une fonctionnalité de numérologie qui cartographie les 10 Sephiroth (sphères) et les 22 chemins qui les relient, basés sur la date de naissance d'une personne.

**⚠️ IMPORTANT - Note de Transparence:**

Ce système est une **interprétation moderne** de la numérologie kabbalistique, créée à des fins d'exploration personnelle. Il ne prétend pas refléter la Kabbale traditionnelle authentique, qui :

- Utilise la gématrie (valeurs des lettres hébraïques)
- Est un outil de méditation symbolique
- Ne calcule pas des "Arbres personnels" basés sur les dates de naissance

Les **doublons de valeurs sont normaux** dans ce système et font partie de votre signature numérologique unique. Chaque Sephira conserve sa signification propre même si le nombre est répété.

## Architecture

### Structure des fichiers

```
src/
├── components/ReadingDetailSection/tabs/
│   ├── ArbreTab.tsx              # Composant principal
│   └── ArbreTab.css              # Styles de l'Arbre de Vie
├── data/arbreDeVie/
│   ├── sephirothData.json        # Interprétations des 10 Sephiroth
│   ├── sephirothNumberData.json  # Interprétations par nombre
│   └── pathsNumberData.json      # Interprétations des chemins
├── utils/arbreDeVie/
│   ├── calculateSephiroth.ts     # Calculs des valeurs
│   ├── getSephiraMeaning.ts      # Récupération des significations
│   └── index.ts                  # Exports centralisés
└── docs/
    └── arbre-de-vie.md           # Cette documentation
```

## Les 10 Sephiroth

L'Arbre de Vie kabbalistique est composé de 10 sphères (Sephiroth) qui représentent différents aspects de l'existence :

| #   | Nom      | Hébreu     | Signification  | Calcul (Système Simple)     |
| --- | -------- | ---------- | -------------- | --------------------------- |
| 1   | Kether   | כֶּתֶר     | La Couronne    | Chemin de vie               |
| 2   | Chokhmah | חָכְמָה    | La Sagesse     | Année réduite               |
| 3   | Binah    | בִּינָה    | L'Intelligence | Mois réduit                 |
| 4   | Chesed   | חֶסֶד      | La Miséricorde | Jour réduit                 |
| 5   | Gevurah  | גְּבוּרָה  | La Rigueur     | Jour + Mois                 |
| 6   | Tipheret | תִּפְאֶרֶת | La Beauté      | Chemin de vie (centre)      |
| 7   | Netzach  | נֶצַח      | La Victoire    | Jour + Année                |
| 8   | Hod      | הוֹד       | La Splendeur   | Mois + Année                |
| 9   | Yesod    | יְסוֹד     | Le Fondement   | Somme de tous les chiffres  |
| 10  | Malkuth  | מַלְכוּת   | Le Royaume     | Jour + Mois + Année réduits |

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

### Calcul des Sephiroth (SYSTÈME SIMPLE)

La fonction `calculateSephirothValues()` prend **uniquement une date de naissance** :

```typescript
// Exemple : 18/10/1989 - Carlos David
const sephirothValues = calculateSephirothValues("1989-10-18");

// Résultat :
{
  kether: 1,      // Chemin de vie : 1+9+8+9+1+0+1+8 = 37 → 10 → 1
  chokhmah: 9,    // Année : 1989 → 1+9+8+9 = 27 → 9
  binah: 1,       // Mois : 10 → 1
  chesed: 9,      // Jour : 18 → 9
  gevurah: 1,     // Jour + Mois : 18+10 = 28 → 1
  tipheret: 1,    // Chemin de vie (centre)
  netzach: 8,     // Jour + Année : 18+1989 = 2007 → 9
  hod: 9,         // Mois + Année : 10+1989 = 1999 → 1+9+9+9 = 28 → 1
  yesod: 1,       // Tous les chiffres : 1+9+8+9+1+0+1+8 = 37 → 10 → 1
  malkuth: 1      // Date totale : 18+10+1989 = 2017 → 10 → 1
}
```

**Note sur les doublons:**

Dans cet exemple, le nombre **1** apparaît 6 fois et le nombre **9** apparaît 4 fois. C'est **normal et attendu** ! Cela signifie que :

- **L'énergie du 1** (leadership, indépendance, nouveaux départs) est très forte
- **L'énergie du 9** (sagesse, finalisation, humanitarisme) est également marquante
- Ces répétitions créent votre **signature énergétique unique**

Chaque Sephira où le nombre apparaît garde sa signification propre :

- Kether (1) = Mission de vie d'indépendance
- Gevurah (1) = Discipline par l'autonomie
- Tipheret (1) = Harmonie dans le leadership
- Etc.

### Pourquoi des doublons ?

**Raison mathématique:**

- 9 chiffres possibles (1-9) + nombres maîtres (11, 22, 33)
- 10 Sephiroth à calculer
- Par le principe des tiroirs, des doublons sont inévitables

**Raison spirituelle:**

- Les répétitions montrent vos **énergies dominantes**
- Chaque Sephira a un **contexte unique** même avec le même nombre
- Les doublons révèlent votre **thème de vie principal**

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
  return analyzeTreeOfLife(readingData.birthDate);
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
    "domain": "Connexion divine, but suprême, mission de vie"
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

**Important:** Gardez les formules **simples et fixes**. Évitez la logique conditionnelle complexe.

### Personnaliser les styles

1. Modifier `src/components/ReadingDetailSection/tabs/ArbreTab.css`
2. Ajuster les couleurs, tailles, animations

## Philosophie du système

### Ce que représente l'Arbre de Vie

- **La descente de la lumière divine** : De Kether (couronne) à Malkuth (royaume)
- **L'équilibre des forces** : Entre expansion et contraction
- **Le parcours de l'âme** : De la source divine à l'incarnation terrestre
- **Les 22 lettres hébraïques** : Associées aux 22 chemins

### Interpréter les doublons

Quand un nombre se répète plusieurs fois dans votre arbre :

1. **C'est votre thème principal** - Cette énergie est dominante dans votre vie
2. **Regardez les positions** - Où apparaît le nombre ? Dans quelle Sephira ?
3. **Analysez les piliers** - Le doublon affecte-t-il un pilier en particulier ?
4. **Considérez les chemins** - Les Sephiroth dupliquées créent quels chemins ?

**Exemple:** Si le 1 apparaît 6 fois :

- Forte énergie de **leadership et d'indépendance**
- Besoin de **créer votre propre voie**
- Challenge de **ne pas être trop isolé**
- Opportunité d'**inspirer les autres**

## Références

- Numérologie moderne adaptée
- Symbolisme kabbalistique
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

## FAQ

### Pourquoi ai-je autant de doublons ?

C'est mathématiquement normal ! Avec seulement 9 nombres possibles et 10 Sephiroth, des répétitions sont inévitables. Les doublons révèlent vos énergies dominantes.

### Est-ce conforme à la Kabbale traditionnelle ?

Non. C'est une **adaptation moderne** à des fins d'exploration personnelle. La Kabbale authentique ne fait pas de calculs personnels basés sur les dates de naissance.

### Puis-je me fier à ces résultats ?

Utilisez-les comme **outil de réflexion personnelle** et d'exploration de soi, pas comme vérité absolue. C'est un miroir symbolique, pas une science exacte.

### Comment utiliser mon Arbre de Vie ?

1. Identifiez vos nombres dominants (ceux qui se répètent)
2. Lisez les interprétations de chaque Sephira
3. Regardez votre pilier dominant
4. Explorez les chemins significatifs
5. Méditez sur les connexions et thèmes qui émergent
