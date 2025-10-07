# Documentation Numora

## Vue d'ensemble

Cette documentation couvre tous les aspects techniques et fonctionnels de l'application Numora, une plateforme de numérologie avancée.

## Table des matières

### 📚 Documentation générale

- [Guide de la numérologie](numerology-guide.md) - Introduction à la numérologie
- [API de numérologie](numerology-api.md) - Documentation de l'API
- [Fonctions documentées](fonctionsdoc.md) - Documentation des fonctions

### 🔮 Matrix Destiny

- [Méthodes Matrix Destiny](matrix-destiny-methods.md) - Comparaison des méthodes
- [Méthode Traditionnelle](matrix-destiny-traditional.md) - Méthode classique avec structure octogonale
- [Calculs Matrix Destiny](matrix-destiny-calculations.md) - Formules et calculs détaillés
- [Documentation technique Matrix Destiny](matrix-destiny-technical.md) - Implémentation technique
- [Nouvelles fonctionnalités Matrix Destiny](matrix-destiny-features.md) - Descriptions et ligne du cœur

### 🗄️ Base de données

- [Configuration Supabase](SUPABASE_SETUP.md) - Configuration de la base de données
- [Authentification Supabase](supabase-auth.md) - Système d'authentification
- [Script SQL utilisateurs](supabase_users_table.sql) - Structure de la table utilisateurs

## Méthodes de numérologie supportées

### 1. Matrix Destiny (Méthode Traditionnelle) ⭐⭐⭐⭐⭐

- **Précision** : Maximale
- **Fiabilité** : Très élevée
- **Base** : Structure octogonale et nombres non réduits
- **Fonctionnalités** : Descriptions des domaines spéciaux, ligne du cœur
- **Documentation** : [matrix-destiny-methods.md](matrix-destiny-methods.md)

### 2. Numérologie traditionnelle

- **Nombres personnels** : Chemin de vie, Expression, Âme, Personnalité
- **Défis** : Défis de vie et périodes
- **Cycles** : Cycles de vie et périodes de réalisation
- **Documentation** : [numerology-guide.md](numerology-guide.md)

### 3. Nombres karmiques

- **Dettes karmiques** : Analyse des dettes karmiques
- **Cycles karmiques** : Cycles de vie karmiques
- **Documentation** : [fonctionsdoc.md](fonctionsdoc.md)

## Architecture technique

### Frontend

- **Framework** : React 18 + TypeScript
- **Styling** : CSS3 avec variables personnalisées
- **État** : Context API + Hooks
- **Routing** : Navigation personnalisée

### Backend

- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **API** : REST API via Supabase

### Calculs

- **Méthode principale** : Matrix Destiny (Méthode Traditionnelle)
- **Méthodes secondaires** : Numérologie traditionnelle
- **Langage** : TypeScript
- **Validation** : Tests unitaires

## Installation et développement

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase

### Installation

```bash
npm install
```

### Configuration

1. Copier `.env.example` vers `.env`
2. Configurer les variables Supabase
3. Lancer le serveur de développement

### Développement

```bash
npm run dev
```

## Structure des fichiers

```
src/
├── components/          # Composants React
│   ├── ReadingDetailSection/
│   │   ├── tabs/       # Onglets de lecture
│   │   └── shared/     # Composants partagés
│   └── ...
├── utils/              # Utilitaires et calculs
│   ├── numerology/     # Calculs de numérologie
│   │   ├── index.ts    # Point d'entrée
│   │   ├── types.ts    # Types TypeScript
│   │   ├── core.ts     # Calculs de base
│   │   ├── business.ts # Calculs business
│   │   ├── challenges.ts # Défis et cycles
│   │   ├── karmic.ts   # Analyses karmiques
│   │   ├── personal.ts # Dates personnelles
│   │   └── utils.ts    # Utilitaires communs
│   └── matrixDestiny/  # Calculs Matrix Destiny
│       ├── matrixDestiny.ts      # Calculs principaux
│       ├── matrixRelations.ts    # Relations du cœur
│       ├── getMatrixMeaning.ts   # Significations des domaines
│       ├── getBaseNumberMeaning.ts
│       ├── getCentralMissionMeaning.ts
│       ├── getExternalRelationsMeaning.ts
│       ├── getFeminineLineMeaning.ts
│       └── getMasculineLineMeaning.ts
├── docs/               # Documentation
│   ├── fonctionsdoc.md          # Documentation complète des utilitaires ⭐
│   ├── numerology-api.md        # API de numérologie
│   ├── numerology-guide.md      # Guide utilisateur
│   ├── matrix-destiny-methods.md
│   ├── matrix-destiny-technical.md
│   ├── matrix-destiny-features.md
│   ├── matrix-destiny-calculations.md
│   ├── matrix-destiny-traditional.md
│   ├── supabase-auth.md
│   ├── SUPABASE_SETUP.md
│   └── README.md (ce fichier)
├── data/               # Données statiques JSON
│   ├── numerology/
│   │   ├── Basique/
│   │   ├── Dates/
│   │   ├── Karmique/
│   │   ├── DateBusiness/
│   │   └── NameBusiness/
│   └── matrixDestiny/
└── types/              # Types TypeScript
```

## API Reference

### 📝 Documentation Complète des Utilitaires

**Consultez [fonctionsdoc.md](./fonctionsdoc.md) pour la documentation complète** comprenant:

- 📖 Documentation détaillée de chaque fonction
- 💡 Exemples d'utilisation pratiques
- 🔧 Guide d'intégration
- 📝 Types TypeScript complets
- ✅ Bonnes pratiques

### Aperçu Rapide

#### Module: `utils/numerology`

```typescript
// Calculs de base
calculateLifePathNumber(dateString: string, reduce?: boolean): number
calculateExpressionNumber(fullName: string, reduce?: boolean): number
calculateSoulUrgeNumber(fullName: string, reduce?: boolean): number
calculatePersonalityNumber(fullName: string, reduce?: boolean): number
calculateBirthdayNumber(day: number): number

// Défis et cycles
calculateChallengeNumbers(day, month, year): ChallengeNumbersResult
calculateLifeCycles(day, month, year): LifeCyclesResult
calculateRealizationPeriods(day, month, year): RealizationPeriodsResult

// Analyses karmiques
calculateKarmicNumbers(dateString: string): KarmicNumbersResult
calculateCycleKarmicNumbers(fullName: string): CycleKarmicNumbersResult
checkKarmicDebt(value: number): KarmicDebtResult
calculateKarmicDebts(birthDate, fullName): KarmicDebtsResult

// Dates personnelles
calculatePersonalYear(day, month, year): number
calculatePersonalMonth(personalYear, month): number
calculatePersonalDay(personalMonth, day): number
calculatePersonalNumbers(birthDay, birthMonth, currentDate?): PersonalNumbersResult
getDateVibration(date: Date, allowMaster?: boolean): number

// Calculs business
calculateWordValue(word: string): number
calculateBusinessNumbers(fullName: string): BusinessNumbersResult
analyzeBusinessName(fullName: string): BusinessNameAnalysis

// Utilitaires
getLetterValue(letter: string): number
reduceToSingleDigit(num: number, allowMasterNumbers?: boolean): number
normalizeName(name: string): string
validateDateString(dateString: string): void
validateName(name: string): void
```

#### Module: `utils/matrixDestiny`

```typescript
// Matrix Destiny
calculateMatrixDestiny(day: number, month: number, year: number): MatrixDestiny

// Significations
getMatrixMeaning(number: number, category: "love" | "money" | "pivot"): string
getRelationMeaning(number: number, type: "interior" | "exterior"): string
getBaseNumberMeaning(number: number): string
getCentralMissionMeaning(number: number): string
getExternalRelationsMeaning(number: number): string
getFeminineLineMeaning(number: number): string
getMasculineLineMeaning(number: number): string
```

## Tests

### Tests unitaires

```bash
npm run test
```

### Tests de linting

```bash
npm run lint
```

## Contribution

### Guidelines

1. Suivre les conventions de code TypeScript
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Documenter les nouvelles méthodes
4. Respecter l'architecture existante

### Pull Requests

1. Créer une branche feature
2. Implémenter les changements
3. Ajouter les tests
4. Mettre à jour la documentation
5. Créer la PR

## Support

### Documentation

- Consulter cette documentation
- Vérifier les issues GitHub
- Contacter l'équipe de développement

### Bugs et fonctionnalités

- Créer une issue GitHub
- Décrire le problème ou la fonctionnalité
- Fournir des exemples de code si possible

## Changelog

### Version 2.1.0 (Décembre 2024)

- ✅ Descriptions des domaines spéciaux (Amour, Argent, Balance)
- ✅ Ligne du cœur avec descriptions interior/exterior
- ✅ Organisation modulaire du code Matrix Destiny
- ✅ Nouvelles données JSON pour les significations
- ✅ Interface utilisateur enrichie

### Version 2.0.0 (Décembre 2024)

- ✅ Implémentation de la méthode traditionnelle pour Matrix Destiny
- ✅ Documentation complète des méthodes
- ✅ Interface utilisateur améliorée
- ✅ Calculs plus précis et fiables

### Version 1.0.0 (Novembre 2024)

- ✅ Version initiale
- ✅ Numérologie traditionnelle
- ✅ Interface de base
- ✅ Authentification Supabase

---

_Dernière mise à jour : Décembre 2024_
