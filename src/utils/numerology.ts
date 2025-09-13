/**
 * Calcule le Chemin de Vie en numérologie
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
 * @returns Le nombre du Chemin de Vie (1-9, 11, 22, ou 33)
 *
 * @example
 * calculateLifePathNumber("1990-03-15") // Retourne 1
 * calculateLifePathNumber("1985-07-22") // Retourne 7
 */
export function calculateLifePathNumber(dateString: string): number {
  // Validation du format de date
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    throw new Error('Format de date invalide. Utilisez "YYYY-MM-DD"');
  }

  // Extraction des chiffres (suppression des tirets)
  const digits = dateString.replace(/-/g, "").split("").map(Number);

  // Vérification que tous les caractères sont des chiffres
  if (digits.some(isNaN)) {
    throw new Error("La date ne doit contenir que des chiffres et des tirets");
  }

  // Somme initiale de tous les chiffres
  const total = digits.reduce((acc, val) => acc + val, 0);

  // Réduction du nombre
  return reduceToSingleDigit(total);
}

/**
 * Calcule le nombre d'Expression (valeur numérologique du nom complet)
 * @param fullName - Nom complet (prénoms + nom de famille)
 * @returns Le nombre d'Expression (1-9, 11, 22, ou 33)
 */
export function calculateExpressionNumber(fullName: string): number {
  // Validation du nom
  if (!fullName || fullName.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }

  // Conversion du nom en chiffres
  const nameDigits = fullName
    .toUpperCase()
    .replace(/[^A-Z]/g, "") // Supprimer tout sauf les lettres
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0); // Supprimer les 0 (caractères non reconnus)

  if (nameDigits.length === 0) {
    throw new Error("Aucune lettre valide trouvée dans le nom");
  }

  // Somme et réduction
  const total = nameDigits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(total);
}

// Types pour les résultats
export interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

// Constantes
const LETTER_VALUES: { [key: string]: number } = {
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

const MASTER_NUMBERS = [11, 22, 33];

/**
 * Fonction utilitaire pour obtenir la valeur numérologique d'une lettre
 * @param letter - Lettre à convertir
 * @returns Valeur numérologique (1-9)
 */
function getLetterValue(letter: string): number {
  return LETTER_VALUES[letter] || 0;
}

/**
 * Fonction utilitaire pour réduire un nombre à un chiffre ou nombre maître
 * @param num - Nombre à réduire
 * @returns Nombre réduit (1-9, 11, 22, ou 33)
 */
function reduceToSingleDigit(num: number): number {
  // Nombres maîtres (ne pas réduire)
  if (MASTER_NUMBERS.includes(num)) return num;

  // Nombres de base (1-9)
  if (num < 10) return num;

  // Réduction : additionner les chiffres du nombre
  const digits = num.toString().split("").map(Number);
  const sum = digits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(sum);
}

/**
 * Calcule le nombre de l'Âme (voyelles du nom)
 * @param fullName - Nom complet
 * @returns Le nombre de l'Âme (1-9, 11, 22, ou 33)
 */
export function calculateSoulUrgeNumber(fullName: string): number {
  if (!fullName || fullName.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }

  // Extraction des voyelles
  const vowels = fullName
    .toUpperCase()
    .replace(/[^AEIOU]/g, "") // Garder seulement les voyelles
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0);

  if (vowels.length === 0) {
    throw new Error("Aucune voyelle trouvée dans le nom");
  }

  const total = vowels.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(total);
}

/**
 * Calcule le nombre de Personnalité (consonnes du nom)
 * @param fullName - Nom complet
 * @returns Le nombre de Personnalité (1-9, 11, 22, ou 33)
 */
export function calculatePersonalityNumber(fullName: string): number {
  if (!fullName || fullName.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }

  // Extraction des consonnes
  const consonants = fullName
    .toUpperCase()
    .replace(/[AEIOU]/g, "") // Supprimer les voyelles
    .replace(/[^A-Z]/g, "") // Supprimer tout sauf les lettres
    .split("")
    .map((letter) => getLetterValue(letter))
    .filter((num) => num > 0);

  if (consonants.length === 0) {
    throw new Error("Aucune consonne trouvée dans le nom");
  }

  const total = consonants.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(total);
}

/**
 * Calcule le nombre du Jour de Naissance
 * @param day - Jour de naissance (1-31)
 * @returns Le nombre du Jour de Naissance (1-9)
 */
export function calculateBirthdayNumber(day: number): number {
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }

  return reduceToSingleDigit(day);
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
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }
  if (month < 1 || month > 12) {
    throw new Error("Le mois doit être entre 1 et 12");
  }
  if (year < 1900 || year > 2100) {
    throw new Error("L'année doit être entre 1900 et 2100");
  }

  // Réduction des composants de date
  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(year);

  // Calcul des défis
  const first = Math.abs(dayReduced - monthReduced);
  const second = Math.abs(dayReduced - yearReduced);
  const third = Math.abs(monthReduced - yearReduced);
  const fourth = Math.abs(first - second);

  // Réduction à 1-9 (0 devient 9)
  const numbers = [first, second, third, fourth].map((n) =>
    n === 0 ? 9 : reduceToSingleDigit(n)
  );

  return {
    first: {
      number: numbers[0],
      description: `Défi de jeunesse (0-30 ans): ${getChallengeDescription(
        numbers[0]
      )}`,
    },
    second: {
      number: numbers[1],
      description: `Défi de maturité (30-60 ans): ${getChallengeDescription(
        numbers[1]
      )}`,
    },
    third: {
      number: numbers[2],
      description: `Défi de sagesse (60+ ans): ${getChallengeDescription(
        numbers[2]
      )}`,
    },
    fourth: {
      number: numbers[3],
      description: `Défi principal: ${getChallengeDescription(numbers[3])}`,
    },
  };
}

// Import des données de défi
import challengeData from "../data/numerology/ChallengeData.json";

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
