/**
 * @fileoverview Utilitaires pour les calculs numérologiques
 * Ce fichier contient toutes les fonctions nécessaires pour calculer les différents nombres en numérologie
 */

// Import des données de défi
import challengeData from "../data/numerology/ChallengeData.json";
import karmicNumberData from "../data/numerology/KarmicNumberData.json";
import cycleKarmicData from "../data/numerology/CycleKarmicData.json";

/**
 * Calcule le Chemin de Vie en numérologie
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
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

  // Réduction du nombre si demandée
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre d'Expression (valeur numérologique du nom complet)
 * @param fullName - Nom complet (prénoms + nom de famille)
 * @returns Le nombre d'Expression (1-9, 11, 22, ou 33)
 */
export function calculateExpressionNumber(
  fullName: string,
  reduce: boolean = true
): number {
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
  return reduce ? reduceToSingleDigit(total) : total;
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

export interface CycleKarmicResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

export interface CycleKarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  cycleKarmicDefinitions: CycleKarmicResult[];
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
 * @param allowMasterNumbers - Si true, préserve les nombres maîtres (11, 22, 33)
 * @returns Nombre réduit (1-9, ou 11, 22, 33 si allowMasterNumbers=true)
 */
function reduceToSingleDigit(
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
 * Calcule le nombre de l'Âme (voyelles du nom)
 * @param fullName - Nom complet
 * @returns Le nombre de l'Âme (1-9, 11, 22, ou 33)
 */
export function calculateSoulUrgeNumber(
  fullName: string,
  reduce: boolean = true
): number {
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
  return reduce ? reduceToSingleDigit(total) : total;
}

/**
 * Calcule le nombre de Personnalité (consonnes du nom)
 * @param fullName - Nom complet
 * @returns Le nombre de Personnalité (1-9, 11, 22, ou 33)
 */
export function calculatePersonalityNumber(
  fullName: string,
  reduce: boolean = true
): number {
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
  return reduce ? reduceToSingleDigit(total) : total;
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

  return reduceToSingleDigit(day, false); // Pas de nombres maîtres pour les dates
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
) {
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
  if (month < 1 || month > 12) {
    throw new Error("Le mois doit être entre 1 et 12");
  }

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
  if (day < 1 || day > 31) {
    throw new Error("Le jour doit être entre 1 et 31");
  }

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
 * Calcule les nombres karmiques (chiffres manquants dans la date de naissance)
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
 * @returns Les nombres karmiques avec leurs définitions
 */
export function calculateKarmicNumbers(
  dateString: string
): KarmicNumbersResult {
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

  // Liste des chiffres présents dans la date
  const presentNumbers = new Set<number>();
  for (const digit of digits) {
    if (digit >= 1 && digit <= 9) {
      presentNumbers.add(digit);
    }
  }

  // Identifier les chiffres manquants (1-9)
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
    fullName: dateString,
    presentNumbers: Array.from(presentNumbers).sort(),
    missingNumbers,
    karmicDefinitions,
  };
}

/**
 * Calcule les cycles karmiques (lettres manquantes dans le nom complet)
 * @param fullName - Nom complet
 * @returns Les cycles karmiques avec leurs définitions
 */
export function calculateCycleKarmicNumbers(
  fullName: string
): CycleKarmicNumbersResult {
  // Validation du nom
  if (!fullName || fullName.trim().length === 0) {
    throw new Error("Le nom ne peut pas être vide");
  }

  // Nettoyer le nom complet (majuscules et sans accents)
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
  const cycleKarmicDefinitions: CycleKarmicResult[] = missingNumbers.map(
    (num) => {
      const cycleData =
        cycleKarmicData[num.toString() as keyof typeof cycleKarmicData];
      return {
        number: num,
        summary: cycleData?.summary || "",
        challenge: cycleData?.challenge || "",
        details: cycleData?.details || "",
        keywords: cycleData?.keywords || [],
      };
    }
  );

  return {
    fullName,
    presentNumbers: Array.from(presentNumbers).sort(),
    missingNumbers,
    cycleKarmicDefinitions,
  };
}

// ===== DETTES KARMIQUES =====

// Types pour les dettes karmiques
export interface KarmicDebtResult {
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}

// Les dettes karmiques reconnues
const karmicDebtNumbers: (13 | 14 | 16 | 19)[] = [13, 14, 16, 19];

/**
 * Vérifie si un nombre est une dette karmique
 * @param value Le nombre à tester (avant réduction)
 */
export function checkKarmicDebt(value: number): KarmicDebtResult {
  if (karmicDebtNumbers.includes(value as 13 | 14 | 16 | 19)) {
    return {
      number: value,
      isKarmicDebt: true,
      karmicDebtType: value as 13 | 14 | 16 | 19,
    };
  }

  return {
    number: value,
    isKarmicDebt: false,
  };
}

/**
 * Analyse les nombres principaux pour détecter les dettes karmiques
 * @param coreNumbers Les nombres principaux avant réduction
 */
export function analyzeCoreNumbers(coreNumbers: number[]): KarmicDebtResult[] {
  return coreNumbers.map((num) => checkKarmicDebt(num));
}

/**
 * Calcule les dettes karmiques pour un profil numérologique complet
 * @param birthDate Date de naissance (YYYY-MM-DD)
 * @param fullName Nom complet
 */
export function calculateKarmicDebts(
  birthDate: string,
  fullName: string
): {
  lifePathDebt: KarmicDebtResult;
  expressionDebt: KarmicDebtResult;
  soulUrgeDebt: KarmicDebtResult;
  personalityDebt: KarmicDebtResult;
  birthdayDebt: KarmicDebtResult;
  allDebts: KarmicDebtResult[];
} {
  // Calcul des nombres principaux (avant réduction)
  const lifePathNumber = calculateLifePathNumber(birthDate, false); // false = pas de réduction
  const expressionNumber = calculateExpressionNumber(fullName, false);
  const soulUrgeNumber = calculateSoulUrgeNumber(fullName, false);
  const personalityNumber = calculatePersonalityNumber(fullName, false);

  // Pour le jour de naissance, on utilise le jour du mois (1-31)
  const day = Number(birthDate.split("-")[2]);
  const birthdayNumber = day;

  // Analyse des dettes karmiques
  const lifePathDebt = checkKarmicDebt(lifePathNumber);
  const expressionDebt = checkKarmicDebt(expressionNumber);
  const soulUrgeDebt = checkKarmicDebt(soulUrgeNumber);
  const personalityDebt = checkKarmicDebt(personalityNumber);
  const birthdayDebt = checkKarmicDebt(birthdayNumber);

  const allDebts = [
    lifePathDebt,
    expressionDebt,
    soulUrgeDebt,
    personalityDebt,
    birthdayDebt,
  ];

  return {
    lifePathDebt,
    expressionDebt,
    soulUrgeDebt,
    personalityDebt,
    birthdayDebt,
    allDebts,
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
