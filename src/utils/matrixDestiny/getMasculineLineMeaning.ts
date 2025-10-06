import masculineLineData from "../../data/matrixDestiny/masculineLine.json";

export interface MasculineLineDetail {
  keyword: string;
  interpretation: string;
}

export type MasculineLineCategory = "spirit" | "heart" | "energy";

/**
 * Récupère la signification d'un nombre pour une catégorie de ligne masculine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns MasculineLineDetail | null - Détails de la signification
 */
export function getMasculineLineMeaning(
  number: number,
  category: MasculineLineCategory
): MasculineLineDetail | null {
  if (number < 1 || number > 22) {
    return null;
  }

  const data = masculineLineData.masculine_line[category];
  const numberKey = number.toString() as keyof typeof data;
  return data[numberKey] || null;
}

/**
 * Récupère le mot-clé d'un nombre pour une catégorie de ligne masculine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns string - Mot-clé
 */
export function getMasculineLineKeyword(
  number: number,
  category: MasculineLineCategory
): string {
  const detail = getMasculineLineMeaning(number, category);
  return detail ? detail.keyword : "N/A";
}

/**
 * Récupère l'interprétation d'un nombre pour une catégorie de ligne masculine.
 * @param number - Le nombre (1–22)
 * @param category - "spirit" | "heart" | "energy"
 * @returns string - Interprétation
 */
export function getMasculineLineInterpretation(
  number: number,
  category: MasculineLineCategory
): string {
  const detail = getMasculineLineMeaning(number, category);
  return detail ? detail.interpretation : "N/A";
}
