/**
 * @fileoverview Récupération des significations des Sephiroth
 */

import sephirothData from "../../data/arbreDeVie/sephirothData.json";

export interface SephiraMeaning {
  name: string;
  hebrewName: string;
  title: string;
  subtitle: string;
  description: string;
  domain: string;
}

/**
 * Récupère la signification d'une Sephira spécifique
 * @param sephiraNumber - Numéro de la Sephira (1-10)
 * @returns La signification de la Sephira ou undefined si non trouvée
 */
export function getSephiraMeaning(
  sephiraNumber: number
): SephiraMeaning | undefined {
  const key = sephiraNumber.toString();
  const data = sephirothData[key as keyof typeof sephirothData];

  if (!data) {
    console.warn(
      `Aucune signification trouvée pour la Sephira ${sephiraNumber}`
    );
    return undefined;
  }

  return data as SephiraMeaning;
}

/**
 * Récupère toutes les significations des Sephiroth
 * @returns Un tableau de toutes les significations
 */
export function getAllSephirothMeanings(): SephiraMeaning[] {
  return Object.values(sephirothData) as SephiraMeaning[];
}

/**
 * Récupère la signification d'une Sephira par son nom
 * @param name - Nom de la Sephira (ex: "Kether", "Tipheret")
 * @returns La signification de la Sephira ou undefined si non trouvée
 */
export function getSephiraMeaningByName(
  name: string
): SephiraMeaning | undefined {
  const allMeanings = getAllSephirothMeanings();
  return allMeanings.find(
    (meaning) => meaning.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Descriptions des piliers de l'Arbre de Vie
 */
export const PILLAR_DESCRIPTIONS = {
  mercy: {
    name: "Pilier de la Miséricorde",
    description:
      "Le pilier de gauche représente l'énergie d'expansion, de générosité et de créativité. C'est la force masculine active qui donne, crée et se déploie dans le monde.",
    keywords: ["Expansion", "Créativité", "Générosité", "Action", "Dynamisme"],
    guidance:
      "Ton pilier de la miséricorde te pousse à donner et à créer. Équilibre cette force avec la sagesse pour éviter l'excès.",
  },
  severity: {
    name: "Pilier de la Rigueur",
    description:
      "Le pilier de droite représente l'énergie de contraction, de discipline et de structure. C'est la force féminine réceptive qui filtre, organise et donne forme.",
    keywords: [
      "Discipline",
      "Structure",
      "Discernement",
      "Réceptivité",
      "Forme",
    ],
    guidance:
      "Ton pilier de la rigueur te donne structure et discernement. Équilibre cette force avec la compassion pour éviter la rigidité.",
  },
  equilibrium: {
    name: "Pilier de l'Équilibre",
    description:
      "Le pilier central représente l'harmonie parfaite entre expansion et contraction. C'est le chemin de l'équilibre où les opposés se rencontrent et se complètent.",
    keywords: ["Harmonie", "Équilibre", "Unité", "Centre", "Intégration"],
    guidance:
      "Ton pilier central est le chemin de l'harmonie. C'est en équilibrant tes forces que tu atteins ta pleine réalisation.",
  },
};

/**
 * Récupère la description d'un pilier
 * @param pillarName - Nom du pilier ('mercy', 'severity', 'equilibrium')
 * @returns La description du pilier
 */
export function getPillarDescription(
  pillarName: "mercy" | "severity" | "equilibrium"
) {
  return PILLAR_DESCRIPTIONS[pillarName];
}
