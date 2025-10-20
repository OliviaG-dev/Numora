import { reduceToSingleDigit, validateDateString } from "./utils";
import { lifePathLoveData } from "../../data";
import type {
  LifePathLoveData as LifePathLoveDataType,
  LifePathLoveDetail,
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

export interface CompatibilityResult {
  overallScore: number;
  compatibility: CompatibilityBreakdown;
  strengths: string[];
  challenges: string[];
  recommendations: string[];
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

export function calculateCompatibility(
  person1: PersonInfo,
  person2: PersonInfo,
  relationshipType: RelationshipType
): CompatibilityResult {
  if (relationshipType === "love") {
    return calculateLoveCompatibility(person1, person2);
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

function calculateLoveCompatibility(
  person1: PersonInfo,
  person2: PersonInfo
): CompatibilityResult {
  const lifePath1 = calculateLifePathNumber(person1.birthDate);
  const lifePath2 = calculateLifePathNumber(person2.birthDate);

  const detail = getLoveDetailForLifePaths(lifePath1, lifePath2);

  if (!detail) {
    return {
      overallScore: 50,
      compatibility: {
        lifePathCompatibility: {
          score: 50,
          description:
            "Données indisponibles pour cette combinaison de chemins de vie.",
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

  // Calculer le score basé sur la structure des données
  const score = computeHeuristicScore(detail);

  // Structurer les données selon le format attendu
  const strengths = detail.strengths ? [detail.strengths] : [];
  const challenges = detail.challenges ? [detail.challenges] : [];
  const recommendations = detail.advice ? [detail.advice] : [];

  return {
    overallScore: score,
    compatibility: {
      lifePathCompatibility: {
        score: score,
        description: detail.description,
      },
      expressionCompatibility: {
        score: 0,
        description: "Analyse Expression : À venir",
      },
      soulUrgeCompatibility: {
        score: 0,
        description: "Analyse Âme : À venir",
      },
      personalityCompatibility: {
        score: 0,
        description: "Analyse Personnalité : À venir",
      },
    },
    strengths,
    challenges,
    recommendations,
  };
}
