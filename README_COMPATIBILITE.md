# 📘 Documentation - Analyse de Compatibilité Numérologique

Bienvenue dans la documentation complète de la fonctionnalité d'analyse de compatibilité numérologique de Numora.

---

## 📚 Documentation disponible

Cette documentation est organisée en plusieurs fichiers pour faciliter la navigation :

### 1. 📖 [Documentation Complète](./DOCUMENTATION_COMPATIBILITE.md)

**Pour qui :** Développeurs, chefs de projet, curieux

**Contenu :**

- Vue d'ensemble de la fonctionnalité
- Concepts de base (Chemin de Vie, Nombre d'Union)
- Calculs numériques détaillés avec exemples
- Types de relations (Amour, Amitié, Travail)
- Structure des données et interfaces TypeScript
- Système de scoring et son fonctionnement
- Exemples concrets d'analyses
- Architecture technique complète

**📄 Pages :** ~50 sections détaillées

---

### 2. 📊 [Exemples de Données](./EXEMPLES_DONNEES_COMPATIBILITE.md)

**Pour qui :** Rédacteurs de contenu, data managers, développeurs

**Contenu :**

- Structure des fichiers JSON
- Exemples complets par type de relation
- Templates pour ajouter de nouvelles données
- Toutes les combinaisons disponibles (81 au total)
- Distribution des scores
- Statistiques des données
- Guide de validation des nouvelles données

**📄 Pages :** Exemples concrets et templates prêts à l'emploi

---

### 3. ⚡ [Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md)

**Pour qui :** Développeurs qui veulent démarrer rapidement

**Contenu :**

- Démarrage rapide avec code
- Fonctions principales et leur utilisation
- Exemples d'intégration dans React
- Guide pour ajouter de nouvelles données
- Tests et validation
- Débogage des problèmes courants
- FAQ
- Checklist avant déploiement

**📄 Pages :** Guide pratique avec code copy-paste

---

## 🚀 Par où commencer ?

### Si vous êtes...

#### 👨‍💻 **Développeur débutant sur le projet**

1. Commencez par le **[Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md)** pour voir les exemples de code
2. Lisez la section "Calculs numériques" de la **[Documentation Complète](./DOCUMENTATION_COMPATIBILITE.md)**
3. Consultez les **[Exemples de Données](./EXEMPLES_DONNEES_COMPATIBILITE.md)** pour comprendre la structure JSON

#### 📝 **Rédacteur de contenu / Data Manager**

1. Lisez la section "Concepts de base" de la **[Documentation Complète](./DOCUMENTATION_COMPATIBILITE.md)**
2. Étudiez les **[Exemples de Données](./EXEMPLES_DONNEES_COMPATIBILITE.md)** en détail
3. Utilisez les templates fournis pour créer de nouvelles entrées
4. Suivez la checklist du **[Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md)** avant d'ajouter des données

#### 🏗️ **Architecte / Chef de projet**

1. Lisez la **[Documentation Complète](./DOCUMENTATION_COMPATIBILITE.md)** de bout en bout
2. Consultez la section "Architecture technique" pour comprendre l'organisation du code
3. Vérifiez la section "Limitations actuelles" pour connaître les évolutions possibles

#### 🐛 **Débugger / Mainteneur**

1. Consultez la section "Débogage" du **[Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md)**
2. Référez-vous à la FAQ pour les problèmes courants
3. Utilisez les tests de validation fournis

---

## 🎯 Aperçu rapide

### Qu'est-ce que c'est ?

L'**Analyse de Compatibilité Numérologique** permet d'évaluer la compatibilité entre deux personnes en utilisant :

1. **Le Chemin de Vie** de chaque personne (calculé à partir de la date de naissance)
2. **Le Nombre d'Union** du couple (somme des deux chemins de vie)
3. **Des données numérologiques détaillées** (81 combinaisons pour l'amour)

### Comment ça marche ?

```typescript
// Entrée
const person1 = {
  firstGivenName: "Alice",
  familyName: "Dupont",
  birthDate: "1990-03-25"  // Chemin de Vie = 11
};

const person2 = {
  firstGivenName: "Bob",
  familyName: "Martin",
  birthDate: "1985-07-15"  // Chemin de Vie = 9
};

// Analyse
const result = calculateCompatibility(person1, person2, "love");

// Sortie
{
  overallScore: 75,                    // Score global sur 100
  strengths: [...],                     // Forces de la relation
  challenges: [...],                    // Défis à relever
  recommendations: [...],               // Conseils personnalisés
  unionNumber: {
    unionNumber: 2,                     // 11 + 9 = 20 → 2
    detail: {
      title: "L'Union de l'Harmonie",
      description: "...",
      // ...
    }
  }
}
```

### Quels types de relations ?

| Type           | État                | Documentation               |
| -------------- | ------------------- | --------------------------- |
| 💕 **Amour**   | ✅ Complet          | 81 combinaisons disponibles |
| 👥 **Amitié**  | 🚧 En développement | Placeholder                 |
| 💼 **Travail** | 🚧 En développement | Placeholder                 |

---

## 📁 Structure des fichiers

```
Numora/
├── README_COMPATIBILITE.md              ← Vous êtes ici
├── DOCUMENTATION_COMPATIBILITE.md       ← Documentation complète
├── EXEMPLES_DONNEES_COMPATIBILITE.md    ← Exemples de données
├── GUIDE_RAPIDE_COMPATIBILITE.md        ← Guide rapide
│
└── src/
    ├── components/
    │   └── CompatibilityAnalyzerSection/
    │       ├── CompatibilityAnalyzerSection.tsx
    │       ├── tabs/
    │       │   ├── LoveTab.tsx
    │       │   ├── FriendshipTab.tsx
    │       │   └── WorkTab.tsx
    │       └── shared/
    │           └── types.ts
    │
    ├── utils/
    │   └── numerology/
    │       ├── compatibility.ts         ← Logique de calcul
    │       └── utils.ts                 ← Utilitaires
    │
    └── data/
        └── numerology/
            └── Compatibility/
                ├── Love/
                │   ├── LifePathLoveData.json      ← 81 combinaisons
                │   └── UnionNumberData.json        ← 12 nombres d'union
                ├── Friends/                        ← À venir
                └── Work/                           ← À venir
```

---

## 🔑 Concepts clés

### Chemin de Vie

Le nombre le plus important en numérologie. Calculé en additionnant tous les chiffres de la date de naissance.

**Exemple :**

```
Date : 25 mars 1990 → 1990-03-25
Calcul : 1+9+9+0+0+3+2+5 = 29 → 2+9 = 11 (nombre maître)
Chemin de Vie : 11
```

### Nombre d'Union

L'énergie vibratoire créée par l'association de deux chemins de vie.

**Exemple :**

```
Personne A : Chemin de Vie 11
Personne B : Chemin de Vie 9
Nombre d'Union : 11 + 9 = 20 → 2+0 = 2
```

### Nombres Maîtres

Les nombres **11, 22 et 33** ne sont pas réduits car ils portent une vibration spirituelle élevée.

---

## 📊 Données disponibles

### Compatibilité amoureuse

- **81 combinaisons** de chemins de vie (1-1 à 33-9)
- **12 nombres d'union** (1 à 9, 11, 22, 33)
- Chaque combinaison contient :
  - 3 mots-clés
  - Description détaillée
  - Forces
  - Défis
  - Conseils

### Exemples de combinaisons

- **1-1** : Deux leaders, énergie forte, risque de compétition
- **2-6** : Harmonie et amour, relation très équilibrée
- **5-8** : Passion et ambition, relation intense
- **11-9** : Spiritualité et compassion, relation élevée

---

## 🛠️ Utilisation rapide

### Installation

```bash
# Les dépendances sont déjà incluses dans le projet
npm install
```

### Exemple de code

```tsx
import { calculateCompatibility } from "./utils/numerology/compatibility";

const analyzeCouple = () => {
  const result = calculateCompatibility(
    {
      firstGivenName: "Alice",
      familyName: "Dupont",
      birthDate: "1990-03-25",
    },
    {
      firstGivenName: "Bob",
      familyName: "Martin",
      birthDate: "1985-07-15",
    },
    "love"
  );

  console.log(`Score: ${result.overallScore}/100`);
  console.log(`Nombre d'union: ${result.unionNumber?.unionNumber}`);
};
```

---

## 🐛 Problèmes courants

### Score toujours à 50

**Cause :** Données de compatibilité introuvables

**Solution :** Vérifier que la clé existe dans `LifePathLoveData.json`

Voir la section **Débogage** du [Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md#-débogage)

---

### unionNumber est null

**Cause :** Le nombre d'union n'existe pas dans les données

**Solution :** Vérifier que le nombre est dans `UnionNumberData.json` (1-9, 11, 22, 33)

---

### Type de relation ne fonctionne pas

**Cause :** Seul "love" est implémenté actuellement

**Solution :** Utiliser `"love"` comme type ou implémenter les autres types

---

## 🚀 Prochaines étapes

### Fonctionnalités à venir

- [ ] **Analyse Amitié** : Compatibilité amicale complète
- [ ] **Analyse Travail** : Compatibilité professionnelle
- [ ] **Compatibilité Expression** : Basée sur les prénoms
- [ ] **Compatibilité Âme** : Basée sur les voyelles
- [ ] **Compatibilité Personnalité** : Basée sur les consonnes
- [ ] **Historique** : Sauvegarde des analyses pour utilisateurs connectés
- [ ] **Graphiques** : Visualisation des scores
- [ ] **Export PDF** : Téléchargement des résultats

### Comment contribuer

1. **Ajouter des données** : Suivez le template dans [Exemples de Données](./EXEMPLES_DONNEES_COMPATIBILITE.md)
2. **Améliorer le scoring** : Modifiez `computeHeuristicScore()` dans `compatibility.ts`
3. **Implémenter un nouveau type** : Suivez le guide dans [Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md#-étendre-à-dautres-types-de-relations)
4. **Améliorer la doc** : Ajoutez des exemples ou clarifications

---

## 📈 Statistiques

- **Lignes de code** : ~500 (TypeScript)
- **Combinaisons de données** : 81 (amour)
- **Nombres d'union** : 12
- **Types supportés** : 1/3 (amour complet)
- **Score moyen** : ~70/100
- **Temps de calcul** : < 10ms

---

## 📞 Support

Pour toute question ou problème :

1. Consultez la **FAQ** dans le [Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md#-faq)
2. Lisez la section **Débogage** du [Guide Rapide](./GUIDE_RAPIDE_COMPATIBILITE.md#-débogage)
3. Vérifiez les **Exemples** dans la [Documentation Complète](./DOCUMENTATION_COMPATIBILITE.md#-exemples-concrets)
4. Contactez l'équipe de développement

---

## 📜 Licence et crédits

**Projet :** Numora - Plateforme de numérologie  
**Fonctionnalité :** Analyse de Compatibilité  
**Version :** 1.0  
**Date :** Octobre 2025

**Équipe :**

- Développement : Équipe Numora
- Données numérologiques : Basées sur la numérologie pythagoricienne traditionnelle
- Documentation : Octobre 2025

---

## 🔗 Liens rapides

| Document                  | Description                        | Lien                                          |
| ------------------------- | ---------------------------------- | --------------------------------------------- |
| 📖 Documentation complète | Tout savoir sur la compatibilité   | [Ouvrir](./DOCUMENTATION_COMPATIBILITE.md)    |
| 📊 Exemples de données    | Structure JSON et templates        | [Ouvrir](./EXEMPLES_DONNEES_COMPATIBILITE.md) |
| ⚡ Guide rapide           | Démarrage rapide pour développeurs | [Ouvrir](./GUIDE_RAPIDE_COMPATIBILITE.md)     |

---

**Bonne lecture ! 📚**
