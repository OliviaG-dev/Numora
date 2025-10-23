import React from "react";
import type { CompatibilityTabProps } from "../shared/types";
import "./LoveTab.css";

const LoveTab: React.FC<CompatibilityTabProps> = ({
  person1,
  person2,
  analysisResult,
}) => {
  // Vérifications de sécurité pour éviter les erreurs
  if (!person1 || !person2 || !analysisResult) {
    return <div>Données en cours de chargement...</div>;
  }

  // Helper function pour formater les noms en toute sécurité
  const formatName = (name: string) => {
    if (!name || name.trim() === "") return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Fonction locale pour calculer le chemin de vie (évite les problèmes d'import)
  const calculateLifePathNumberLocal = (birthDate: string): number => {
    try {
      if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
        return 0;
      }

      // Additionner tous les chiffres de la date
      const digits = birthDate.replace(/-/g, "").split("").map(Number);
      const sum = digits.reduce((acc, val) => acc + val, 0);

      // Réduire à un chiffre (en préservant les nombres maîtres)
      const reduceToSingleDigit = (num: number): number => {
        if (num === 11 || num === 22 || num === 33) return num;
        if (num < 10) return num;
        const digitSum = num
          .toString()
          .split("")
          .map(Number)
          .reduce((a, b) => a + b, 0);
        return reduceToSingleDigit(digitSum);
      };

      return reduceToSingleDigit(sum);
    } catch (error) {
      console.error("Erreur lors du calcul du chemin de vie:", error);
      return 0;
    }
  };

  return (
    <div className="love-compatibility-tab">
      {/* En-tête avec prénoms et badges */}
      <div className="love-analysis-header">
        <div className="person-info left">
          <div className="person-name">
            {formatName(person1.firstGivenName)}
          </div>
          <div className="number-badge life-path-badge">
            {calculateLifePathNumberLocal(person1.birthDate || "")}
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
            {formatName(person2.firstGivenName)}
          </div>
          <div className="number-badge life-path-badge">
            {calculateLifePathNumberLocal(person2.birthDate || "")}
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
                  La compatibilité des chemins de vie révèle comment vos destins
                  numérologiques s'harmonisent.
                </p>
                <p>
                  Chaque chemin de vie reflète votre mission et vos défis
                  personnels. Cette analyse révèle les forces et défis de votre
                  relation basés sur les vibrations numérologiques de vos dates
                  de naissance.
                </p>
              </div>
            </div>
          </div>
          <div className="compatibility-description">
            <p>
              {analysisResult.compatibility?.lifePathCompatibility
                ?.description || "Description de compatibilité non disponible"}
            </p>
          </div>
        </div>

        {/* Forces et Défis - sur la même ligne */}
        <div className="forces-challenges-container">
          {/* Forces */}
          {analysisResult.strengths &&
            Array.isArray(analysisResult.strengths) &&
            analysisResult.strengths.length > 0 && (
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
                    <div key={index} className="analysis-item strengths-item">
                      <p>{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Défis */}
          {analysisResult.challenges &&
            Array.isArray(analysisResult.challenges) &&
            analysisResult.challenges.length > 0 && (
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
                    <div key={index} className="analysis-item challenges-item">
                      <p>{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        {/* Recommandations */}
        {analysisResult.recommendations &&
          Array.isArray(analysisResult.recommendations) &&
          analysisResult.recommendations.length > 0 && (
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
                {analysisResult.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="analysis-item recommendation-item"
                  >
                    <p>{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </div>

      {/* Section Nombre d'Union */}
      {analysisResult.unionNumber && analysisResult.unionNumber.detail && (
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
                      <circle cx="12" cy="8" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="tooltip-content">
                    <p>
                      Le nombre d'union est le résultat de l'addition de vos
                      deux chemins de vie, réduit à un chiffre de 1 à 9, 11, 22
                      ou 33.
                    </p>
                    <p>
                      Ce nombre révèle l'essence énergétique de votre couple et
                      les vibrations particulières qui unissent votre relation.
                      Il indique le type d'énergie que vous créez ensemble.
                    </p>
                  </div>
                </div>
              </div>
              <div className="union-number-badge-container">
                <div className="number-badge union-number-badge">
                  {analysisResult.unionNumber?.unionNumber || 0}
                </div>
              </div>
            </div>
            <div className="compatibility-description">
              <h5 className="golden-title">
                {analysisResult.unionNumber?.detail?.title ||
                  "Titre non disponible"}
              </h5>
              <p>
                {analysisResult.unionNumber?.detail?.description ||
                  "Description non disponible"}
              </p>
            </div>
          </div>

          {/* Forces et Défis de l'union - sur la même ligne */}
          <div className="forces-challenges-container">
            {/* Forces de l'union */}
            {analysisResult.unionNumber?.detail?.strengths && (
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
                    <p>{analysisResult.unionNumber?.detail?.strengths || ""}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Défis de l'union */}
            {analysisResult.unionNumber?.detail?.challenges && (
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
                      {analysisResult.unionNumber?.detail?.challenges || ""}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Conseil pour l'union */}
          {analysisResult.unionNumber?.detail?.advice && (
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
                  <p>{analysisResult.unionNumber?.detail?.advice || ""}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Nombres d'Expression */}
      {analysisResult.expressionNumbers &&
        analysisResult.expressionNumbers.detail && (
          <>
            {/* En-tête avec badges d'expression */}
            <div className="love-analysis-header">
              <div className="person-info">
                <div className="person-name">
                  {formatName(person1.firstGivenName)}
                </div>
                <div className="number-badge expression-badge">
                  {analysisResult.expressionNumbers.expression1}
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
                <h3>Compatibilité des Expressions</h3>
              </div>
              <div className="person-info">
                <div className="person-name">
                  {formatName(person2.firstGivenName)}
                </div>
                <div className="number-badge expression-badge">
                  {analysisResult.expressionNumbers.expression2}
                </div>
              </div>
            </div>

            <div className="love-compatibility-detail">
              <div className="compatibility-description-section">
                <div className="title-with-tooltip">
                  <h4>Compatibilité des Nombres d'Expression</h4>
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
                        Les nombres d'expression révèlent comment vous
                        communiquez et vous exprimez au quotidien.
                      </p>
                      <p>
                        Calculés à partir de vos noms complets, ils montrent
                        votre style de communication et comment vous
                        interagissez dans votre relation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="compatibility-description">
                  <h5 className="golden-title">
                    {analysisResult.expressionNumbers.detail.relation_theme}
                  </h5>
                  <p>
                    {
                      analysisResult.expressionNumbers.detail.dynamic
                        .how_they_connect
                    }
                  </p>
                </div>

                <div className="expression-tags">
                  <div className="vibration-tag">
                    {analysisResult.expressionNumbers.detail.vibration}
                  </div>
                  <div className="connection-type-tag">
                    {analysisResult.expressionNumbers.detail.connection_type}
                  </div>
                </div>
              </div>

              {/* Dynamique de la relation */}
              <div className="expression-dynamics">
                <div className="dynamic-card">
                  <div className="dynamic-icon">
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
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <h4>Langage émotionnel</h4>
                  <p>
                    {
                      analysisResult.expressionNumbers.detail.dynamic
                        .emotional_language
                    }
                  </p>
                </div>

                <div className="dynamic-card">
                  <div className="dynamic-icon">
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
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h4>Chimie relationnelle</h4>
                  <p>
                    {analysisResult.expressionNumbers.detail.dynamic.chemistry}
                  </p>
                </div>

                <div className="dynamic-card">
                  <div className="dynamic-icon">
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
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <h4>Potentiel de croissance</h4>
                  <p>
                    {
                      analysisResult.expressionNumbers.detail.dynamic
                        .growth_potential
                    }
                  </p>
                </div>
              </div>

              {/* Forces et Défis de l'expression */}
              <div className="forces-challenges-container">
                {analysisResult.expressionNumbers.detail.strengths &&
                  analysisResult.expressionNumbers.detail.strengths.length >
                    0 && (
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
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        Forces de votre expression commune
                      </h3>
                      <div className="love-analysis-content">
                        {analysisResult.expressionNumbers.detail.strengths.map(
                          (strength, index) => (
                            <div
                              key={index}
                              className="analysis-item strengths-item"
                            >
                              <p>{strength}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {analysisResult.expressionNumbers.detail.challenges &&
                  analysisResult.expressionNumbers.detail.challenges.length >
                    0 && (
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
                        Défis de communication
                      </h3>
                      <div className="love-analysis-content">
                        {analysisResult.expressionNumbers.detail.challenges.map(
                          (challenge, index) => (
                            <div
                              key={index}
                              className="analysis-item challenges-item"
                            >
                              <p>{challenge}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Conseil pour l'expression */}
              {analysisResult.expressionNumbers.detail.tips_for_balance && (
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
                    Conseils pour équilibrer votre communication
                  </h3>
                  <div className="love-analysis-content">
                    <div className="analysis-item recommendation-item">
                      <p>
                        {
                          analysisResult.expressionNumbers.detail
                            .tips_for_balance
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

      {/* Section Nombres du Cœur */}
      {analysisResult.heartNumbers && analysisResult.heartNumbers.detail && (
        <>
          {/* En-tête avec badges du cœur */}
          <div className="love-analysis-header">
            <div className="person-info">
              <div className="person-name">
                {formatName(person1.firstGivenName)}
              </div>
              <div className="number-badge heart-number-love-badge">
                {analysisResult.heartNumbers.heart1}
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
              <h3>Compatibilité des Cœurs</h3>
            </div>
            <div className="person-info">
              <div className="person-name">
                {formatName(person2.firstGivenName)}
              </div>
              <div className="number-badge heart-number-love-badge">
                {analysisResult.heartNumbers.heart2}
              </div>
            </div>
          </div>

          <div className="love-compatibility-detail">
            <div className="compatibility-description-section">
              <div className="title-with-tooltip">
                <h4>Compatibilité des Nombres du Cœur</h4>
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
                      Les nombres du cœur révèlent vos besoins émotionnels
                      profonds et votre langage de l'amour.
                    </p>
                    <p>
                      Calculés à partir des voyelles de vos noms, ils montrent
                      comment vous aimez, ce dont vous avez besoin
                      émotionnellement, et votre style affectif naturel.
                    </p>
                  </div>
                </div>
              </div>

              <div className="compatibility-description">
                <h5 className="golden-title">
                  {analysisResult.heartNumbers.detail.emotional_theme}
                </h5>
                <p>{analysisResult.heartNumbers.detail.connection_style}</p>
              </div>

              {/* Besoins émotionnels des deux partenaires */}
              <div className="expression-dynamics">
                <div className="dynamic-card">
                  <div className="dynamic-icon">
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
                  </div>
                  <h4>{formatName(person1.firstGivenName)} a besoin de</h4>
                  <p>
                    {
                      analysisResult.heartNumbers.detail.emotional_needs
                        .partner_1
                    }
                  </p>
                </div>

                <div className="dynamic-card">
                  <div className="dynamic-icon">
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
                  </div>
                  <h4>{formatName(person2.firstGivenName)} a besoin de</h4>
                  <p>
                    {
                      analysisResult.heartNumbers.detail.emotional_needs
                        .partner_2
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Forces et Défis émotionnels */}
            <div className="forces-challenges-container">
              {analysisResult.heartNumbers.detail.strengths &&
                analysisResult.heartNumbers.detail.strengths.length > 0 && (
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
                      Forces de votre connexion émotionnelle
                    </h3>
                    <div className="love-analysis-content">
                      {analysisResult.heartNumbers.detail.strengths.map(
                        (strength, index) => (
                          <div
                            key={index}
                            className="analysis-item strengths-item"
                          >
                            <p>{strength}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {analysisResult.heartNumbers.detail.challenges &&
                analysisResult.heartNumbers.detail.challenges.length > 0 && (
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
                      Défis émotionnels
                    </h3>
                    <div className="love-analysis-content">
                      {analysisResult.heartNumbers.detail.challenges.map(
                        (challenge, index) => (
                          <div
                            key={index}
                            className="analysis-item challenges-item"
                          >
                            <p>{challenge}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Conseil pour la croissance émotionnelle */}
            {analysisResult.heartNumbers.detail.growth_advice && (
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
                  Conseils pour votre évolution émotionnelle
                </h3>
                <div className="love-analysis-content">
                  <div className="analysis-item recommendation-item">
                    <p>{analysisResult.heartNumbers.detail.growth_advice}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LoveTab;
