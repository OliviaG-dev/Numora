import { baseNumberData } from "../../data";
import type { BaseNumberDetail } from "../../data";

export type BaseNumberCategory = "jour" | "mois" | "annee" | "mission_vie";

/**
 * Récupère la signification d'un nombre de base pour la Matrix Destiny.
 * @param number - Le nombre (1–22)
 * @param category - "jour" | "mois" | "annee" | "mission_vie"
 * @returns BaseNumberDetail | null - Détails du nombre de base
 */
export function getBaseNumberMeaning(
  number: number,
  category: BaseNumberCategory
): BaseNumberDetail | null {
  if (number < 1 || number > 22) {
    return null;
  }

  const data = baseNumberData[category];
  return data[number.toString()] || null;
}

/**
 * Récupère les mots-clés d'un nombre de base.
 * @param number - Le nombre (1–22)
 * @param category - "jour" | "mois" | "annee" | "mission_vie"
 * @returns string - Mots-clés
 */
export function getBaseNumberKeywords(
  number: number,
  category: BaseNumberCategory
): string {
  const data = getBaseNumberMeaning(number, category);
  return data?.mots_cles || "Aucune donnée disponible.";
}

/**
 * Récupère la description d'un nombre de base.
 * @param number - Le nombre (1–22)
 * @param category - "jour" | "mois" | "annee" | "mission_vie"
 * @returns string - Description
 */
export function getBaseNumberDescription(
  number: number,
  category: BaseNumberCategory
): string {
  const data = getBaseNumberMeaning(number, category);
  return data?.description || "Aucune donnée disponible.";
}
