// Export des données numérologiques
import lifePathData from "./numerology/LifePathData.json";
import expressionData from "./numerology/ExpressionNumberData.json";
import challengeData from "./numerology/ChallengeData.json";
import soulUrgeData from "./numerology/SoulUrgeData.json";
import personalityData from "./numerology/PersonalityData.json";
import birthdayData from "./numerology/BirthdayData.json";

// Exports principaux
export {
  lifePathData,
  expressionData,
  challengeData,
  soulUrgeData,
  personalityData,
  birthdayData,
};

// Alias pour compatibilité
export { lifePathData as numbersData };
export { expressionData as expressionNumberData };
export { soulUrgeData as soulUrgeNumberData };
export { personalityData as personalityNumberData };
export { birthdayData as birthdayNumberData };

// Types TypeScript pour les données
export interface LifePathData {
  [key: string]: LifePathDetail;
}

export interface LifePathDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

export interface ExpressionData {
  [key: string]: ExpressionDetail;
}

export interface ExpressionDetail {
  title: string;
  keywords: string[];
  description: string;
  strengths: string;
  challenges: string;
  mission: string;
}

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

// Alias pour les types (compatibilité)
export type ExpressionNumberData = ExpressionData;
export type ExpressionNumberDetail = ExpressionDetail;
export type ChallengeNumbersData = ChallengeData;
export type ChallengeNumberDetail = ChallengeDetail;
