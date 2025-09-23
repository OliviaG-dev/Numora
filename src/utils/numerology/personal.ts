/**
 * @fileoverview Calculs des dates personnelles
 * Ce fichier contient les fonctions pour calculer les années, mois et jours personnels
 */

import { reduceToSingleDigit, validateDay, validateMonth } from "./utils";
// Types définis localement pour éviter les problèmes d'import
interface PersonalNumbersResult {
  year: {
    number: number;
    description: string;
  };
  month: {
    number: number;
    description: string;
  };
  day: {
    number: number;
    description: string;
  };
}

/**
 * Calcule l'année personnelle
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année en cours
 * @returns Le nombre de l'année personnelle (1-9)
 */
export function calculatePersonalYear(
  day: number,
  month: number,
  year: number
): number {
  // Validation des paramètres
  validateDay(day);
  validateMonth(month);

  // Réduction de l'année à un chiffre
  const yearReduced = reduceToSingleDigit(year, false); // Pas de nombres maîtres pour les dates

  // Calcul de l'année personnelle
  const sum = day + month + yearReduced;
  return reduceToSingleDigit(sum, false); // Pas de nombres maîtres pour les dates personnelles
}

/**
 * Calcule le mois personnel
 * @param personalYear - Année personnelle
 * @param month - Mois en cours
 * @returns Le nombre du mois personnel (1-9)
 */
export function calculatePersonalMonth(
  personalYear: number,
  month: number
): number {
  validateMonth(month);

  const sum = personalYear + month;
  return reduceToSingleDigit(sum, false); // Pas de nombres maîtres pour les dates personnelles
}

/**
 * Calcule le jour personnel
 * @param personalMonth - Mois personnel
 * @param day - Jour en cours
 * @returns Le nombre du jour personnel (1-9)
 */
export function calculatePersonalDay(
  personalMonth: number,
  day: number
): number {
  validateDay(day);

  const sum = personalMonth + day;
  return reduceToSingleDigit(sum, false); // Pas de nombres maîtres pour les dates personnelles
}

/**
 * Calcule tous les nombres personnels (année, mois, jour)
 * @param birthDay - Jour de naissance
 * @param birthMonth - Mois de naissance
 * @param currentDate - Date actuelle (optionnelle, utilise la date du jour par défaut)
 * @returns Les nombres personnels avec les données associées
 */
export function calculatePersonalNumbers(
  birthDay: number,
  birthMonth: number,
  currentDate?: Date
): PersonalNumbersResult {
  const today = currentDate || new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JS months: 0-11
  const currentDay = today.getDate();

  const personalYear = calculatePersonalYear(birthDay, birthMonth, currentYear);
  const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
  const personalDay = calculatePersonalDay(personalMonth, currentDay);

  return {
    year: {
      number: personalYear,
      description: `Année personnelle ${personalYear}`,
    },
    month: {
      number: personalMonth,
      description: `Mois personnel ${personalMonth}`,
    },
    day: {
      number: personalDay,
      description: `Jour personnel ${personalDay}`,
    },
  };
}

/**
 * Calcule la vibration d'une date donnée
 * @param date - Date à analyser
 * @param allowMaster - Si true, préserve les nombres maîtres (11, 22, 33)
 * @returns Le nombre de vibration de la date (1-9, ou 11, 22, 33 si allowMaster=true)
 *
 * @example
 * getDateVibration(new Date("2026-02-14")) // Retourne 6
 * getDateVibration(new Date("2026-02-14"), true) // Retourne 6 (pas de nombre maître ici)
 */
export function getDateVibration(
  date: Date,
  allowMaster: boolean = false
): number {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const sum = day + month + year;
  return reduceToSingleDigit(sum, allowMaster);
}
