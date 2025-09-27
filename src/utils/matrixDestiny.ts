import { reduceToSingleDigit } from "./numerology/utils";

// Fonctions utilitaires pour Matrix Destiny
export function reduceNumber(n: number): number {
  return reduceToSingleDigit(n, true);
}

export function sumReduce(...nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceToMatrixNumber(total);
}

export interface MatrixDestiny {
  base: {
    day: number;
    month: number;
    year: number;
    lifeMission: number;
  };
  center: {
    mission: number;
    maleLine: {
      dayMonth: number;
      mission: number;
      dayYear: number;
    };
    femaleLine: {
      monthYear: number;
      mission: number;
      monthDay: number;
    };
  };
  chakras: Record<
    string,
    { physique: number; energy: number; emotions: number }
  >;
  cycles: Record<string, number>;
  special: {
    love: number;
    money: number;
  };
  commonEnergyZone?: {
    physics: number;
    energy: number;
    emotions: number;
  };
  karmicLines: {
    financialKarmicTail: number;
    karmicLife: number;
    talentZone: number;
    socialConnection: number;
    parents: number;
    feminineAncestry: number;
    masculineAncestry: number;
  };
}

/**
 * Calcule la Matrix Destiny selon la méthode traditionnelle
 * Méthode classique avec structure octogonale et nombres non réduits
 *
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @returns MatrixDestiny - Structure complète de la Matrix
 */
export function calculateMatrixDestiny(
  day: number,
  month: number,
  year: number
): MatrixDestiny {
  // === NOMBRES DE BASE (Méthode traditionnelle - réduits à max 22) ===
  const dayValue = reduceToMatrixNumber(day);
  const monthValue = reduceToMatrixNumber(month);
  const yearValue = reduceToMatrixNumber(year);
  const lifeMission = calculateLifeMission(day, month, year);

  // === CENTRE DE LA MATRIX ===
  const centerMission = sumReduce(dayValue, monthValue, yearValue, lifeMission);
  const maleLine = calculateMaleLine(
    dayValue,
    monthValue,
    yearValue,
    centerMission
  );
  const femaleLine = calculateFemaleLine(
    dayValue,
    monthValue,
    yearValue,
    centerMission
  );

  // === CHAKRAS (Calculs traditionnels précis) ===
  const chakras = calculateChakrasTraditional(day, month, year);

  // === CYCLES DE VIE (Méthode traditionnelle) ===
  const cycles = calculateAgeCycles(day, month, year);

  // === DOMAINES SPÉCIAUX ===
  const special = calculateSpecialDomainsTraditional(day, month, year);

  // === ZONE D'ÉNERGIE COMMUNE ===
  const commonEnergyZone = calculateCommonEnergyZone(chakras);

  // === LIGNES KARMIQUES ===
  const karmicLines = calculateKarmicLines(day, month, year, lifeMission);

  return {
    base: {
      day: dayValue,
      month: monthValue,
      year: yearValue,
      lifeMission,
    },
    center: {
      mission: centerMission,
      maleLine,
      femaleLine,
    },
    chakras,
    cycles,
    special,
    commonEnergyZone,
    karmicLines,
  };
}

/**
 * Calcule la mission de vie selon la méthode traditionnelle
 */
function calculateLifeMission(
  day: number,
  month: number,
  year: number
): number {
  const baseSum = day + month + year;
  return reduceToMatrixNumber(baseSum);
}

/**
 * Calcule la ligne masculine avec 3 valeurs :
 * 1. Jour + Mois (réduit)
 * 2. Mission (centre)
 * 3. Jour + Année (réduit)
 */
function calculateMaleLine(
  day: number,
  month: number,
  year: number,
  mission: number
): {
  dayMonth: number;
  mission: number;
  dayYear: number;
} {
  return {
    dayMonth: day + month, // Somme brute : Jour + Mois
    mission: mission,
    dayYear: day + year, // Somme brute : Jour + Année
  };
}

/**
 * Calcule la ligne féminine avec 3 valeurs :
 * 1. Mois + Année (réduit)
 * 2. Mission (centre)
 * 3. Mois + Jour (réduit)
 */
function calculateFemaleLine(
  day: number,
  month: number,
  year: number,
  mission: number
): {
  monthYear: number;
  mission: number;
  monthDay: number;
} {
  return {
    monthYear: month + year, // Somme brute : Mois + Année
    mission: mission,
    monthDay: month + day, // Somme brute : Mois + Jour
  };
}

/**
 * Réduit un nombre à la plage Matrix (1-22)
 */
function reduceToMatrixNumber(n: number): number {
  while (n > 22) {
    n = n
      .toString()
      .split("")
      .reduce((a, b) => a + parseInt(b), 0);
  }
  return n === 0 ? 22 : n;
}

/**
 * Calcule les valeurs des chakras selon la méthode traditionnelle
 * Chaque chakra a 3 dimensions : physique, énergie, émotions
 */
function calculateChakrasTraditional(
  day: number,
  month: number,
  year: number
): Record<string, { physique: number; energy: number; emotions: number }> {
  const lifeMission = calculateLifeMission(day, month, year);
  const century = Math.floor(year / 100);
  const decade = year % 100;

  return {
    sahasrara: {
      physique: reduceToMatrixNumber(lifeMission + century), // Mission + siècle
      energy: reduceToMatrixNumber(lifeMission + decade), // Mission + décennie
      emotions: reduceToMatrixNumber(lifeMission + day), // Mission + jour
    },
    ajna: {
      physique: reduceToMatrixNumber((day * month) % 22), // Jour × mois mod 22
      energy: reduceToMatrixNumber((month * year) % 22), // Mois × année mod 22
      emotions: reduceToMatrixNumber((day * year) % 22), // Jour × année mod 22
    },
    vissudha: {
      physique: reduceToMatrixNumber((day + month + year) % 22), // Somme mod 22
      energy: reduceToMatrixNumber((day * 2 + month) % 22), // Jour×2 + mois mod 22
      emotions: reduceToMatrixNumber((month * 2 + decade) % 22), // Mois×2 + décennie mod 22
    },
    anahata: {
      physique: reduceToMatrixNumber(((day + month) * 2) % 22), // (Jour + mois)×2 mod 22
      energy: reduceToMatrixNumber(((month + decade) * 2) % 22), // (Mois + décennie)×2 mod 22
      emotions: reduceToMatrixNumber(((day + decade) * 2) % 22), // (Jour + décennie)×2 mod 22
    },
    manipura: {
      physique: Math.floor(day / 2) + Math.floor(month / 2), // Demi-jour + demi-mois
      energy: Math.floor(month / 2) + Math.floor(year / 200), // Demi-mois + demi-siècle
      emotions: Math.floor(day / 2) + Math.floor(year / 200), // Demi-jour + demi-siècle
    },
    svadhisthana: {
      physique: reduceToMatrixNumber((day * 3) % 22), // Jour×3 mod 22
      energy: reduceToMatrixNumber((month * 3) % 22), // Mois×3 mod 22
      emotions: reduceToMatrixNumber((decade * 3) % 22), // Décennie×3 mod 22
    },
    muladhara: {
      physique: reduceToMatrixNumber(day % 22), // Jour mod 22
      energy: reduceToMatrixNumber(month % 22), // Mois mod 22
      emotions: reduceToMatrixNumber(decade % 22), // Décennie mod 22
    },
  };
}

/**
 * Calcule les cycles d'âge selon la méthode traditionnelle
 * Cycles de 5 ans avec sous-périodes détaillées
 */
function calculateAgeCycles(
  day: number,
  month: number,
  year: number
): Record<string, number> {
  const cycles: Record<string, number> = {};
  const baseCycle = day + month + (year % 100);

  // Cycles de 5 ans avec sous-périodes
  for (let age = 0; age <= 75; age += 5) {
    const cycleValue = reduceToMatrixNumber(baseCycle + age);
    cycles[age.toString()] = cycleValue;

    // Sous-périodes pour les âges > 0
    if (age > 0) {
      const subPeriod1 = reduceToMatrixNumber(cycleValue + 1);
      const subPeriod2 = reduceToMatrixNumber(cycleValue + 2);

      cycles[`${age}-${age + 2.5}`] = subPeriod1;
      cycles[`${age + 2.5}-${age + 5}`] = subPeriod2;
    }
  }

  return cycles;
}

/**
 * Calcule les domaines spéciaux selon la méthode traditionnelle
 */
function calculateSpecialDomainsTraditional(
  day: number,
  month: number,
  year: number
): { love: number; money: number } {
  // Argent : mois × année mod 22
  const money = reduceToMatrixNumber((month * year) % 22);

  // Amour : jour × mois mod 22
  const love = reduceToMatrixNumber((day * month) % 22);

  return { love, money };
}

/**
 * Calcule la zone d'énergie commune
 */
function calculateCommonEnergyZone(
  chakras: Record<
    string,
    { physique: number; energy: number; emotions: number }
  >
): { physics: number; energy: number; emotions: number } {
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
    physics: reduceToMatrixNumber(totalPhysics),
    energy: reduceToMatrixNumber(totalEnergy),
    emotions: reduceToMatrixNumber(totalEmotions),
  };
}

/**
 * Calcule les lignes karmiques selon la méthode traditionnelle
 * Ces lignes révèlent les leçons karmiques et les héritages spirituels
 */
function calculateKarmicLines(
  day: number,
  month: number,
  year: number,
  lifeMission: number
): {
  financialKarmicTail: number;
  karmicLife: number;
  talentZone: number;
  socialConnection: number;
  parents: number;
  feminineAncestry: number;
  masculineAncestry: number;
} {
  const decade = year % 100;
  const century = Math.floor(year / 100);

  return {
    // Queue karmique financière : Dettes karmiques liées à l'argent
    financialKarmicTail: reduceToMatrixNumber((month * day) % 22),

    // Vie karmique : Expériences accumulées des vies antérieures
    karmicLife: reduceToMatrixNumber((day + month + decade) % 22),

    // Zone de talent : Dons naturels hérités karmiquement
    talentZone: reduceToMatrixNumber((lifeMission + day) % 22),

    // Lien en société : Capacité d'intégration sociale
    socialConnection: reduceToMatrixNumber((month + year) % 22),

    // Parents : Relations karmiques avec les parents
    parents: reduceToMatrixNumber((day + year) % 22),

    // Antécédents féminins : Héritage de la lignée maternelle
    feminineAncestry: reduceToMatrixNumber((month + century) % 22),

    // Antécédents masculins : Héritage de la lignée paternelle
    masculineAncestry: reduceToMatrixNumber((day + century) % 22),
  };
}
