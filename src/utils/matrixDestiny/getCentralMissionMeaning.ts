import centralMissionData from "../../data/matrixDestiny/centralMission.json";

export interface CentralMissionDetail {
  keyword: string;
  interpretation: string;
}

/**
 * Récupère la signification d'une mission centrale pour un nombre donné.
 * @param number - Le nombre (1–22)
 * @returns CentralMissionDetail | null - Détails de la signification
 */
export function getCentralMissionMeaning(
  number: number
): CentralMissionDetail | null {
  if (number < 1 || number > 22) {
    return null;
  }

  const data = centralMissionData.central_balance;
  const numberKey = number.toString() as keyof typeof data;
  return data[numberKey] || null;
}

/**
 * Récupère le mot-clé d'une mission centrale pour un nombre donné.
 * @param number - Le nombre (1–22)
 * @returns string - Mot-clé
 */
export function getCentralMissionKeyword(number: number): string {
  const detail = getCentralMissionMeaning(number);
  return detail ? detail.keyword : "N/A";
}

/**
 * Récupère l'interprétation d'une mission centrale pour un nombre donné.
 * @param number - Le nombre (1–22)
 * @returns string - Interprétation
 */
export function getCentralMissionInterpretation(number: number): string {
  const detail = getCentralMissionMeaning(number);
  return detail ? detail.interpretation : "N/A";
}
