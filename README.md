# 🌌 Numora

> **Ton âme a un code, les nombres l'éclairent.**

![Version](https://img.shields.io/badge/version-0.2.0-green.svg)
![Status](https://img.shields.io/badge/status-🔮_Calculs_Numérologiques_Complets-brightgreen.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178c6.svg)
![Vite](https://img.shields.io/badge/Vite-7+-646cff.svg)

## ✨ À propos

**Numora** est ton compagnion numérique de numérologie moderne. Cette application web révolutionnaire combine la sagesse ancestrale de la numérologie avec une interface utilisateur moderne et intuitive pour t'aider à découvrir les secrets cachés de ton chemin de vie.

> 🔮 **Version 0.2.0 terminée !** L'application complète avec calculs numérologiques, authentification Supabase et fonctionnalités karmiques est maintenant disponible.

## 🔮 Fonctionnalités principales

### 📱 **Interface utilisateur** ✅

- [x] **Landing Page** - Section Hero avec accroche principale
- [x] **Navigation** - Header responsive avec menu mobile
- [x] **Design System** - Thème cohérent avec variables CSS
- [x] **Responsive Design** - Adaptation mobile et desktop
- [x] **Animations** - Transitions fluides et effets visuels

### 🔐 **Authentification Supabase** ✅

- [x] **Inscription sécurisée** - Formulaire complet avec validation et Supabase
- [x] **Connexion sécurisée** - Interface de login avec gestion des sessions
- [x] **Gestion des sessions** - Authentification persistante et déconnexion
- [x] **Protection des routes** - Accès sécurisé aux fonctionnalités
- [x] **Validation** - Contrôles côté client et gestion d'erreurs
- [x] **UX/UI** - Design cohérent et états de chargement

### 📊 **Gestion des lectures** ✅

- [x] **Nouvelle lecture** - Formulaire de création de lecture numérologique
- [x] **Saisie des données** - Prénoms, nom de famille, date/heure de naissance
- [x] **Catégorisation** - Lectures personnelles, amies, famille, collègues
- [x] **Validation** - Contrôles de saisie et messages d'erreur
- [x] **Affichage détaillé** - Interface complète avec onglets et sections

### 🔮 **Calculs Numérologiques** ✅

- [x] **Chemin de Vie** - Calcul automatique à partir de la date de naissance
- [x] **Nombre d'Expression** - Calcul à partir du nom complet
- [x] **Nombre de l'Âme** - Calcul des voyelles du nom
- [x] **Nombre de Personnalité** - Calcul des consonnes du nom
- [x] **Jour de Naissance** - Calcul du jour de naissance
- [x] **Nombres de Défi** - Calcul des 4 défis de vie
- [x] **Cycles de Vie** - Calcul des cycles de vie
- [x] **Périodes de Réalisation** - Calcul des périodes importantes

### ⚡ **Fonctionnalités Karmiques** ✅

- [x] **Nombres Karmiques** - Détection des nombres karmiques (13, 14, 16, 19)
- [x] **Cycles Karmiques** - Nombres karmiques des cycles de vie
- [x] **Dettes Karmiques** - Analyse complète des dettes karmiques
- [x] **Descriptions détaillées** - Interprétations et leçons à apprendre
- [x] **Interface dédiée** - Onglet "Karmique" avec accordéons exclusifs

### 👤 **Profil utilisateur** ✅

- [x] **Page profil** - Interface de gestion du compte
- [x] **Paramètres** - Page de configuration des préférences
- [x] **Navigation** - Accès rapide à toutes les fonctionnalités

### 🔮 **Fonctionnalités à venir** 🚧

- [ ] **Sauvegarde Supabase** - Stockage persistant des lectures créées
- [ ] **Rapports PDF** - Génération de profils numérologiques complets
- [ ] **Compatibilité** - Tests d'harmonie entre personnes
- [ ] **Partage** - Export et partage des résultats
- [ ] **Historique** - Suivi des lectures précédentes
- [ ] **Notifications** - Rappels et insights personnalisés

## 🚀 Technologies utilisées

- **⚛️ React 18+** - Bibliothèque UI moderne
- **📘 TypeScript** - Typage statique pour plus de robustesse
- **⚡ Vite** - Build tool ultra-rapide
- **🎨 CSS3** - Styles modernes avec variables CSS
- **🌟 Animations CSS** - Transitions fluides et effets visuels
- **🔐 Supabase** - Backend-as-a-Service pour l'authentification
- **📊 JSON** - Base de données des interprétations numérologiques

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

# Configurer Supabase (optionnel pour les calculs de base)
# Créer un fichier .env à la racine avec vos clés Supabase :
# VITE_SUPABASE_URL=https://your-project-id.supabase.co
# VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173)

### 🎯 Fonctionnalités principales

#### 🔮 Calculs Numérologiques Complets

```typescript
// Exemple d'utilisation des calculs
import {
  calculateLifePathNumber,
  calculateKarmicDebts,
} from "./src/utils/numerology";

// Calcul du Chemin de Vie
const lifePath = calculateLifePathNumber("1990-03-15"); // Retourne 1

// Analyse des dettes karmiques
const karmicDebts = calculateKarmicDebts("1990-03-15", "Marie Dupont");
if (karmicDebts.lifePathDebt.isKarmicDebt) {
  console.log(
    `Dette karmique détectée: ${karmicDebts.lifePathDebt.karmicDebtType}`
  );
}
```

#### 🔐 Authentification Sécurisée

```typescript
// Utilisation du contexte d'authentification
import { useAuth } from "./src/contexts/AuthContext";

const MyComponent = () => {
  const { isAuthenticated, user, signIn, signOut } = useAuth();

  // Gestion de l'authentification
  const handleLogin = async () => {
    const { data, error } = await signIn(email, password);
    if (!error) {
      console.log("Connexion réussie !");
    }
  };
};
```

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
│   └── logo.png
├── src/
│   ├── pages/                   # Pages de l'application
│   │   ├── Home/               # Page d'accueil
│   │   ├── Login/              # Page de connexion
│   │   ├── Signup/             # Page d'inscription
│   │   ├── NewReading/         # Page de création de lecture
│   │   ├── ReadingDetail/      # Page de détail de lecture
│   │   ├── Readings/           # Page des lectures
│   │   ├── Profile/            # Page de profil utilisateur
│   │   └── Settings/           # Page de paramètres
│   ├── components/             # Composants réutilisables
│   │   ├── Header/             # Navigation principale
│   │   ├── HeroSection/        # Section d'accueil
│   │   ├── LoginSection/       # Formulaire de connexion (Supabase)
│   │   ├── SignupSection/      # Formulaire d'inscription (Supabase)
│   │   ├── NewReadingSection/  # Formulaire de lecture
│   │   ├── ReadingDetailSection/ # Affichage détaillé des lectures
│   │   ├── ReadingsSection/    # Liste des lectures
│   │   ├── ProfileSection/     # Gestion du profil
│   │   ├── SettingsSection/    # Configuration
│   │   └── NumerologyBackground/ # Arrière-plan numérologique
│   ├── utils/                  # Fonctions utilitaires
│   │   └── numerology.ts       # Calculs numérologiques complets
│   ├── data/                   # Données JSON
│   │   ├── numerology/         # Interprétations numérologiques
│   │   │   ├── LifePathData.json
│   │   │   ├── ExpressionNumberData.json
│   │   │   ├── ChallengeData.json
│   │   │   ├── SoulUrgeData.json
│   │   │   ├── PersonalityData.json
│   │   │   ├── BirthdayData.json
│   │   │   ├── KarmicNumberData.json
│   │   │   ├── CycleKarmicData.json
│   │   │   └── KarmicDebtsData.json
│   │   └── index.ts            # Exports centralisés
│   ├── lib/                    # Bibliothèques externes
│   │   └── supabase.ts         # Client Supabase et authentification
│   ├── config/                 # Configuration
│   │   └── supabase.ts         # Configuration Supabase
│   ├── contexts/               # Contextes React
│   │   └── AuthContext.tsx     # Contexte d'authentification
│   ├── docs/                   # Documentation
│   │   ├── numerology-guide.md # Guide utilisateur
│   │   ├── numerology-api.md   # Documentation technique
│   │   ├── supabase-auth.md    # Documentation authentification
│   │   └── README.md           # Index de la documentation
│   ├── examples/               # Exemples d'utilisation
│   │   ├── numerology-example.ts
│   │   └── README.md
│   ├── assets/                 # Ressources statiques
│   ├── App.tsx                 # Point d'entrée de l'application
│   ├── App.css                 # Styles globaux
│   ├── index.css               # Styles de base
│   ├── main.tsx                # Point d'entrée principal
│   └── fonctionsdoc.md         # Documentation du code
├── SUPABASE_SETUP.md           # Guide de configuration Supabase
├── package.json
└── README.md
```

### 🏗️ Architecture

Le projet suit une architecture modulaire organisée :

- **📁 `pages/`** - Pages principales de l'application avec navigation
- **📁 `components/`** - Composants réutilisables, chacun dans son propre dossier
- **📁 `utils/`** - Fonctions de calcul numérologique et utilitaires
- **📁 `data/`** - Base de données JSON des interprétations numérologiques
- **📁 `lib/`** - Bibliothèques externes (Supabase)
- **📁 `config/`** - Configuration des services externes
- **📁 `contexts/`** - Contextes React pour la gestion d'état globale
- **📁 `docs/`** - Documentation complète du projet
- **📁 `assets/`** - Images, icônes et autres ressources statiques

**Navigation SPA** : L'application utilise un système de navigation côté client avec React Router concept, permettant une expérience utilisateur fluide sans rechargement de page.

**Composants modulaires** : Chaque composant est autonome avec ses propres fichiers TypeScript et CSS, facilitant la maintenance et la réutilisabilité.

**Authentification Supabase** : Système d'authentification complet avec gestion des sessions, protection des routes et contexte React global.

**Calculs numérologiques** : Module complet de calculs numérologiques avec support des nombres karmiques et dettes karmiques.

## 🌟 Pourquoi Numora ?

- **🎯 Accessible** - Interface intuitive, sans jargon compliqué
- **🚀 Moderne** - Visualisations interactives et design élégant
- **🌟 Spirituelle et pratique** - Pour mieux se connaître et évoluer
- **💎 Unique** - Fusion de tradition numérologique et technologie moderne
- **🔮 Complet** - Calculs numérologiques complets avec fonctionnalités karmiques
- **🔐 Sécurisé** - Authentification Supabase et protection des données
- **📊 Précis** - Algorithmes de calcul validés et interprétations détaillées

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

### Version 0.2.0 ✅ **TERMINÉE**

- [x] **Calculs numérologiques** - Algorithmes de calcul des nombres
- [x] **Base de données** - Interprétations et significations
- [x] **Authentification Supabase** - Système de connexion complet
- [x] **Fonctionnalités karmiques** - Nombres karmiques et dettes karmiques
- [x] **Interface détaillée** - Affichage complet des lectures
- [x] **Documentation** - Guide complet et API documentation

### Version 0.3.0 🚧 **EN COURS**

- [ ] **Sauvegarde Supabase** - Stockage persistant des lectures
- [ ] **Rapports PDF** - Génération de profils détaillés
- [ ] **Historique** - Suivi des lectures précédentes
- [ ] **Export/Partage** - Fonctionnalités de partage social

### Version 0.4.0 📋 **PLANIFIÉE**

- [ ] **Compatibilité** - Tests d'harmonie entre personnes
- [ ] **Cycles de vie** - Analyse des années personnelles
- [ ] **Notifications** - Rappels et insights personnalisés
- [ ] **API avancée** - Endpoints pour intégrations tierces

### Version 0.5.0 🔮 **FUTURE**

- [ ] **Paiements** - Fonctionnalités premium
- [ ] **Mobile App** - Application mobile native
- [ ] **IA** - Insights personnalisés avec intelligence artificielle
- [ ] **Communauté** - Plateforme de partage et d'échange

## 🤝 Contribution

Le projet Numora est maintenant dans une phase avancée avec une base solide. Les contributions sont les bienvenues !

### Comment contribuer

1. **Fork** le repository
2. **Créer** une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -m 'Ajout d'une nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

### Domaines de contribution

- 🐛 **Correction de bugs** - Amélioration de la stabilité
- ✨ **Nouvelles fonctionnalités** - Ajout de calculs numérologiques
- 📚 **Documentation** - Amélioration des guides et exemples
- 🎨 **Design** - Amélioration de l'interface utilisateur
- 🔧 **Performance** - Optimisation des calculs et de l'interface

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
