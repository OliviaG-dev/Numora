import { reduceToSingleDigit } from "../numerology/utils";

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
    balance: number;
  };
  commonEnergyZone?: {
    physics: number;
    energy: number;
    emotions: number;
  };
  heartLine?: {
    physique: number;
    energy: number;
    emotions: number;
  };
  karmicLines: {
    financialKarmicTail: {
      primary: number;
      secondary: number;
    };
    karmicLife: {
      primary: number;
      secondary: number;
    };
    talentZone: {
      primary: number;
      secondary: number;
    };
    socialConnection: number;
    parents: {
      primary: number;
      secondary: number;
    };
    feminineAncestry: {
      primary: number;
      secondary: number;
      tertiary: number;
      quaternary: number;
    };
    masculineAncestry: {
      primary: number;
      secondary: number;
      tertiary: number;
      quaternary: number;
    };
  };
  externalRelations: {
    personalPower: number;
    socialInfluence: number;
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
  const lifeMission = calculateLifeMission(dayValue, monthValue, yearValue);

  // === CENTRE DE LA MATRIX ===
  const centerMission = sumReduce(dayValue, monthValue, yearValue, lifeMission);
  const maleLine = calculateMaleLine(
    dayValue,
    monthValue,
    yearValue,
    centerMission,
    lifeMission
  );
  const femaleLine = calculateFemaleLine(
    dayValue,
    monthValue,
    yearValue,
    centerMission,
    lifeMission
  );

  // === CHAKRAS (Calculs traditionnels précis) ===
  // Calcul préliminaire des valeurs nécessaires pour les chakras
  const parentsPrimary = reduceToMatrixNumber(maleLine.mission + dayValue);
  const talentZonePrimary = reduceToMatrixNumber(maleLine.mission + monthValue);
  const parentsSecondary = reduceToMatrixNumber(
    maleLine.mission + dayValue + dayValue
  );
  const talentZoneSecondary = reduceToMatrixNumber(
    maleLine.mission + monthValue + monthValue
  );
  const financialKarmicTailPrimary = reduceToMatrixNumber(
    maleLine.mission + yearValue
  );
  const karmicLifePrimary = reduceToMatrixNumber(
    maleLine.mission + lifeMission
  );

  // === LIGNE DU CŒUR (calculée avant les chakras) ===
  const heartLine = calculateHeartLine(
    parentsPrimary, // parents.primary (déjà réduit)
    maleLine.mission, // maleLine.mission (centre de la matrix)
    talentZonePrimary // talentZone.primary (déjà réduit)
  );

  const chakras = calculateChakrasTraditional(
    day,
    month,
    year,
    dayValue,
    monthValue,
    parentsSecondary,
    talentZoneSecondary,
    parentsPrimary,
    talentZonePrimary,
    maleLine.mission,
    financialKarmicTailPrimary,
    karmicLifePrimary,
    yearValue,
    lifeMission,
    heartLine
  );

  // === CYCLES DE VIE (Méthode traditionnelle) ===
  const cycles = calculateAgeCycles(day, month, year);

  // === LIGNES KARMIQUES ===
  // Calcul préliminaire des valeurs nécessaires pour les antécédents

  const karmicLines = calculateKarmicLines(
    month,
    year,
    lifeMission,
    maleLine.mission,
    yearValue,
    monthValue,
    dayValue,
    maleLine.dayMonth,
    maleLine.dayYear,
    parentsPrimary,
    karmicLifePrimary,
    talentZonePrimary,
    femaleLine.monthYear,
    femaleLine.monthDay
  );

  // === DOMAINES SPÉCIAUX ===
  const special = calculateSpecialDomainsTraditional(
    day,
    month,
    year,
    karmicLifePrimary,
    karmicLines.masculineAncestry.tertiary,
    financialKarmicTailPrimary
  );

  // === RELATIONS EXTÉRIEURES ===
  const externalRelations = calculateExternalRelations(
    maleLine.mission,
    centerMission
  );

  // === ZONE D'ÉNERGIE COMMUNE ===
  const commonEnergyZone = calculateCommonEnergyZone(chakras);

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
    heartLine,
    karmicLines,
    externalRelations,
  };
}

/**
 * Calcule la mission de vie selon la méthode traditionnelle
 */
function calculateLifeMission(
  dayValue: number,
  monthValue: number,
  yearValue: number
): number {
  const baseSum = dayValue + monthValue + yearValue;
  return reduceToMatrixNumber(baseSum);
}

/**
 * Calcule la ligne masculine avec 3 valeurs :
 * 1. Jour + Mois (réduit)
 * 2. Mission (centre)
 * 3. Année + Mission de Vie (réduit)
 */
function calculateMaleLine(
  day: number,
  month: number,
  year: number,
  mission: number,
  lifeMission: number
): {
  dayMonth: number;
  mission: number;
  dayYear: number;
} {
  return {
    dayMonth: reduceToMatrixNumber(day + month), // Jour + Mois réduit à 22
    mission: mission,
    dayYear: reduceToMatrixNumber(year + lifeMission), // Année + Mission de Vie réduit à 22
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
  mission: number,
  lifeMission: number
): {
  monthYear: number;
  mission: number;
  monthDay: number;
} {
  return {
    monthYear: reduceToMatrixNumber(month + year), // Mois + Année réduit à 22
    mission: mission,
    monthDay: reduceToMatrixNumber(lifeMission + day), // lifeMission + day réduit à 22
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
  year: number,
  dayValue: number,
  monthValue: number,
  parentsSecondary: number,
  talentZoneSecondary: number,
  parentsPrimary: number,
  talentZonePrimary: number,
  maleLineMission: number,
  financialKarmicTailPrimary: number,
  karmicLifePrimary: number,
  yearValue: number,
  lifeMission: number,
  heartLine: { physique: number; energy: number; emotions: number }
): Record<string, { physique: number; energy: number; emotions: number }> {
  return {
    sahasrara: {
      physique: dayValue, // Jour réduit
      energy: monthValue, // Mois réduit
      emotions: reduceToMatrixNumber(monthValue + dayValue), // Mois + Jour
    },
    ajna: {
      physique: reduceToMatrixNumber((day * month) % 22), // Jour × mois mod 22
      energy: reduceToMatrixNumber((month * year) % 22), // Mois × année mod 22
      emotions: reduceToMatrixNumber(parentsSecondary + talentZoneSecondary), // parents.secondary + talentZone.secondary
    },
    vissudha: {
      physique: reduceToMatrixNumber((day + month + year) % 22), // Somme mod 22
      energy: reduceToMatrixNumber((day * 2 + month) % 22), // Jour×2 + mois mod 22
      emotions: reduceToMatrixNumber(parentsPrimary + talentZonePrimary), // parents.primary + talentZone.primary
    },
    anahata: {
      physique: heartLine.physique, // parents.primary + maleLine.mission
      energy: heartLine.energy, // maleLine.mission + talentZone.primary
      emotions: heartLine.emotions, // physique + énergie
    },
    manipura: {
      physique: Math.floor(day / 2) + Math.floor(month / 2), // Demi-jour + demi-mois
      energy: Math.floor(month / 2) + Math.floor(year / 200), // Demi-mois + demi-siècle
      emotions: reduceToMatrixNumber(maleLineMission + maleLineMission), // maleLine.mission + maleLine.mission
    },
    svadhisthana: {
      physique: reduceToMatrixNumber((day * 3) % 22), // Jour×3 mod 22
      energy: reduceToMatrixNumber((month * 3) % 22), // Mois×3 mod 22
      emotions: reduceToMatrixNumber(
        financialKarmicTailPrimary + karmicLifePrimary
      ), // financialKarmicTail.primary + karmicLife.primary
    },
    muladhara: {
      physique: reduceToMatrixNumber(day % 22), // Jour mod 22
      energy: reduceToMatrixNumber(month % 22), // Mois mod 22
      emotions: reduceToMatrixNumber(yearValue + lifeMission), // base.year + base.lifeMission
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
  year: number,
  karmicLifePrimary?: number,
  masculineAncestryTertiary?: number,
  financialKarmicTailPrimary?: number
): { love: number; money: number; balance: number } {
  // Balance : masculineAncestry.tertiary (si disponible)
  const balance =
    masculineAncestryTertiary || reduceToMatrixNumber(day + month);

  // Argent : balance + financialKarmicTail.primary (si disponible)
  const money = financialKarmicTailPrimary
    ? reduceToMatrixNumber(balance + financialKarmicTailPrimary)
    : reduceToMatrixNumber((month * year) % 22);

  // Amour : karmicLife.primary + masculineAncestry.tertiary (si disponibles)
  const love =
    karmicLifePrimary && masculineAncestryTertiary
      ? reduceToMatrixNumber(karmicLifePrimary + masculineAncestryTertiary)
      : reduceToMatrixNumber((day * month) % 22);

  return { love, money, balance };
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
  month: number,
  year: number,
  lifeMission: number,
  maleLineMission: number,
  yearValue: number,
  monthValue: number,
  dayValue: number,
  maleLineDayMonth: number,
  maleLineDayYear: number,
  parentsPrimary: number,
  karmicLifePrimary: number,
  talentZonePrimary: number,
  femaleLineMonthYear: number,
  femaleLineMonthDay: number
): {
  financialKarmicTail: {
    primary: number;
    secondary: number;
  };
  karmicLife: {
    primary: number;
    secondary: number;
  };
  talentZone: {
    primary: number;
    secondary: number;
  };
  socialConnection: number;
  parents: {
    primary: number;
    secondary: number;
  };
  feminineAncestry: {
    primary: number;
    secondary: number;
    tertiary: number;
    quaternary: number;
  };
  masculineAncestry: {
    primary: number;
    secondary: number;
    tertiary: number;
    quaternary: number;
  };
} {
  // Queue karmique financière : Calcul spécial avec deux badges
  const financialPrimary = reduceToMatrixNumber(maleLineMission + yearValue);
  const financialSecondary = reduceToMatrixNumber(financialPrimary + yearValue);

  // Vie karmique : Calcul spécial avec deux badges
  const karmicLifeSecondary = reduceToMatrixNumber(
    karmicLifePrimary + lifeMission
  );

  // Zone de talent : Calcul spécial avec deux badges
  const talentZoneSecondary = reduceToMatrixNumber(
    talentZonePrimary + monthValue
  );

  // Parents & Lien en société : Calcul spécial avec deux badges
  const parentsSecondary = reduceToMatrixNumber(parentsPrimary + dayValue);

  return {
    // Queue karmique financière : Dettes karmiques liées à l'argent
    financialKarmicTail: {
      primary: financialPrimary,
      secondary: financialSecondary,
    },

    // Vie karmique : Expériences accumulées des vies antérieures
    karmicLife: {
      primary: karmicLifePrimary,
      secondary: karmicLifeSecondary,
    },

    // Zone de talent : Dons naturels hérités karmiquement
    talentZone: {
      primary: talentZonePrimary,
      secondary: talentZoneSecondary,
    },

    // Lien en société : Capacité d'intégration sociale
    socialConnection: reduceToMatrixNumber((month + year) % 22),

    // Parents : Relations karmiques avec les parents
    parents: {
      primary: parentsPrimary,
      secondary: parentsSecondary,
    },

    // Antécédents féminins : Héritage de la lignée maternelle (4 badges)
    feminineAncestry: {
      // Badge 1 : financialKarmicTail.primary + talentZone.primary
      primary: reduceToMatrixNumber(financialPrimary + talentZonePrimary),
      // Badge 2 : feminineAncestry.primary + femaleLine.monthYear
      secondary: reduceToMatrixNumber(
        reduceToMatrixNumber(financialPrimary + talentZonePrimary) +
          femaleLineMonthYear
      ),
      // Badge 3 : parents.primary + karmicLife.primary
      tertiary: reduceToMatrixNumber(parentsPrimary + karmicLifePrimary),
      // Badge 4 : feminineAncestry.tertiary + femaleLine.monthDay
      quaternary: reduceToMatrixNumber(
        reduceToMatrixNumber(parentsPrimary + karmicLifePrimary) +
          femaleLineMonthDay
      ),
    },

    // Antécédents masculins : Héritage de la lignée paternelle (4 badges)
    masculineAncestry: {
      // Badge 1 : parents.primary + talentZone.primary
      primary: reduceToMatrixNumber(parentsPrimary + talentZonePrimary),
      // Badge 2 : maleLine.dayMonth + masculineAncestry.primary
      secondary: reduceToMatrixNumber(
        maleLineDayMonth +
          reduceToMatrixNumber(parentsPrimary + talentZonePrimary)
      ),
      // Badge 3 : financialKarmicTail.primary + karmicLife.primary
      tertiary: reduceToMatrixNumber(financialPrimary + karmicLifePrimary),
      // Badge 4 : (financialKarmicTail.primary + karmicLife.primary) + maleLine.dayYear
      quaternary: reduceToMatrixNumber(
        financialPrimary + karmicLifePrimary + maleLineDayYear
      ),
    },
  };
}

/**
 * Calcule la ligne du cœur
 * Physique : parents.primary + maleLine.mission
 * Énergie : maleLine.mission + talentZone.primary
 * Émotions : physique + énergie (pour le chakra Anahata)
 */
function calculateHeartLine(
  parentsPrimary: number,
  maleLineMission: number,
  talentZonePrimary: number
): { physique: number; energy: number; emotions: number } {
  const physique = reduceToMatrixNumber(parentsPrimary + maleLineMission);
  const energy = reduceToMatrixNumber(maleLineMission + talentZonePrimary);
  const emotions = reduceToMatrixNumber(physique + energy);

  return {
    physique,
    energy,
    emotions,
  };
}

/**
 * Calcule les relations extérieures
 * Pouvoir Personnel :
 * - Si centerMission (femaleLine.mission) ≤ 9 : centerMission × 2
 * - Si centerMission ≥ 10 : centerMission + somme des chiffres du centre
 * Influence Sociale : personalPower + maleLine.mission
 */
function calculateExternalRelations(
  maleLineMission: number,
  centerMission: number
): {
  personalPower: number;
  socialInfluence: number;
} {
  console.log("Debug calculateExternalRelations:");
  console.log("maleLineMission:", maleLineMission);
  console.log("centerMission:", centerMission);

  // Appliquer la nouvelle logique selon la valeur du centre (femaleLine.mission)
  let personalPower: number;
  if (centerMission <= 9) {
    personalPower = centerMission * 2;
    console.log("centerMission <= 9, multiplied by 2:", personalPower);
  } else if (centerMission >= 10) {
    // Calculer la somme des chiffres du centre
    const centerSum = centerMission
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    console.log("centerSum:", centerSum);
    personalPower = centerMission + centerSum;
    console.log("centerMission + centerSum:", personalPower);
  } else {
    // Fallback (ne devrait pas arriver)
    personalPower = centerMission;
  }

  // Réduire le résultat final à la plage Matrix
  personalPower = reduceToMatrixNumber(personalPower);
  console.log("personalPower final:", personalPower);

  const socialInfluence = reduceToMatrixNumber(personalPower + maleLineMission);

  return {
    personalPower,
    socialInfluence,
  };
}
