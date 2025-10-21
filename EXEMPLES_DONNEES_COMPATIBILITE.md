# 📊 Exemples de données - Compatibilité Numérologique

Ce document contient des exemples concrets de données utilisées dans l'analyse de compatibilité.

---

## 📁 Structure des fichiers JSON

### LifePathLoveData.json

Ce fichier contient toutes les combinaisons possibles de chemins de vie pour l'analyse amoureuse.

**Format de clé :** `"nombre1-nombre2"` (ordre: nombre maître puis croissant)

**Structure complète d'une entrée :**

```json
{
  "1-2": {
    "keywords": ["complémentarité", "douceur", "équilibre"],
    "description": "Le 1 aime diriger, le 2 aime soutenir : cette relation mêle force et sensibilité. Le 1 apporte la direction, le 2 l'harmonie. Ensemble, ils trouvent un bel équilibre entre action et émotion.",
    "strengths": "Tendresse, loyauté, compréhension intuitive.",
    "challenges": "Différence de rythme, dépendance affective.",
    "advice": "Le 1 doit apprendre la douceur, le 2 la confiance en soi."
  }
}
```

**Champs :**

| Champ         | Type       | Description                                     | Longueur recommandée |
| ------------- | ---------- | ----------------------------------------------- | -------------------- |
| `keywords`    | `string[]` | 3 mots-clés caractérisant la relation           | 3 mots               |
| `description` | `string`   | Description détaillée de la dynamique du couple | 150-300 caractères   |
| `strengths`   | `string`   | Points forts de la relation                     | 50-100 caractères    |
| `challenges`  | `string`   | Défis et points d'attention                     | 50-100 caractères    |
| `advice`      | `string`   | Conseil pour harmoniser la relation             | 80-150 caractères    |

---

### UnionNumberData.json

Ce fichier contient les interprétations des 12 nombres d'union possibles (1-9, 11, 22, 33).

**Format de clé :** `"nombre"` (de 1 à 9, puis 11, 22, 33)

**Structure complète d'une entrée :**

```json
{
  "6": {
    "title": "L'Union du Cœur",
    "keywords": ["amour", "famille", "harmonie"],
    "description": "C'est une union fondée sur l'amour inconditionnel, la loyauté et le besoin de créer un foyer chaleureux. Vous avez à cœur de prendre soin l'un de l'autre.",
    "strengths": "Dévouement, stabilité affective, sens du lien.",
    "challenges": "Jalousie, attentes excessives, sacrifice.",
    "advice": "Aimez avec équilibre : donnez sans vous oublier."
  }
}
```

**Champs :**

| Champ         | Type       | Description                                  | Longueur recommandée |
| ------------- | ---------- | -------------------------------------------- | -------------------- |
| `title`       | `string`   | Nom symbolique de l'union                    | 15-30 caractères     |
| `keywords`    | `string[]` | 3 mots-clés de l'énergie du couple           | 3 mots               |
| `description` | `string`   | Explication de l'énergie créée par le couple | 150-250 caractères   |
| `strengths`   | `string`   | Forces de cette union                        | 50-100 caractères    |
| `challenges`  | `string`   | Défis de cette union                         | 50-100 caractères    |
| `advice`      | `string`   | Recommandation pour cette union              | 80-150 caractères    |

---

## 🎯 Exemples complets par type de relation

### Exemple 1 : Relation harmonieuse (3-6)

**Contexte :**

- Chemin de Vie 3 : Créatif, expressif, joyeux
- Chemin de Vie 6 : Aimant, protecteur, familial
- Nombre d'Union : 3 + 6 = 9

**Données de compatibilité (3-6) :**

```json
{
  "keywords": ["harmonie", "créativité", "amour"],
  "description": "Le 3 illumine par sa joie, le 6 nourrit par son amour. Ensemble, ils forment un couple chaleureux où l'expression et l'affection se rencontrent. Le 3 apporte la légèreté, le 6 la stabilité affective.",
  "strengths": "Tendresse, rires, vie de famille harmonieuse.",
  "challenges": "Le 6 peut étouffer le 3, le 3 peut sembler superficiel au 6.",
  "advice": "Le 3 doit montrer son engagement, le 6 laisser de la liberté."
}
```

**Données du nombre d'union 9 :**

```json
{
  "title": "L'Union Universelle",
  "keywords": ["compassion", "sagesse", "ouverture"],
  "description": "Votre couple porte une énergie d'amour universel et de sagesse. Ensemble, vous vous souciez du monde et cherchez à contribuer à quelque chose de plus grand que vous.",
  "strengths": "Empathie, générosité, vision large.",
  "challenges": "Idéalisme, difficulté à se concentrer sur l'intime.",
  "advice": "N'oubliez pas de nourrir votre relation avant de nourrir le monde."
}
```

**Résultat de l'analyse :**

```typescript
{
  overallScore: 75,  // Score heuristique (harmonie + amour = mots positifs)
  compatibility: {
    lifePathCompatibility: {
      score: 75,
      description: "Le 3 illumine par sa joie, le 6 nourrit par son amour..."
    },
    expressionCompatibility: { score: 0, description: "À venir" },
    soulUrgeCompatibility: { score: 0, description: "À venir" },
    personalityCompatibility: { score: 0, description: "À venir" }
  },
  strengths: [
    "Tendresse, rires, vie de famille harmonieuse."
  ],
  challenges: [
    "Le 6 peut étouffer le 3, le 3 peut sembler superficiel au 6."
  ],
  recommendations: [
    "Le 3 doit montrer son engagement, le 6 laisser de la liberté."
  ],
  unionNumber: {
    unionNumber: 9,
    detail: {
      title: "L'Union Universelle",
      keywords: ["compassion", "sagesse", "ouverture"],
      description: "Votre couple porte une énergie d'amour universel...",
      strengths: "Empathie, générosité, vision large.",
      challenges: "Idéalisme, difficulté à se concentrer sur l'intime.",
      advice: "N'oubliez pas de nourrir votre relation avant de nourrir le monde."
    }
  }
}
```

---

### Exemple 2 : Relation intense (5-8)

**Contexte :**

- Chemin de Vie 5 : Liberté, aventure, changement
- Chemin de Vie 8 : Pouvoir, ambition, succès
- Nombre d'Union : 5 + 8 = 13 → 1 + 3 = 4

**Données de compatibilité (5-8) :**

```json
{
  "keywords": ["passion", "ambition", "mouvement"],
  "description": "Le 5 cherche la liberté, le 8 le contrôle. Cette relation peut être explosive mais aussi très stimulante. Ensemble, ils peuvent conquérir le monde s'ils respectent leurs différences.",
  "strengths": "Passion, énergie débordante, esprit d'entreprise.",
  "challenges": "Lutte de pouvoir, besoin de domination vs besoin de liberté.",
  "advice": "Le 8 doit lâcher prise, le 5 doit s'engager davantage."
}
```

**Données du nombre d'union 4 :**

```json
{
  "title": "L'Union du Bâtisseur",
  "keywords": ["stabilité", "engagement", "structure"],
  "description": "Votre couple repose sur des bases solides. Vous cherchez la sécurité, la loyauté et la construction à long terme. Ensemble, vous bâtissez quelque chose de concret et durable.",
  "strengths": "Fiabilité, constance, loyauté.",
  "challenges": "Rigidité, routine, contrôle excessif.",
  "advice": "Accueillez le changement comme un moyen de renforcer vos fondations, pas de les menacer."
}
```

**Résultat de l'analyse :**

```typescript
{
  overallScore: 60,  // Score modéré (mots négatifs: domination, contrôle)
  compatibility: {
    lifePathCompatibility: {
      score: 60,
      description: "Le 5 cherche la liberté, le 8 le contrôle..."
    },
    // ... autres à venir
  },
  strengths: [
    "Passion, énergie débordante, esprit d'entreprise."
  ],
  challenges: [
    "Lutte de pouvoir, besoin de domination vs besoin de liberté."
  ],
  recommendations: [
    "Le 8 doit lâcher prise, le 5 doit s'engager davantage."
  ],
  unionNumber: {
    unionNumber: 4,
    detail: {
      title: "L'Union du Bâtisseur",
      keywords: ["stabilité", "engagement", "structure"],
      description: "Votre couple repose sur des bases solides...",
      strengths: "Fiabilité, constance, loyauté.",
      challenges: "Rigidité, routine, contrôle excessif.",
      advice: "Accueillez le changement comme un moyen de renforcer vos fondations..."
    }
  }
}
```

**Interprétation :**

Bien que la compatibilité des chemins de vie soit modérée (60), le nombre d'union 4 apporte une énergie de stabilité qui peut aider à ancrer cette relation intense. Le défi sera de trouver un équilibre entre liberté et structure.

---

### Exemple 3 : Relation avec nombre maître (11-5)

**Contexte :**

- Chemin de Vie 11 : Intuition, inspiration, spiritualité (nombre maître)
- Chemin de Vie 5 : Liberté, aventure, expérience
- Nombre d'Union : 11 + 5 = 16 → 1 + 6 = 7

**Données de compatibilité (11-5) :**

```json
{
  "keywords": ["inspiration", "aventure", "éveil"],
  "description": "Le 11 apporte la dimension spirituelle, le 5 la dimension terrestre et expérientielle. Ensemble, ils peuvent vivre une relation riche en découvertes intérieures et extérieures.",
  "strengths": "Ouverture d'esprit, curiosité spirituelle, passion.",
  "challenges": "Le 11 peut être trop idéaliste, le 5 trop instable.",
  "advice": "Le 11 doit s'ancrer, le 5 doit s'ouvrir à la spiritualité."
}
```

**Données du nombre d'union 7 :**

```json
{
  "title": "L'Union Spirituelle",
  "keywords": ["introspection", "profondeur", "connexion d'âme"],
  "description": "Une relation de l'esprit et de l'âme. Vous vous comprenez souvent sans mots. Ensemble, vous cherchez la vérité, la sagesse et la sérénité.",
  "strengths": "Lien intuitif, compréhension mutuelle, paix intérieure.",
  "challenges": "Isolement, distance émotionnelle.",
  "advice": "Partagez vos réflexions et émotions pour nourrir la complicité terrestre autant que spirituelle."
}
```

**Clé de compatibilité :**

```typescript
buildPairKey(11, 5);
// Résultat: "11-5"
// Explication: 11 est un nombre maître, donc il vient en premier
```

**Résultat de l'analyse :**

```typescript
{
  overallScore: 75,
  compatibility: {
    lifePathCompatibility: {
      score: 75,
      description: "Le 11 apporte la dimension spirituelle, le 5 la dimension terrestre..."
    },
    // ... autres à venir
  },
  strengths: [
    "Ouverture d'esprit, curiosité spirituelle, passion."
  ],
  challenges: [
    "Le 11 peut être trop idéaliste, le 5 trop instable."
  ],
  recommendations: [
    "Le 11 doit s'ancrer, le 5 doit s'ouvrir à la spiritualité."
  ],
  unionNumber: {
    unionNumber: 7,
    detail: {
      title: "L'Union Spirituelle",
      keywords: ["introspection", "profondeur", "connexion d'âme"],
      description: "Une relation de l'esprit et de l'âme...",
      strengths: "Lien intuitif, compréhension mutuelle, paix intérieure.",
      challenges: "Isolement, distance émotionnelle.",
      advice: "Partagez vos réflexions et émotions pour nourrir la complicité..."
    }
  }
}
```

---

## 🔍 Toutes les combinaisons disponibles

### Chemins de vie classiques (1-9)

**Total : 45 combinaisons**

```
1-1, 1-2, 1-3, 1-4, 1-5, 1-6, 1-7, 1-8, 1-9
2-2, 2-3, 2-4, 2-5, 2-6, 2-7, 2-8, 2-9
3-3, 3-4, 3-5, 3-6, 3-7, 3-8, 3-9
4-4, 4-5, 4-6, 4-7, 4-8, 4-9
5-5, 5-6, 5-7, 5-8, 5-9
6-6, 6-7, 6-8, 6-9
7-7, 7-8, 7-9
8-8, 8-9
9-9
```

### Avec nombres maîtres (11, 22, 33)

**Total additionnel : 36 combinaisons**

```
11-1, 11-2, 11-3, 11-4, 11-5, 11-6, 11-7, 11-8, 11-9, 11-11, 11-22, 11-33
22-1, 22-2, 22-3, 22-4, 22-5, 22-6, 22-7, 22-8, 22-9, 22-22, 22-33
33-1, 33-2, 33-3, 33-4, 33-5, 33-6, 33-7, 33-8, 33-9, 33-33
```

**Total général : 81 combinaisons possibles**

---

## 📊 Distribution des scores

Basé sur l'heuristique actuelle, voici une distribution approximative :

### Scores élevés (75-90)

Combinaisons avec beaucoup de mots positifs dans les données :

```
1-2 (complémentarité, harmonie)
2-6 (amour, harmonie, stabilité)
3-6 (créativité, amour)
6-9 (compassion, amour universel)
etc.
```

### Scores moyens (60-74)

Combinaisons équilibrées entre forces et défis :

```
1-5 (passion mais instabilité)
4-8 (ambition mais rigidité)
5-7 (curiosité mais distance)
etc.
```

### Scores modérés (40-59)

Combinaisons avec des défis significatifs :

```
1-8 (compétition, domination)
4-5 (liberté vs contrôle)
7-8 (introspection vs action)
etc.
```

---

## 🎨 Exemples de phrases selon le score

### Score 85+ (Excellente)

```
"Vous formez un couple exceptionnel ! Votre compatibilité numérologique révèle une harmonie rare et profonde."
```

### Score 70-84 (Très bonne)

```
"Une très belle compatibilité ! Vous partagez une énergie harmonieuse qui favorise l'épanouissement mutuel."
```

### Score 55-69 (Bonne)

```
"Votre compatibilité est prometteuse. Avec de la communication et des efforts mutuels, votre relation peut s'épanouir pleinement."
```

### Score 40-54 (Modérée)

```
"Votre relation présente des défis, mais aussi des opportunités de croissance. L'engagement et la compréhension mutuelle seront vos meilleurs alliés."
```

### Score <40 (Défiante)

```
"Votre relation demande des efforts importants. Les différences sont marquées, mais avec une volonté commune, tout est possible."
```

---

## 🛠️ Template pour ajouter de nouvelles données

### Nouveau couple de chemins de vie

```json
{
  "X-Y": {
    "keywords": ["mot1", "mot2", "mot3"],
    "description": "Description détaillée de la dynamique. Parlez des forces naturelles et des défis potentiels. Expliquez comment les deux énergies interagissent.",
    "strengths": "Point fort 1, point fort 2, point fort 3.",
    "challenges": "Défi 1, défi 2.",
    "advice": "Conseil pratique pour harmoniser la relation et surmonter les défis."
  }
}
```

### Nouveau nombre d'union

```json
{
  "X": {
    "title": "L'Union de [Concept Principal]",
    "keywords": ["caractéristique1", "caractéristique2", "caractéristique3"],
    "description": "Description de l'énergie créée par ce nombre d'union. Expliquez ce que le couple construit ensemble, leur mission commune.",
    "strengths": "Force principale de cette union.",
    "challenges": "Défi principal de cette union.",
    "advice": "Conseil pour maximiser cette énergie d'union."
  }
}
```

---

## 📈 Statistiques des données

### LifePathLoveData.json

- **Nombre total d'entrées :** 81
- **Combinaisons 1-9 uniquement :** 45
- **Combinaisons avec nombres maîtres :** 36
- **Nombre moyen de mots par description :** ~150
- **Nombre de mots-clés par entrée :** 3

### UnionNumberData.json

- **Nombre total d'entrées :** 12
- **Nombres simples (1-9) :** 9
- **Nombres maîtres (11, 22, 33) :** 3
- **Nombre moyen de mots par description :** ~120
- **Nombre de mots-clés par entrée :** 3

---

## ⚠️ Notes importantes

### Cohérence des données

Pour maintenir la qualité de l'analyse, assurez-vous que :

1. **Les mots-clés sont pertinents** et reflètent vraiment l'essence de la relation
2. **Les descriptions sont équilibrées** (ni trop positives, ni trop négatives)
3. **Les conseils sont actionnables** et bienveillants
4. **Le ton est professionnel** mais chaleureux

### Mots-clés influençant le score

**Mots positifs** (+5 points) :

- complémentarité
- harmonie
- fidélité
- loyauté
- inspiration
- amour

**Mots négatifs** (-10 points) :

- conflit
- tension
- jalousie
- domination
- instabilité
- rigidité

### Validation des nouvelles données

Avant d'ajouter de nouvelles données :

1. ✅ Vérifier l'orthographe et la grammaire
2. ✅ S'assurer que la clé respecte le format (nombre maître puis ordre croissant)
3. ✅ Vérifier que tous les champs requis sont présents
4. ✅ Tester avec l'interface pour voir le rendu
5. ✅ Vérifier la cohérence avec les autres entrées

---

**Dernière mise à jour :** Octobre 2025  
**Maintenu par :** Équipe Numora
