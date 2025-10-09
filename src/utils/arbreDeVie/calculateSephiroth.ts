/**
 * @fileoverview Calculs de l'Arbre de Vie Kabbalistique
 * Ce fichier contient les fonctions pour calculer les valeurs des 10 Sephiroth
 * basées sur la date de naissance
 *
 * NOTE IMPORTANTE: Ce système est une interprétation moderne de la numérologie
 * kabbalistique. Les doublons de valeurs sont normaux et font partie de votre
 * signature numérologique unique. Chaque Sephira garde sa signification propre
 * même si le nombre est répété.
 */

import { reduceToSingleDigit } from "../numerology/utils";
import { calculateLifePathNumber } from "../numerology/core";

/**
 * Interface pour les valeurs des Sephiroth
 */
export interface SephirothValues {
  kether: number; // 1 - La Couronne (Chemin de Vie)
  chokhmah: number; // 2 - La Sagesse (Année réduite)
  binah: number; // 3 - L'Intelligence (Mois réduit)
  chesed: number; // 4 - La Miséricorde (Jour réduit)
  gevurah: number; // 5 - La Rigueur (Jour + Mois)
  tipheret: number; // 6 - La Beauté (Chemin de Vie - centre)
  netzach: number; // 7 - La Victoire (Jour + Année)
  hod: number; // 8 - La Splendeur (Mois + Année)
  yesod: number; // 9 - Le Fondement (Total de tous les chiffres)
  malkuth: number; // 10 - Le Royaume (Réduction finale de la date)
}

/**
 * Calcule les valeurs des 10 Sephiroth basées sur la date de naissance
 * Système simple et transparent basé uniquement sur la date
 * PRÉSERVE LES NOMBRES MAÎTRES (11, 22, 33)
 *
 * @param birthDate - Date de naissance au format "YYYY-MM-DD"
 * @returns Les valeurs des 10 Sephiroth
 *
 * @example
 * calculateSephirothValues("1989-10-18")
 * // Retourne les 10 valeurs pour chaque Sephira
 */
export function calculateSephirothValues(birthDate: string): SephirothValues {
  const [year, month, day] = birthDate.split("-").map(Number);

  // 1. KETHER - La Couronne / Mission de vie
  // Le Chemin de Vie représente ta mission divine suprême
  const kether = calculateLifePathNumber(birthDate);

  // 2. CHOKHMAH - La Sagesse / Inspiration créative
  // L'année réduite représente ta sagesse générationnelle
  const chokhmah = reduceToSingleDigit(year);

  // 3. BINAH - L'Intelligence / Compréhension
  // Le mois réduit représente ton intelligence cyclique
  const binah = reduceToSingleDigit(month);

  // 4. CHESED - La Miséricorde / Amour expansif
  // Le jour réduit représente ton amour et ta générosité
  const chesed = reduceToSingleDigit(day);

  // 5. GEVURAH - La Rigueur / Force et discipline
  // Jour + Mois pour la discipline et les limites
  const gevurah = reduceToSingleDigit(day + month);

  // 6. TIPHERET - La Beauté / Harmonie centrale
  // Le Chemin de Vie au centre, point d'équilibre parfait
  const tipheret = calculateLifePathNumber(birthDate);

  // 7. NETZACH - La Victoire / Passion et persévérance
  // Jour + Année pour l'énergie passionnelle
  const netzach = reduceToSingleDigit(day + year);

  // 8. HOD - La Splendeur / Communication et intellect
  // Mois + Année pour la structure mentale
  const hod = reduceToSingleDigit(month + year);

  // 9. YESOD - Le Fondement / Subconscient et âme
  // Somme de TOUS les chiffres de la date (avant réduction finale)
  const allDigits = birthDate.replace(/-/g, "").split("").map(Number);
  const totalSum = allDigits.reduce((acc, val) => acc + val, 0);
  const yesod = reduceToSingleDigit(totalSum);

  // 10. MALKUTH - Le Royaume / Manifestation physique
  // Réduction finale de la date complète
  const malkuth = reduceToSingleDigit(day + month + year);

  return {
    kether,
    chokhmah,
    binah,
    chesed,
    gevurah,
    tipheret,
    netzach,
    hod,
    yesod,
    malkuth,
  };
}

/**
 * Calcule les 22 chemins de l'Arbre de Vie
 * Chaque chemin connecte deux Sephiroth et représente une dynamique
 */
export interface TreePath {
  from: string;
  to: string;
  number: number;
  arcana?: string; // Arcane du Tarot associé (optionnel)
}

/**
 * Définit les 22 chemins de l'Arbre de Vie selon la tradition kabbalistique
 * Chaque chemin est associé à un arcane majeur du Tarot
 */
export const TREE_PATHS: TreePath[] = [
  // Les 3 chemins horizontaux (Piliers)
  { from: "chokhmah", to: "binah", number: 1, arcana: "Le Bateleur" },
  { from: "chesed", to: "gevurah", number: 6, arcana: "L'Amoureux" },
  { from: "netzach", to: "hod", number: 15, arcana: "Le Diable" },

  // Les chemins du Pilier de la Miséricorde (gauche)
  { from: "kether", to: "chokhmah", number: 2, arcana: "La Papesse" },
  { from: "chokhmah", to: "chesed", number: 7, arcana: "Le Chariot" },
  { from: "chesed", to: "netzach", number: 10, arcana: "La Roue de Fortune" },
  { from: "netzach", to: "yesod", number: 18, arcana: "La Lune" },

  // Les chemins du Pilier de la Rigueur (droite)
  { from: "kether", to: "binah", number: 3, arcana: "L'Impératrice" },
  { from: "binah", to: "gevurah", number: 8, arcana: "La Justice" },
  { from: "gevurah", to: "hod", number: 11, arcana: "La Force" },
  { from: "hod", to: "yesod", number: 19, arcana: "Le Soleil" },

  // Les chemins du Pilier Central (équilibre)
  { from: "kether", to: "tipheret", number: 4, arcana: "L'Empereur" },
  { from: "tipheret", to: "yesod", number: 13, arcana: "La Mort" },
  { from: "yesod", to: "malkuth", number: 21, arcana: "Le Monde" },

  // Les chemins diagonaux (équilibre dynamique)
  { from: "chokhmah", to: "tipheret", number: 5, arcana: "Le Pape" },
  { from: "binah", to: "tipheret", number: 9, arcana: "L'Hermite" },
  { from: "chesed", to: "tipheret", number: 12, arcana: "Le Pendu" },
  { from: "gevurah", to: "tipheret", number: 14, arcana: "Tempérance" },
  { from: "tipheret", to: "netzach", number: 16, arcana: "La Maison Dieu" },
  { from: "tipheret", to: "hod", number: 17, arcana: "L'Étoile" },
  { from: "netzach", to: "malkuth", number: 20, arcana: "Le Jugement" },
  { from: "hod", to: "malkuth", number: 22, arcana: "Le Mat" },
];

/**
 * Calcule la valeur d'un chemin entre deux Sephiroth
 * @param values - Les valeurs des Sephiroth
 * @param path - Le chemin à calculer
 * @returns La valeur du chemin (somme des deux Sephiroth réduite)
 */
export function calculatePathValue(
  values: SephirothValues,
  path: TreePath
): number {
  const fromValue = values[path.from as keyof SephirothValues];
  const toValue = values[path.to as keyof SephirothValues];
  return reduceToSingleDigit(fromValue + toValue);
}

/**
 * Identifie les chemins les plus importants (avec les valeurs les plus élevées)
 * @param values - Les valeurs des Sephiroth
 * @param topN - Nombre de chemins à retourner (défaut: 5)
 * @returns Les chemins les plus importants avec leurs valeurs
 */
export function getSignificantPaths(
  values: SephirothValues,
  topN: number = 5
): Array<{ path: TreePath; value: number }> {
  const pathsWithValues = TREE_PATHS.map((path) => ({
    path,
    value: calculatePathValue(values, path),
  }));

  return pathsWithValues.sort((a, b) => b.value - a.value).slice(0, topN);
}

/**
 * Analyse les équilibres entre les trois piliers de l'Arbre
 */
export interface PillarBalance {
  mercy: number; // Pilier de la Miséricorde (gauche)
  severity: number; // Pilier de la Rigueur (droite)
  equilibrium: number; // Pilier de l'Équilibre (centre)
}

/**
 * Calcule l'équilibre entre les trois piliers
 * @param values - Les valeurs des Sephiroth
 * @returns L'équilibre des trois piliers
 */
export function calculatePillarBalance(values: SephirothValues): PillarBalance {
  // Pilier de la Miséricorde (expansion, amour)
  const mercy = reduceToSingleDigit(
    values.chokhmah + values.chesed + values.netzach
  );

  // Pilier de la Rigueur (contraction, discipline)
  const severity = reduceToSingleDigit(
    values.binah + values.gevurah + values.hod
  );

  // Pilier de l'Équilibre (harmonie, centre)
  const equilibrium = reduceToSingleDigit(
    values.kether + values.tipheret + values.yesod + values.malkuth
  );

  return {
    mercy,
    severity,
    equilibrium,
  };
}

/**
 * Génère une analyse complète de l'Arbre de Vie
 */
export interface TreeOfLifeAnalysis {
  sephirothValues: SephirothValues;
  significantPaths: Array<{ path: TreePath; value: number }>;
  pillarBalance: PillarBalance;
  dominantPillar: "mercy" | "severity" | "equilibrium";
}

/**
 * Analyse complète de l'Arbre de Vie pour une personne
 * @param birthDate - Date de naissance
 * @returns Analyse complète
 */
export function analyzeTreeOfLife(birthDate: string): TreeOfLifeAnalysis {
  const sephirothValues = calculateSephirothValues(birthDate);
  const significantPaths = getSignificantPaths(sephirothValues);
  const pillarBalance = calculatePillarBalance(sephirothValues);

  // Déterminer le pilier dominant
  let dominantPillar: "mercy" | "severity" | "equilibrium" = "equilibrium";
  if (
    pillarBalance.mercy > pillarBalance.severity &&
    pillarBalance.mercy > pillarBalance.equilibrium
  ) {
    dominantPillar = "mercy";
  } else if (
    pillarBalance.severity > pillarBalance.mercy &&
    pillarBalance.severity > pillarBalance.equilibrium
  ) {
    dominantPillar = "severity";
  }

  return {
    sephirothValues,
    significantPaths,
    pillarBalance,
    dominantPillar,
  };
}
