/**
 * Exemple d'utilisation des fonctions numérologiques
 * Ce fichier montre comment utiliser les calculs numérologiques dans l'application
 */

import {
  calculateLifePathNumber,
  calculateExpressionNumber,
} from "../utils/numerology";
import { lifePathData, expressionData } from "../data";

// Interface pour les résultats
interface NumerologyResults {
  lifePath: {
    number: number;
    info: any;
  };
  expression: {
    number: number;
    info: any;
  };
}

/**
 * Calcule une analyse numérologique complète
 * @param birthDate - Date de naissance au format "YYYY-MM-DD"
 * @param fullName - Nom complet
 * @returns Résultats de l'analyse numérologique
 */
export function calculateNumerologyAnalysis(
  birthDate: string,
  fullName: string
): NumerologyResults {
  try {
    // Calculer le Chemin de Vie
    const lifePathNumber = calculateLifePathNumber(birthDate);
    const lifePathInfo = lifePathData[lifePathNumber.toString()];

    // Calculer le Nombre d'Expression
    const expressionNumber = calculateExpressionNumber(fullName);
    const expressionInfo = expressionData[expressionNumber.toString()];

    return {
      lifePath: {
        number: lifePathNumber,
        info: lifePathInfo,
      },
      expression: {
        number: expressionNumber,
        info: expressionInfo,
      },
    };
  } catch (error) {
    throw new Error(`Erreur lors du calcul numérologique: ${error.message}`);
  }
}

/**
 * Affiche une analyse numérologique formatée
 * @param birthDate - Date de naissance
 * @param fullName - Nom complet
 */
export function displayNumerologyAnalysis(
  birthDate: string,
  fullName: string
): void {
  try {
    const results = calculateNumerologyAnalysis(birthDate, fullName);

    console.log("🔮 ANALYSE NUMÉROLOGIQUE 🔮");
    console.log("============================");
    console.log(`Nom: ${fullName}`);
    console.log(`Date de naissance: ${birthDate}`);
    console.log("");

    // Chemin de Vie
    console.log("🛤️  CHEMIN DE VIE");
    console.log("-----------------");
    console.log(`Nombre: ${results.lifePath.number}`);
    console.log(`Titre: ${results.lifePath.info.title}`);
    console.log(`Mots-clés: ${results.lifePath.info.keywords.join(", ")}`);
    console.log(`Description: ${results.lifePath.info.description}`);
    console.log(`Forces: ${results.lifePath.info.strengths}`);
    console.log(`Défis: ${results.lifePath.info.challenges}`);
    console.log(`Mission: ${results.lifePath.info.mission}`);
    console.log("");

    // Nombre d'Expression
    console.log("🎭 NOMBRE D'EXPRESSION");
    console.log("----------------------");
    console.log(`Nombre: ${results.expression.number}`);
    console.log(`Titre: ${results.expression.info.title}`);
    console.log(`Mots-clés: ${results.expression.info.keywords.join(", ")}`);
    console.log(`Description: ${results.expression.info.description}`);
    console.log(`Forces: ${results.expression.info.strengths}`);
    console.log(`Défis: ${results.expression.info.challenges}`);
    console.log(`Mission: ${results.expression.info.mission}`);
    console.log("");

    // Synergie
    console.log("🔄 SYNERGIE");
    console.log("-----------");
    console.log(
      `Votre Chemin de Vie (${results.lifePath.number}) révèle votre mission principale.`
    );
    console.log(
      `Votre Nombre d'Expression (${results.expression.number}) montre comment vous vous exprimez.`
    );
    console.log("Ensemble, ils forment votre profil numérologique unique !");
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

/**
 * Exemples d'utilisation
 */
export function runExamples(): void {
  console.log("🚀 EXEMPLES D'UTILISATION");
  console.log("==========================");
  console.log("");

  // Exemple 1
  console.log("📝 Exemple 1:");
  displayNumerologyAnalysis("1990-03-15", "Marie Dupont");
  console.log("");

  // Exemple 2
  console.log("📝 Exemple 2:");
  displayNumerologyAnalysis("1985-07-22", "Jean Martin");
  console.log("");

  // Exemple 3
  console.log("📝 Exemple 3:");
  displayNumerologyAnalysis("1992-11-11", "Sophie Leblanc");
  console.log("");
}

/**
 * Fonction utilitaire pour valider les entrées
 * @param birthDate - Date de naissance
 * @param fullName - Nom complet
 * @returns true si les entrées sont valides
 */
export function validateInputs(birthDate: string, fullName: string): boolean {
  // Validation de la date
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthDate)) {
    console.error("❌ Format de date invalide. Utilisez YYYY-MM-DD");
    return false;
  }

  // Validation du nom
  if (!fullName || fullName.trim().length === 0) {
    console.error("❌ Le nom ne peut pas être vide");
    return false;
  }

  // Vérifier qu'il y a au moins une lettre
  const hasLetters = /[a-zA-Z]/.test(fullName);
  if (!hasLetters) {
    console.error("❌ Le nom doit contenir au moins une lettre");
    return false;
  }

  return true;
}

/**
 * Fonction pour créer un rapport numérologique
 * @param birthDate - Date de naissance
 * @param fullName - Nom complet
 * @returns Rapport formaté en HTML
 */
export function generateNumerologyReport(
  birthDate: string,
  fullName: string
): string {
  if (!validateInputs(birthDate, fullName)) {
    return "<p>❌ Erreur: Entrées invalides</p>";
  }

  try {
    const results = calculateNumerologyAnalysis(birthDate, fullName);

    return `
      <div class="numerology-report">
        <h1>🔮 Analyse Numérologique</h1>
        <h2>${fullName}</h2>
        <p>Date de naissance: ${birthDate}</p>
        
        <div class="life-path">
          <h3>🛤️ Chemin de Vie: ${results.lifePath.number}</h3>
          <h4>${results.lifePath.info.title}</h4>
          <p><strong>Mots-clés:</strong> ${results.lifePath.info.keywords.join(
            ", "
          )}</p>
          <p><strong>Description:</strong> ${
            results.lifePath.info.description
          }</p>
          <p><strong>Forces:</strong> ${results.lifePath.info.strengths}</p>
          <p><strong>Défis:</strong> ${results.lifePath.info.challenges}</p>
          <p><strong>Mission:</strong> ${results.lifePath.info.mission}</p>
        </div>
        
        <div class="expression">
          <h3>🎭 Nombre d'Expression: ${results.expression.number}</h3>
          <h4>${results.expression.info.title}</h4>
          <p><strong>Mots-clés:</strong> ${results.expression.info.keywords.join(
            ", "
          )}</p>
          <p><strong>Description:</strong> ${
            results.expression.info.description
          }</p>
          <p><strong>Forces:</strong> ${results.expression.info.strengths}</p>
          <p><strong>Défis:</strong> ${results.expression.info.challenges}</p>
          <p><strong>Mission:</strong> ${results.expression.info.mission}</p>
        </div>
        
        <div class="synergy">
          <h3>🔄 Synergie</h3>
          <p>Votre Chemin de Vie (${
            results.lifePath.number
          }) révèle votre mission principale, 
          tandis que votre Nombre d'Expression (${
            results.expression.number
          }) montre comment vous vous exprimez. 
          Ensemble, ils forment votre profil numérologique unique !</p>
        </div>
      </div>
    `;
  } catch (error) {
    return `<p>❌ Erreur lors du calcul: ${error.message}</p>`;
  }
}

// Export par défaut
export default {
  calculateNumerologyAnalysis,
  displayNumerologyAnalysis,
  runExamples,
  validateInputs,
  generateNumerologyReport,
};
