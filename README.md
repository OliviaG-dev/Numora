# 🌌 Numora

> **Ton âme a un code, les nombres l'éclairent.**

![Version](https://img.shields.io/badge/version-0.1.0-green.svg)
![Status](https://img.shields.io/badge/status-🚀_Interface_Complète-brightgreen.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-7+-646cff.svg)

## ✨ À propos

**Numora** est ton compagnion numérique de numérologie moderne. Cette application web révolutionnaire combine la sagesse ancestrale de la numérologie avec une interface utilisateur moderne et intuitive pour t'aider à découvrir les secrets cachés de ton chemin de vie.

> 🚀 **Version 0.1.0 terminée !** L'interface utilisateur complète est maintenant disponible. Les calculs numérologiques sont en cours de développement.

## 🔮 Fonctionnalités principales

### 📱 **Interface utilisateur** ✅

- [x] **Landing Page** - Section Hero avec accroche principale
- [x] **Navigation** - Header responsive avec menu mobile
- [x] **Design System** - Thème cohérent avec variables CSS
- [x] **Responsive Design** - Adaptation mobile et desktop
- [x] **Animations** - Transitions fluides et effets visuels

### 🔐 **Authentification** ✅

- [x] **Page d'inscription** - Formulaire complet avec validation
- [x] **Page de connexion** - Interface de login avec mot de passe oublié
- [x] **Validation** - Contrôles côté client pour tous les formulaires
- [x] **UX/UI** - Design cohérent et intuitif

### 📊 **Gestion des lectures** ✅

- [x] **Nouvelle lecture** - Formulaire de création de lecture numérologique
- [x] **Saisie des données** - Prénoms, nom de famille, date/heure de naissance
- [x] **Catégorisation** - Lectures personnelles, amies, famille, collègues
- [x] **Validation** - Contrôles de saisie et messages d'erreur

### 👤 **Profil utilisateur** ✅

- [x] **Page profil** - Interface de gestion du compte
- [x] **Paramètres** - Page de configuration des préférences
- [x] **Navigation** - Accès rapide à toutes les fonctionnalités

### 🔮 **Fonctionnalités à venir** 🚧

- [ ] **Calculs numérologiques** - Algorithmes de calcul des nombres
- [ ] **Interprétations** - Base de données des significations
- [ ] **Rapports** - Génération de profils numérologiques complets
- [ ] **Sauvegarde** - Stockage local des lectures créées
- [ ] **Compatibilité** - Tests d'harmonie entre personnes
- [ ] **Partage** - Export et partage des résultats

## 🚀 Technologies utilisées

- **⚛️ React 18+** - Bibliothèque UI moderne
- **📘 TypeScript** - Typage statique pour plus de robustesse
- **⚡ Vite** - Build tool ultra-rapide
- **🎨 CSS3** - Styles modernes avec variables CSS
- **🌟 Animations CSS** - Transitions fluides et effets visuels

## 🎨 Design System

### Couleurs

- **Violet cosmique** : `#6B46C1` - Couleur principale spirituelle
- **Or mystique** : `#F59E0B` - Accents et CTA
- **Fond spatial** : `#0F0F23` - Arrière-plan principal
- **Particules d'étoiles** : Effets visuels subtils

### Typographie

- Police principale : **Inter** (moderne et lisible)
- Hiérarchie claire avec des tailles responsives
- Effets de gradient sur les titres principaux

## 🛠️ Installation et développement

### Prérequis

- **Node.js** 20.19+ ou 22.12+
- **npm** ou **yarn**

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/numora.git
cd numora

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

### Scripts disponibles

```bash
# Développement
npm run dev          # Lance le serveur de dev avec hot reload

# Production
npm run build        # Build optimisé pour la production
npm run preview      # Prévisualise le build de production

# Qualité de code
npm run lint         # Vérification ESLint
npm run type-check   # Vérification TypeScript
```

## 📁 Structure du projet

```
numora/
├── public/
│   └── vite.svg
├── src/
│   ├── pages/                   # Pages de l'application
│   │   ├── Home/               # Page d'accueil
│   │   ├── Login/              # Page de connexion
│   │   ├── Signup/             # Page d'inscription
│   │   ├── NewReading/         # Page de création de lecture
│   │   ├── Profile/            # Page de profil utilisateur
│   │   └── Settings/           # Page de paramètres
│   ├── components/             # Composants réutilisables
│   │   ├── Header/             # Navigation principale
│   │   ├── HeroSection/        # Section d'accueil
│   │   ├── LoginSection/       # Formulaire de connexion
│   │   ├── SignupSection/      # Formulaire d'inscription
│   │   ├── NewReadingSection/  # Formulaire de lecture
│   │   ├── ProfileSection/     # Gestion du profil
│   │   └── SettingsSection/    # Configuration
│   ├── assets/                 # Ressources statiques
│   ├── App.tsx                 # Point d'entrée de l'application
│   ├── App.css                 # Styles globaux
│   ├── index.css               # Styles de base
│   └── main.tsx                # Point d'entrée principal
├── package.json
└── README.md
```

### 🏗️ Architecture

Le projet suit une architecture modulaire organisée :

- **📁 `pages/`** - Pages principales de l'application avec navigation
- **📁 `components/`** - Composants réutilisables, chacun dans son propre dossier
- **📁 `assets/`** - Images, icônes et autres ressources statiques

**Navigation SPA** : L'application utilise un système de navigation côté client avec React Router concept, permettant une expérience utilisateur fluide sans rechargement de page.

**Composants modulaires** : Chaque composant est autonome avec ses propres fichiers TypeScript et CSS, facilitant la maintenance et la réutilisabilité.

## 🌟 Pourquoi Numora ?

- **🎯 Accessible** - Interface intuitive, sans jargon compliqué
- **🚀 Moderne** - Visualisations interactives et design élégant
- **🌟 Spirituelle et pratique** - Pour mieux se connaître et évoluer
- **💎 Unique** - Fusion de tradition numérologique et technologie moderne

## 👥 Pour qui ?

- 🤔 **Curieux** de mieux se connaître
- 🧘‍♀️ **Passionnés** de spiritualité et développement personnel
- 💕 **Couples et amis** cherchant leur compatibilité
- 🎓 **Coachs et praticiens** voulant enrichir leurs outils

## 📜 Citation inspirante

> _« Les nombres sont les clés secrètes qui ouvrent les portes de notre destinée. »_

## 🚧 Roadmap

### Version 0.1.0 ✅ **TERMINÉE**

- [x] Interface utilisateur complète
- [x] Design system et thème visuel
- [x] Navigation SPA avec toutes les pages
- [x] Système d'authentification (UI)
- [x] Formulaires de création de lecture
- [x] Gestion des profils utilisateur
- [x] Design responsive et animations

### Version 0.2.0 🚧 **EN COURS**

- [ ] **Calculs numérologiques** - Algorithmes de calcul des nombres
- [ ] **Base de données** - Interprétations et significations
- [ ] **Sauvegarde locale** - Stockage des lectures créées
- [ ] **Validation backend** - Vérification des données

### Version 0.3.0 📋 **PLANIFIÉE**

- [ ] **Rapports complets** - Génération de profils détaillés
- [ ] **Cycles de vie** - Analyse des années personnelles
- [ ] **Compatibilité** - Tests d'harmonie entre personnes
- [ ] **Export/Partage** - Fonctionnalités de partage social

### Version 0.4.0 🔮 **FUTURE**

- [ ] **API backend** - Serveur de données
- [ ] **Base de données** - Stockage persistant
- [ ] **Authentification réelle** - Système de connexion complet
- [ ] **Paiements** - Fonctionnalités premium

## 🤝 Contribution

Ce projet est actuellement en développement initial. Les contributions seront bientôt ouvertes !

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📧 Contact

Pour toute question ou suggestion concernant Numora :

- 📧 Email : [votre-email@exemple.com]
- 🐙 GitHub : [votre-profile-github]

---

<div align="center">

**🌌 Fait avec ❤️ pour ceux qui cherchent leur chemin ✨**

_Numora - Là où les nombres rencontrent l'âme_

</div>
