import React from "react";
import type { CompatibilityTabProps } from "../shared/types";
import "./WorkTab.css";

interface WorkTabProps extends CompatibilityTabProps {
  getScoreLevel: (score: number) => {
    minScore: number;
    label: string;
    description: string;
    color: string;
  };
}

const WorkTab: React.FC<WorkTabProps> = ({ analysisResult, getScoreLevel }) => {
  return (
    <div className="work-compatibility-tab">
      {/* Score global */}
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
          <p>{getScoreLevel(analysisResult.overallScore).description}</p>
        </div>
      </div>

      {/* Détails de compatibilité */}
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
                    analysisResult.compatibility.lifePathCompatibility.score
                  ).color,
                }}
              />
              <span className="score-text">
                {analysisResult.compatibility.lifePathCompatibility.score}%
              </span>
            </div>
            <p>
              {analysisResult.compatibility.lifePathCompatibility.description}
            </p>
          </div>
        </div>
      </div>

      {/* Forces et défis */}
      {(analysisResult.strengths.length > 0 ||
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
                Forces de cette relation professionnelle
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

      {/* Recommandations */}
      {analysisResult.recommendations.length > 0 && (
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
            Recommandations pour votre collaboration
          </h3>
          <ul>
            {analysisResult.recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkTab;
