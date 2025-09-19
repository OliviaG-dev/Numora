import React, { useState } from "react";
import "./NameAnalyzerSection.css";
import {
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
} from "../../utils/numerology";

interface NameAnalyzerSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "dateAnalyzer"
      | "nameAnalyzer"
  ) => void;
}

interface NameAnalysisResult {
  expression: number;
  soulUrge: number;
  personality: number;
  analysis: {
    expressionDescription: string;
    soulUrgeDescription: string;
    personalityDescription: string;
  };
}

const NameAnalyzerSection: React.FC<NameAnalyzerSectionProps> = ({
  onNavigate,
}) => {
  const [fullName, setFullName] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<NameAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setError(null);
    setAnalysisResult(null);
  };

  const analyzeName = async () => {
    if (!fullName.trim()) {
      setError("Veuillez entrer un nom complet");
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      // Nettoyer le nom (enlever les espaces multiples, caractères spéciaux)
      const cleanName = fullName.trim().replace(/\s+/g, " ");

      if (cleanName.length < 2) {
        throw new Error("Le nom doit contenir au moins 2 caractères");
      }

      if (cleanName.length > 100) {
        throw new Error("Le nom ne peut pas dépasser 100 caractères");
      }

      // Vérifier qu'il y a au moins un prénom
      const nameParts = cleanName.split(" ");
      const firstName = nameParts[0] || "";

      if (!firstName) {
        throw new Error("Veuillez entrer au moins un prénom");
      }

      // Calculs numérologiques
      const expression = calculateExpressionNumber(cleanName);
      const soulUrge = calculateSoulUrgeNumber(cleanName);
      const personality = calculatePersonalityNumber(cleanName);

      // Descriptions basiques
      const analysis = {
        expressionDescription: `Le nombre d'expression ${expression} révèle vos talents et capacités naturelles.`,
        soulUrgeDescription: `Le nombre d'âme ${soulUrge} dévoile vos motivations profondes et vos désirs intérieurs.`,
        personalityDescription: `Le nombre de personnalité ${personality} montre comment vous vous présentez aux autres.`,
      };

      setAnalysisResult({
        expression,
        soulUrge,
        personality,
        analysis,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <section className="name-analyzer-section">
      <div className="analyzer-container">
        <div className="analyzer-header">
          <h1>Analyseur de Nom</h1>
          <p className="analyzer-subtitle">
            Découvrez les significations numérologiques cachées dans votre nom
          </p>
        </div>

        <div className="analyzer-form">
          <div className="form-group">
            <label htmlFor="name-input">Entrez votre nom complet :</label>
            <input
              id="name-input"
              type="text"
              value={fullName}
              onChange={handleNameChange}
              className="name-input"
              placeholder="Ex: Jean Dupont"
              maxLength={100}
            />
            <div className="input-hint">
              Incluez votre prénom et nom de famille
            </div>
          </div>

          <button
            onClick={analyzeName}
            disabled={isAnalyzing || !fullName.trim()}
            className="analyze-button"
          >
            {isAnalyzing ? "Analyse en cours..." : "Analyser le nom"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {analysisResult && (
          <div className="analysis-results">
            <div className="results-header">
              <div className="name-display">
                <div className="name-initials">{getInitials(fullName)}</div>
                <h2>{fullName}</h2>
              </div>
            </div>

            <div className="results-grid">
              <div className="result-card">
                <div className="result-number">{analysisResult.expression}</div>
                <div className="result-label">Nombre d'Expression</div>
                <div className="result-description">
                  {analysisResult.analysis.expressionDescription}
                </div>
              </div>

              <div className="result-card">
                <div className="result-number">{analysisResult.soulUrge}</div>
                <div className="result-label">Nombre d'Âme</div>
                <div className="result-description">
                  {analysisResult.analysis.soulUrgeDescription}
                </div>
              </div>

              <div className="result-card">
                <div className="result-number">
                  {analysisResult.personality}
                </div>
                <div className="result-label">Nombre de Personnalité</div>
                <div className="result-description">
                  {analysisResult.analysis.personalityDescription}
                </div>
              </div>
            </div>

            <div className="results-actions">
              <button
                onClick={() => onNavigate("newReading")}
                className="btn-primary"
              >
                Créer une lecture complète
              </button>
              <button
                onClick={() => {
                  setFullName("");
                  setAnalysisResult(null);
                  setError(null);
                }}
                className="btn-secondary"
              >
                Nouvelle analyse
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NameAnalyzerSection;
