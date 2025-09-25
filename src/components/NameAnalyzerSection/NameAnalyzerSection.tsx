import React, { useState } from "react";
import "./NameAnalyzerSection.css";
import { useAuth } from "../../hooks/useAuth";
import { calculateBusinessNumbers } from "../../utils/numerology";
import {
  actifBusinessData,
  expressionBusinessData,
  hereditaryBusinessData,
  type ActifBusinessDetail,
  type ExpressionBusinessDetail,
  type HereditaryBusinessDetail,
} from "../../data";

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
      | "readingDetail"
  ) => void;
}

interface BusinessAnalysisResult {
  expression: {
    number: number;
    raw: number;
    data: ExpressionBusinessDetail | null;
  };
  active: {
    number: number;
    raw: number;
    data: ActifBusinessDetail | null;
  };
  hereditary: {
    number: number;
    raw: number;
    data: HereditaryBusinessDetail | null;
  };
}

const NameAnalyzerSection: React.FC<NameAnalyzerSectionProps> = ({
  onNavigate,
}) => {
  const { isAuthenticated } = useAuth();
  const [fullName, setFullName] = useState("");
  const [businessResult, setBusinessResult] =
    useState<BusinessAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setError(null);
    setBusinessResult(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      analyzeName();
    }
  };

  const analyzeName = async () => {
    if (!fullName.trim()) {
      setError("Veuillez entrer un nom complet");
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      // Délai pour voir le message de chargement
      await new Promise((resolve) => setTimeout(resolve, 1000));

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

      // Analyse business
      const businessNumbers = calculateBusinessNumbers(cleanName);

      // Récupérer les données détaillées
      const expressionData =
        expressionBusinessData[
          businessNumbers.expression.value.toString() as keyof typeof expressionBusinessData
        ] || null;
      const activeData =
        actifBusinessData[
          businessNumbers.active.value.toString() as keyof typeof actifBusinessData
        ] || null;
      const hereditaryData =
        hereditaryBusinessData[
          businessNumbers.hereditary.value.toString() as keyof typeof hereditaryBusinessData
        ] || null;

      setBusinessResult({
        expression: {
          number: businessNumbers.expression.value,
          raw: businessNumbers.expression.raw,
          data: expressionData,
        },
        active: {
          number: businessNumbers.active.value,
          raw: businessNumbers.active.raw,
          data: activeData,
        },
        hereditary: {
          number: businessNumbers.hereditary.value,
          raw: businessNumbers.hereditary.raw,
          data: hereditaryData,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'analyse");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="name-analyzer-section">
      <div className="analyzer-container">
        <div className="analyzer-header">
          <h1>Explorateur de Noms</h1>
          <p className="analyzer-subtitle">
            Découvrez les significations numérologiques cachées dans votre nom
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
            <label htmlFor="name-input">
              Entrez le nom de l'entreprise ou du projet :
            </label>
            <input
              id="name-input"
              type="text"
              value={fullName}
              onChange={handleNameChange}
              onKeyPress={handleKeyPress}
              className="name-input"
              placeholder="Ex: Apple Inc"
              maxLength={100}
            />
            <div className="input-hint">
              Saisissez le nom complet de l'entreprise (ex: "Apple Inc",
              "Microsoft Corporation") pour une analyse plus précis.
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

        {businessResult && (
          <div className="analysis-results">
            <div className="results-header">
              <h2>Résultats pour {fullName}</h2>
            </div>

            {/* Nombre d'Expression - Toujours affiché */}
            <div className="vibration-analysis">
              <div className="vibration-header">
                <div className="vibration-badge">
                  {businessResult.expression.number}
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                </div>
                <h3>
                  Nombre d'Expression
                  <span
                    className="tooltip"
                    data-tooltip="Le nombre d'expression révèle la mission principale de l'entreprise, ses objectifs et sa personnalité publique. Il est calculé à partir de toutes les lettres du nom complet et représente l'essence même de l'identité de l'entreprise."
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </span>
                </h3>
                <p className="vibration-subtitle">
                  L'énergie numérologique de ce nom d'entreprise
                </p>
              </div>

              {businessResult.expression.data ? (
                <div className="vibration-details">
                  <div className="vibration-summary">
                    <p>{businessResult.expression.data.summary}</p>
                  </div>

                  <div className="vibration-details-grid">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>
                        {businessResult.expression.data.strengths.join(", ")}
                      </p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>
                        {businessResult.expression.data.challenges.join(", ")}
                      </p>
                    </div>
                    <div className="detail-item">
                      <h4>Mission</h4>
                      <p>{businessResult.expression.data.mission}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="vibration-fallback">
                  <p>
                    Le nombre d'expression {businessResult.expression.number}{" "}
                    influence l'énergie de ce nom d'entreprise.
                  </p>
                </div>
              )}
            </div>

            {/* Affichage conditionnel des nombres Actif et Héréditaire */}
            {fullName.trim().split(" ").length > 1 && (
              <>
                {/* Nombre Actif */}
                <div className="vibration-analysis">
                  <div className="vibration-header">
                    <div className="vibration-badge">
                      {businessResult.active.number}
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                    </div>
                    <h3>
                      Nombre Actif
                      <span
                        className="tooltip"
                        data-tooltip="Le nombre actif représente l'énergie du premier mot de l'entreprise. Il révèle l'identité publique, l'image de marque et la façon dont l'entreprise se présente au monde. C'est l'énergie qui guide les premières impressions et l'approche commerciale."
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </span>
                    </h3>
                    <p className="vibration-subtitle">
                      L'énergie du premier mot de l'entreprise
                    </p>
                  </div>

                  {businessResult.active.data ? (
                    <div className="vibration-details">
                      <div className="vibration-summary">
                        <p>{businessResult.active.data.summary}</p>
                      </div>

                      <div className="vibration-details-grid">
                        <div className="detail-item">
                          <h4>Forces</h4>
                          <p>
                            {businessResult.active.data.strengths.join(", ")}
                          </p>
                        </div>
                        <div className="detail-item">
                          <h4>Défis</h4>
                          <p>
                            {businessResult.active.data.challenges.join(", ")}
                          </p>
                        </div>
                        <div className="detail-item">
                          <h4>Mission</h4>
                          <p>{businessResult.active.data.mission}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="vibration-fallback">
                      <p>
                        Le nombre actif {businessResult.active.number} influence
                        l'énergie du premier mot.
                      </p>
                    </div>
                  )}
                </div>

                {/* Nombre Héréditaire */}
                <div className="vibration-analysis">
                  <div className="vibration-header">
                    <div className="vibration-badge">
                      {businessResult.hereditary.number}
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                      <span className="star">✦</span>
                      <span className="star">✧</span>
                    </div>
                    <h3>
                      Nombre Héréditaire
                      <span
                        className="tooltip"
                        data-tooltip="Le nombre héréditaire représente l'énergie du dernier mot de l'entreprise. Il révèle l'héritage, la tradition, la stabilité et les fondations sur lesquelles l'entreprise s'appuie. C'est l'énergie qui apporte la solidité et la continuité à l'entreprise."
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </span>
                    </h3>
                    <p className="vibration-subtitle">
                      L'énergie du dernier mot de l'entreprise
                    </p>
                  </div>

                  {businessResult.hereditary.data ? (
                    <div className="vibration-details">
                      <div className="vibration-summary">
                        <p>{businessResult.hereditary.data.summary}</p>
                      </div>

                      <div className="vibration-details-grid">
                        <div className="detail-item">
                          <h4>Forces</h4>
                          <p>
                            {businessResult.hereditary.data.strengths.join(
                              ", "
                            )}
                          </p>
                        </div>
                        <div className="detail-item">
                          <h4>Défis</h4>
                          <p>
                            {businessResult.hereditary.data.challenges.join(
                              ", "
                            )}
                          </p>
                        </div>
                        <div className="detail-item">
                          <h4>Mission</h4>
                          <p>{businessResult.hereditary.data.mission}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="vibration-fallback">
                      <p>
                        Le nombre héréditaire {businessResult.hereditary.number}{" "}
                        influence l'énergie du dernier mot.
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="results-actions">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setFullName("");
                    setBusinessResult(null);
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

export default NameAnalyzerSection;
