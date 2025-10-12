import React, { useState } from "react";
import "./DateAnalyzerSection.css";
import { useAuth } from "../../hooks/useAuth";
import {
  calculateLifePathNumber,
  calculatePersonalYear,
  calculatePersonalMonth,
  calculatePersonalDay,
  getDateVibration,
} from "../../utils/numerology";
import { dateVibeData } from "../../data";
import type { DateVibeDetail } from "../../data";

import type { NavigateFunction } from "../../types/navigation";

interface DateAnalyzerSectionProps {
  onNavigate: NavigateFunction;
}

interface DateAnalysisResult {
  lifePath: number;
  personalYear: number;
  personalMonth: number;
  personalDay: number;
  dateVibration: number;
  analysis: {
    lifePathDescription: string;
    personalYearDescription: string;
    personalMonthDescription: string;
    personalDayDescription: string;
    dateVibrationInfo: DateVibeDetail | null;
  };
}

const DateAnalyzerSection: React.FC<DateAnalyzerSectionProps> = ({
  onNavigate,
}) => {
  const { isAuthenticated } = useAuth();
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      analyzeDate();
    }
  };

  const analyzeDate = async () => {
    if (!date) {
      setError("Veuillez entrer une date");
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      // Délai pour voir le message de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      // Calcul de la vibration de la date
      const dateVibration = getDateVibration(new Date(date));
      const dateVibrationInfo =
        dateVibeData[dateVibration.toString() as keyof typeof dateVibeData] ||
        null;

      // Descriptions basiques
      const analysis = {
        lifePathDescription: `Le chemin de vie ${lifePath} révèle votre mission principale dans cette incarnation.`,
        personalYearDescription: `L'année personnelle ${personalYear} influence votre année actuelle.`,
        personalMonthDescription: `Le mois personnel ${personalMonth} guide votre mois actuel.`,
        personalDayDescription: `Le jour personnel ${personalDay} influence votre journée actuelle.`,
        dateVibrationInfo,
      };

      setAnalysisResult({
        lifePath,
        personalYear,
        personalMonth,
        personalDay,
        dateVibration,
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
          <h1>Explorateur de Dates</h1>
          <p className="analyzer-subtitle">
            Découvrez les significations numérologiques cachées dans n'importe
            quelle date
          </p>
        </div>

        <div className="analyzer-form">
          {!isAuthenticated && (
            <div className="auth-warning">
              <div className="warning-content">
                <p className="warning-message">
                  Pour garder vos lectures sous la main et accéder à toutes les
                  fonctionnalités,{" "}
                  <span
                    className="highlight-text"
                    onClick={() => onNavigate("login")}
                  >
                    connectez-vous
                  </span>
                  .
                </p>
              </div>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="date-input">Sélectionnez une date :</label>
            <input
              id="date-input"
              type="date"
              value={date}
              onChange={handleDateChange}
              onKeyPress={handleKeyPress}
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

            <div className="vibration-analysis">
              <div className="vibration-header">
                <div className="vibration-badge">
                  {analysisResult.dateVibration}
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                </div>
                <h3>Vibration de la Date</h3>
                <p className="vibration-subtitle">
                  L'énergie numérologique de cette date
                </p>
              </div>

              {analysisResult.analysis.dateVibrationInfo ? (
                <div className="vibration-details">
                  <div className="vibration-summary">
                    <p>{analysisResult.analysis.dateVibrationInfo.summary}</p>
                  </div>

                  <div className="vibration-details-grid">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>
                        {analysisResult.analysis.dateVibrationInfo.strength}
                      </p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>
                        {analysisResult.analysis.dateVibrationInfo.challenge}
                      </p>
                    </div>
                    <div className="detail-item">
                      <h4>Favorable pour</h4>
                      <p>
                        {
                          analysisResult.analysis.dateVibrationInfo
                            .favorable_for
                        }
                      </p>
                    </div>
                    <div className="detail-item">
                      <h4>Défavorable pour</h4>
                      <p>
                        {
                          analysisResult.analysis.dateVibrationInfo
                            .unfavorable_for
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="vibration-fallback">
                  <p>
                    La vibration {analysisResult.dateVibration} influence
                    l'énergie de cette date.
                  </p>
                </div>
              )}
            </div>

            <div className="results-actions">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setDate("");
                    setAnalysisResult(null);
                    setError(null);
                  } else {
                    onNavigate("home");
                  }
                }}
                className="btn-secondary"
              >
                {isAuthenticated
                  ? "Enregistrer l'analyse"
                  : "Retour à l'accueil"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DateAnalyzerSection;
