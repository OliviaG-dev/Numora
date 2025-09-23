/**
 * @fileoverview Fonctions utilitaires pour la numérologie
 * Ce fichier contient les fonctions communes utilisées dans tous les calculs numérologiques
 */

/**
 * Constantes pour la numérologie
 */
export const LETTER_VALUES: { [key: string]: number } = {
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

export const MASTER_NUMBERS = [11, 22, 33];

/**
 * Fonction utilitaire pour obtenir la valeur numérologique d'une lettre
 * @param letter - Lettre à convertir
 * @returns Valeur numérologique (1-9)
 */
export function getLetterValue(letter: string): number {
  return LETTER_VALUES[letter] || 0;
}

/**
 * Fonction utilitaire pour réduire un nombre à un chiffre ou nombre maître
 * @param num - Nombre à réduire
 * @param allowMasterNumbers - Si true, préserve les nombres maîtres (11, 22, 33)
 * @returns Nombre réduit (1-9, ou 11, 22, 33 si allowMasterNumbers=true)
 */
export function reduceToSingleDigit(
  num: number,
  allowMasterNumbers: boolean = true
): number {
  // Nombres maîtres (ne pas réduire seulement si autorisés)
  if (allowMasterNumbers && MASTER_NUMBERS.includes(num)) return num;

  // Nombres de base (1-9)
  if (num < 10) return num;

  // Réduction : additionner les chiffres du nombre
  const digits = num.toString().split("").map(Number);
  const sum = digits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(sum, allowMasterNumbers);
}

/**
 * Normalise un nom en supprimant les accents et en mettant en majuscules
 * @param name - Nom à normaliser
 * @returns Nom normalisé
 */
export function normalizeName(name: string): string {
  return name
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
    .toUpperCase();
}

/**
 * Valide le format de date
 * @param dateString - Date à valider
 * @throws Error si le format est invalide
 */
export function validateDateString(dateString: string): void {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error('Format de date invalide. Utilisez "YYYY-MM-DD"');
  }

  // Vérification que tous les caractères sont des chiffres
  const digits = dateString.replace(/-/g, "").split("").map(Number);
  if (digits.some(isNaN)) {
    throw new Error("La date ne doit contenir que des chiffres et des tirets");
  }
}

/**
 * Valide un nom (non vide)
 * @param name - Nom à valider
 * @throws Error si le nom est vide
 */
export function validateName(name: string): void {
  if (!name || name.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }
}

/**
 * Valide un jour de naissance
 * @param day - Jour à valider
 * @throws Error si le jour est invalide
 */
export function validateDay(day: number): void {
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }
}

/**
 * Valide un mois
 * @param month - Mois à valider
 * @throws Error si le mois est invalide
 */
export function validateMonth(month: number): void {
  if (month < 1 || month > 12) {
    throw new Error("Le mois doit être entre 1 et 12");
  }
}

/**
 * Valide une année
 * @param year - Année à valider
 * @throws Error si l'année est invalide
 */
export function validateYear(year: number): void {
  if (year < 1900 || year > 2100) {
    throw new Error("L'année doit être entre 1900 et 2100");
  }
}

