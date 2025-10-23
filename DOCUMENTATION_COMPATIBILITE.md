# 📖 Documentation - Analyse de Compatibilité Numérologique

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Concepts de base](#concepts-de-base)
3. [Calculs numériques](#calculs-numériques)
4. [Types de relations](#types-de-relations)
5. [Structure des données](#structure-des-données)
6. [Système de scoring](#système-de-scoring)
7. [Exemples concrets](#exemples-concrets)
8. [Architecture technique](#architecture-technique)

---

## 🎯 Vue d'ensemble

La fonctionnalité d'**Analyse de Compatibilité Numérologique** permet d'évaluer la compatibilité entre deux personnes en se basant sur leurs données numérologiques. L'analyse se concentre principalement sur :

- **Le Chemin de Vie** de chaque personne
- **Le Nombre d'Union** du couple
- **Les forces et défis** de la relation
- **Des recommandations personnalisées**

### Types d'analyses disponibles

| Type           | État                | Description                                                     |
| -------------- | ------------------- | --------------------------------------------------------------- |
| **Amour** 💕   | ✅ Complet          | Analyse de compatibilité amoureuse basée sur les chemins de vie |
| **Amitié** 👥  | 🚧 En développement | Analyse de compatibilité amicale (placeholder)                  |
| **Travail** 💼 | 🚧 En développement | Analyse de compatibilité professionnelle (placeholder)          |

---

## 📚 Concepts de base

### Le Chemin de Vie

Le **Chemin de Vie** est le nombre le plus important en numérologie. Il représente la mission de vie, les talents innés et les défis d'une personne.

**Calcul :** On additionne tous les chiffres de la date de naissance complète, puis on réduit le résultat à un chiffre de 1 à 9, ou à un nombre maître (11, 22, 33).

#### Les Nombres Maîtres

Les nombres **11, 22 et 33** sont appelés **nombres maîtres**. Ils ne sont pas réduits car ils portent une vibration spirituelle plus élevée.

- **11** : L'Illuminé - Intuition, inspiration, spiritualité
- **22** : Le Bâtisseur - Réalisation matérielle des rêves spirituels
- **33** : Le Maître Enseignant - Compassion, guidance, service

### Le Nombre d'Union

Le **Nombre d'Union** représente l'énergie vibratoire créée par l'association de deux chemins de vie. C'est l'essence énergétique du couple.

**Calcul :** On additionne les deux chemins de vie, puis on réduit le résultat à un chiffre de 1 à 9, ou à un nombre maître (11, 22, 33).

---

## 🔢 Calculs numériques

### 1. Calcul du Chemin de Vie

```typescript
function calculateLifePathNumber(birthDate: string): number {
  // Format attendu: "YYYY-MM-DD"
  // Exemple: "1990-03-25"

  // Étape 1: Validation du format
  validateDateString(birthDate);

  // Étape 2: Extraction de tous les chiffres
  const digits = birthDate.replace(/-/g, "").split("").map(Number);
  // Exemple: "1990-03-25" → [1,9,9,0,0,3,2,5]

  // Étape 3: Somme de tous les chiffres
  const sum = digits.reduce((acc, val) => acc + val, 0);
  // Exemple: 1+9+9+0+0+3+2+5 = 29

  // Étape 4: Réduction à un chiffre ou nombre maître
  return reduceToSingleDigit(sum, true);
  // Exemple: 29 → 2+9 = 11 (nombre maître, on ne réduit plus)
}
```

#### Exemple détaillé :

**Date de naissance :** 25 mars 1990 → `1990-03-25`

```
Chiffres : 1 + 9 + 9 + 0 + 0 + 3 + 2 + 5 = 29
Réduction : 2 + 9 = 11 (nombre maître ✨)
Chemin de Vie : 11
```

**Date de naissance :** 15 juillet 1985 → `1985-07-15`

```
Chiffres : 1 + 9 + 8 + 5 + 0 + 7 + 1 + 5 = 36
Réduction : 3 + 6 = 9
Chemin de Vie : 9
```

### 2. Fonction de Réduction

```typescript
function reduceToSingleDigit(
  num: number,
  allowMasterNumbers: boolean = true
): number {
  // Étape 1: Vérifier si c'est un nombre maître (11, 22, 33)
  if (allowMasterNumbers && [11, 22, 33].includes(num)) {
    return num; // On ne réduit pas les nombres maîtres
  }

  // Étape 2: Si le nombre est déjà entre 1 et 9
  if (num < 10) {
    return num;
  }

  // Étape 3: Réduction récursive
  const digits = num.toString().split("").map(Number);
  const sum = digits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(sum, allowMasterNumbers);
}
```

#### Exemples de réduction :

```
15 → 1 + 5 = 6
29 → 2 + 9 = 11 (nombre maître ✨)
44 → 4 + 4 = 8
77 → 7 + 7 = 14 → 1 + 4 = 5
121 → 1 + 2 + 1 = 4
```

### 3. Calcul du Nombre d'Union

```typescript
function calculateUnionNumber(lifePath1: number, lifePath2: number): number {
  // Étape 1: Additionner les deux chemins de vie
  const sum = lifePath1 + lifePath2;

  // Étape 2: Réduire à un chiffre ou nombre maître
  return reduceToSingleDigit(sum, true);
}
```

#### Exemples :

```
Personne 1 : Chemin de Vie 7
Personne 2 : Chemin de Vie 5
Nombre d'Union : 7 + 5 = 12 → 1 + 2 = 3

Personne 1 : Chemin de Vie 11 (nombre maître)
Personne 2 : Chemin de Vie 9
Nombre d'Union : 11 + 9 = 20 → 2 + 0 = 2

Personne 1 : Chemin de Vie 6
Personne 2 : Chemin de Vie 5
Nombre d'Union : 6 + 5 = 11 (nombre maître ✨)
```

### 4. Construction de la Clé de Compatibilité

Pour rechercher les données de compatibilité, on construit une clé à partir des deux chemins de vie :

```typescript
function buildPairKey(n1: number, n2: number): string {
  const a = n1.toString();
  const b = n2.toString();
  const masterNumbers = [11, 22, 33];

  // Règle 1: Si l'un est un nombre maître et pas l'autre,
  //          le nombre maître vient en premier
  if (masterNumbers.includes(n1) && !masterNumbers.includes(n2)) {
    return `${a}-${b}`;
  }
  if (masterNumbers.includes(n2) && !masterNumbers.includes(n1)) {
    return `${b}-${a}`;
  }

  // Règle 2: Sinon, ordre croissant
  const [minStr, maxStr] = [a, b].sort((x, y) => Number(x) - Number(y));
  return `${minStr}-${maxStr}`;
}
```

#### Exemples de clés :

```
Chemin 1 et Chemin 7 → "1-7"
Chemin 7 et Chemin 1 → "1-7" (même clé)
Chemin 11 et Chemin 3 → "11-3" (nombre maître en premier)
Chemin 5 et Chemin 22 → "22-5" (nombre maître en premier)
Chemin 11 et Chemin 22 → "11-22" (ordre croissant)
```

---

## 🎭 Types de relations

### Relation Amoureuse 💕

**État :** ✅ **Complètement implémenté**

L'analyse amoureuse est la plus complète. Elle comprend :

#### 1. Compatibilité des Chemins de Vie

Pour chaque combinaison de chemins de vie (1-1, 1-2, 1-3, etc.), nous avons des données détaillées :

- **Mots-clés** : 3 mots décrivant la relation
- **Description** : Analyse détaillée de la dynamique du couple
- **Forces** : Points forts de cette combinaison
- **Défis** : Points d'attention et difficultés potentielles
- **Conseils** : Recommandations pour harmoniser la relation

**Exemple pour la combinaison 1-2 :**

```json
{
  "keywords": ["complémentarité", "douceur", "équilibre"],
  "description": "Le 1 aime diriger, le 2 aime soutenir : cette relation mêle force et sensibilité...",
  "strengths": "Tendresse, loyauté, compréhension intuitive.",
  "challenges": "Différence de rythme, dépendance affective.",
  "advice": "Le 1 doit apprendre la douceur, le 2 la confiance en soi."
}
```

#### 2. Nombre d'Union

Pour chaque nombre d'union possible (1 à 9, 11, 22, 33), nous avons :

- **Titre** : Nom symbolique de l'union (affiché avec un style doré animé)
- **Mots-clés** : 3 caractéristiques principales
- **Description** : Explication de l'énergie du couple
- **Forces** : Points forts de cette union
- **Défis** : Challenges à relever
- **Conseils** : Recommandations spécifiques

**Exemple pour le Nombre d'Union 6 :**

```json
{
  "title": "L'Union du Cœur",
  "keywords": ["amour", "famille", "harmonie"],
  "description": "C'est une union fondée sur l'amour inconditionnel...",
  "strengths": "Dévouement, stabilité affective, sens du lien.",
  "challenges": "Jalousie, attentes excessives, sacrifice.",
  "advice": "Aimez avec équilibre : donnez sans vous oublier."
}
```

#### 3. Compatibilité des Nombres d'Expression ✨

**Nouvelle fonctionnalité !** Pour chaque combinaison de nombres d'expression, nous avons :

- **Thème de relation** : Titre symbolique (affiché avec un style doré animé)
- **Vibration** : Type d'énergie de la relation
- **Type de connexion** : Nature du lien
- **Dynamique** : Comment ils se connectent
  - `how_they_connect` : Description de la connexion
  - `emotional_language` : Langage émotionnel partagé
  - `chemistry` : Chimie relationnelle
  - `growth_potential` : Potentiel de croissance
- **Forces** : Points forts de communication
- **Défis** : Défis de communication
- **Conseils** : Tips pour équilibrer la communication

### Relations Amitié et Travail 🚧

**État :** En développement (placeholder)

Pour ces types de relations, l'analyse retourne actuellement des données de placeholder :

```typescript
{
  overallScore: 50,
  compatibility: {
    lifePathCompatibility: {
      score: 0,
      description: "Analyse spécifique en cours de préparation..."
    },
    // ...
  },
  strengths: [],
  challenges: [],
  recommendations: []
}
```

---

## 📊 Structure des données

### Interface PersonInfo

Informations sur une personne pour l'analyse :

```typescript
interface PersonInfo {
  firstGivenName: string; // Prénom principal (requis)
  secondGivenName?: string; // Deuxième prénom (optionnel)
  thirdGivenName?: string; // Troisième prénom (optionnel)
  familyName: string; // Nom de famille (requis)
  birthDate: string; // Date de naissance au format "YYYY-MM-DD" (requis)
}
```

### Interface CompatibilityResult

Résultat complet de l'analyse de compatibilité :

```typescript
interface CompatibilityResult {
  overallScore: number; // Score global de compatibilité (0-100)
  compatibility: CompatibilityBreakdown; // Détails par type de compatibilité
  strengths: string[]; // Liste des forces de la relation
  challenges: string[]; // Liste des défis à relever
  recommendations: string[]; // Liste des recommandations
  unionNumber?: UnionNumberResult; // Détails du nombre d'union (optionnel)
}
```

### Interface CompatibilityBreakdown

Décomposition détaillée de la compatibilité :

```typescript
interface CompatibilityBreakdown {
  lifePathCompatibility: CompatibilityDetail; // Compatibilité des chemins de vie
  expressionCompatibility: CompatibilityDetail; // Compatibilité des nombres d'expression
  soulUrgeCompatibility: CompatibilityDetail; // Compatibilité des nombres d'âme
  personalityCompatibility: CompatibilityDetail; // Compatibilité des nombres de personnalité
}
```

> ⚠️ **Note :** Actuellement, seule `lifePathCompatibility` est complètement implémentée. Les autres retournent des données "À venir".

### Interface CompatibilityDetail

Détail d'un type de compatibilité :

```typescript
interface CompatibilityDetail {
  score: number; // Score de 0 à 100
  description: string; // Description textuelle
}
```

### Interface UnionNumberResult

Détails du nombre d'union :

```typescript
interface UnionNumberResult {
  unionNumber: number; // Le nombre d'union calculé (1-9, 11, 22, 33)
  detail: UnionNumberDetail | null; // Détails ou null si non trouvé
}

interface UnionNumberDetail {
  title: string; // Titre symbolique (ex: "L'Union du Cœur")
  keywords: string[]; // 3 mots-clés
  description: string; // Description de l'énergie du couple
  strengths: string; // Forces de cette union
  challenges: string; // Défis de cette union
  advice: string; // Conseils pour cette union
}
```

---

## 🎯 Système de scoring

### Calcul du score de compatibilité

Le score global est actuellement basé sur une heuristique qui analyse le texte des données de compatibilité :

```typescript
function computeHeuristicScore(detail: LifePathLoveDetail | null): number {
  if (!detail) return 50; // Score neutre par défaut

  let score = 70; // Score de base

  // Analyse du texte combiné (description + forces + défis)
  const text =
    `${detail.strengths} ${detail.challenges} ${detail.description}`.toLowerCase();

  // Mots négatifs réduisent le score de 10 points
  if (/(conflit|tension|jalousie|domination|instabilité|rigidité)/.test(text)) {
    score -= 10;
  }

  // Mots positifs augmentent le score de 5 points
  if (
    /(complémentarité|harmonie|fidélité|loyauté|inspiration|amour)/.test(text)
  ) {
    score += 5;
  }

  // Limites: score entre 30 et 90
  if (score < 30) score = 30;
  if (score > 90) score = 90;

  return score;
}
```

### Interprétation des scores

| Score      | Niveau     | Couleur       | Description                          |
| ---------- | ---------- | ------------- | ------------------------------------ |
| **85-100** | Excellente | 🟢 Vert foncé | Une compatibilité exceptionnelle     |
| **70-84**  | Très bonne | 🟢 Vert       | Une très bonne compatibilité         |
| **55-69**  | Bonne      | 🔵 Bleu       | Une bonne compatibilité              |
| **40-54**  | Modérée    | 🟠 Orange     | Une compatibilité modérée            |
| **0-39**   | Défiante   | 🔴 Rouge      | Une relation qui demande des efforts |

> 💡 **Note :** Le score est un indicateur, pas une vérité absolue. Toute relation peut fonctionner avec de la communication et des efforts mutuels.

---

## 💡 Exemples concrets

### Exemple 1 : Analyse complète

**Personnes :**

- **Alice** : Née le 25 mars 1990 (25/03/1990)
- **Bob** : Né le 15 juillet 1985 (15/07/1985)

**Étape 1 : Calcul des Chemins de Vie**

```
Alice : 1+9+9+0+0+3+2+5 = 29 → 2+9 = 11 ✨
Bob : 1+9+8+5+0+7+1+5 = 36 → 3+6 = 9
```

**Étape 2 : Calcul du Nombre d'Union**

```
11 + 9 = 20 → 2+0 = 2
```

**Étape 3 : Construction de la clé de compatibilité**

```
buildPairKey(11, 9) = "11-9"  // Le nombre maître vient en premier
```

**Étape 4 : Récupération des données**

Les données pour "11-9" sont recherchées dans `LifePathLoveData.json` :

```json
{
  "keywords": ["inspiration", "compassion", "croissance"],
  "description": "Le 11 inspire et élève, le 9 comprend et accompagne...",
  "strengths": "Vision commune, empathie profonde, évolution mutuelle.",
  "challenges": "Idéalisme excessif, attentes spirituelles élevées.",
  "advice": "Ancrez vos rêves dans la réalité et cultivez la patience."
}
```

Les données pour le nombre d'union 2 sont recherchées dans `UnionNumberData.json` :

```json
{
  "title": "L'Union de l'Harmonie",
  "keywords": ["coopération", "écoute", "équilibre"],
  "description": "C'est une relation fondée sur la douceur et la compréhension...",
  "strengths": "Empathie, tendresse, sens du compromis.",
  "challenges": "Dépendance émotionnelle, peur du conflit.",
  "advice": "Exprimez vos besoins sans craindre de blesser..."
}
```

**Étape 5 : Calcul du score**

```
Texte analysé : "Vision commune, empathie profonde... Idéalisme excessif..."
- Contient "compassion" → +5
- Ne contient pas de mots fortement négatifs
Score final : 70 + 5 = 75 (Très bonne compatibilité 🟢)
```

**Résultat final :**

```typescript
{
  overallScore: 75,
  compatibility: {
    lifePathCompatibility: {
      score: 75,
      description: "Le 11 inspire et élève, le 9 comprend et accompagne..."
    },
    expressionCompatibility: { score: 0, description: "À venir" },
    soulUrgeCompatibility: { score: 0, description: "À venir" },
    personalityCompatibility: { score: 0, description: "À venir" }
  },
  strengths: ["Vision commune, empathie profonde, évolution mutuelle."],
  challenges: ["Idéalisme excessif, attentes spirituelles élevées."],
  recommendations: ["Ancrez vos rêves dans la réalité et cultivez la patience."],
  unionNumber: {
    unionNumber: 2,
    detail: {
      title: "L'Union de l'Harmonie",
      keywords: ["coopération", "écoute", "équilibre"],
      description: "C'est une relation fondée sur la douceur...",
      strengths: "Empathie, tendresse, sens du compromis.",
      challenges: "Dépendance émotionnelle, peur du conflit.",
      advice: "Exprimez vos besoins sans craindre de blesser..."
    }
  }
}
```

### Exemple 2 : Deux leaders (1-1)

**Personnes :**

- **Personne A** : Chemin de Vie 1
- **Personne B** : Chemin de Vie 1

**Calculs :**

```
Clé de compatibilité : "1-1"
Nombre d'Union : 1 + 1 = 2
```

**Interprétation :**

Deux chemins de vie 1 ensemble forment une **Union des Pionniers**. Les deux partenaires sont des leaders naturels, ce qui peut créer à la fois une synergie puissante et des tensions de pouvoir.

- **Forces :** Vision partagée, motivation, désir de réussite
- **Défis :** Compétition, fierté, difficulté à céder
- **Conseil :** Transformer la rivalité en inspiration mutuelle

Le nombre d'union 2 apporte une énergie d'harmonie qui peut aider à équilibrer les deux ego forts.

### Exemple 3 : Complémentarité (2-8)

**Personnes :**

- **Personne A** : Chemin de Vie 2 (Sensible, empathique)
- **Personne B** : Chemin de Vie 8 (Ambitieux, puissant)

**Calculs :**

```
Clé de compatibilité : "2-8"
Nombre d'Union : 2 + 8 = 10 → 1+0 = 1
```

**Interprétation :**

Une relation de complémentarité où le 2 apporte la douceur et le 8 la force. Le nombre d'union 1 indique que le couple doit cultiver son indépendance et son leadership commun.

---

## 🎨 Design et Interface Utilisateur

### LoveTab - Onglet Amour

L'onglet d'analyse amoureuse a été conçu avec une attention particulière aux détails visuels et à l'expérience utilisateur.

#### En-têtes harmonisés

Tous les en-têtes de sections utilisent le même design élégant :

- **Style** : Fond semi-transparent avec effet de flou (`backdrop-filter: blur(20px)`)
- **Bordures** : Arrondies (24px) avec ombre portée subtile
- **Layout** : Disposition symétrique avec informations des deux personnes de chaque côté
- **Séparateur central** : Icône de cœur avec titre de la section
- **Effet hover** : Animation de lift (`translateY(-2px)`) sur les infos des personnes

**Sections avec en-tête harmonisé :**

1. Compatibilité des Chemins de Vie (en haut de page)
2. Compatibilité des Nombres d'Expression

#### Badges numériques

Les badges affichent les nombres numérologiques avec des styles spécifiques :

- **Chemins de Vie** : Gradient violet (`#667eea` → `#764ba2`)
- **Nombres d'Union** : Gradient rouge/rose (`#e11d48` → `#be123c`)
- **Nombres d'Expression** : Gradient violet/indigo (`#8b5cf6` → `#6366f1`)

Tous les badges ont :

- Taille : 60px × 60px
- Forme : Cercle parfait
- Ombre portée pour effet de profondeur
- Text-shadow pour meilleure lisibilité

#### Titres dorés animés (`.golden-title`)

Les titres des sections Nombre d'Union et Nombres d'Expression partagent un style doré magnifique :

```css
.golden-title {
  /* Gradient doré animé */
  background: linear-gradient(
    135deg,
    #d4af37 0%,
    #f8e5a0 25%,
    #d4af37 50%,
    #f4d03f 75%,
    #d4af37 100%
  );
  background-size: 300% auto;
  animation: union-gradient 3s ease-in-out infinite;

  /* Lignes décoratives */
  &::before,
  &::after {
    /* Lignes dorées sous le titre */
  }

  /* Typographie élégante */
  font-family: "Cinzel", "Georgia", serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

#### Sections de contenu

Toutes les sections utilisent la classe `.love-compatibility-detail` :

```css
.love-compatibility-detail {
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--bg-tertiary);
  margin-bottom: 5rem; /* Espacement généreux entre sections */
}
```

#### Descriptions avec style de citation

Les descriptions importantes utilisent `.compatibility-description` :

- **Fond** : Gradient doré subtil avec effet de transparence
- **Bordure gauche** : 3px doré pour accentuation
- **Guillemets décoratifs** : Pseudo-éléments `::before` et `::after` avec guillemets typographiques
- **Typographie** : Police italique, taille augmentée (1.1rem)
- **Alignement** : Justifié pour un aspect professionnel

#### Forces, Défis et Conseils

Système de couleurs logique pour les analyses :

| Type         | Couleur                      | Icône       | Utilisation                 |
| ------------ | ---------------------------- | ----------- | --------------------------- |
| **Forces**   | Vert (`#10b981`)             | ❤️ Cœur     | Points forts de la relation |
| **Défis**    | Rouge (`#ef4444`)            | ⚠️ Triangle | Points d'attention          |
| **Conseils** | Or (`var(--secondary-gold)`) | 💡 Ampoule  | Recommandations             |

Chaque item est présenté dans une carte avec :

- Fond secondaire
- Bordure gauche colorée (4px)
- Padding généreux (1rem)
- Border-radius (8px)

#### Cartes dynamiques (Expression)

Les trois cartes dynamiques (Langage émotionnel, Chimie relationnelle, Potentiel de croissance) sont centrées :

```css
.dynamic-card {
  /* Layout centré */
  text-align: center;

  /* Icône centrée */
  .dynamic-icon {
    margin: 0 auto 0.75rem auto;
    /* Cercle avec gradient violet */
  }

  /* Effet hover élégant */
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(139, 92, 246, 0.15);
  }
}
```

#### Tags de vibration et connexion

Les tags affichent les caractéristiques de la relation :

```css
.expression-tags {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
}

.vibration-tag {
  /* Fond doré */
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), ...);
  border-color: rgba(212, 175, 55, 0.3);
  color: var(--secondary-gold);
}

.connection-type-tag {
  /* Fond violet */
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: var(--primary-purple);
}
```

#### Responsive Design

Sur mobile (< 768px) :

- **En-têtes** : Passent en disposition verticale
- **Séparateur** : Déplacé en première position (`order: -1`)
- **Cartes** : Grid passe à 1 colonne
- **Forces/Défis** : Container flex devient vertical
- **Padding** : Réduit pour optimiser l'espace

---

## 🏗️ Architecture technique

### Fichiers principaux

```
src/
├── components/
│   └── CompatibilityAnalyzerSection/
│       ├── CompatibilityAnalyzerSection.tsx    # Composant principal
│       ├── CompatibilityAnalyzerSection.css    # Styles globaux
│       ├── tabs/
│       │   ├── LoveTab.tsx                     # Onglet Amour ✅
│       │   ├── LoveTab.css                     # Styles spécifiques Amour
│       │   ├── FriendshipTab.tsx               # Onglet Amitié 🚧
│       │   └── WorkTab.tsx                     # Onglet Travail 🚧
│       └── shared/
│           └── types.ts                         # Types partagés
│
├── utils/
│   └── numerology/
│       ├── compatibility.ts                     # Logique de calcul
│       └── utils.ts                             # Utilitaires numérologie
│
└── data/
    └── numerology/
        └── Compatibility/
            ├── compatibilityData.json           # Métadonnées
            ├── relationshipTypes.json           # Types de relations
            └── Love/
                ├── LifePathLoveData.json        # Compatibilité chemins de vie
                ├── UnionNumberData.json         # Données nombres d'union
                └── ExpressionNumberData.json    # Compatibilité expressions ✨
```

### Flux de traitement

```
1. L'utilisateur saisit les données des deux personnes
   ↓
2. Sélection du type de relation (Amour, Amitié, Travail)
   ↓
3. Clic sur "Analyser la compatibilité"
   ↓
4. Validation des données (dates, noms)
   ↓
5. Calcul des Chemins de Vie
   ├── Extraction des chiffres de la date
   ├── Somme des chiffres
   └── Réduction à un nombre (1-9, 11, 22, 33)
   ↓
6. Calcul du Nombre d'Union
   ├── Addition des deux chemins de vie
   └── Réduction à un nombre (1-9, 11, 22, 33)
   ↓
7. Construction de la clé de compatibilité
   └── Ordre : nombre maître puis ordre croissant
   ↓
8. Récupération des données de compatibilité
   ├── Recherche dans LifePathLoveData.json
   └── Recherche dans UnionNumberData.json
   ↓
9. Calcul du score heuristique
   └── Analyse des mots-clés positifs/négatifs
   ↓
10. Construction du résultat final
    ├── Score global
    ├── Détails de compatibilité
    ├── Forces
    ├── Défis
    ├── Recommandations
    └── Nombre d'union
    ↓
11. Affichage des résultats
    └── Affichage selon le type de relation choisi
```

### Fonctions clés

#### `calculateCompatibility()`

Fonction principale qui orchestre l'analyse :

```typescript
export function calculateCompatibility(
  person1: PersonInfo,
  person2: PersonInfo,
  relationshipType: RelationshipType
): CompatibilityResult;
```

**Paramètres :**

- `person1` : Informations de la première personne
- `person2` : Informations de la deuxième personne
- `relationshipType` : Type de relation ("love", "friendship", "work")

**Retour :**

- Objet `CompatibilityResult` complet

**Logique :**

1. Redirection selon le type de relation
2. Pour "love" : appelle `calculateLoveCompatibility()`
3. Pour autres : retourne un placeholder

#### `calculateLoveCompatibility()`

Fonction spécifique pour l'analyse amoureuse :

```typescript
function calculateLoveCompatibility(
  person1: PersonInfo,
  person2: PersonInfo
): CompatibilityResult;
```

**Étapes :**

1. Calcul des chemins de vie
2. Calcul du nombre d'union
3. Récupération des données de compatibilité
4. Calcul du score heuristique
5. Structuration du résultat

#### `calculateLifePathNumber()`

Calcule le chemin de vie à partir d'une date :

```typescript
export function calculateLifePathNumber(birthDate: string): number;
```

**Paramètres :**

- `birthDate` : Date au format "YYYY-MM-DD"

**Retour :**

- Nombre de 1 à 9, ou 11, 22, 33

#### `calculateUnionNumber()`

Calcule le nombre d'union de deux chemins de vie :

```typescript
export function calculateUnionNumber(
  lifePath1: number,
  lifePath2: number
): number;
```

**Paramètres :**

- `lifePath1` : Premier chemin de vie
- `lifePath2` : Deuxième chemin de vie

**Retour :**

- Nombre de 1 à 9, ou 11, 22, 33

---

## 📝 Notes importantes

### Limitations actuelles

1. **Seule l'analyse amoureuse** est complètement implémentée
2. Les autres types de compatibilité (Expression, Âme, Personnalité) retournent "À venir"
3. Le **score heuristique** est basique et pourrait être amélioré
4. Les analyses **Amitié et Travail** ne sont pas encore implémentées

### Améliorations possibles

1. **Scores plus précis** : Algorithme de scoring plus sophistiqué
2. **Plus de types de compatibilité** :
   - Compatibilité des nombres d'expression
   - Compatibilité des nombres d'âme
   - Compatibilité des nombres de personnalité
3. **Analyses Amitié et Travail** : Données et logique spécifiques
4. **Historique des analyses** : Sauvegarde pour utilisateurs authentifiés
5. **Graphiques visuels** : Représentation visuelle des scores
6. **Comparaisons multiples** : Comparer plusieurs personnes

### Validation des données

Toutes les entrées sont validées :

- ✅ **Dates** : Format YYYY-MM-DD, chiffres valides
- ✅ **Noms** : Non vides, au moins prénom + nom de famille
- ✅ **Types de relation** : Valeurs limitées à "love", "friendship", "work"

---

## 🔗 Références

### Données JSON

Les données de compatibilité sont stockées dans :

- **`LifePathLoveData.json`** : ~81 combinaisons de chemins de vie (1-1 à 33-9)
- **`UnionNumberData.json`** : 12 nombres d'union (1 à 9, 11, 22, 33)

### Formules numérologiques

Les calculs suivent les principes traditionnels de la numérologie pythagoricienne :

- Addition théosophique (somme des chiffres)
- Réduction à un chiffre (1-9)
- Préservation des nombres maîtres (11, 22, 33)

---

## 📧 Contact et support

Pour toute question sur cette fonctionnalité ou pour signaler un bug, veuillez consulter le fichier README.md principal du projet.

---

**Version de la documentation :** 2.0  
**Dernière mise à jour :** Octobre 2025  
**Auteur :** Équipe Numora

### Changements de la version 2.0

✨ **Nouvelles fonctionnalités :**

- Ajout de l'analyse des Nombres d'Expression
- En-têtes de sections harmonisés avec design élégant
- Classe CSS commune `.golden-title` pour les titres dorés animés
- Cartes dynamiques centrées pour l'analyse d'expression
- Tags de vibration et type de connexion

🎨 **Améliorations UI :**

- Espacement généreux entre sections (5rem)
- Badges numériques avec gradients spécifiques
- Effet hover sur les cartes et en-têtes
- Design responsive optimisé
- Guillemets décoratifs dans les descriptions

🔧 **Optimisations techniques :**

- Réutilisation des classes CSS pour cohérence
- Structure harmonisée entre toutes les sections
- Meilleure organisation du code CSS
