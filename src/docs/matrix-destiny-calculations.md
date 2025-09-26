# Matrix Destiny - Calculs Détaillés

## Formules de calcul pour la méthode traditionnelle

### 1. Nombres de base (non réduits)

```typescript
// Nombres de base - PAS de réduction
const day = 15; // Jour de naissance
const month = 3; // Mois de naissance
const year = 1990; // Année de naissance

// Mission de vie - calcul complexe
const lifeMission = calculateLifeMission(day, month, year);
```

### 2. Mission de vie

```typescript
function calculateLifeMission(
  day: number,
  month: number,
  year: number
): number {
  // Calcul de base
  const baseSum = day + month + year;

  // Réduction seulement si > 22
  if (baseSum > 22) {
    return reduceToMatrixNumber(baseSum);
  }

  return baseSum;
}

function reduceToMatrixNumber(n: number): number {
  while (n > 22) {
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return n;
}
```

### 3. Lignes de génération

```typescript
// Ligne masculine (jour + mois)
const maleLine = day + month;
if (maleLine > 22) {
  maleLine = reduceToMatrixNumber(maleLine);
}

// Ligne féminine (mois + année)
const femaleLine = month + year;
if (femaleLine > 22) {
  femaleLine = reduceToMatrixNumber(femaleLine);
}
```

### 4. Chakras - Calculs détaillés

#### Sahasrara (Couronne) - Mission

```typescript
const sahasrara = {
  physique: lifeMission + Math.floor(year / 100), // Mission + siècle
  energy: lifeMission + (year % 100), // Mission + décennie
  emotions: lifeMission + day, // Mission + jour
};
```

#### Ajna (3ème Œil) - Destin, égrégores

```typescript
const ajna = {
  physique: (day * month) % 22, // Jour × mois mod 22
  energy: (month * year) % 22, // Mois × année mod 22
  emotions: (day * year) % 22, // Jour × année mod 22
};
```

#### Vishuddha (Gorge) - Destin, égrégores

```typescript
const vissudha = {
  physique: (day + month + year) % 22, // Somme mod 22
  energy: (day * 2 + month) % 22, // Jour×2 + mois mod 22
  emotions: (month * 2 + (year % 100)) % 22, // Mois×2 + décennie mod 22
};
```

#### Anahata (Cœur) - Relations, image du monde

```typescript
const anahata = {
  physique: ((day + month) * 2) % 22, // (Jour + mois)×2 mod 22
  energy: ((month + (year % 100)) * 2) % 22, // (Mois + décennie)×2 mod 22
  emotions: ((day + (year % 100)) * 2) % 22, // (Jour + décennie)×2 mod 22
};
```

#### Manipura (Plexus) - Statut, possessions

```typescript
const manipura = {
  physique: Math.floor(day / 2) + Math.floor(month / 2), // Demi-jour + demi-mois
  energy: Math.floor(month / 2) + Math.floor(year / 200), // Demi-mois + demi-siècle
  emotions: Math.floor(day / 2) + Math.floor(year / 200), // Demi-jour + demi-siècle
};
```

#### Svadhisthana (Sacré) - Amour des enfants, joie

```typescript
const svadhisthana = {
  physique: (day * 3) % 22, // Jour×3 mod 22
  energy: (month * 3) % 22, // Mois×3 mod 22
  emotions: ((year % 100) * 3) % 22, // Décennie×3 mod 22
};
```

#### Muladhara (Racine) - Corps, matière

```typescript
const muladhara = {
  physique: day % 22, // Jour mod 22
  energy: month % 22, // Mois mod 22
  emotions: (year % 100) % 22, // Décennie mod 22
};
```

### 5. Cycles d'âge

```typescript
function calculateAgeCycles(day: number, month: number, year: number) {
  const cycles: Record<string, number> = {};
  const baseCycle = day + month + (year % 100);

  // Cycles de 5 ans avec sous-périodes
  for (let age = 0; age <= 75; age += 5) {
    const cycleValue = (baseCycle + age) % 22;
    cycles[age.toString()] = cycleValue;

    // Sous-périodes
    if (age > 0) {
      const subPeriod1 = (cycleValue + 1) % 22;
      const subPeriod2 = (cycleValue + 2) % 22;

      cycles[`${age}-${age + 2.5}`] = subPeriod1;
      cycles[`${age + 2.5}-${age + 5}`] = subPeriod2;
    }
  }

  return cycles;
}
```

### 6. Domaines spéciaux

```typescript
// Argent
const money = (month * year) % 22;
if (money === 0) money = 22;

// Amour
const love = (day * month) % 22;
if (love === 0) love = 22;
```

### 7. Zone d'énergie commune

```typescript
function calculateCommonEnergyZone(chakras: ChakraValues) {
  const totalPhysics = Object.values(chakras).reduce(
    (sum, chakra) => sum + chakra.physique,
    0
  );
  const totalEnergy = Object.values(chakras).reduce(
    (sum, chakra) => sum + chakra.energy,
    0
  );
  const totalEmotions = Object.values(chakras).reduce(
    (sum, chakra) => sum + chakra.emotions,
    0
  );

  return {
    physics: totalPhysics % 22,
    energy: totalEnergy % 22,
    emotions: totalEmotions % 22,
  };
}
```

## Exemple complet (15/03/1989)

### Nombres de base (réduits à max 22)

- Jour : 15 → 1 + 5 = 6
- Mois : 3 → 3 (reste 3)
- Année : 1989 → 1 + 9 + 8 + 9 = 27 → 2 + 7 = 9
- Mission : 15 + 3 + 1989 = 2007 → 2 + 0 + 0 + 7 = 9

### Lignes de génération

- Masculine : 15 + 3 = 18
- Féminine : 3 + 1989 = 1992 → 1 + 9 + 9 + 2 = 21

### Chakras calculés

```
Sahasrara:  P=9+19=28→10, E=9+89=98→17,  É=9+15=24→6
Ajna:       P=45%22=1,    E=5967%22=5,   É=29835%22=3
Vishuddha:  P=2007%22=5,  E=33%22=11,    É=95%22=7
Anahata:    P=36%22=14,   E=184%22=8,    É=208%22=6
Manipura:   P=7+1=8,      E=1+9=10,      É=7+9=16
Svadhisthana: P=45%22=1,  E=9%22=9,      É=267%22=3
Muladhara:  P=15%22=15,   E=3%22=3,      É=89%22=1
```

### Résultat final

```
Health Card:
1 Sahasrara:  P=10, E=17, É=6
2 Ajna:       P=1,  E=5,  É=3
3 Vissudha:   P=5,  E=11, É=7
4 Anahata:    P=14, E=8,  É=6
5 Manipura:   P=8,  E=10, É=16
6 Svadhisthana: P=1, E=9,  É=3
7 Muladhara:  P=15, E=3,  É=1

Common energy-zone: P=54→9, E=63→9, É=42→6
```

## Interface TypeScript

```typescript
interface MatrixDestinyTraditional {
  base: {
    day: number;
    month: number;
    year: number;
    lifeMission: number;
  };
  center: {
    mission: number;
    maleLine: number;
    femaleLine: number;
  };
  chakras: Record<
    string,
    {
      physique: number;
      energy: number;
      emotions: number;
    }
  >;
  cycles: Record<string, number>;
  special: {
    love: number;
    money: number;
  };
  commonEnergyZone: {
    physics: number;
    energy: number;
    emotions: number;
  };
}
```

---

_Ces calculs sont basés sur la méthode Matrix Destiny traditionnelle avec structure octogonale._
