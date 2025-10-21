import React, { useState } from "react";
import "./CompatibilityAnalyzerSection.css";
import { useAuth } from "../../hooks/useAuth";
import {
  calculateCompatibility,
  type PersonInfo,
  type RelationshipType,
  type CompatibilityResult,
} from "../../utils/numerology/compatibility";
import compatibilityData from "../../data/numerology/Compatibility/compatibilityData.json";
import relationshipTypesData from "../../data/numerology/Compatibility/relationshipTypes.json";
import LoveTab from "./tabs/LoveTab";
import FriendshipTab from "./tabs/FriendshipTab";
import WorkTab from "./tabs/WorkTab";

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

            {/* Contenu de l'analyse */}
            <div className="tab-content">
              {relationshipType === "love" && (
                <LoveTab
                  person1={person1}
                  person2={person2}
                  analysisResult={analysisResult}
                  relationshipType={relationshipType}
                />
              )}
              {relationshipType === "friendship" && (
                <FriendshipTab
                  person1={person1}
                  person2={person2}
                  analysisResult={analysisResult}
                  relationshipType={relationshipType}
                  getScoreLevel={getScoreLevel}
                />
              )}
              {relationshipType === "work" && (
                <WorkTab
                  person1={person1}
                  person2={person2}
                  analysisResult={analysisResult}
                  relationshipType={relationshipType}
                  getScoreLevel={getScoreLevel}
                />
              )}
            </div>

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
