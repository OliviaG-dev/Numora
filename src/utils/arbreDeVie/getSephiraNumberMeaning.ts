/**
 * @fileoverview Récupération des interprétations personnalisées Sephira + Nombre
 */

import sephirothNumberData from "../../data/arbreDeVie/sephirothNumberData.json";

export interface SephiraNumberMeaning {
  summary: string;
  description: string;
  keywords: string[];
  strengths: string;
  challenges: string;
  guidance: string;
}

/**
 * Récupère l'interprétation personnalisée pour une Sephira avec un nombre spécifique
 * @param sephiraName - Nom de la Sephira en minuscules (ex: "kether", "tipheret")
 * @param number - Le nombre calculé (1-9)
 * @returns L'interprétation personnalisée ou undefined
 */
export function getSephiraNumberMeaning(
  sephiraName: string,
  number: number
): SephiraNumberMeaning | undefined {
  const sephiraKey = sephiraName.toLowerCase();
  const numberKey = number.toString();

  const sephiraData =
    sephirothNumberData[sephiraKey as keyof typeof sephirothNumberData];

  if (!sephiraData) {
    console.warn(`Aucune donnée trouvée pour la Sephira: ${sephiraName}`);
    return undefined;
  }

  const meaning = sephiraData[numberKey as keyof typeof sephiraData];

  if (!meaning) {
    console.warn(
      `Aucune interprétation trouvée pour ${sephiraName} avec le nombre ${number}`
    );
    return undefined;
  }

  return meaning as SephiraNumberMeaning;
}

/**
 * Mapping des clés de SephirothValues vers les noms utilisés dans le JSON
 */
export const SEPHIRA_KEY_MAPPING = {
  kether: "kether",
  chokhmah: "chokhmah",
  binah: "binah",
  chesed: "chesed",
  gevurah: "gevurah",
  tipheret: "tipheret",
  netzach: "netzach",
  hod: "hod",
  yesod: "yesod",
  malkuth: "malkuth",
} as const;
