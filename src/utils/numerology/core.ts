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

/**
 * Calcule le nombre de Réalisation (également appelé nombre de Destinée)
 * Le nombre de réalisation est calculé en réduisant n'importe quel nombre donné
 * à un chiffre unique ou à un nombre maître (11, 22, 33).
 *
 * @param number - Nombre à réduire (peut être n'importe quel entier positif)
 * @param reduce - Si true, réduit le nombre à un chiffre ou nombre maître (défaut: true)
 * @returns Le nombre de Réalisation (1-9, 11, 22, ou 33)
 *
 * @example
 * calculateRealisationNumber(29) // Retourne 11 (car 2+9=11, nombre maître)
 * calculateRealisationNumber(123) // Retourne 6 (car 1+2+3=6)
 * calculateRealisationNumber(44) // Retourne 8 (car 4+4=8)
 */
export function calculateRealisationNumber(
  number: number,
  reduce: boolean = true
): number {
  // Validation basique
  if (number < 0 || !Number.isInteger(number)) {
    throw new Error("Le nombre de réalisation doit être un entier positif");
  }

  // Si le nombre est déjà un chiffre unique ou nombre maître, le retourner directement
  if (number <= 9 || number === 11 || number === 22 || number === 33) {
    return number;
  }

  // Réduction du nombre si demandée
  return reduce ? reduceToSingleDigit(number) : number;
}

/**
 * Calcule le Nombre du Cœur (Heart Number)
 * Le nombre du cœur révèle les besoins émotionnels profonds, le langage de l'amour
 * et les désirs du cœur. Il est calculé en utilisant uniquement les voyelles du nom complet
 * avec une correspondance numérologique spécifique.
 *
 * @param fullName - Nom complet (prénoms + nom de famille)
 * @param reduce - Si true, réduit le nombre à un chiffre (défaut: true)
 * @returns Le Nombre du Cœur (1-9, 11, 22, ou 33)
 *
 * @example
 * calculateHeartNumber("Marie Dupont") // Calcule selon les voyelles A, I, E, U, O
 */
export function calculateHeartNumber(
  fullName: string,
  reduce: boolean = true
): number {
  // Validation du nom
  validateName(fullName);

  // Tableau de correspondance spécifique pour les voyelles du Nombre du Cœur
  const vowelsMap: Record<string, number> = {
    A: 1,
    E: 5,
    I: 9,
    O: 6,
    U: 3,
    Y: 7, // Y est considéré comme voyelle dans certains contextes
  };

  // Normalisation et nettoyage du nom
  const cleanName = fullName
    .toUpperCase()
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .replace(/[^A-Z]/g, ""); // Garde uniquement les lettres

  // Extraction des voyelles et calcul
  const vowels = cleanName.split("").filter((letter) => vowelsMap[letter]);

  if (vowels.length === 0) {
    throw new Error("Aucune voyelle trouvée dans le nom");
  }

  // Calcul de la somme
  const total = vowels.reduce((sum, letter) => sum + vowelsMap[letter], 0);

  // Réduction du nombre si demandée
  return reduce ? reduceToSingleDigit(total) : total;
}
