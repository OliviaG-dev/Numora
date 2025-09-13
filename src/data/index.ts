// Export des données numérologiques
import lifePathData from "./numerology/LifePathData.json";
import expressionData from "./numerology/ExpressionNumberData.json";

export { lifePathData, expressionData };

// Alias pour compatibilité
export { lifePathData as numbersData };
export { expressionData as expressionNumberData };

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

// Alias pour les types (compatibilité)
export type ExpressionNumberData = ExpressionData;
export type ExpressionNumberDetail = ExpressionDetail;
