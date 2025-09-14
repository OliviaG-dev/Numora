# 🚀 Exemples d'Utilisation - Numora

## 📁 Contenu

Ce dossier contient des exemples pratiques d'utilisation des fonctions numérologiques de l'application Numora.

## 📄 Fichiers

### `numerology-example.ts`

Exemple complet d'utilisation des fonctions numérologiques avec :

- Calcul d'analyse numérologique complète
- Affichage formaté des résultats
- Validation des entrées
- Génération de rapports HTML
- Exemples d'utilisation

## 🔧 Utilisation

### Import des fonctions

```typescript
import {
  calculateNumerologyAnalysis,
  displayNumerologyAnalysis,
  generateNumerologyReport,
} from "../examples/numerology-example";
```

### Calcul simple

```typescript
const results = calculateNumerologyAnalysis("1990-03-15", "Marie Dupont");
console.log(results.lifePath.number); // 1
console.log(results.expression.number); // 9
```

### Affichage formaté

```typescript
displayNumerologyAnalysis("1990-03-15", "Marie Dupont");
// Affiche une analyse complète dans la console
```

### Génération de rapport HTML

```typescript
const htmlReport = generateNumerologyReport("1990-03-15", "Marie Dupont");
document.getElementById("report").innerHTML = htmlReport;
```

## 🧪 Tests

Pour tester les exemples :

```typescript
import { runExamples } from "../examples/numerology-example";

// Exécuter tous les exemples
runExamples();
```

## 📊 Exemples de Sortie

### Console

```
🔮 ANALYSE NUMÉROLOGIQUE 🔮
============================
Nom: Marie Dupont
Date de naissance: 1990-03-15

🛤️  CHEMIN DE VIE
-----------------
Nombre: 1
Titre: Le Leader
Mots-clés: Indépendance, Volonté, Ambition, Innovation
Description: Le chemin de vie 1 est celui de l'initiateur...
```

### HTML

```html
<div class="numerology-report">
  <h1>🔮 Analyse Numérologique</h1>
  <h2>Marie Dupont</h2>
  <p>Date de naissance: 1990-03-15</p>

  <div class="life-path">
    <h3>🛤️ Chemin de Vie: 1</h3>
    <h4>Le Leader</h4>
    <!-- ... détails complets ... -->
  </div>

  <div class="expression">
    <h3>🎭 Nombre d'Expression: 9</h3>
    <h4>L'Humaniste</h4>
    <!-- ... détails complets ... -->
  </div>
</div>
```

## 🎯 Cas d'Usage

### 1. Application Web

- Calcul en temps réel lors de la saisie
- Affichage des résultats dans l'interface
- Génération de rapports PDF

### 2. API Backend

- Endpoint pour calculs numérologiques
- Validation des entrées
- Retour de données structurées

### 3. Tests Unitaires

- Validation des calculs
- Tests de cas limites
- Vérification des erreurs

## 🔍 Validation

Les exemples incluent une validation complète :

- Format de date correct (YYYY-MM-DD)
- Nom non vide avec au moins une lettre
- Gestion des erreurs avec messages explicites

## 📝 Notes

- Tous les exemples sont en TypeScript
- Compatible avec React et autres frameworks
- Gestion d'erreurs robuste
- Code documenté et maintenable

---

_Exemples pour l'application Numora - Votre compagnon numérique de numérologie_ 🔮✨
