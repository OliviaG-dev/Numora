import React, { useState } from "react";
import "./CompatibilityAnalyzerSection.css";
import { useAuth } from "../../hooks/useAuth";
import {
  calculateCompatibility,
  calculateLifePathNumber,
  type PersonInfo,
  type RelationshipType,
  type CompatibilityResult,
} from "../../utils/numerology/compatibility";
import compatibilityData from "../../data/numerology/Compatibility/compatibilityData.json";
import relationshipTypesData from "../../data/numerology/Compatibility/relationshipTypes.json";

// Types pour les données importées
interface RelationshipTypeData {
  label: string;
  icon: string;
  description: string;
}

import type { NavigateFunction } from "../../types/navigation";

interface CompatibilityAnalyzerSectionProps {
  onNavigate: NavigateFunction;
}

const CompatibilityAnalyzerSection: React.FC<
  CompatibilityAnalyzerSectionProps
> = ({ onNavigate }) => {
  const { isAuthenticated } = useAuth();
  const [person1, setPerson1] = useState<PersonInfo>({
    firstGivenName: "",
    secondGivenName: "",
    thirdGivenName: "",
    familyName: "",
    birthDate: "",
  });
  const [person2, setPerson2] = useState<PersonInfo>({
    firstGivenName: "",
    secondGivenName: "",
    thirdGivenName: "",
    familyName: "",
    birthDate: "",
  });
  const [relationshipType, setRelationshipType] =
    useState<RelationshipType>("love");
  const [analysisResult, setAnalysisResult] =
    useState<CompatibilityResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePerson1Change = (field: keyof PersonInfo, value: string) => {
    setPerson1((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setAnalysisResult(null);
  };

  const handlePerson2Change = (field: keyof PersonInfo, value: string) => {
    setPerson2((prev) => ({ ...prev, [field]: value }));
    setError(null);
    setAnalysisResult(null);
  };

  const handleRelationshipChange = (type: RelationshipType) => {
    setRelationshipType(type);
    setError(null);
    setAnalysisResult(null);
  };

  const validateForm = (): boolean => {
    if (
      !person1.firstGivenName.trim() ||
      !person1.familyName.trim() ||
      !person1.birthDate
    ) {
      setError(
        "Veuillez remplir au moins le prénom, nom de famille et date de naissance de la première personne"
      );
      return false;
    }
    if (
      !person2.firstGivenName.trim() ||
      !person2.familyName.trim() ||
      !person2.birthDate
    ) {
      setError(
        "Veuillez remplir au moins le prénom, nom de famille et date de naissance de la deuxième personne"
      );
      return false;
    }
    return true;
  };

  const analyzeCompatibility = async () => {
    if (!validateForm()) return;

    try {
      setIsAnalyzing(true);
      setError(null);

      // Délai pour voir le message de chargement
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const result = calculateCompatibility(person1, person2, relationshipType);
      setAnalysisResult(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'analyse de compatibilité"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !isAnalyzing) {
      const isFormValid =
        person1.firstGivenName.trim() &&
        person1.familyName.trim() &&
        person1.birthDate &&
        person2.firstGivenName.trim() &&
        person2.familyName.trim() &&
        person2.birthDate;

      if (isFormValid) {
        analyzeCompatibility();
      }
    }
  };

  const getScoreLevel = (score: number) => {
    const levels = {
      excellent: {
        minScore: 85,
        label: "Excellente",
        description: "Une compatibilité exceptionnelle",
        color: "#10b981",
      },
      veryGood: {
        minScore: 70,
        label: "Très bonne",
        description: "Une très bonne compatibilité",
        color: "#059669",
      },
      good: {
        minScore: 55,
        label: "Bonne",
        description: "Une bonne compatibilité",
        color: "#0891b2",
      },
      moderate: {
        minScore: 40,
        label: "Modérée",
        description: "Une compatibilité modérée",
        color: "#d97706",
      },
      challenging: {
        minScore: 0,
        label: "Défiante",
        description: "Une relation qui demande des efforts",
        color: "#dc2626",
      },
    };

    if (score >= levels.excellent.minScore) return levels.excellent;
    if (score >= levels.veryGood.minScore) return levels.veryGood;
    if (score >= levels.good.minScore) return levels.good;
    if (score >= levels.moderate.minScore) return levels.moderate;
    return levels.challenging;
  };

  const getRelationshipInfo = (): RelationshipTypeData => {
    const typesData = relationshipTypesData as {
      [key: string]: RelationshipTypeData;
    };
    return typesData[relationshipType] || typesData.friendship;
  };

  return (
    <section className="compatibility-analyzer-section">
      <div className="analyzer-container">
        <div className="analyzer-header">
          <h1>Analyse de Compatibilité</h1>
          <p className="analyzer-subtitle">
            Découvrez votre compatibilité numérologique avec une autre personne
          </p>
        </div>

        <div className="analyzer-form" onKeyDown={handleKeyDown}>
          {!isAuthenticated && (
            <div className="auth-warning">
              <div className="warning-content">
                <p className="warning-message">
                  Pour garder vos analyses sous la main et accéder à toutes les
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

          {/* Type de relation */}
          <div className="form-group">
            <label>Type de relation :</label>
            <div className="relationship-buttons">
              {["friendship", "love", "work"].map((key) => {
                const typeData = compatibilityData.relationshipTypes[
                  key as keyof typeof compatibilityData.relationshipTypes
                ] as RelationshipTypeData;
                return (
                  <button
                    key={key}
                    className={`relationship-button relationship-button-${key} ${
                      relationshipType === key ? "active" : ""
                    }`}
                    onClick={() =>
                      handleRelationshipChange(key as RelationshipType)
                    }
                  >
                    <span
                      className={`relationship-icon relationship-icon-${key}`}
                    >
                      {typeData.icon === "heart" ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                        </svg>
                      ) : typeData.icon === "friendship" ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      ) : (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                          <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                          <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                          <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                          <rect width="7" height="5" x="9" y="12" rx="1" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`relationship-label relationship-label-${key}`}
                    >
                      {typeData.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formulaire double */}
          <div className="persons-form">
            <div className="person-form">
              <h3>Première personne</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person1-firstName">Premier prénom *</label>
                  <input
                    id="person1-firstName"
                    type="text"
                    value={person1.firstGivenName}
                    onChange={(e) =>
                      handlePerson1Change("firstGivenName", e.target.value)
                    }
                    placeholder="Premier prénom"
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="person1-secondName">Deuxième prénom</label>
                  <input
                    id="person1-secondName"
                    type="text"
                    value={person1.secondGivenName || ""}
                    onChange={(e) =>
                      handlePerson1Change("secondGivenName", e.target.value)
                    }
                    placeholder="Deuxième prénom (optionnel)"
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person1-thirdName">Troisième prénom</label>
                  <input
                    id="person1-thirdName"
                    type="text"
                    value={person1.thirdGivenName || ""}
                    onChange={(e) =>
                      handlePerson1Change("thirdGivenName", e.target.value)
                    }
                    placeholder="Troisième prénom (optionnel)"
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="person1-familyName">Nom de famille *</label>
                  <input
                    id="person1-familyName"
                    type="text"
                    value={person1.familyName}
                    onChange={(e) =>
                      handlePerson1Change("familyName", e.target.value)
                    }
                    placeholder="Nom de famille"
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person1-date">Date de naissance *</label>
                  <input
                    id="person1-date"
                    type="date"
                    value={person1.birthDate}
                    onChange={(e) =>
                      handlePerson1Change("birthDate", e.target.value)
                    }
                    className="date-input"
                    max="2100-12-31"
                    min="1900-01-01"
                  />
                </div>
              </div>
            </div>

            <div className="vs-divider">
              <span className="vs-text">VS</span>
            </div>

            <div className="person-form">
              <h3>Deuxième personne</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person2-firstName">Premier prénom *</label>
                  <input
                    id="person2-firstName"
                    type="text"
                    value={person2.firstGivenName}
                    onChange={(e) =>
                      handlePerson2Change("firstGivenName", e.target.value)
                    }
                    placeholder="Premier prénom"
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="person2-secondName">Deuxième prénom</label>
                  <input
                    id="person2-secondName"
                    type="text"
                    value={person2.secondGivenName || ""}
                    onChange={(e) =>
                      handlePerson2Change("secondGivenName", e.target.value)
                    }
                    placeholder="Deuxième prénom (optionnel)"
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person2-thirdName">Troisième prénom</label>
                  <input
                    id="person2-thirdName"
                    type="text"
                    value={person2.thirdGivenName || ""}
                    onChange={(e) =>
                      handlePerson2Change("thirdGivenName", e.target.value)
                    }
                    placeholder="Troisième prénom (optionnel)"
                    className="text-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="person2-familyName">Nom de famille *</label>
                  <input
                    id="person2-familyName"
                    type="text"
                    value={person2.familyName}
                    onChange={(e) =>
                      handlePerson2Change("familyName", e.target.value)
                    }
                    placeholder="Nom de famille"
                    className="text-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="person2-date">Date de naissance *</label>
                  <input
                    id="person2-date"
                    type="date"
                    value={person2.birthDate}
                    onChange={(e) =>
                      handlePerson2Change("birthDate", e.target.value)
                    }
                    className="date-input"
                    max="2100-12-31"
                    min="1900-01-01"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={analyzeCompatibility}
            disabled={
              isAnalyzing ||
              !person1.firstGivenName ||
              !person1.familyName ||
              !person1.birthDate ||
              !person2.firstGivenName ||
              !person2.familyName ||
              !person2.birthDate
            }
            className="analyze-button"
          >
            {isAnalyzing ? "Analyse en cours..." : "Analyser la compatibilité"}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </span>
            {error}
          </div>
        )}

        {analysisResult && (
          <div className="analysis-results">
            <div className="results-header">
              <h2>Résultats de compatibilité</h2>
              <p className="relationship-context">
                {getRelationshipInfo().description}
              </p>
            </div>

            {/* Score global - masqué pour l'amour */}
            {relationshipType !== "love" && (
              <div className="compatibility-score">
                <div className="score-header">
                  <div
                    className="score-badge"
                    style={{
                      color: getScoreLevel(analysisResult.overallScore).color,
                    }}
                  >
                    {analysisResult.overallScore}%
                  </div>
                  <h3>{getScoreLevel(analysisResult.overallScore).label}</h3>
                  <p>
                    {getScoreLevel(analysisResult.overallScore).description}
                  </p>
                </div>
              </div>
            )}

            {/* Détails de compatibilité */}
            {relationshipType === "love" ? (
              <div className="compatibility-details">
                {/* En-tête avec prénoms et badges */}
                <div className="love-analysis-header">
                  <div className="person-info left">
                    <div className="person-name">
                      {person1.firstGivenName.charAt(0).toUpperCase() +
                        person1.firstGivenName.slice(1).toLowerCase()}
                    </div>
                    <div className="number-badge life-path-badge">
                      {calculateLifePathNumber(person1.birthDate)}
                    </div>
                  </div>
                  <div className="vs-separator">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ opacity: 0.8 }}
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                    </svg>
                    <h3>Analyse de compatibilité amoureuse</h3>
                  </div>
                  <div className="person-info right">
                    <div className="person-name">
                      {person2.firstGivenName.charAt(0).toUpperCase() +
                        person2.firstGivenName.slice(1).toLowerCase()}
                    </div>
                    <div className="number-badge life-path-badge">
                      {calculateLifePathNumber(person2.birthDate)}
                    </div>
                  </div>
                </div>
                <div className="love-compatibility-detail">
                  <div className="compatibility-description-section">
                    <div className="title-with-tooltip">
                      <h4>Compatibilité des Chemins de Vie</h4>
                      <div className="tooltip">
                        <span className="tooltip-icon">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M12 16V12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <circle cx="12" cy="8" r="1" fill="currentColor" />
                          </svg>
                        </span>
                        <div className="tooltip-content">
                          <p>
                            La compatibilité des chemins de vie révèle comment
                            vos destins numérologiques s'harmonisent.
                          </p>
                          <p>
                            Chaque chemin de vie reflète votre mission et vos
                            défis personnels. Cette analyse révèle les forces et
                            défis de votre relation basés sur les vibrations
                            numérologiques de vos dates de naissance.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="compatibility-description">
                      <p>
                        {
                          analysisResult.compatibility.lifePathCompatibility
                            .description
                        }
                      </p>
                    </div>
                  </div>

                  {/* Forces et Défis - sur la même ligne */}
                  <div className="forces-challenges-container">
                    {/* Forces */}
                    {analysisResult.strengths.length > 0 && (
                      <div className="love-analysis-section strengths-section-love">
                        <h3>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                          </svg>
                          Forces de cette relation amoureuse
                        </h3>
                        <div className="love-analysis-content">
                          {analysisResult.strengths.map((strength, index) => (
                            <div
                              key={index}
                              className="analysis-item strengths-item"
                            >
                              <p>{strength}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Défis */}
                    {analysisResult.challenges.length > 0 && (
                      <div className="love-analysis-section challenges-section-love">
                        <h3>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              marginRight: "8px",
                              verticalAlign: "middle",
                            }}
                          >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          Points d'attention dans votre couple
                        </h3>
                        <div className="love-analysis-content">
                          {analysisResult.challenges.map((challenge, index) => (
                            <div
                              key={index}
                              className="analysis-item challenges-item"
                            >
                              <p>{challenge}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Recommandations */}
                  {analysisResult.recommendations.length > 0 && (
                    <div className="love-analysis-section recommendations-section-love">
                      <h3>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            marginRight: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" />
                          <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                        </svg>
                        Conseils pour votre relation
                      </h3>
                      <div className="love-analysis-content">
                        {analysisResult.recommendations.map(
                          (recommendation, index) => (
                            <div
                              key={index}
                              className="analysis-item recommendation-item"
                            >
                              <p>{recommendation}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Section Nombre d'Union */}
                {analysisResult.unionNumber &&
                  analysisResult.unionNumber.detail && (
                    <div className="love-compatibility-detail">
                      <div className="compatibility-description-section">
                        <div className="union-number-header">
                          <div className="title-with-tooltip">
                            <h4>Nombre d'Union</h4>
                            <div className="tooltip">
                              <span className="tooltip-icon">
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    fill="none"
                                  />
                                  <path
                                    d="M12 16V12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                  <circle
                                    cx="12"
                                    cy="8"
                                    r="1"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                              <div className="tooltip-content">
                                <p>
                                  Le nombre d'union est le résultat de
                                  l'addition de vos deux chemins de vie, réduit
                                  à un chiffre de 1 à 9, 11, 22 ou 33.
                                </p>
                                <p>
                                  Ce nombre révèle l'essence énergétique de
                                  votre couple et les vibrations particulières
                                  qui unissent votre relation. Il indique le
                                  type d'énergie que vous créez ensemble.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="union-number-badge-container">
                            <div className="number-badge union-number-badge">
                              {analysisResult.unionNumber.unionNumber}
                            </div>
                          </div>
                        </div>
                        <div className="compatibility-description">
                          <h5 className="union-title">
                            {analysisResult.unionNumber.detail.title}
                          </h5>
                          <p>{analysisResult.unionNumber.detail.description}</p>
                        </div>
                      </div>

                      {/* Forces et Défis de l'union - sur la même ligne */}
                      <div className="forces-challenges-container">
                        {/* Forces de l'union */}
                        {analysisResult.unionNumber.detail.strengths && (
                          <div className="love-analysis-section strengths-section-love">
                            <h3>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                }}
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
                              </svg>
                              Forces de cette relation amoureuse
                            </h3>
                            <div className="love-analysis-content">
                              <div className="analysis-item strengths-item">
                                <p>
                                  {analysisResult.unionNumber.detail.strengths}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Défis de l'union */}
                        {analysisResult.unionNumber.detail.challenges && (
                          <div className="love-analysis-section challenges-section-love">
                            <h3>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                style={{
                                  marginRight: "8px",
                                  verticalAlign: "middle",
                                }}
                              >
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <path d="M12 9v4" />
                                <path d="M12 17h.01" />
                              </svg>
                              Points d'attention dans votre couple
                            </h3>
                            <div className="love-analysis-content">
                              <div className="analysis-item challenges-item">
                                <p>
                                  {analysisResult.unionNumber.detail.challenges}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Conseil pour l'union */}
                      {analysisResult.unionNumber.detail.advice && (
                        <div className="love-analysis-section recommendations-section-love">
                          <h3>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                marginRight: "8px",
                                verticalAlign: "middle",
                              }}
                            >
                              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" />
                              <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                            </svg>
                            Conseils pour votre relation
                          </h3>
                          <div className="love-analysis-content">
                            <div className="analysis-item recommendation-item">
                              <p>{analysisResult.unionNumber.detail.advice}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            ) : (
              <div className="compatibility-details">
                <h3>Analyse détaillée</h3>
                <div className="compatibility-grid">
                  <div className="compatibility-item">
                    <h4>Chemin de Vie</h4>
                    <div className="compatibility-score-bar">
                      <div
                        className="score-fill"
                        style={{
                          width: `${analysisResult.compatibility.lifePathCompatibility.score}%`,
                          backgroundColor: getScoreLevel(
                            analysisResult.compatibility.lifePathCompatibility
                              .score
                          ).color,
                        }}
                      />
                      <span className="score-text">
                        {
                          analysisResult.compatibility.lifePathCompatibility
                            .score
                        }
                        %
                      </span>
                    </div>
                    <p>
                      {
                        analysisResult.compatibility.lifePathCompatibility
                          .description
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Forces et défis pour les autres types */}
            {relationshipType !== "love" &&
              (analysisResult.strengths.length > 0 ||
                analysisResult.challenges.length > 0) && (
                <div className="strengths-challenges">
                  {analysisResult.strengths.length > 0 && (
                    <div className="strengths-section">
                      <h3>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            marginRight: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <path d="m9 11 3 3L22 4" />
                        </svg>
                        Forces de cette relation
                      </h3>
                      <ul>
                        {analysisResult.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {analysisResult.challenges.length > 0 && (
                    <div className="challenges-section">
                      <h3>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            marginRight: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6" />
                          <path d="M12 17h.01" />
                        </svg>
                        Points d'attention
                      </h3>
                      <ul>
                        {analysisResult.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            {/* Recommandations pour les autres types */}
            {relationshipType !== "love" &&
              analysisResult.recommendations.length > 0 && (
                <div className="recommendations">
                  <h3>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: "8px", verticalAlign: "middle" }}
                    >
                      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" />
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
                    </svg>
                    Recommandations
                  </h3>
                  <ul>
                    {analysisResult.recommendations.map(
                      (recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

            <div className="results-actions">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setPerson1({
                      firstGivenName: "",
                      secondGivenName: "",
                      thirdGivenName: "",
                      familyName: "",
                      birthDate: "",
                    });
                    setPerson2({
                      firstGivenName: "",
                      secondGivenName: "",
                      thirdGivenName: "",
                      familyName: "",
                      birthDate: "",
                    });
                    setAnalysisResult(null);
                    setError(null);
                  } else {
                    onNavigate("home");
                  }
                }}
                className="btn-secondary"
              >
                {isAuthenticated ? "Nouvelle analyse" : "Retour à l'accueil"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CompatibilityAnalyzerSection;
