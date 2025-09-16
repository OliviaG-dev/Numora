/**
 * @fileoverview Utilitaires pour les calculs numérologiques
 * Ce fichier contient toutes les fonctions nécessaires pour calculer les différents nombres en numérologie
 */

// Import des données de défi
import challengeData from "../data/numerology/ChallengeData.json";
import karmicNumberData from "../data/numerology/KarmicNumberData.json";

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

  // Normalisation des caractères accentués
  const normalizedName = fullName
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
    .toUpperCase();

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
  return reduceToSingleDigit(total);
}

// Types pour les résultats
export interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

export interface KarmicNumberResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

export interface KarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  karmicDefinitions: KarmicNumberResult[];
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

  // Normalisation des caractères accentués
  const normalizedName = fullName
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
    .toUpperCase();

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

  // Normalisation des caractères accentués
  const normalizedName = fullName
    .normalize("NFD") // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques
    .toUpperCase();

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
 * Calcule les cycles de vie numérologiques
 * @param day - Jour de naissance
 * @param month - Mois de naissance
 * @param year - Année de naissance
 * @returns Les 3 cycles de vie avec leurs nombres
 */
export function calculateLifeCycles(day: number, month: number, year: number) {
  const monthReduced = reduceToSingleDigit(month);
  const dayReduced = reduceToSingleDigit(day);
  const yearReduced = reduceToSingleDigit(
    year
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0)
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
) {
  const dayReduced = reduceToSingleDigit(day);
  const monthReduced = reduceToSingleDigit(month);
  const yearReduced = reduceToSingleDigit(
    year
      .toString()
      .split("")
      .reduce((acc, d) => acc + parseInt(d), 0)
  );

  const firstPeriod = reduceToSingleDigit(dayReduced + monthReduced); // jusqu'à ~30 ans
  const secondPeriod = reduceToSingleDigit(dayReduced + yearReduced); // 30 → 39 ans
  const thirdPeriod = reduceToSingleDigit(firstPeriod + secondPeriod); // 39 → 48 ans
  const fourthPeriod = reduceToSingleDigit(monthReduced + yearReduced); // 48 ans → fin de vie

  return {
    firstPeriod,
    secondPeriod,
    thirdPeriod,
    fourthPeriod,
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
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }
  if (month < 1 || month > 12) {
    throw new Error("Le mois doit être entre 1 et 12");
  }

  // Réduction de l'année à un chiffre
  const yearReduced = reduceToSingleDigit(year);

  // Calcul de l'année personnelle
  const sum = day + month + yearReduced;
  return reduceToSingleDigit(sum);
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
  if (month < 1 || month > 12) {
    throw new Error("Le mois doit être entre 1 et 12");
  }

  const sum = personalYear + month;
  return reduceToSingleDigit(sum);
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
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }

  const sum = personalMonth + day;
  return reduceToSingleDigit(sum);
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
) {
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
 * Calcule les nombres karmiques (nombres manquants dans le nom)
 * @param fullName - Nom complet
 * @returns Les nombres karmiques avec leurs définitions
 */
export function calculateKarmicNumbers(fullName: string): KarmicNumbersResult {
  // Validation du nom
  if (!fullName || fullName.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }

  // Nettoyer le nom (majuscules et sans accents)
  const cleanName = fullName
    .toUpperCase()
    .normalize("NFD") // retire accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, ""); // garde seulement les lettres

  if (cleanName.length === 0) {
    throw new Error("Aucune lettre valide trouvée dans le nom");
  }

  // Conversion lettre -> nombre (A=1, B=2, ... I=9, J=1, etc.)
  const letterToNumber = (letter: string): number => {
    const charCode = letter.charCodeAt(0) - 64; // A=1
    return ((charCode - 1) % 9) + 1; // cycle de 1 à 9
  };

  // Liste des nombres présents dans le nom
  const presentNumbers = new Set<number>();
  for (const letter of cleanName) {
    presentNumbers.add(letterToNumber(letter));
  }

  // Identifier les manquants
  const missingNumbers = [];
  for (let i = 1; i <= 9; i++) {
    if (!presentNumbers.has(i)) {
      missingNumbers.push(i);
    }
  }

  // Associer aux définitions JSON
  const karmicDefinitions: KarmicNumberResult[] = missingNumbers.map((num) => {
    const karmicData =
      karmicNumberData[num.toString() as keyof typeof karmicNumberData];
    return {
      number: num,
      summary: karmicData?.summary || "",
      challenge: karmicData?.challenge || "",
      details: karmicData?.details || "",
      keywords: karmicData?.keywords || [],
    };
  });

  return {
    fullName,
    presentNumbers: Array.from(presentNumbers).sort(),
    missingNumbers,
    karmicDefinitions,
  };
}
