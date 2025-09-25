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
- [Documentation technique Matrix Destiny](matrix-destiny-technical.md) - Implémentation technique

### 🗄️ Base de données

- [Configuration Supabase](SUPABASE_SETUP.md) - Configuration de la base de données
- [Authentification Supabase](supabase-auth.md) - Système d'authentification
- [Script SQL utilisateurs](supabase_users_table.sql) - Structure de la table utilisateurs

## Méthodes de numérologie supportées

### 1. Matrix Destiny (Méthode Grabovoi) ⭐⭐⭐⭐⭐

- **Précision** : Maximale
- **Fiabilité** : Très élevée
- **Base** : Mathématiques pures et physique quantique
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

- **Méthode principale** : Grabovoi (Matrix Destiny)
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
│   └── matrixDestiny.ts # Calculs Matrix Destiny
├── docs/               # Documentation
├── data/               # Données statiques
└── types/              # Types TypeScript
```

## API Reference

### Matrix Destiny

```typescript
calculateMatrixDestiny(day: number, month: number, year: number, name?: string): MatrixDestiny
```

### Numérologie traditionnelle

```typescript
calculateLifePath(day: number, month: number, year: number): number
calculateExpressionNumber(name: string): number
calculateSoulUrgeNumber(name: string): number
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

### Version 2.0.0 (Décembre 2024)

- ✅ Implémentation de la méthode Grabovoi pour Matrix Destiny
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
