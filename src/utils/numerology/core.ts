/**
 * @fileoverview Calculs numérologiques de base
 * Ce fichier contient les fonctions pour calculer les nombres fondamentaux de la numérologie
 */

import {
  getLetterValue,
  reduceToSingleDigit,
  normalizeName,
  validateDateString,
  validateName,
  validateDay,
} from "./utils";

/**
 * Calcule le Chemin de Vie en numérologie
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
 * @param reduce - Si true, réduit le nombre à un chiffre (défaut: true)
 * @returns Le nombre du Chemin de Vie (1-9, 11, 22, ou 33)
 *
 * @example
 * calculateLifePathNumber("1990-03-15") // Retourne 1
 * calculateLifePathNumber("1985-07-22") // Retourne 7
 */
export function calculateLifePathNumber(
  dateString: string,
  reduce: boolean = true
): number {
  // Validation du format de date
  validateDateString(dateString);

  // Extraction des chiffres (suppression des tirets)
  const digits = dateString.replace(/-/g, "").split("").map(Number);

  // Somme initiale de tous les chiffres
  const total = digits.reduce((acc, val) => acc + val, 0);

  // Réduction du nombre si demandée
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre d'Expression (valeur numérologique du nom complet)
 * @param fullName - Nom complet (prénoms + nom de famille)
 * @param reduce - Si true, réduit le nombre à un chiffre (défaut: true)
 * @returns Le nombre d'Expression (1-9, 11, 22, ou 33)
 */
export function calculateExpressionNumber(
  fullName: string,
  reduce: boolean = true
): number {
  // Validation du nom
  validateName(fullName);

  // Normalisation des caractères accentués
  const normalizedName = normalizeName(fullName);

  // Conversion du nom en chiffres
  const nameDigits = normalizedName
    .replace(/[^A-Z]/g, "") // Supprimer tout sauf les lettres
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0); // Supprimer les 0 (caractères non reconnus)

  if (nameDigits.length === 0) {
    throw new Error("Aucune lettre valide trouvée dans le nom");
  }

  // Somme et réduction
  const total = nameDigits.reduce((acc, val) => acc + val, 0);
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre de l'Âme (voyelles du nom)
 * @param fullName - Nom complet
 * @param reduce - Si true, réduit le nombre à un chiffre (défaut: true)
 * @returns Le nombre de l'Âme (1-9, 11, 22, ou 33)
 */
export function calculateSoulUrgeNumber(
  fullName: string,
  reduce: boolean = true
): number {
  validateName(fullName);

  // Normalisation des caractères accentués
  const normalizedName = normalizeName(fullName);

  // Extraction des voyelles
  const vowels = normalizedName
    .replace(/[^AEIOU]/g, "") // Garder seulement les voyelles
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0);

  if (vowels.length === 0) {
    throw new Error("Aucune voyelle trouvée dans le nom");
  }

  const total = vowels.reduce((acc, val) => acc + val, 0);
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre de Personnalité (consonnes du nom)
 * @param fullName - Nom complet
 * @param reduce - Si true, réduit le nombre à un chiffre (défaut: true)
 * @returns Le nombre de Personnalité (1-9, 11, 22, ou 33)
 */
export function calculatePersonalityNumber(
  fullName: string,
  reduce: boolean = true
): number {
  validateName(fullName);

  // Normalisation des caractères accentués
  const normalizedName = normalizeName(fullName);

  // Extraction des consonnes
  const consonants = normalizedName
    .replace(/[AEIOU]/g, "") // Supprimer les voyelles
    .replace(/[^A-Z]/g, "") // Supprimer tout sauf les lettres
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0);

  if (consonants.length === 0) {
    throw new Error("Aucune consonne trouvée dans le nom");
  }

  const total = consonants.reduce((acc, val) => acc + val, 0);
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre du Jour de Naissance
 * @param day - Jour de naissance (1-31)
 * @returns Le nombre du Jour de Naissance (1-9)
 */
export function calculateBirthdayNumber(day: number): number {
  validateDay(day);
  return reduceToSingleDigit(day, false); // Pas de nombres maîtres pour les dates
}

