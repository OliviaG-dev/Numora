/**
 * @fileoverview Export centralisé des données numérologiques
 * Ce fichier centralise tous les exports de données numérologiques et leurs types TypeScript
 */

// ===== IMPORTS =====
import lifePathData from "./numerology/Basique/LifePathData.json";
import expressionData from "./numerology/Basique/ExpressionNumberData.json";
import challengeData from "./numerology/Basique/ChallengeData.json";
import soulUrgeData from "./numerology/Basique/SoulUrgeData.json";
import personalityData from "./numerology/Basique/PersonalityData.json";
import birthdayData from "./numerology/Basique/BirthdayData.json";
import lifeCycleData from "./numerology/Dates/LifeCycleData.json";
import realizationPeriodData from "./numerology/Dates/RealizationPeriodData.json";
import personelCycleData from "./numerology/Dates/PersonelCycleData.json";
import karmicNumberData from "./numerology/Karmique/KarmicNumberData.json";
import cycleKarmicData from "./numerology/Karmique/CycleKarmicData.json";
import karmicDebtsData from "./numerology/Karmique/KarmicDebtsData.json";
import businessNameData from "./numerology/NaneBusiness/BusinessNameData.json";
import dateVibeData from "./numerology/Dates/DateVibeData.json";
import actifBusinessData from "./numerology/NaneBusiness/ActifBusinessData.json";
import expressionBusinessData from "./numerology/DateBusiness/ExpressionBusinessData.json";
import hereditaryBusinessData from "./numerology/NaneBusiness/HereditaryBusinessData.json";
import matrixRelationsHeartData from "./matrixDestiny/matrixRelationsHeart.json";
import matrixMoneyLoveData from "./matrixDestiny/matrixMoneyLove.json";

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
  karmicNumberData,
  cycleKarmicData,
  karmicDebtsData,
  businessNameData,
  dateVibeData,
  actifBusinessData,
  expressionBusinessData,
  hereditaryBusinessData,
  matrixRelationsHeartData,
  matrixMoneyLoveData,
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
 * Interface de base pour les détails numérologiques avec description et défi
 */
export interface BaseCycleDetail {
  summary: string;
  description: string;
  challenge: string;
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

export type LifeCycleDetail = BaseCycleDetail;

export interface RealizationPeriodData {
  [key: string]: RealizationPeriodDetail;
}

export type RealizationPeriodDetail = BaseCycleDetail;

export interface PersonelCycleData {
  [key: string]: PersonelCycleDetail;
}

export type PersonelCycleDetail = BaseCycleDetail;

export interface KarmicNumberData {
  [key: string]: KarmicNumberDetail;
}

export interface KarmicNumberDetail {
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

export interface CycleKarmicData {
  [key: string]: CycleKarmicDetail;
}

export interface CycleKarmicDetail {
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

export interface KarmicDebtsData {
  [key: string]: KarmicDebtDetail;
}

export interface KarmicDebtDetail {
  summary: string;
  challenge: string;
  details: string;
  keywords: string[];
}

export interface BusinessNameData {
  [key: string]: BusinessNameDetail;
}

export interface BusinessNameDetail {
  summary: string;
  favorable_for: string;
  unfavorable_for: string;
  strength: string;
  challenge: string;
}

export interface DateVibeData {
  [key: string]: DateVibeDetail;
}

export interface DateVibeDetail {
  summary: string;
  strength: string;
  challenge: string;
  favorable_for: string;
  unfavorable_for: string;
}

export interface ActifBusinessData {
  [key: string]: ActifBusinessDetail;
}

export interface ActifBusinessDetail {
  summary: string;
  mission: string;
  strengths: string[];
  challenges: string[];
}

export interface ExpressionBusinessData {
  [key: string]: ExpressionBusinessDetail;
}

export interface ExpressionBusinessDetail {
  summary: string;
  mission: string;
  strengths: string[];
  challenges: string[];
}

export interface HereditaryBusinessData {
  [key: string]: HereditaryBusinessDetail;
}

export interface HereditaryBusinessDetail {
  summary: string;
  mission: string;
  strengths: string[];
  challenges: string[];
}

export interface MatrixRelationsHeartData {
  interior: {
    [key: string]: string;
  };
  exterior: {
    [key: string]: string;
  };
}

export interface MatrixMoneyLoveData {
  love: {
    [key: string]: string;
  };
  money: {
    [key: string]: string;
  };
  pivot: {
    [key: string]: string;
  };
}

// ===== ALIAS POUR COMPATIBILITÉ =====
export type ExpressionNumberData = ExpressionData;
export type ExpressionNumberDetail = ExpressionDetail;
export type ChallengeNumbersData = ChallengeData;
export type ChallengeNumberDetail = ChallengeDetail;
export type ActifBusinessNumberData = ActifBusinessData;
export type ActifBusinessNumberDetail = ActifBusinessDetail;
export type ExpressionBusinessNumberData = ExpressionBusinessData;
export type ExpressionBusinessNumberDetail = ExpressionBusinessDetail;
export type HereditaryBusinessNumberData = HereditaryBusinessData;
export type HereditaryBusinessNumberDetail = HereditaryBusinessDetail;

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
