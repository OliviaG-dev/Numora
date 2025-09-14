# 📚 Guide de Numérologie - Numora

## 🔮 Introduction à la Numérologie

La numérologie est une science ancienne qui étudie la signification symbolique des nombres et leur influence sur notre vie. Chaque nombre possède une vibration énergétique unique qui révèle des aspects de notre personnalité, nos talents et notre mission de vie.

## 📊 Les Calculs Numérologiques Principaux

### 1. 🛤️ Le Chemin de Vie (Life Path Number)

#### **Définition**

Le **Chemin de Vie** est le nombre le plus important en numérologie. Il révèle votre mission principale dans cette incarnation, les leçons que vous devez apprendre et les défis que vous devez relever.

#### **Calcul**

Le Chemin de Vie se calcule en additionnant tous les chiffres de votre date de naissance jusqu'à obtenir un nombre entre 1 et 9, ou un nombre maître (11, 22, 33).

**Formule :** `Jour + Mois + Année` (réduit)

#### **Exemple de Calcul**

```
Date de naissance : 15/03/1990
1 + 5 + 0 + 3 + 1 + 9 + 9 + 0 = 28
28 → 2 + 8 = 10
10 → 1 + 0 = 1

Chemin de Vie = 1
```

#### **Signification**

- **1** : Le Leader - Mission d'initiation et de leadership
- **2** : Le Diplomate - Mission de coopération et d'harmonie
- **3** : Le Créatif - Mission d'expression et de communication
- **4** : Le Bâtisseur - Mission de construction et de stabilité
- **5** : L'Aventurier - Mission de liberté et d'expérience
- **6** : Le Protecteur - Mission de service et d'amour
- **7** : Le Sage - Mission de recherche et de spiritualité
- **8** : Le Stratège - Mission de pouvoir et de réussite matérielle
- **9** : L'Humaniste - Mission d'altruisme et de compassion

#### **Nombres Maîtres**

- **11** : Le Visionnaire Spirituel - Intuition et inspiration exceptionnelles
- **22** : Le Maître Bâtisseur - Capacité à matérialiser de grandes visions
- **33** : Le Maître Guérisseur - Sagesse et compassion universelles

---

### 2. 🎭 Le Nombre d'Expression (Expression Number)

#### **Définition**

Le **Nombre d'Expression** révèle vos talents naturels, vos capacités innées et la façon dont vous vous exprimez dans le monde. Il montre votre potentiel et vos dons.

#### **Calcul**

Le Nombre d'Expression se calcule en additionnant la valeur numérologique de toutes les lettres de votre nom complet (prénoms + nom de famille).

**Correspondance Lettres-Chiffres :**

```
A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, I=9
J=1, K=2, L=3, M=4, N=5, O=6, P=7, Q=8, R=9
S=1, T=2, U=3, V=4, W=5, X=6, Y=7, Z=8
```

#### **Exemple de Calcul**

```
Nom : MARIE DUPONT
M(4) + A(1) + R(9) + I(9) + E(5) + D(4) + U(3) + P(7) + O(6) + N(5) + T(2) = 54
54 → 5 + 4 = 9

Nombre d'Expression = 9
```

#### **Signification**

Le Nombre d'Expression révèle :

- Vos talents naturels
- Votre façon de communiquer
- Vos capacités créatives
- Votre potentiel professionnel
- Comment vous vous exprimez dans le monde

---

## 🔄 Aperçu des 6 Calculs Numérologiques

| Calcul                   | Source            | Révèle                | Focus                 |
| ------------------------ | ----------------- | --------------------- | --------------------- |
| **🛤️ Chemin de Vie**     | Date de naissance | Mission principale    | Destinée et karma     |
| **🎭 Expression**        | Nom complet       | Talents et potentiel  | Capacités globales    |
| **💫 Âme**               | Voyelles du nom   | Motivations profondes | Désirs intérieurs     |
| **🎭 Personnalité**      | Consonnes du nom  | Image extérieure      | Perception des autres |
| **🎂 Jour de Naissance** | Jour seulement    | Talents naturels      | Dons spontanés        |
| **⚔️ Défis**             | Date complète     | Obstacles à surmonter | Leçons de vie         |

## 🎯 Utilisation Pratique

### **Pour une Analyse Complète**

- **🛤️ Chemin de Vie** : Comprendre votre mission de vie et direction générale
- **🎭 Expression** : Développer vos talents et choisir une carrière
- **💫 Âme** : Identifier vos vraies motivations et désirs
- **🎭 Personnalité** : Améliorer votre image et relations sociales
- **🎂 Jour de Naissance** : Utiliser vos dons naturels au quotidien
- **⚔️ Défis** : Surmonter les obstacles selon votre âge

### **Exemples d'Application**

- **Orientation professionnelle** : Expression + Chemin de Vie
- **Développement personnel** : Âme + Défis
- **Relations** : Personnalité + Âme
- **Prise de décisions** : Chemin de Vie + Défis actuels

## 💡 Synergie des Nombres

Quand vous combinez tous vos nombres numérologiques, vous obtenez un portrait complet :

- **🛤️ Chemin de Vie** = Votre destination (où aller)
- **🎭 Expression** = Vos outils (comment y aller)
- **💫 Âme** = Votre moteur (pourquoi vous bougez)
- **🎭 Personnalité** = Votre façade (comment on vous voit)
- **🎂 Jour de Naissance** = Vos atouts spontanés
- **⚔️ Défis** = Vos leçons à apprendre

## 🔧 Utilisation dans l'Application

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
} from "../utils/numerology";

// Calculs complets pour une personne
const lifePath = calculateLifePathNumber("1990-03-15"); // 1
const expression = calculateExpressionNumber("Marie Dupont"); // 9
const soulUrge = calculateSoulUrgeNumber("Marie Dupont"); // 6
const personality = calculatePersonalityNumber("Marie Dupont"); // 3
const birthday = calculateBirthdayNumber(15); // 6
const challenges = calculateChallengeNumbers(15, 3, 1990); // 4 défis

// Récupérer les informations détaillées
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];
const challengeInfo = challengeData[challenges.fourth.number.toString()];

// Profil numérologique complet
console.log(`Profil de Marie Dupont :
- Chemin de Vie: ${lifePath} (${lifePathInfo.title})
- Expression: ${expression} (${expressionInfo.title})
- Âme: ${soulUrge} (Motivations profondes)
- Personnalité: ${personality} (Image extérieure)
- Jour de Naissance: ${birthday} (Talents naturels)
- Défi principal: ${challenges.fourth.number} (${challengeInfo.description})`);

// Les descriptions de défi sont automatiquement enrichies depuis ChallengeData.json
console.log(`\nDétail des défis de vie :
- Jeunesse (0-30 ans): ${challenges.first.description}
- Maturité (30-60 ans): ${challenges.second.description}
- Sagesse (60+ ans): ${challenges.third.description}
- Défi principal: ${challenges.fourth.description}`);
```

## 📖 Calculs Complémentaires

### 3. 💫 Le Nombre de l'Âme (Soul Urge Number)

#### **Définition**

Le **Nombre de l'Âme** révèle vos motivations profondes, vos désirs intérieurs et ce qui vous pousse vraiment dans la vie. Il se calcule à partir des voyelles de votre nom complet.

#### **Calcul**

Additionner uniquement les voyelles (A, E, I, O, U) de votre nom complet.

#### **Exemple de Calcul**

```
Nom : MARIE DUPONT
Voyelles : A(1) + I(9) + E(5) + U(3) + O(6) = 24
24 → 2 + 4 = 6

Nombre de l'Âme = 6
```

#### **Signification**

Le Nombre de l'Âme révèle vos aspirations profondes et ce qui vous motive vraiment.

---

### 4. 🎭 Le Nombre de Personnalité (Personality Number)

#### **Définition**

Le **Nombre de Personnalité** montre comment les autres vous perçoivent et l'image que vous projetez dans le monde. Il se calcule à partir des consonnes de votre nom complet.

#### **Calcul**

Additionner uniquement les consonnes de votre nom complet.

#### **Exemple de Calcul**

```
Nom : MARIE DUPONT
Consonnes : M(4) + R(9) + D(4) + P(7) + N(5) + T(2) = 31
31 → 3 + 1 = 4

Nombre de Personnalité = 4
```

#### **Signification**

Le Nombre de Personnalité révèle l'impression que vous donnez aux autres et votre masque social.

---

### 5. 🎂 Le Nombre du Jour de Naissance (Birthday Number)

#### **Définition**

Le **Nombre du Jour de Naissance** représente vos talents naturels et vos capacités innées. Il se base simplement sur votre jour de naissance.

#### **Calcul**

Réduire le jour de naissance à un chiffre entre 1 et 9.

#### **Exemple de Calcul**

```
Jour de naissance : 15
15 → 1 + 5 = 6

Nombre du Jour de Naissance = 6
```

#### **Signification**

Ce nombre révèle vos dons naturels et comment vous abordez spontanément les situations.

---

### 6. ⚔️ Les Nombres de Défi (Challenge Numbers)

#### **Définition**

Les **Nombres de Défi** révèlent les obstacles et leçons que vous devez surmonter à différentes périodes de votre vie. Il y a 4 défis calculés à partir de votre date de naissance.

#### **Calcul**

Les défis sont calculés par soustraction entre les composants réduits de votre date de naissance :

1. **Premier défi** : |Jour - Mois| (Jeunesse 0-30 ans)
2. **Deuxième défi** : |Jour - Année| (Maturité 30-60 ans)
3. **Troisième défi** : |Mois - Année| (Sagesse 60+ ans)
4. **Quatrième défi** : |Premier - Deuxième| (Défi principal)

#### **Exemple de Calcul**

```
Date : 15/03/1990
Jour réduit : 1+5 = 6
Mois réduit : 3
Année réduite : 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1

Premier défi : |6 - 3| = 3
Deuxième défi : |6 - 1| = 5
Troisième défi : |3 - 1| = 2
Quatrième défi : |3 - 5| = 2
```

#### **Signification**

Chaque défi représente une leçon spécifique à apprendre pendant une période de votre vie. Les descriptions détaillées de chaque défi sont automatiquement chargées depuis les données JSON pour fournir des explications complètes et enrichies.

---

_Cette documentation vous aide à comprendre et utiliser efficacement les calculs numérologiques dans l'application Numora._
