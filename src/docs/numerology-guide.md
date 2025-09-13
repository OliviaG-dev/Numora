# 📚 Guide de Numérologie - Numora

## 🔮 Introduction à la Numérologie

La numérologie est une science ancienne qui étudie la signification symbolique des nombres et leur influence sur notre vie. Chaque nombre possède une vibration énergétique unique qui révèle des aspects de notre personnalité, nos talents et notre mission de vie.

## 📊 Les Deux Calculs Principaux

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

## 🔄 Différences Clés

| Aspect          | Chemin de Vie                      | Nombre d'Expression         |
| --------------- | ---------------------------------- | --------------------------- |
| **Source**      | Date de naissance                  | Nom complet                 |
| **Révèle**      | Mission de vie, leçons à apprendre | Talents naturels, potentiel |
| **Nature**      | Destinée, karma                    | Capacités innées            |
| **Évolution**   | Relativement fixe                  | Peut changer avec le nom    |
| **Focus**       | Pourquoi vous êtes ici             | Comment vous vous exprimez  |
| **Temporalité** | Toute la vie                       | Présent et potentiel        |

## 🎯 Utilisation Pratique

### **Chemin de Vie**

- Comprendre votre mission principale
- Identifier vos défis de vie
- Guider vos choix importants
- Développer votre potentiel spirituel

### **Nombre d'Expression**

- Choisir une carrière adaptée
- Développer vos talents
- Améliorer votre communication
- Comprendre votre personnalité

## 💡 Synergie des Deux Nombres

Quand vous combinez votre Chemin de Vie et votre Nombre d'Expression, vous obtenez une vision complète :

- **Chemin de Vie** = Votre destination (où aller)
- **Nombre d'Expression** = Votre véhicule (comment y aller)

## 🔧 Utilisation dans l'Application

```typescript
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
} from "../utils/numerology";

// Calculer le Chemin de Vie
const lifePath = calculateLifePathNumber("1990-03-15"); // Retourne 1

// Calculer le Nombre d'Expression
const expression = calculateExpressionNumber("Marie Dupont"); // Retourne 9

// Récupérer les informations détaillées
const lifePathInfo = lifePathData[lifePath.toString()];
const expressionInfo = expressionData[expression.toString()];
```

## 📖 Ressources Complémentaires

- **Nombre de l'Âme** : Motivations profondes (voyelles du nom)
- **Nombre de Personnalité** : Image extérieure (consonnes du nom)
- **Nombre du Jour de Naissance** : Talents naturels (jour de naissance)

---

_Cette documentation vous aide à comprendre et utiliser efficacement les calculs numérologiques dans l'application Numora._
