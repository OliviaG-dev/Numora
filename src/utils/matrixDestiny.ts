import { reduceToSingleDigit } from "./numerology/utils";

// Fonctions utilitaires pour Matrix Destiny
export function reduceNumber(n: number): number {
  return reduceToSingleDigit(n, true);
}

export function sumReduce(...nums: number[]): number {
  const total = nums.reduce((a, b) => a + b, 0);
  return reduceNumber(total);
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
    maleLine: number;
    femaleLine: number;
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
}

/**
 * Calcule la Matrix Destiny selon la méthode Grabovoi
 * Méthode la plus précise et fiable basée sur les mathématiques pures
 *
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @param name - Nom complet (optionnel, pour calculs avancés)
 * @returns MatrixDestiny - Structure complète de la Matrix
 */
export function calculateMatrixDestiny(
  day: number,
  month: number,
  year: number,
  name?: string
): MatrixDestiny {
  // === NOMBRES DE BASE (Méthode Grabovoi) ===
  const dayReduced = reduceNumber(day);
  const monthReduced = reduceNumber(month);
  const yearReduced = reduceNumber(
    year
      .toString()
      .split("")
      .map(Number)
      .reduce((a, b) => a + b, 0)
  );
  const lifeMission = sumReduce(day, month, year);

  // === CENTRE DE LA MATRIX ===
  const maleLine = sumReduce(day, month);
  const femaleLine = sumReduce(month, year);

  // === CHAKRAS (Calculs Grabovoi précis) ===
  const chakras = calculateChakrasGrabovoi(day, month, year, name);

  // === CYCLES DE VIE (Méthode Grabovoi) ===
  const cycles = calculateLifeCyclesGrabovoi(day, month, year);

  // === DOMAINES SPÉCIAUX ===
  const special = calculateSpecialDomains(day, month, year, name);

  return {
    base: {
      day: dayReduced,
      month: monthReduced,
      year: yearReduced,
      lifeMission,
    },
    center: { mission: lifeMission, maleLine, femaleLine },
    chakras,
    cycles,
    special,
  };
}

/**
 * Calcule les valeurs des chakras selon la méthode Grabovoi
 * Chaque chakra a 3 dimensions : physique, énergie, émotions
 */
function calculateChakrasGrabovoi(
  day: number,
  month: number,
  year: number,
  name?: string
): Record<string, { physique: number; energy: number; emotions: number }> {
  // Calculs de base pour tous les chakras
  const baseVibration = sumReduce(day, month, year);
  const timeVibration = sumReduce(day, month);
  const spaceVibration = sumReduce(month, year);
  const destinyVibration = sumReduce(day, year);

  // Ajustement avec le nom si fourni
  const nameAdjustment = name ? calculateNameVibration(name) : 0;

  // Calculs spécifiques par chakra selon Grabovoi
  return {
    sahasrara: {
      physique: reduceNumber(baseVibration + 7 + nameAdjustment), // Chakra couronne
      energy: reduceNumber(timeVibration + 7 + nameAdjustment),
      emotions: reduceNumber(spaceVibration + 7 + nameAdjustment),
    },
    ajna: {
      physique: reduceNumber(baseVibration + 6 + nameAdjustment), // 3ème œil
      energy: reduceNumber(timeVibration + 6 + nameAdjustment),
      emotions: reduceNumber(destinyVibration + 6 + nameAdjustment),
    },
    vissudha: {
      physique: reduceNumber(baseVibration + 5 + nameAdjustment), // Gorge
      energy: reduceNumber(spaceVibration + 5 + nameAdjustment),
      emotions: reduceNumber(timeVibration + 5 + nameAdjustment),
    },
    anahata: {
      physique: reduceNumber(baseVibration + 4 + nameAdjustment), // Cœur
      energy: reduceNumber(destinyVibration + 4 + nameAdjustment),
      emotions: reduceNumber(baseVibration + 4 + nameAdjustment),
    },
    manipura: {
      physique: reduceNumber(baseVibration + 3 + nameAdjustment), // Plexus solaire
      energy: reduceNumber(timeVibration + 3 + nameAdjustment),
      emotions: reduceNumber(spaceVibration + 3 + nameAdjustment),
    },
    svadhisthana: {
      physique: reduceNumber(baseVibration + 2 + nameAdjustment), // Sacré
      energy: reduceNumber(spaceVibration + 2 + nameAdjustment),
      emotions: reduceNumber(destinyVibration + 2 + nameAdjustment),
    },
    muladhara: {
      physique: reduceNumber(baseVibration + 1 + nameAdjustment), // Racine
      energy: reduceNumber(destinyVibration + 1 + nameAdjustment),
      emotions: reduceNumber(timeVibration + 1 + nameAdjustment),
    },
  };
}

/**
 * Calcule les cycles de vie selon la méthode Grabovoi
 * Cycles de 9 ans avec calculs précis
 */
function calculateLifeCyclesGrabovoi(
  day: number,
  month: number,
  year: number
): Record<string, number> {
  const cycles: Record<string, number> = {};
  const baseCycle = sumReduce(day, month, year);

  // Cycles de 9 ans (méthode Grabovoi)
  for (let age = 1; age <= 100; age++) {
    const cycleNumber = Math.ceil(age / 9);
    const cyclePosition = ((age - 1) % 9) + 1;

    // Calcul selon la position dans le cycle
    cycles[age.toString()] = reduceNumber(
      baseCycle + cycleNumber + cyclePosition
    );
  }

  return cycles;
}

/**
 * Calcule les domaines spéciaux (amour, argent)
 * Basé sur les vibrations du nom et de la date
 */
function calculateSpecialDomains(
  day: number,
  month: number,
  year: number,
  name?: string
): { love: number; money: number } {
  // Calculs de base
  const love = reduceNumber(day + month + 7); // 7 = vibration de l'amour
  const money = reduceNumber(month + year + 8); // 8 = vibration de l'abondance

  // Si nom fourni, ajuster avec les vibrations du nom
  if (name) {
    const nameVibration = calculateNameVibration(name);
    return {
      love: reduceNumber(love + nameVibration),
      money: reduceNumber(money + nameVibration),
    };
  }

  return { love, money };
}

/**
 * Calcule la vibration d'un nom selon Grabovoi
 * Somme des valeurs numériques des lettres
 */
function calculateNameVibration(name: string): number {
  const letterValues: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    I: 9,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    O: 6,
    P: 7,
    Q: 8,
    R: 9,
    S: 1,
    T: 2,
    U: 3,
    V: 4,
    W: 5,
    X: 6,
    Y: 7,
    Z: 8,
  };

  const total = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);

  return reduceNumber(total);
}
