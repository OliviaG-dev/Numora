/**
 * @fileoverview Calculs karmiques
 * Ce fichier contient les fonctions pour calculer les nombres karmiques, cycles karmiques et dettes karmiques
 */

import { validateDateString, validateName, normalizeName } from "./utils";
// Types définis localement pour éviter les problèmes d'import
interface KarmicNumberResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

interface KarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  karmicDefinitions: KarmicNumberResult[];
}

interface CycleKarmicResult {
  number: number;
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

interface CycleKarmicNumbersResult {
  fullName: string;
  presentNumbers: number[];
  missingNumbers: number[];
  cycleKarmicDefinitions: CycleKarmicResult[];
}

interface KarmicDebtResult {
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}

type KarmicDebtType = 13 | 14 | 16 | 19;
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
} from "./core";
import karmicNumberData from "../../data/numerology/Karmique/KarmicNumberData.json";
import cycleKarmicData from "../../data/numerology/Karmique/CycleKarmicData.json";

/**
 * Les dettes karmiques reconnues
 */
const karmicDebtNumbers: KarmicDebtType[] = [13, 14, 16, 19];

/**
 * Calcule les nombres karmiques (chiffres manquants dans la date de naissance)
 * @param dateString - Date de naissance au format "YYYY-MM-DD"
 * @returns Les nombres karmiques avec leurs définitions
 */
export function calculateKarmicNumbers(
  dateString: string
): KarmicNumbersResult {
  // Validation du format de date
  validateDateString(dateString);

  // Extraction des chiffres (suppression des tirets)
  const digits = dateString.replace(/-/g, "").split("").map(Number);

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
  validateName(fullName);

  // Nettoyer le nom complet (majuscules et sans accents)
  const cleanName = normalizeName(fullName).replace(/[^A-Z]/g, ""); // garde seulement les lettres

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

/**
 * Vérifie si un nombre est une dette karmique
 * @param value Le nombre à tester (avant réduction)
 */
export function checkKarmicDebt(value: number): KarmicDebtResult {
  if (karmicDebtNumbers.includes(value as KarmicDebtType)) {
    return {
      number: value,
      isKarmicDebt: true,
      karmicDebtType: value as KarmicDebtType,
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
