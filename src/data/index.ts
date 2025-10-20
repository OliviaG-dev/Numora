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
import realisationNumberData from "./numerology/Basique/RealisationNumber.json";
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
import externalRelationsData from "./matrixDestiny/externalRelations.json";
import baseNumberData from "./matrixDestiny/baseNumber.json";
import centralMissionData from "./matrixDestiny/centralMission.json";
import feminineLineData from "./matrixDestiny/feminineLine.json";
import masculineLineData from "./matrixDestiny/masculineLine.json";
import sephirothData from "./arbreDeVie/sephirothData.json";
import sephirothNumberData from "./arbreDeVie/sephirothNumberData.json";
import pathsData from "./arbreDeVie/pathsData.json";
import pathsNumberData from "./arbreDeVie/pathsNumberData.json";
import lifePathLoveData from "./numerology/Compatibility/Love/LifePathLoveData.json";

// Import des fonctions utilitaires pour les calculs
import { reduceToSingleDigit } from "../utils/numerology/utils";

// ===== EXPORTS PRINCIPAUX =====
export {
  lifePathData,
  expressionData,
  challengeData,
  soulUrgeData,
  personalityData,
  birthdayData,
  realisationNumberData,
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
  externalRelationsData,
  baseNumberData,
  centralMissionData,
  feminineLineData,
  masculineLineData,
  sephirothData,
  sephirothNumberData,
  pathsData,
  pathsNumberData,
  lifePathLoveData,
};

// ===== ALIAS POUR COMPATIBILITÉ =====
export { lifePathData as numbersData };
export { expressionData as expressionNumberData };
export { soulUrgeData as soulUrgeNumberData };
export { personalityData as personalityNumberData };
export { birthdayData as birthdayNumberData };
export { realisationNumberData as realisationNumberDetail };

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

export interface RealisationNumberData {
  realisation_numbers: {
    [key: string]: RealisationNumberDetail;
  };
}

export type RealisationNumberDetail = BaseNumerologyDetail;

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

export interface ExternalRelationsData {
  pouvoir_social: {
    [key: string]: string;
  };
  influence_social: {
    [key: string]: string;
  };
}

// ===== INTERFACES MATRIX DESTINY =====

/**
 * Interface pour les données de base Matrix Destiny
 */
export interface BaseNumberDetail {
  mots_cles: string;
  description: string;
}

export interface BaseNumberData {
  jour: {
    [key: string]: BaseNumberDetail;
  };
  mois: {
    [key: string]: BaseNumberDetail;
  };
  annee: {
    [key: string]: BaseNumberDetail;
  };
  mission_vie: {
    [key: string]: BaseNumberDetail;
  };
}

/**
 * Interface pour les données de mission centrale Matrix Destiny
 */
export interface CentralMissionDetail {
  keyword: string;
  interpretation: string;
}

export interface CentralMissionData {
  central_balance: {
    [key: string]: CentralMissionDetail;
  };
}

/**
 * Interface pour les données de ligne féminine Matrix Destiny
 */
export interface FeminineLineDetail {
  keyword: string;
  interpretation: string;
}

export interface FeminineLineData {
  feminine_line: {
    spirit: {
      [key: string]: FeminineLineDetail;
    };
    heart: {
      [key: string]: FeminineLineDetail;
    };
    energy: {
      [key: string]: FeminineLineDetail;
    };
  };
}

/**
 * Interface pour les données de ligne masculine Matrix Destiny
 */
export interface MasculineLineDetail {
  keyword: string;
  interpretation: string;
}

export interface MasculineLineData {
  masculine_line: {
    spirit: {
      [key: string]: MasculineLineDetail;
    };
    heart: {
      [key: string]: MasculineLineDetail;
    };
    energy: {
      [key: string]: MasculineLineDetail;
    };
  };
}

// ===== INTERFACES ARBRE DE VIE =====

/**
 * Interface pour les données des Sephiroth de l'Arbre de Vie
 */
export interface SephiraMeaning {
  name: string;
  hebrewName: string;
  title: string;
  subtitle: string;
  description: string;
  domain: string;
}

export interface SephirothData {
  [key: string]: SephiraMeaning;
}

/**
 * Interface pour les interprétations personnalisées Sephira + Nombre
 */
export interface SephiraNumberMeaning {
  summary: string;
  description: string;
  keywords: string[];
  strengths: string;
  challenges: string;
  guidance: string;
}

export interface SephirothNumberData {
  [sephiraName: string]: {
    [numberKey: string]: SephiraNumberMeaning;
  };
}

/**
 * Interface pour les données des chemins de l'Arbre de Vie
 */
export interface PathMeaning {
  name: string;
  title: string;
  description: string;
  arcana: string;
  pillar: string;
}

export interface PathsData {
  [pathKey: string]: PathMeaning;
}

/**
 * Interface pour les interprétations personnalisées Chemin + Nombre
 */
export interface PathNumberMeaning {
  summary: string;
  description: string;
  keywords: string[];
  strengths: string;
  challenges: string;
  guidance: string;
}

export interface PathsNumberData {
  [pathKey: string]: {
    [numberKey: string]: PathNumberMeaning;
  };
}

// ===== INTERFACES COMPATIBILITÉ =====

/**
 * Interface pour les données de compatibilité amoureuse Life Path
 */
export interface LifePathLoveDetail {
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  advice: string;
}

export interface LifePathLoveData {
  [compatibilityKey: string]: LifePathLoveDetail;
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
export type RealisationNumberDetailData = RealisationNumberData;

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

/**
 * Récupère les données de réalisation pour un nombre donné
 * @param number - Le nombre de réalisation calculé (peut être n'importe quel nombre)
 * @returns RealisationNumberDetail | null - Les détails de réalisation ou null si non trouvé
 *
 * @example
 * const myRealisation = 29; // par ex. ton calcul numérologique
 * const data = getRealisationNumberData(myRealisation);
 * console.log(data?.title); // ➜ "Le Réalisateur Inspiré" (car 29 → 2+9 = 11, maître nombre)
 */
export const getRealisationNumberData = (
  number: number
): RealisationNumberDetail | null => {
  // Validation basique
  if (number < 0 || !Number.isInteger(number)) {
    return null;
  }

  // Réduire le nombre à un chiffre ou nombre maître
  const reducedNumber = reduceToSingleDigit(number);
  const numberKey = reducedNumber.toString();

  // Récupérer les données depuis la structure JSON
  const realisationData =
    realisationNumberData.realisation_numbers[
      numberKey as keyof typeof realisationNumberData.realisation_numbers
    ];

  return realisationData || null;
};
