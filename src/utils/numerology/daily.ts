/**
 * @fileoverview Calculs des vibrations quotidiennes universelles
 * Ce fichier contient les fonctions pour calculer les vibrations du jour, mois, année
 * Ces vibrations sont universelles et s'appliquent à tout le monde
 */

/**
 * Réduit un nombre à un chiffre (1-9)
 * @param num - Nombre à réduire
 * @returns Nombre réduit entre 1 et 9
 */
export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return num;
}

/**
 * Calcule la vibration du jour
 * @param day - Jour (1-31)
 * @returns Vibration du jour (1-9)
 * @example
 * calculateDayVibration(10) // Retourne 1 (1+0)
 * calculateDayVibration(25) // Retourne 7 (2+5)
 */
export function calculateDayVibration(day: number): number {
  return reduceToSingleDigit(day);
}

/**
 * Calcule la vibration du mois
 * @param month - Mois (1-12)
 * @returns Vibration du mois (1-9)
 * @example
 * calculateMonthVibration(10) // Retourne 1 (octobre: 1+0)
 * calculateMonthVibration(12) // Retourne 3 (décembre: 1+2)
 */
export function calculateMonthVibration(month: number): number {
  return reduceToSingleDigit(month);
}

/**
 * Calcule la vibration de l'année
 * @param year - Année (ex: 2025)
 * @returns Vibration de l'année (1-9)
 * @example
 * calculateYearVibration(2025) // Retourne 9 (2+0+2+5)
 * calculateYearVibration(2024) // Retourne 8 (2+0+2+4)
 */
export function calculateYearVibration(year: number): number {
  return reduceToSingleDigit(year);
}

/**
 * Calcule la vibration universelle d'une date complète
 * C'est la somme du jour + mois + année réduite à un chiffre
 * @param date - Date à analyser
 * @returns Vibration universelle (1-9)
 * @example
 * const date = new Date(2025, 9, 10) // 10 octobre 2025
 * calculateUniversalVibration(date) // Retourne 2
 * // Calcul: 10 + 10 + 2025 = 2045 → 2+0+4+5 = 11 → 1+1 = 2
 */
export function calculateUniversalVibration(date: Date): number {
  const day = date.getDate();
  const month = date.getMonth() + 1; // JS months are 0-indexed
  const year = date.getFullYear();

  const sum = day + month + year;
  return reduceToSingleDigit(sum);
}

/**
 * Calcule toutes les vibrations d'une date
 * @param date - Date à analyser (par défaut: date du jour)
 * @returns Objet contenant toutes les vibrations
 * @example
 * const vibrations = calculateAllVibrations(new Date(2025, 9, 10))
 * // Retourne:
 * // {
 * //   day: 1,        // 10 → 1
 * //   month: 1,      // 10 → 1
 * //   year: 9,       // 2025 → 9
 * //   universal: 2   // 10+10+2025 → 2
 * // }
 */
export function calculateAllVibrations(date: Date = new Date()) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return {
    day: calculateDayVibration(day),
    month: calculateMonthVibration(month),
    year: calculateYearVibration(year),
    universal: calculateUniversalVibration(date),
  };
}
