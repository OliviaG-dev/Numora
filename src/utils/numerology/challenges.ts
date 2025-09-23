/**
 * @fileoverview Calculs des défis et cycles numérologiques
 * Ce fichier contient les fonctions pour calculer les défis, cycles de vie et périodes de réalisation
 */

import {
  reduceToSingleDigit,
  validateDay,
  validateMonth,
  validateYear,
} from "./utils";
// Types définis localement pour éviter les problèmes d'import
interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

interface LifeCyclesResult {
  firstCycle: number; // Naissance → ~28 ans
  secondCycle: number; // 29 → ~56 ans
  thirdCycle: number; // 57 ans → fin de vie
}

interface RealizationPeriodsResult {
  firstPeriod: number; // jusqu'à ~30 ans
  secondPeriod: number; // 30 → 39 ans
  thirdPeriod: number; // 39 → 48 ans
  fourthPeriod: number; // 48 ans → fin de vie
}
import challengeData from "../../data/numerology/Basique/ChallengeData.json";

/**
 * Fonction utilitaire pour obtenir la description d'un défi
 * @param challengeNumber - Numéro du défi (1-9)
 * @returns Description du défi
 */
function getChallengeDescription(challengeNumber: number): string {
  const challengeInfo =
    challengeData[challengeNumber.toString() as keyof typeof challengeData];
  return challengeInfo?.description || "Défi inconnu";
}

/**
 * Calcule les nombres de défi numérologiques
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @returns Les 4 nombres de défi avec leurs descriptions
 */
export function calculateChallengeNumbers(
  day: number,
  month: number,
  year: number
): ChallengeNumbersResult {
  // Validation des paramètres
  validateDay(day);
  validateMonth(month);
  validateYear(year);

  // Réduction des composants de date
  const dayReduced = reduceToSingleDigit(day, false); // Pas de nombres maîtres pour les dates
  const monthReduced = reduceToSingleDigit(month, false);
  const yearReduced = reduceToSingleDigit(year, false);

  // Calcul des défis
  const first = Math.abs(dayReduced - monthReduced);
  const second = Math.abs(dayReduced - yearReduced);
  const third = Math.abs(monthReduced - yearReduced);
  const fourth = Math.abs(first - second);

  // Réduction à 1-9 (0 devient 9)
  const numbers = [first, second, third, fourth].map(
    (n) => (n === 0 ? 9 : reduceToSingleDigit(n, false)) // Pas de nombres maîtres pour les défis
  );

  return {
    first: {
      number: numbers[0],
      description: `${getChallengeDescription(numbers[0])}`,
    },
    second: {
      number: numbers[1],
      description: `${getChallengeDescription(numbers[1])}`,
    },
    third: {
      number: numbers[2],
      description: `${getChallengeDescription(numbers[2])}`,
    },
    fourth: {
      number: numbers[3],
      description: `${getChallengeDescription(numbers[3])}`,
    },
  };
}

/**
 * Calcule les cycles de vie numérologiques
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @returns Les 3 cycles de vie avec leurs nombres
 */
export function calculateLifeCycles(
  day: number,
  month: number,
  year: number
): LifeCyclesResult {
  const monthReduced = reduceToSingleDigit(month, false); // Pas de nombres maîtres pour les dates
  const dayReduced = reduceToSingleDigit(day, false);
  const yearReduced = reduceToSingleDigit(
    year
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0),
    false
  );

  return {
    firstCycle: monthReduced, // Naissance → ~28 ans
    secondCycle: dayReduced, // 29 → ~56 ans
    thirdCycle: yearReduced, // 57 ans → fin de vie
  };
}

/**
 * Calcule les périodes de réalisation (pinacles) numérologiques
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @returns Les 4 périodes de réalisation avec leurs nombres
 */
export function calculateRealizationPeriods(
  day: number,
  month: number,
  year: number
): RealizationPeriodsResult {
  const dayReduced = reduceToSingleDigit(day, false); // Pas de nombres maîtres pour les dates
  const monthReduced = reduceToSingleDigit(month, false);
  const yearReduced = reduceToSingleDigit(
    year
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0),
    false
  );

  const firstPeriod = reduceToSingleDigit(dayReduced + monthReduced, false); // jusqu'à ~30 ans
  const secondPeriod = reduceToSingleDigit(dayReduced + yearReduced, false); // 30 → 39 ans
  const thirdPeriod = reduceToSingleDigit(firstPeriod + secondPeriod, false); // 39 → 48 ans
  const fourthPeriod = reduceToSingleDigit(monthReduced + yearReduced, false); // 48 ans → fin de vie

  return {
    firstPeriod,
    secondPeriod,
    thirdPeriod,
    fourthPeriod,
  };
}
