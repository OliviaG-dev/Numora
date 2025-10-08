/**
 * @fileoverview Calculs de l'Arbre de Vie Kabbalistique
 * Ce fichier contient les fonctions pour calculer les valeurs des 10 Sephiroth
 * basées sur les données numérologiques de la date de naissance
 */

import { reduceToSingleDigit } from "../numerology/utils";
import { calculateLifePathNumber } from "../numerology/core";

/**
 * Interface pour les valeurs des Sephiroth
 */
export interface SephirothValues {
  kether: number; // 1 - Mission de vie / Expression
  chokhmah: number; // 2 - Esprit masculin (jour + mois)
  binah: number; // 3 - Esprit féminin (année réduite)
  chesed: number; // 4 - Jour de naissance
  gevurah: number; // 5 - Mois de naissance
  tipheret: number; // 6 - Centre du cœur (chemin de vie)
  netzach: number; // 7 - Émotion masculine (jour de naissance)
  hod: number; // 8 - Émotion féminine (mois de naissance)
  yesod: number; // 9 - Subconscient / Karma (somme jour + mois)
  malkuth: number; // 10 - Incarnation (somme totale de la date)
}

/**
 * Calcule les valeurs des 10 Sephiroth basées sur la date de naissance
 * PRÉSERVE LES NOMBRES MAÎTRES (11, 22, 33)
 * @param birthDate - Date de naissance au format "YYYY-MM-DD"
 * @returns Les valeurs des 10 Sephiroth
 */
export function calculateSephirothValues(birthDate: string): SephirothValues {
  const [year, month, day] = birthDate.split("-").map(Number);

  // 1. KETHER - Mission de vie / Connexion divine
  // Utilise le chemin de vie comme expression de la mission divine
  const kether = calculateLifePathNumber(birthDate);

  // 2. CHOKHMAH - Inspiration & Élan créatif (Esprit masculin)
  // Combinaison du jour et du mois pour l'élan créatif
  const chokhmah = reduceToSingleDigit(day + month); // Préserve 11, 22, 33

  // 3. BINAH - Intuition & Structure intérieure (Esprit féminin)
  // L'année représente la structure profonde
  const binah = reduceToSingleDigit(year); // Préserve 11, 22, 33

  // 4. CHESED - Expansion & Amour actif
  // Le jour de naissance représente l'expansion naturelle
  const chesed = reduceToSingleDigit(day, false); // Pas de nombres maîtres pour un jour seul

  // 5. GEVURAH - Discipline & Rigueur
  // Le mois représente la rigueur et les cycles
  const gevurah = reduceToSingleDigit(month, false); // Pas de nombres maîtres pour un mois seul

  // 6. TIPHERET - Harmonie & Cœur (Centre de l'Arbre)
  // Le chemin de vie au centre, équilibrant tout
  const tipheret = calculateLifePathNumber(birthDate);

  // 7. NETZACH - Passion & Motivation émotionnelle (côté masculin)
  // Le jour de naissance pour l'énergie passionnelle
  const netzach = reduceToSingleDigit(day, false); // Pas de nombres maîtres pour un jour seul

  // 8. HOD - Raison & Communication (côté féminin)
  // Le mois pour la structure mentale
  const hod = reduceToSingleDigit(month, false); // Pas de nombres maîtres pour un mois seul

  // 9. YESOD - Subconscient & Fondation de l'âme
  // Somme jour + mois pour le karma et l'inconscient
  const yesod = reduceToSingleDigit(day + month); // Préserve 11, 22, 33

  // 10. MALKUTH - Incarnation & Réalité physique
  // Somme totale de la date
  const totalDate = day + month + year;
  const malkuth = reduceToSingleDigit(totalDate); // Préserve 11, 22, 33

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
