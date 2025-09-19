import React, { useState } from "react";
import "./DateAnalyzerSection.css";
import {
  calculateLifePathNumber,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay,
} from "../../utils/numerology";

interface DateAnalyzerSectionProps {
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

interface DateAnalysisResult {
  lifePath: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  analysis: {
    lifePathDescription: string;
    personalYearDescription: string;
    personalMonthDescription: string;
    personalDayDescription: string;
  };
}

const DateAnalyzerSection: React.FC<DateAnalyzerSectionProps> = ({
  onNavigate,
}) => {
  const [date, setDate] = useState("");
  const [analysisResult, setAnalysisResult] =
    useState<DateAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
    setError(null);
    setAnalysisResult(null);
  };

  const analyzeDate = async () => {
    if (!date) {
      setError("Veuillez entrer une date");
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const [year, month, day] = date.split("-").map(Number);

      // Validation de la date
      if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error("Format de date invalide");
      }

      if (year < 1900 || year > 2100) {
        throw new Error("L'année doit être entre 1900 et 2100");
      }

      if (month < 1 || month > 12) {
        throw new Error("Le mois doit être entre 1 et 12");
      }

      if (day < 1 || day > 31) {
        throw new Error("Le jour doit être entre 1 et 31");
      }

      // Calculs numérologiques
      const lifePath = calculateLifePathNumber(date);
      const personalYear = calculatePersonalYear(
        day,
        month,
        new Date().getFullYear()
      );
      const personalMonth = calculatePersonalMonth(
        personalYear,
        new Date().getMonth() + 1
      );
      const personalDay = calculatePersonalDay(
        personalMonth,
        new Date().getDate()
      );

      // Descriptions basiques
      const analysis = {
        lifePathDescription: `Le chemin de vie ${lifePath} révèle votre mission principale dans cette incarnation.`,
        personalYearDescription: `L'année personnelle ${personalYear} influence votre année actuelle.`,
        personalMonthDescription: `Le mois personnel ${personalMonth} guide votre mois actuel.`,
        personalDayDescription: `Le jour personnel ${personalDay} influence votre journée actuelle.`,
      };

      setAnalysisResult({
        lifePath,
        personalYear,
        personalMonth,
        personalDay,
        analysis,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <section className="date-analyzer-section">
      <div className="analyzer-container">
        <div className="analyzer-header">
          <h1>Analyseur de Date</h1>
          <p className="analyzer-subtitle">
            Découvrez les significations numérologiques cachées dans n'importe
            quelle date
          </p>
        </div>

        <div className="analyzer-form">
          <div className="form-group">
            <label htmlFor="date-input">Sélectionnez une date :</label>
            <input
              id="date-input"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="date-input"
              max="2100-12-31"
              min="1900-01-01"
            />
          </div>

          <button
            onClick={analyzeDate}
            disabled={isAnalyzing || !date}
            className="analyze-button"
          >
            {isAnalyzing ? "Analyse en cours..." : "Analyser la date"}
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
              <h2>Résultats pour le {formatDate(date)}</h2>
            </div>

            <div className="results-grid">
              <div className="result-card">
                <div className="result-number">{analysisResult.lifePath}</div>
                <div className="result-label">Chemin de Vie</div>
                <div className="result-description">
                  {analysisResult.analysis.lifePathDescription}
                </div>
              </div>

              <div className="result-card">
                <div className="result-number">
                  {analysisResult.personalYear}
                </div>
                <div className="result-label">Année Personnelle</div>
                <div className="result-description">
                  {analysisResult.analysis.personalYearDescription}
                </div>
              </div>

              <div className="result-card">
                <div className="result-number">
                  {analysisResult.personalMonth}
                </div>
                <div className="result-label">Mois Personnel</div>
                <div className="result-description">
                  {analysisResult.analysis.personalMonthDescription}
                </div>
              </div>

              <div className="result-card">
                <div className="result-number">
                  {analysisResult.personalDay}
                </div>
                <div className="result-label">Jour Personnel</div>
                <div className="result-description">
                  {analysisResult.analysis.personalDayDescription}
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
                  setDate("");
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

export default DateAnalyzerSection;
