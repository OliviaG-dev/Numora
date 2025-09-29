import { externalRelationsData } from "../../data";

/**
 * Récupère la signification d'une relation extérieure
 * @param number - Le nombre de la relation extérieure
 * @param type - Le type de relation ("pouvoir_social" ou "influence_social")
 * @returns La signification correspondante ou un message par défaut
 */
export function getExternalRelationsMeaning(
  number: number,
  type: "pouvoir_social" | "influence_social"
): string {
  const numberKey = number.toString();

  if (type === "pouvoir_social") {
    return (
      (externalRelationsData.pouvoir_social as Record<string, string>)[
        numberKey
      ] || `Pouvoir personnel avec le nombre ${number}`
    );
  } else if (type === "influence_social") {
    return (
      (externalRelationsData.influence_social as Record<string, string>)[
        numberKey
      ] || `Influence sociale avec le nombre ${number}`
    );
  }

  return `Signification non trouvée pour le nombre ${number}`;
}
