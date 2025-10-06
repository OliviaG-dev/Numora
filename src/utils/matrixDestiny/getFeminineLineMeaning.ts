import feminineLineData from "../../data/matrixDestiny/feminineLine.json";

export interface FeminineLineDetail {
  keyword: string;
  interpretation: string;
}

export type FeminineLineCategory = "spirit" | "heart" | "energy";

/**
 * Récupère la signification d'un nombre pour une catégorie de ligne féminine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns FeminineLineDetail | null - Détails de la signification
 */
export function getFeminineLineMeaning(
  number: number,
  category: FeminineLineCategory
): FeminineLineDetail | null {
  if (number < 1 || number > 22) {
    return null;
  }

  const data = feminineLineData.feminine_line[category];
  const numberKey = number.toString() as keyof typeof data;
  return data[numberKey] || null;
}

/**
 * Récupère le mot-clé d'un nombre pour une catégorie de ligne féminine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns string - Mot-clé
 */
export function getFeminineLineKeyword(
  number: number,
  category: FeminineLineCategory
): string {
  const detail = getFeminineLineMeaning(number, category);
  return detail ? detail.keyword : "N/A";
}

/**
 * Récupère l'interprétation d'un nombre pour une catégorie de ligne féminine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns string - Interprétation
 */
export function getFeminineLineInterpretation(
  number: number,
  category: FeminineLineCategory
): string {
  const detail = getFeminineLineMeaning(number, category);
  return detail ? detail.interpretation : "N/A";
}
