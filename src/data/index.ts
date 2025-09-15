/**
 * @fileoverview Export centralisé des données numérologiques
 * Ce fichier centralise tous les exports de données numérologiques et leurs types TypeScript
 */

// ===== IMPORTS =====
import lifePathData from "./numerology/LifePathData.json";
import expressionData from "./numerology/ExpressionNumberData.json";
import challengeData from "./numerology/ChallengeData.json";
import soulUrgeData from "./numerology/SoulUrgeData.json";
import personalityData from "./numerology/PersonalityData.json";
import birthdayData from "./numerology/BirthdayData.json";
import lifeCycleData from "./numerology/LifeCycleData.json";
import realizationPeriodData from "./numerology/RealizationPeriodData.json";
import personelCycleData from "./numerology/PersonelCycleData.json";

// ===== EXPORTS PRINCIPAUX =====
export {
  lifePathData,
  expressionData,
  challengeData,
  soulUrgeData,
  personalityData,
  birthdayData,
  lifeCycleData,
  realizationPeriodData,
  personelCycleData,
};

// ===== ALIAS POUR COMPATIBILITÉ =====
export { lifePathData as numbersData };
export { expressionData as expressionNumberData };
export { soulUrgeData as soulUrgeNumberData };
export { personalityData as personalityNumberData };
export { birthdayData as birthdayNumberData };

// ===== TYPES TYPESCRIPT =====

/**
 * Types de base pour les données numérologiques
 */
export type NumerologyNumber = string; // "1" à "9", "11", "22", "33"
export type NumerologyKey =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "11"
  | "22"
  | "33";

/**
 * Interface de base pour les détails numérologiques avec description complète
 */
export interface BaseNumerologyDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

/**
 * Interface de base pour les détails numérologiques avec résumé
 */
export interface BaseSummaryDetail {
  summary: string;
  details: string;
}

/**
 * Types spécifiques pour chaque catégorie numérologique
 */
export interface LifePathData {
  [key: string]: LifePathDetail;
}

export type LifePathDetail = BaseNumerologyDetail;

export interface ExpressionData {
  [key: string]: ExpressionDetail;
}

export type ExpressionDetail = BaseNumerologyDetail;

export interface ChallengeData {
  [key: string]: ChallengeDetail;
}

export interface ChallengeDetail {
  description: string;
}

export interface SoulUrgeData {
  [key: string]: string[];
}

export interface PersonalityData {
  [key: string]: string[];
}

export interface BirthdayData {
  [key: string]: string[];
}

export interface LifeCycleData {
  [key: string]: LifeCycleDetail;
}

export type LifeCycleDetail = BaseSummaryDetail;

export interface RealizationPeriodData {
  [key: string]: RealizationPeriodDetail;
}

export type RealizationPeriodDetail = BaseSummaryDetail;

export interface PersonelCycleData {
  [key: string]: PersonelCycleDetail;
}

export type PersonelCycleDetail = BaseSummaryDetail;

// ===== ALIAS POUR COMPATIBILITÉ =====
export type ExpressionNumberData = ExpressionData;
export type ExpressionNumberDetail = ExpressionDetail;
export type ChallengeNumbersData = ChallengeData;
export type ChallengeNumberDetail = ChallengeDetail;

// ===== UTILITAIRES =====

/**
 * Liste de tous les chiffres numérologiques valides
 */
export const VALID_NUMEROLOGY_NUMBERS: NumerologyKey[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "11",
  "22",
  "33",
];

/**
 * Vérifie si un nombre est valide en numérologie
 */
export const isValidNumerologyNumber = (
  number: string
): number is NumerologyKey => {
  return VALID_NUMEROLOGY_NUMBERS.includes(number as NumerologyKey);
};

/**
 * Obtient les données pour un nombre spécifique avec vérification de sécurité
 */
export const getNumerologyData = <T>(
  data: { [key: string]: T },
  number: string
): T | null => {
  return isValidNumerologyNumber(number) ? data[number] || null : null;
};
