import { matrixRelationsHeartData } from "../data";

type RelationType = "interior" | "exterior";

export function getRelationMeaning(number: number, type: RelationType): string {
  if (number < 1 || number > 22) {
    return "Nombre hors limites (1-22 uniquement).";
  }

  const data =
    matrixRelationsHeartData[type as keyof typeof matrixRelationsHeartData];
  return (
    data[number.toString() as keyof typeof data] ||
    "Pas de signification trouvée."
  );
}
