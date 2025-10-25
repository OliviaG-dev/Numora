import { reduceToSingleDigit, validateDateString } from "./utils";
import { calculateExpressionNumber, calculateHeartNumber } from "./core";
import {
  lifePathLoveData,
  unionNumberData,
  expressionNumberLoveData,
  numberHeartData,
  lifePathFriendsData,
  expressionNumberFriendsData,
} from "../../data";
import type {
  LifePathLoveData as LifePathLoveDataType,
  LifePathLoveDetail,
  UnionNumberData as UnionNumberDataType,
  UnionNumberDetail,
  ExpressionNumberLoveData as ExpressionNumberLoveDataType,
  ExpressionNumberLoveDetail,
  NumberHeartData as NumberHeartDataType,
  NumberHeartDetail,
  LifePathFriendsData as LifePathFriendsDataType,
  LifePathFriendsDetail,
  ExpressionNumberFriendsData as ExpressionNumberFriendsDataType,
  ExpressionNumberFriendsDetail,
} from "../../data";

export type RelationshipType = "love" | "friendship" | "work";

export interface PersonInfo {
  firstGivenName: string;
  secondGivenName?: string;
  thirdGivenName?: string;
  familyName: string;
  birthDate: string; // YYYY-MM-DD
}

export interface CompatibilityDetail {
  score: number;
  description: string;
}

export interface CompatibilityBreakdown {
  lifePathCompatibility: CompatibilityDetail;
  expressionCompatibility: CompatibilityDetail;
  soulUrgeCompatibility: CompatibilityDetail;
  personalityCompatibility: CompatibilityDetail;
}

export interface UnionNumberResult {
  unionNumber: number;
  detail: UnionNumberDetail | null;
}

export interface ExpressionNumberResult {
  expression1: number;
  expression2: number;
  detail: ExpressionNumberLoveDetail | null;
}

export interface HeartNumberResult {
  heart1: number;
  heart2: number;
  detail: NumberHeartDetail | null;
}

export interface ExpressionNumberFriendsResult {
  expression1: number;
  expression2: number;
  detail: ExpressionNumberFriendsDetail | null;
}

export interface FriendshipCompatibilityResult {
  lifePathFriendship: LifePathFriendsDetail | null;
  expressionFriendship: ExpressionNumberFriendsResult | null;
}

export interface CompatibilityResult {
  overallScore: number;
  compatibility: CompatibilityBreakdown;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
  unionNumber?: UnionNumberResult; // Optionnel pour maintenir la compatibilité
  expressionNumbers?: ExpressionNumberResult; // Nouvelle analyse des nombres d'expression
  heartNumbers?: HeartNumberResult; // Analyse des nombres du cœur
  friendshipCompatibility?: FriendshipCompatibilityResult; // Nouvelle compatibilité amicale
}

export function calculateLifePathNumber(birthDate: string): number {
  validateDateString(birthDate);
  const digits = birthDate.replace(/-/g, "").split("").map(Number);
  const sum = digits.reduce((acc, val) => acc + val, 0);
  return reduceToSingleDigit(sum, true);
}

function buildPairKey(n1: number, n2: number): string {
  const a = n1.toString();
  const b = n2.toString();

  // Les nombres maîtres (11, 22, 33) doivent venir en premier dans les clés
  const masterNumbers = [11, 22, 33];

  // Si l'un des nombres est un nombre maître, le mettre en premier
  if (masterNumbers.includes(n1) && !masterNumbers.includes(n2)) {
    return `${a}-${b}`;
  }
  if (masterNumbers.includes(n2) && !masterNumbers.includes(n1)) {
    return `${b}-${a}`;
  }

  // Si les deux sont des nombres maîtres ou des nombres normaux, utiliser l'ordre croissant
  const [minStr, maxStr] = [a, b].sort((x, y) => Number(x) - Number(y));
  return `${minStr}-${maxStr}`;
}

function getLoveDetailForLifePaths(
  n1: number,
  n2: number
): LifePathLoveDetail | null {
  const key = buildPairKey(n1, n2);
  const data = (lifePathLoveData as unknown as LifePathLoveDataType)[key];
  if (data) return data;
  // Par sécurité, essaye l'ordre inverse si jamais certaines clés ne sont pas normalisées
  const reverseKey = `${n2}-${n1}`;
  return (
    (lifePathLoveData as unknown as LifePathLoveDataType)[reverseKey] || null
  );
}

function getExpressionLoveDetail(
  n1: number,
  n2: number
): ExpressionNumberLoveDetail | null {
  const key = buildPairKey(n1, n2);
  const data = (
    expressionNumberLoveData as unknown as ExpressionNumberLoveDataType
  )[key];
  if (data) return data;
  // Par sécurité, essaye l'ordre inverse
  const reverseKey = `${n2}-${n1}`;
  return (
    (expressionNumberLoveData as unknown as ExpressionNumberLoveDataType)[
      reverseKey
    ] || null
  );
}

function getHeartNumberDetail(
  n1: number,
  n2: number
): NumberHeartDetail | null {
  const key = buildPairKey(n1, n2);
  const data = (numberHeartData as unknown as NumberHeartDataType)[key];
  if (data) return data;
  // Par sécurité, essaye l'ordre inverse
  const reverseKey = `${n2}-${n1}`;
  return (
    (numberHeartData as unknown as NumberHeartDataType)[reverseKey] || null
  );
}

function getLifePathFriendsDetail(
  n1: number,
  n2: number
): LifePathFriendsDetail | null {
  const key = buildPairKey(n1, n2);
  const data = (lifePathFriendsData as unknown as LifePathFriendsDataType)[key];
  if (data) return data;
  // Par sécurité, essaye l'ordre inverse
  const reverseKey = `${n2}-${n1}`;
  return (
    (lifePathFriendsData as unknown as LifePathFriendsDataType)[reverseKey] ||
    null
  );
}

function getExpressionFriendsDetail(
  n1: number,
  n2: number
): ExpressionNumberFriendsDetail | null {
  const key = buildPairKey(n1, n2);
  const data = (
    expressionNumberFriendsData as unknown as ExpressionNumberFriendsDataType
  )[key];
  if (data) return data;
  // Par sécurité, essaye l'ordre inverse
  const reverseKey = `${n2}-${n1}`;
  return (
    (expressionNumberFriendsData as unknown as ExpressionNumberFriendsDataType)[
      reverseKey
    ] || null
  );
}

export function calculateUnionNumber(
  lifePath1: number,
  lifePath2: number
): number {
  const sum = lifePath1 + lifePath2;
  return reduceToSingleDigit(sum, true);
}

function getUnionNumberDetail(unionNumber: number): UnionNumberDetail | null {
  const key = unionNumber.toString();
  return (unionNumberData as unknown as UnionNumberDataType)[key] || null;
}

function computeHeuristicScore(detail: LifePathLoveDetail | null): number {
  if (!detail) return 50;
  // Heuristique simple: base 70, ajustements légers si certains mots-clés apparaissent
  let score = 70;
  const text =
    `${detail.strengths} ${detail.challenges} ${detail.description}`.toLowerCase();
  if (/(conflit|tension|jalousie|domination|instabilité|rigidité)/.test(text))
    score -= 10;
  if (
    /(complémentarité|harmonie|fidélité|loyauté|inspiration|amour)/.test(text)
  )
    score += 5;
  if (score < 30) score = 30;
  if (score > 90) score = 90;
  return score;
}

function computeExpressionScore(
  detail: ExpressionNumberLoveDetail | null
): number {
  if (!detail) return 50;
  // Heuristique pour les nombres d'expression
  let score = 70;
  const text = `${detail.strengths.join(" ")} ${detail.challenges.join(" ")} ${
    detail.dynamic.chemistry
  }`.toLowerCase();

  // Mots négatifs
  if (
    /(conflit|tension|jalousie|domination|instabilité|rigidité|compétition)/.test(
      text
    )
  )
    score -= 10;

  // Mots positifs
  if (
    /(complémentarité|harmonie|équilibre|soutien|passion|créativité)/.test(text)
  )
    score += 5;

  if (score < 30) score = 30;
  if (score > 90) score = 90;
  return score;
}

function buildFullName(person: PersonInfo): string {
  const names = [
    person.firstGivenName,
    person.secondGivenName,
    person.thirdGivenName,
    person.familyName,
  ].filter((name) => name && name.trim() !== "");

  return names.join(" ");
}

export function calculateFriendshipCompatibility(
  person1: PersonInfo,
  person2: PersonInfo
): FriendshipCompatibilityResult {
  // Calcul des Chemins de Vie
  const lifePath1 = calculateLifePathNumber(person1.birthDate);
  const lifePath2 = calculateLifePathNumber(person2.birthDate);

  // Récupérer les détails de compatibilité amicale Life Path
  const lifePathFriendship = getLifePathFriendsDetail(lifePath1, lifePath2);

  // Calcul des Nombres d'Expression
  const fullName1 = buildFullName(person1);
  const fullName2 = buildFullName(person2);
  const expression1 = calculateExpressionNumber(fullName1);
  const expression2 = calculateExpressionNumber(fullName2);

  // Récupérer les détails de compatibilité amicale Expression Number
  const expressionFriendshipDetail = getExpressionFriendsDetail(
    expression1,
    expression2
  );

  return {
    lifePathFriendship,
    expressionFriendship: {
      expression1,
      expression2,
      detail: expressionFriendshipDetail,
    },
  };
}

export function calculateCompatibility(
  person1: PersonInfo,
  person2: PersonInfo,
  relationshipType: RelationshipType
): CompatibilityResult {
  if (relationshipType === "love") {
    return calculateLoveCompatibility(person1, person2);
  }

  if (relationshipType === "friendship") {
    return calculateFriendshipCompatibilityResult(person1, person2);
  }

  // Pour les autres types de relations, retourner un placeholder
  return {
    overallScore: 50,
    compatibility: {
      lifePathCompatibility: {
        score: 0,
        description:
          "Analyse spécifique en cours de préparation pour ce type de relation.",
      },
      expressionCompatibility: {
        score: 0,
        description: "À venir.",
      },
      soulUrgeCompatibility: {
        score: 0,
        description: "À venir.",
      },
      personalityCompatibility: {
        score: 0,
        description: "À venir.",
      },
    },
    strengths: [],
    challenges: [],
    recommendations: [],
  };
}

function calculateFriendshipCompatibilityResult(
  person1: PersonInfo,
  person2: PersonInfo
): CompatibilityResult {
  const friendshipData = calculateFriendshipCompatibility(person1, person2);

  // Calculer un score basé sur les données disponibles
  let score = 70;
  if (friendshipData.expressionFriendship?.detail) {
    const ratings =
      friendshipData.expressionFriendship.detail.friendship_vibe_rating;
    score = Math.round(
      ((ratings.fun +
        ratings.trust +
        ratings.deep_connection +
        ratings.adventure) /
        4) *
        10
    );
  }

  return {
    overallScore: score,
    compatibility: {
      lifePathCompatibility: {
        score: friendshipData.lifePathFriendship ? 75 : 50,
        description:
          friendshipData.lifePathFriendship?.long_description ||
          "Données non disponibles",
      },
      expressionCompatibility: {
        score,
        description:
          friendshipData.expressionFriendship?.detail?.tagline ||
          "Données non disponibles",
      },
      soulUrgeCompatibility: {
        score: 0,
        description: "À venir.",
      },
      personalityCompatibility: {
        score: 0,
        description: "À venir.",
      },
    },
    strengths:
      friendshipData.expressionFriendship?.detail?.why_they_click || [],
    challenges:
      friendshipData.expressionFriendship?.detail?.friction_points || [],
    recommendations: friendshipData.expressionFriendship?.detail
      ?.keep_the_magic_alive
      ? [friendshipData.expressionFriendship.detail.keep_the_magic_alive]
      : [],
    friendshipCompatibility: friendshipData,
  };
}

function calculateLoveCompatibility(
  person1: PersonInfo,
  person2: PersonInfo
): CompatibilityResult {
  // Calcul des Chemins de Vie
  const lifePath1 = calculateLifePathNumber(person1.birthDate);
  const lifePath2 = calculateLifePathNumber(person2.birthDate);

  // Calculer le nombre d'union
  const unionNumber = calculateUnionNumber(lifePath1, lifePath2);
  const unionDetail = getUnionNumberDetail(unionNumber);

  // Récupérer les détails de compatibilité Life Path
  const lifePathDetail = getLoveDetailForLifePaths(lifePath1, lifePath2);

  // Calcul des Nombres d'Expression
  const fullName1 = buildFullName(person1);
  const fullName2 = buildFullName(person2);
  const expression1 = calculateExpressionNumber(fullName1);
  const expression2 = calculateExpressionNumber(fullName2);

  // Récupérer les détails de compatibilité Expression
  const expressionDetail = getExpressionLoveDetail(expression1, expression2);

  // Calcul des Nombres du Cœur
  const heart1 = calculateHeartNumber(fullName1);
  const heart2 = calculateHeartNumber(fullName2);

  // Récupérer les détails de compatibilité du Cœur
  const heartDetail = getHeartNumberDetail(heart1, heart2);

  // Calculer les scores
  const lifePathScore = computeHeuristicScore(lifePathDetail);
  const expressionScore = computeExpressionScore(expressionDetail);

  // Score global pondéré : 60% Life Path + 40% Expression
  const overallScore = Math.round(lifePathScore * 0.6 + expressionScore * 0.4);

  if (!lifePathDetail) {
    return {
      overallScore: expressionScore || 50,
      compatibility: {
        lifePathCompatibility: {
          score: 50,
          description:
            "Données indisponibles pour cette combinaison de chemins de vie.",
        },
        expressionCompatibility: {
          score: expressionScore,
          description:
            expressionDetail?.dynamic.how_they_connect ||
            "Données indisponibles.",
        },
        soulUrgeCompatibility: {
          score: 0,
          description: "À venir.",
        },
        personalityCompatibility: {
          score: 0,
          description: "À venir.",
        },
      },
      strengths: expressionDetail?.strengths || [],
      challenges: expressionDetail?.challenges || [],
      recommendations: expressionDetail?.tips_for_balance
        ? [expressionDetail.tips_for_balance]
        : [],
      unionNumber: {
        unionNumber,
        detail: unionDetail,
      },
      expressionNumbers: {
        expression1,
        expression2,
        detail: expressionDetail,
      },
      heartNumbers: {
        heart1,
        heart2,
        detail: heartDetail,
      },
    };
  }

  // Structurer les données selon le format attendu
  const strengths = lifePathDetail.strengths ? [lifePathDetail.strengths] : [];
  const challenges = lifePathDetail.challenges
    ? [lifePathDetail.challenges]
    : [];
  const recommendations = lifePathDetail.advice ? [lifePathDetail.advice] : [];

  return {
    overallScore,
    compatibility: {
      lifePathCompatibility: {
        score: lifePathScore,
        description: lifePathDetail.description,
      },
      expressionCompatibility: {
        score: expressionScore,
        description:
          expressionDetail?.dynamic.how_they_connect ||
          "Données indisponibles pour cette combinaison.",
      },
      soulUrgeCompatibility: {
        score: 0,
        description: "À venir.",
      },
      personalityCompatibility: {
        score: 0,
        description: "À venir.",
      },
    },
    strengths,
    challenges,
    recommendations,
    unionNumber: {
      unionNumber,
      detail: unionDetail,
    },
    expressionNumbers: {
      expression1,
      expression2,
      detail: expressionDetail,
    },
    heartNumbers: {
      heart1,
      heart2,
      detail: heartDetail,
    },
  };
}
