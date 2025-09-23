/**
 * @fileoverview Types TypeScript pour la numérologie
 * Ce fichier contient tous les types et interfaces utilisés dans les calculs numérologiques
 */

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
 * Interface pour les résultats des défis numérologiques
 */
export interface ChallengeNumbersResult {
  first: { number: number; description: string };
  second: { number: number; description: string };
  third: { number: number; description: string };
  fourth: { number: number; description: string };
}

/**
 * Interface pour les résultats des nombres karmiques
 */
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

/**
 * Interface pour les résultats des cycles karmiques
 */
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

/**
 * Interface pour les dettes karmiques
 */
export interface KarmicDebtResult {
  number: number;
  isKarmicDebt: boolean;
  karmicDebtType?: 13 | 14 | 16 | 19;
}

/**
 * Interface pour les résultats des nombres business
 */
export interface BusinessNumbersResult {
  expression: {
    raw: number;
    value: number;
  };
  active: {
    raw: number;
    value: number;
  };
  hereditary: {
    raw: number;
    value: number;
  };
}

/**
 * Interface pour les nombres personnels
 */
export interface PersonalNumbersResult {
  year: {
    number: number;
    description: string;
  };
  month: {
    number: number;
    description: string;
  };
  day: {
    number: number;
    description: string;
  };
}

/**
 * Interface pour les cycles de vie
 */
export interface LifeCyclesResult {
  firstCycle: number; // Naissance → ~28 ans
  secondCycle: number; // 29 → ~56 ans
  thirdCycle: number; // 57 ans → fin de vie
}

/**
 * Interface pour les périodes de réalisation
 */
export interface RealizationPeriodsResult {
  firstPeriod: number; // jusqu'à ~30 ans
  secondPeriod: number; // 30 → 39 ans
  thirdPeriod: number; // 39 → 48 ans
  fourthPeriod: number; // 48 ans → fin de vie
}

/**
 * Interface pour l'analyse complète d'un nom business
 */
export interface BusinessNameAnalysis {
  fullName: string;
  numbers: BusinessNumbersResult;
  expression: {
    number: number;
    raw: number;
  };
  active: {
    number: number;
    raw: number;
  };
  hereditary: {
    number: number;
    raw: number;
  };
}

/**
 * Les dettes karmiques reconnues
 */
export type KarmicDebtType = 13 | 14 | 16 | 19;

