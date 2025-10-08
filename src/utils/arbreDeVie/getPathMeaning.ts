/**
 * @fileoverview Récupération des significations des chemins de l'Arbre de Vie
 */

import pathsData from "../../data/arbreDeVie/pathsData.json";
import pathsNumberData from "../../data/arbreDeVie/pathsNumberData.json";

/**
 * Interface pour la description générale d'un chemin
 */
export interface PathMeaning {
  name: string;
  title: string;
  description: string;
  arcana: string;
  pillar: string;
}

/**
 * Interface pour l'interprétation personnalisée d'un chemin avec un nombre
 */
export interface PathNumberMeaning {
  summary: string;
  description: string;
  keywords: string[];
  strengths: string;
  challenges: string;
  guidance: string;
}

/**
 * Récupère la description générale d'un chemin
 * @param pathKey - Clé du chemin (ex: "kether_tipheret")
 * @returns La description du chemin ou undefined
 */
export function getPathMeaning(pathKey: string): PathMeaning | undefined {
  const data = pathsData[pathKey as keyof typeof pathsData];

  if (!data) {
    console.warn(`Aucune description trouvée pour le chemin: ${pathKey}`);
    return undefined;
  }

  return data as PathMeaning;
}

/**
 * Récupère l'interprétation personnalisée pour un chemin avec un nombre spécifique
 * @param pathKey - Clé du chemin (ex: "kether_tipheret")
 * @param number - Le nombre calculé pour ce chemin (1-9, 11, 22, 33)
 * @returns L'interprétation personnalisée ou undefined
 */
export function getPathNumberMeaning(
  pathKey: string,
  number: number
): PathNumberMeaning | undefined {
  const pathData = pathsNumberData[pathKey as keyof typeof pathsNumberData];

  if (!pathData) {
    console.warn(`Aucune donnée trouvée pour le chemin: ${pathKey}`);
    return undefined;
  }

  const numberKey = number.toString();
  const meaning = pathData[numberKey as keyof typeof pathData];

  if (!meaning) {
    console.warn(
      `Aucune interprétation trouvée pour ${pathKey} avec le nombre ${number}`
    );
    return undefined;
  }

  return meaning as PathNumberMeaning;
}

/**
 * Crée une clé de chemin à partir de deux noms de Sephiroth
 * Essaie les deux ordres possibles pour trouver celui qui existe
 * @param from - Nom de la Sephira de départ
 * @param to - Nom de la Sephira d'arrivée
 * @returns La clé du chemin (ex: "kether_chokhmah")
 */
export function createPathKey(from: string, to: string): string {
  const fromLower = from.toLowerCase();
  const toLower = to.toLowerCase();

  // Essayer d'abord l'ordre from_to
  const directKey = `${fromLower}_${toLower}`;
  if (pathsNumberData[directKey as keyof typeof pathsNumberData]) {
    return directKey;
  }

  // Sinon essayer l'ordre inverse
  const reverseKey = `${toLower}_${fromLower}`;
  if (pathsNumberData[reverseKey as keyof typeof pathsNumberData]) {
    return reverseKey;
  }

  // Par défaut, retourner l'ordre alphabétique
  return fromLower < toLower ? directKey : reverseKey;
}

/**
 * Récupère toutes les descriptions des chemins
 * @returns Un tableau de toutes les descriptions de chemins
 */
export function getAllPathMeanings(): PathMeaning[] {
  return Object.values(pathsData) as PathMeaning[];
}
