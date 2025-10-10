/**
 * @fileoverview Point d'entrée principal pour la numérologie
 * Ce fichier exporte toutes les fonctions et types nécessaires pour les calculs numérologiques
 */

// ===== EXPORTS DES TYPES =====
export * from "./types";

// ===== EXPORTS DES UTILITAIRES =====
export * from "./utils";

// ===== EXPORTS DES CALCULS DE BASE =====
export {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
} from "./core";

// ===== EXPORTS DES DÉFIS ET CYCLES =====
export {
  calculateChallengeNumbers,
  calculateLifeCycles,
  calculateRealizationPeriods,
} from "./challenges";

// ===== EXPORTS DES NOMBRES PERSONNELS =====
export {
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay,
  calculatePersonalNumbers,
  getDateVibration,
} from "./personal";

// ===== EXPORTS DES VIBRATIONS QUOTIDIENNES =====
export {
  calculateDayVibration,
  calculateMonthVibration,
  calculateYearVibration,
  calculateUniversalVibration,
  calculateAllVibrations,
} from "./daily";

// ===== EXPORTS DES CALCULS KARMIQUES =====
export {
  calculateKarmicNumbers,
  calculateCycleKarmicNumbers,
  checkKarmicDebt,
  analyzeCoreNumbers,
  calculateKarmicDebts,
} from "./karmic";

// ===== EXPORTS DES CALCULS BUSINESS =====
export {
  calculateWordValue,
  calculateBusinessNumbers,
  analyzeBusinessName,
} from "./business";

// ===== ALIAS POUR COMPATIBILITÉ =====
// Ces alias maintiennent la compatibilité avec l'ancienne API
import { calculateLifePathNumber } from "./core";
import { calculateExpressionNumber } from "./core";
import { calculateSoulUrgeNumber } from "./core";
import { calculatePersonalityNumber } from "./core";
import { calculateBirthdayNumber } from "./core";
import { calculateChallengeNumbers } from "./challenges";
import { calculateLifeCycles } from "./challenges";
import { calculateRealizationPeriods } from "./challenges";
import { calculatePersonalNumbers } from "./personal";
import { calculateKarmicNumbers } from "./karmic";
import { calculateCycleKarmicNumbers } from "./karmic";
import { calculateKarmicDebts } from "./karmic";
import { calculateBusinessNumbers } from "./business";

export { calculateLifePathNumber as calculateLifePath };
export { calculateExpressionNumber as calculateExpression };
export { calculateSoulUrgeNumber as calculateSoulUrge };
export { calculatePersonalityNumber as calculatePersonality };
export { calculateBirthdayNumber as calculateBirthday };
export { calculateChallengeNumbers as calculateChallenges };
export { calculateLifeCycles as calculateCycles };
export { calculateRealizationPeriods as calculatePinacles };
export { calculatePersonalNumbers as calculatePersonal };
export { calculateKarmicNumbers as calculateKarmic };
export { calculateCycleKarmicNumbers as calculateCycleKarmic };
export { calculateKarmicDebts as calculateDebts };
export { calculateBusinessNumbers as calculateBusiness };
