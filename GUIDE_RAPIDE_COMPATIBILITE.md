# ⚡ Guide Rapide - Compatibilité Numérologique

Guide de démarrage rapide pour utiliser et étendre la fonctionnalité de compatibilité.

---

## 🚀 Démarrage rapide

### Utilisation de base

```typescript
import { calculateCompatibility } from "./utils/numerology/compatibility";

const person1 = {
  firstGivenName: "Alice",
  familyName: "Dupont",
  birthDate: "1990-03-25",
};

const person2 = {
  firstGivenName: "Bob",
  familyName: "Martin",
  birthDate: "1985-07-15",
};

const result = calculateCompatibility(person1, person2, "love");

console.log(result.overallScore); // 75
console.log(result.strengths); // ["Vision commune, empathie..."]
console.log(result.unionNumber?.unionNumber); // 2
```

---

## 📦 Fonctions principales

### `calculateCompatibility()`

**Fonction unique** pour toutes les analyses de compatibilité.

```typescript
calculateCompatibility(
  person1: PersonInfo,
  person2: PersonInfo,
  relationshipType: "love" | "friendship" | "work"
): CompatibilityResult
```

**Retourne :**

- `overallScore` : Score global (0-100)
- `compatibility` : Détails par type
- `strengths` : Liste des forces
- `challenges` : Liste des défis
- `recommendations` : Liste des conseils
- `unionNumber` : Détails du nombre d'union (optionnel)

---

### `calculateLifePathNumber()`

Calcule le chemin de vie à partir d'une date.

```typescript
import { calculateLifePathNumber } from "./utils/numerology/compatibility";

const lifePath = calculateLifePathNumber("1990-03-25");
console.log(lifePath); // 11
```

**Format de date :** `"YYYY-MM-DD"`

---

### `calculateUnionNumber()`

Calcule le nombre d'union de deux chemins de vie.

```typescript
import { calculateUnionNumber } from "./utils/numerology/compatibility";

const unionNumber = calculateUnionNumber(11, 9);
console.log(unionNumber); // 2
```

---

## 🎨 Utilisation dans les composants

### Exemple complet dans un composant React

```tsx
import React, { useState } from "react";
import {
  calculateCompatibility,
  type PersonInfo,
  type CompatibilityResult,
} from "../utils/numerology/compatibility";

const CompatibilityAnalyzer = () => {
  const [person1, setPerson1] = useState<PersonInfo>({
    firstGivenName: "",
    familyName: "",
    birthDate: "",
  });

  const [person2, setPerson2] = useState<PersonInfo>({
    firstGivenName: "",
    familyName: "",
    birthDate: "",
  });

  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const analyzeCompatibility = () => {
    const analysis = calculateCompatibility(person1, person2, "love");
    setResult(analysis);
  };

  return (
    <div>
      {/* Formulaires pour person1 et person2 */}

      <button onClick={analyzeCompatibility}>Analyser</button>

      {result && (
        <div>
          <h2>Score : {result.overallScore}/100</h2>

          {/* Affichage des forces */}
          <div>
            <h3>Forces</h3>
            {result.strengths.map((strength, index) => (
              <p key={index}>{strength}</p>
            ))}
          </div>

          {/* Affichage du nombre d'union */}
          {result.unionNumber && (
            <div>
              <h3>Nombre d'Union : {result.unionNumber.unionNumber}</h3>
              <h4>{result.unionNumber.detail?.title}</h4>
              <p>{result.unionNumber.detail?.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
```

---

## 🔧 Ajout de nouvelles données

### Ajouter une nouvelle combinaison de chemins de vie

**Fichier :** `src/data/numerology/Compatibility/Love/LifePathLoveData.json`

```json
{
  "3-7": {
    "keywords": ["créativité", "profondeur", "introspection"],
    "description": "Le 3 exprime, le 7 médite. Une relation qui mêle légèreté et profondeur.",
    "strengths": "Complémentarité, enrichissement mutuel.",
    "challenges": "Différence de rythme, superficialité vs isolement.",
    "advice": "Le 3 doit écouter, le 7 doit s'ouvrir."
  }
}
```

**Règles pour la clé :**

1. Nombres maîtres (11, 22, 33) en premier
2. Sinon, ordre croissant
3. Format : `"nombre1-nombre2"`

**Exemples :**

- `1-7` ✅
- `7-1` ❌ (utiliser `1-7`)
- `11-5` ✅ (nombre maître en premier)
- `5-11` ❌ (utiliser `11-5`)

---

### Ajouter un nouveau nombre d'union

**Fichier :** `src/data/numerology/Compatibility/Love/UnionNumberData.json`

```json
{
  "5": {
    "title": "L'Union de la Liberté",
    "keywords": ["aventure", "mouvement", "renouveau"],
    "description": "Une relation vibrante et pleine d'expériences...",
    "strengths": "Passion, curiosité, ouverture d'esprit.",
    "challenges": "Instabilité, besoin d'indépendance trop fort.",
    "advice": "Cultivez la confiance pour que la liberté reste un choix partagé."
  }
}
```

**Nombres possibles :**

- 1, 2, 3, 4, 5, 6, 7, 8, 9
- 11, 22, 33 (nombres maîtres)

---

## 🧪 Tests et validation

### Tester un calcul de chemin de vie

```typescript
// Test 1 : Nombre simple
const test1 = calculateLifePathNumber("1990-01-15");
// 1+9+9+0+0+1+1+5 = 26 → 2+6 = 8 ✅

// Test 2 : Nombre maître 11
const test2 = calculateLifePathNumber("1990-03-25");
// 1+9+9+0+0+3+2+5 = 29 → 2+9 = 11 ✅

// Test 3 : Nombre maître 22
const test3 = calculateLifePathNumber("1984-11-13");
// 1+9+8+4+1+1+1+3 = 28 → 2+8 = 10 → 1+0 = 1 ❌
// Essayer : "1993-11-11" → 1+9+9+3+1+1+1+1 = 26 → 2+6 = 8 ❌
// Nombre maître 22 nécessite une combinaison spécifique
```

### Tester une analyse complète

```typescript
const validateAnalysis = (result: CompatibilityResult) => {
  console.assert(result.overallScore >= 0 && result.overallScore <= 100);
  console.assert(result.strengths.length > 0);
  console.assert(result.challenges.length > 0);
  console.assert(result.recommendations.length > 0);

  if (result.unionNumber) {
    console.assert(
      result.unionNumber.unionNumber >= 1 &&
        result.unionNumber.unionNumber <= 33
    );
  }
};
```

---

## 🐛 Débogage

### Problème : Score toujours à 50

**Cause :** Les données de compatibilité ne sont pas trouvées.

**Solution :**

1. Vérifier que la clé existe dans `LifePathLoveData.json`
2. Vérifier l'ordre de la clé (nombre maître en premier, sinon croissant)
3. Vérifier le type de relation (seul "love" est implémenté)

```typescript
// Debug
const lifePath1 = calculateLifePathNumber(person1.birthDate);
const lifePath2 = calculateLifePathNumber(person2.birthDate);
console.log(`Chemins de vie: ${lifePath1} et ${lifePath2}`);

const key = buildPairKey(lifePath1, lifePath2);
console.log(`Clé recherchée: ${key}`);
// Vérifier si cette clé existe dans LifePathLoveData.json
```

---

### Problème : unionNumber est null

**Cause :** Le nombre d'union n'existe pas dans les données.

**Solution :**

1. Vérifier que le nombre d'union est bien calculé
2. Vérifier que ce nombre existe dans `UnionNumberData.json`

```typescript
// Debug
const unionNumber = calculateUnionNumber(lifePath1, lifePath2);
console.log(`Nombre d'union: ${unionNumber}`);
// Vérifier si ce nombre existe dans UnionNumberData.json
```

---

## 📊 Scoring personnalisé

### Modifier l'heuristique de score

**Fichier :** `src/utils/numerology/compatibility.ts`

```typescript
function computeHeuristicScore(detail: LifePathLoveDetail | null): number {
  if (!detail) return 50;

  let score = 70; // Score de base

  const text =
    `${detail.strengths} ${detail.challenges} ${detail.description}`.toLowerCase();

  // Ajouter vos propres règles
  if (/passion|amour|harmonie/.test(text)) score += 10;
  if (/conflit|tension|jalousie/.test(text)) score -= 15;
  if (/équilibre|complémentarité/.test(text)) score += 5;

  // Limites
  return Math.max(30, Math.min(90, score));
}
```

---

### Système de scoring avancé

Pour un scoring plus sophistiqué, vous pouvez ajouter un champ `score` directement dans les données JSON :

```json
{
  "1-2": {
    "score": 78,
    "keywords": ["complémentarité", "douceur", "équilibre"]
    // ...
  }
}
```

Puis modifier le code :

```typescript
function getLoveCompatibilityScore(detail: LifePathLoveDetail): number {
  // Utiliser le score manuel s'il existe
  if ("score" in detail && typeof detail.score === "number") {
    return detail.score;
  }
  // Sinon, utiliser l'heuristique
  return computeHeuristicScore(detail);
}
```

---

## 🔄 Étendre à d'autres types de relations

### Implémenter l'analyse d'amitié

1. **Créer les données :**

```
src/data/numerology/Compatibility/Friends/
  ├── LifePathFriendshipData.json
  └── UnionNumberFriendshipData.json
```

2. **Créer la fonction :**

```typescript
function calculateFriendshipCompatibility(
  person1: PersonInfo,
  person2: PersonInfo
): CompatibilityResult {
  const lifePath1 = calculateLifePathNumber(person1.birthDate);
  const lifePath2 = calculateLifePathNumber(person2.birthDate);

  // Importer les données d'amitié
  const detail = getFriendshipDetailForLifePaths(lifePath1, lifePath2);

  // Même logique que pour l'amour
  // ...

  return result;
}
```

3. **Modifier le switch :**

```typescript
export function calculateCompatibility(
  person1: PersonInfo,
  person2: PersonInfo,
  relationshipType: RelationshipType
): CompatibilityResult {
  switch (relationshipType) {
    case "love":
      return calculateLoveCompatibility(person1, person2);
    case "friendship":
      return calculateFriendshipCompatibility(person1, person2); // ✅
    case "work":
      return calculateWorkCompatibility(person1, person2); // À faire
    default:
      return placeholderResult();
  }
}
```

---

## 📝 Checklist avant déploiement

### Nouvelles données

- [ ] Toutes les clés respectent le format correct
- [ ] Tous les champs requis sont présents
- [ ] Orthographe et grammaire vérifiées
- [ ] Mots-clés pertinents (3 par entrée)
- [ ] Descriptions équilibrées et bienveillantes
- [ ] Conseils actionnables
- [ ] JSON valide (pas d'erreur de syntaxe)

### Nouveau code

- [ ] TypeScript compile sans erreur
- [ ] Pas d'erreur de linter
- [ ] Tests manuels effectués
- [ ] Cas limites testés (nombres maîtres, dates invalides)
- [ ] Documentation mise à jour
- [ ] Types TypeScript corrects

---

## 🆘 FAQ

### Q: Pourquoi certains scores sont toujours 50 ?

**R:** Le score de 50 est le score par défaut quand les données de compatibilité ne sont pas trouvées. Vérifiez que la clé existe dans `LifePathLoveData.json`.

---

### Q: Comment ajouter un nombre maître 44 ou 55 ?

**R:** En numérologie traditionnelle, seuls 11, 22 et 33 sont des nombres maîtres. Les autres (44, 55, etc.) sont réduits. Si vous souhaitez les ajouter, modifiez la constante `MASTER_NUMBERS` dans `utils.ts`.

---

### Q: Peut-on avoir un score > 90 ou < 30 ?

**R:** Non, l'heuristique limite le score entre 30 et 90 pour éviter des extrêmes trop marqués. Vous pouvez modifier ces limites dans `computeHeuristicScore()`.

---

### Q: Comment tester avec des dates spécifiques ?

**R:** Utilisez le calculateur en ligne de chemin de vie pour trouver des dates correspondant au chemin souhaité :

- Chemin 1 : "1990-01-09" (1+9+9+0+0+1+0+9=29→11→2) ❌ Réessayer
- Chemin 1 : "2000-10-08" (2+0+0+0+1+0+0+8=11→2) ❌ Réessayer
- Chemin 1 : "1990-01-01" (1+9+9+0+0+1+0+1=21→3) ❌ Réessayer
- Chemin 1 : "2000-09-10" (2+0+0+0+0+9+1+0=12→3) ❌ Réessayer

**Astuce :** Inversez le calcul. Pour obtenir un chemin 1 :

- Somme des chiffres doit donner 1, 10, 19, 28, 37, 46...
- Exemple : "1999-01-08" → 1+9+9+9+0+1+0+8 = 37 → 3+7 = 10 → 1+0 = 1 ✅

---

### Q: Pourquoi "friendship" et "work" retournent des données vides ?

**R:** Ces types de relations ne sont pas encore implémentés. Seule l'analyse amoureuse ("love") est complète actuellement.

---

## 📚 Ressources

- **Documentation complète :** `DOCUMENTATION_COMPATIBILITE.md`
- **Exemples de données :** `EXEMPLES_DONNEES_COMPATIBILITE.md`
- **Code source :** `src/utils/numerology/compatibility.ts`
- **Données JSON :** `src/data/numerology/Compatibility/`

---

**Version :** 1.0  
**Dernière mise à jour :** Octobre 2025
