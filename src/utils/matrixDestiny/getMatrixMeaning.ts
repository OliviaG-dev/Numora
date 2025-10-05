import { matrixMoneyLoveData } from "../../data";

export type MatrixCategory = "love" | "money" | "pivot";

/**
 * Récupère la signification d'un nombre pour une catégorie de la Matrix Destiny.
 * @param number - Le nombre (1–22)
 * @param category - "love" | "money" | "pivot"
 * @returns string - Signification
 */
export function getMatrixMeaning(
  number: number,
  category: MatrixCategory
): string {
  if (number < 1 || number > 22) {
    return "Nombre invalide (doit être entre 1 et 22).";
  }

  const data = matrixMoneyLoveData[category];
  const numberKey = number.toString() as keyof typeof data;
  return data[numberKey] || "Aucune donnée disponible.";
}
