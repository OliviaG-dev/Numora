/**
 * @fileoverview Calculs business
 * Ce fichier contient les fonctions pour calculer les nombres business (Expression, Actif, Héréditaire)
 */

import {
  validateName,
  normalizeName,
  getLetterValue,
  reduceToSingleDigit,
} from "./utils";
// Types définis localement pour éviter les problèmes d'import
interface BusinessNumbersResult {
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

interface BusinessNameAnalysis {
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
 * Calcule la valeur numérique d'un mot ou nom pour les analyses business
 * @param word - Mot ou nom à analyser
 * @returns Valeur numérique brute
 */
export function calculateWordValue(word: string): number {
  validateName(word);

  // Normalisation des caractères accentués
  const normalizedWord = normalizeName(word);

  const letters = normalizedWord.replace(/[^A-Z]/g, ""); // Garder seulement les lettres
  const values = letters.split("").map((char) => getLetterValue(char));
  const sum = values.reduce((acc, val) => acc + val, 0);

  return sum;
}

/**
 * Calcule les nombres business (Expression, Actif, Héréditaire)
 * @param fullName - Nom complet (prénom + nom ou nom d'entreprise)
 * @returns Les trois nombres business avec leurs valeurs brutes et réduites
 *
 * @example
 * calculateBusinessNumbers("Jean Dupont") // Retourne { expression: { raw: 45, value: 9 }, active: { raw: 15, value: 6 }, hereditary: { raw: 30, value: 3 } }
 */
export function calculateBusinessNumbers(
  fullName: string
): BusinessNumbersResult {
  validateName(fullName);

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 0) {
    throw new Error("Le nom doit contenir au moins un mot");
  }

  // Nombre d'Expression → toutes les lettres
  const expressionRaw = calculateWordValue(fullName.replace(/\s+/g, ""));
  const expression = reduceToSingleDigit(expressionRaw, true); // Autoriser les nombres maîtres

  // Nombre Actif → premier mot (prénom ou 1er mot du nom d'entreprise)
  const activeRaw = calculateWordValue(parts[0]);
  const active = reduceToSingleDigit(activeRaw, true); // Autoriser les nombres maîtres

  // Nombre Héréditaire → dernier mot (nom de famille ou racine entreprise)
  const hereditaryRaw = calculateWordValue(parts[parts.length - 1]);
  const hereditary = reduceToSingleDigit(hereditaryRaw, true); // Autoriser les nombres maîtres

  return {
    expression: { raw: expressionRaw, value: expression },
    active: { raw: activeRaw, value: active },
    hereditary: { raw: hereditaryRaw, value: hereditary },
  };
}

/**
 * Analyse complète d'un nom business avec les données associées
 * @param fullName - Nom complet à analyser
 * @returns Analyse complète avec les nombres et leurs descriptions
 */
export function analyzeBusinessName(fullName: string): BusinessNameAnalysis {
  const numbers = calculateBusinessNumbers(fullName);

  return {
    fullName,
    numbers,
    // Les descriptions seront ajoutées via les imports des données JSON
    expression: {
      number: numbers.expression.value,
      raw: numbers.expression.raw,
      // Les données détaillées seront ajoutées dans le composant
    },
    active: {
      number: numbers.active.value,
      raw: numbers.active.raw,
    },
    hereditary: {
      number: numbers.hereditary.value,
      raw: numbers.hereditary.raw,
    },
  };
}
