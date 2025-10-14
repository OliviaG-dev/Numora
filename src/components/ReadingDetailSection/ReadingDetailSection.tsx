import React, { useState, useEffect, useCallback } from "react";
import "./ReadingDetailSection.css";
import { useAuth } from "../../hooks/useAuth";
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
  calculateLifeCycles,
  calculateRealizationPeriods,
  calculatePersonalNumbers,
  calculateKarmicNumbers,
  calculateCycleKarmicNumbers,
  calculateKarmicDebts,
  type KarmicDebtResult,
} from "../../utils/numerology";
import MatrixTab from "./tabs/MatrixTab";
import BasiquesTab from "./tabs/BasiquesTab";
import DatesTab from "./tabs/DatesTab";
import KarmiqueTab from "./tabs/KarmiqueTab";
import ArbreTab from "./tabs/ArbreTab";
import {
  lifePathData,
  expressionData,
  soulUrgeData,
  personalityData,
  birthdayData,
  lifeCycleData,
  realizationPeriodData,
  personelCycleData,
} from "../../data";
import type {
  LifePathDetail,
  ExpressionDetail,
  LifeCycleDetail,
  RealizationPeriodDetail,
  PersonelCycleDetail,
} from "../../data";
import type { NavigateFunction, ReadingData } from "../../types/navigation";

interface ReadingDetailSectionProps {
  onNavigate: NavigateFunction;
  readingData?: ReadingData;
}

const ReadingDetailSection: React.FC<ReadingDetailSectionProps> = ({
  onNavigate,
  readingData,
}) => {
  // Utiliser le contexte d'authentification Supabase
  const { isAuthenticated } = useAuth();
  // État pour la navigation par onglets
  const [activeTab, setActiveTab] = useState<string>("basiques");

  const [numerologyResults, setNumerologyResults] = useState<{
    lifePath: { number: number; info: LifePathDetail | undefined };
    expression: { number: number; info: ExpressionDetail | undefined };
    soulUrge: { number: number; info: string[] | undefined };
    personality: { number: number; info: string[] | undefined };
    birthday: { number: number; info: string[] | undefined };
    challenges: {
      first: { number: number; description: string };
      second: { number: number; description: string };
      third: { number: number; description: string };
      fourth: { number: number; description: string };
    };
    lifeCycles: {
      firstCycle: { number: number; info: LifeCycleDetail | undefined };
      secondCycle: { number: number; info: LifeCycleDetail | undefined };
      thirdCycle: { number: number; info: LifeCycleDetail | undefined };
    };
    realizationPeriods: {
      firstPeriod: {
        number: number;
        info: RealizationPeriodDetail | undefined;
      };
      secondPeriod: {
        number: number;
        info: RealizationPeriodDetail | undefined;
      };
      thirdPeriod: {
        number: number;
        info: RealizationPeriodDetail | undefined;
      };
      fourthPeriod: {
        number: number;
        info: RealizationPeriodDetail | undefined;
      };
    };
    personalNumbers: {
      year: {
        number: number;
        info: PersonelCycleDetail | undefined;
      };
      month: {
        number: number;
        info: PersonelCycleDetail | undefined;
      };
      day: {
        number: number;
        info: PersonelCycleDetail | undefined;
      };
    };
    karmicNumbers: {
      fullName: string;
      presentNumbers: number[];
      missingNumbers: number[];
      karmicDefinitions: Array<{
        number: number;
        summary: string;
        challenge: string;
        details: string;
        keywords: string[];
      }>;
    };
    cycleKarmicNumbers: {
      fullName: string;
      presentNumbers: number[];
      missingNumbers: number[];
      cycleKarmicDefinitions: Array<{
        number: number;
        summary: string;
        challenge: string;
        details: string;
        keywords: string[];
      }>;
    };
    karmicDebts: {
      lifePathDebt: KarmicDebtResult;
      expressionDebt: KarmicDebtResult;
      soulUrgeDebt: KarmicDebtResult;
      personalityDebt: KarmicDebtResult;
      birthdayDebt: KarmicDebtResult;
      allDebts: KarmicDebtResult[];
    };
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateNumerologyResults = useCallback(() => {
    if (!readingData) return;

    try {
      // Construction du nom complet
      const fullName = [
        readingData.firstGivenName,
        readingData.secondGivenName,
        readingData.thirdGivenName,
        readingData.familyName,
      ]
        .filter(Boolean)
        .join(" ");

      // Extraction des composants de date
      const [year, month, day] = readingData.birthDate.split("-").map(Number);

      // Calculs numérologiques
      const lifePathNumber = calculateLifePathNumber(readingData.birthDate);
      const expressionNumber = calculateExpressionNumber(fullName);
      const soulUrgeNumber = calculateSoulUrgeNumber(fullName);
      const personalityNumber = calculatePersonalityNumber(fullName);
      const birthdayNumber = calculateBirthdayNumber(day);
      const challengeNumbers = calculateChallengeNumbers(day, month, year);
      const lifeCyclesNumbers = calculateLifeCycles(day, month, year);
      const realizationPeriodsNumbers = calculateRealizationPeriods(
        day,
        month,
        year
      );

      // Calcul des nombres personnels
      const personalNumbers = calculatePersonalNumbers(day, month);

      // Calcul des nombres karmiques (basés sur la date de naissance)
      const karmicNumbers = calculateKarmicNumbers(readingData.birthDate);

      // Calcul des cycles karmiques (basés sur le nom complet)
      const cycleKarmicNumbers = calculateCycleKarmicNumbers(fullName);

      // Calcul des dettes karmiques
      const karmicDebts = calculateKarmicDebts(readingData.birthDate, fullName);

      // Récupération des données détaillées
      const lifePathInfo =
        lifePathData[lifePathNumber.toString() as keyof typeof lifePathData];
      const expressionInfo =
        expressionData[
          expressionNumber.toString() as keyof typeof expressionData
        ];
      const soulUrgeInfo =
        soulUrgeData[soulUrgeNumber.toString() as keyof typeof soulUrgeData];
      const personalityInfo =
        personalityData[
          personalityNumber.toString() as keyof typeof personalityData
        ];
      const birthdayInfo =
        birthdayData[birthdayNumber.toString() as keyof typeof birthdayData];

      // Récupération des données détaillées pour les cycles de vie
      const firstCycleInfo =
        lifeCycleData[
          lifeCyclesNumbers.firstCycle.toString() as keyof typeof lifeCycleData
        ];
      const secondCycleInfo =
        lifeCycleData[
          lifeCyclesNumbers.secondCycle.toString() as keyof typeof lifeCycleData
        ];
      const thirdCycleInfo =
        lifeCycleData[
          lifeCyclesNumbers.thirdCycle.toString() as keyof typeof lifeCycleData
        ];

      // Récupération des données détaillées pour les périodes de réalisation
      const firstPeriodInfo =
        realizationPeriodData[
          realizationPeriodsNumbers.firstPeriod.toString() as keyof typeof realizationPeriodData
        ];
      const secondPeriodInfo =
        realizationPeriodData[
          realizationPeriodsNumbers.secondPeriod.toString() as keyof typeof realizationPeriodData
        ];
      const thirdPeriodInfo =
        realizationPeriodData[
          realizationPeriodsNumbers.thirdPeriod.toString() as keyof typeof realizationPeriodData
        ];
      const fourthPeriodInfo =
        realizationPeriodData[
          realizationPeriodsNumbers.fourthPeriod.toString() as keyof typeof realizationPeriodData
        ];

      // Récupération des données détaillées pour les nombres personnels
      const personalYearInfo =
        personelCycleData[
          personalNumbers.year.number.toString() as keyof typeof personelCycleData
        ];
      const personalMonthInfo =
        personelCycleData[
          personalNumbers.month.number.toString() as keyof typeof personelCycleData
        ];
      const personalDayInfo =
        personelCycleData[
          personalNumbers.day.number.toString() as keyof typeof personelCycleData
        ];

      setNumerologyResults({
        lifePath: {
          number: lifePathNumber,
          info: lifePathInfo,
        },
        expression: {
          number: expressionNumber,
          info: expressionInfo,
        },
        soulUrge: {
          number: soulUrgeNumber,
          info: soulUrgeInfo,
        },
        personality: {
          number: personalityNumber,
          info: personalityInfo,
        },
        birthday: {
          number: birthdayNumber,
          info: birthdayInfo,
        },
        challenges: challengeNumbers,
        lifeCycles: {
          firstCycle: {
            number: lifeCyclesNumbers.firstCycle,
            info: firstCycleInfo,
          },
          secondCycle: {
            number: lifeCyclesNumbers.secondCycle,
            info: secondCycleInfo,
          },
          thirdCycle: {
            number: lifeCyclesNumbers.thirdCycle,
            info: thirdCycleInfo,
          },
        },
        realizationPeriods: {
          firstPeriod: {
            number: realizationPeriodsNumbers.firstPeriod,
            info: firstPeriodInfo,
          },
          secondPeriod: {
            number: realizationPeriodsNumbers.secondPeriod,
            info: secondPeriodInfo,
          },
          thirdPeriod: {
            number: realizationPeriodsNumbers.thirdPeriod,
            info: thirdPeriodInfo,
          },
          fourthPeriod: {
            number: realizationPeriodsNumbers.fourthPeriod,
            info: fourthPeriodInfo,
          },
        },
        personalNumbers: {
          year: {
            number: personalNumbers.year.number,
            info: personalYearInfo,
          },
          month: {
            number: personalNumbers.month.number,
            info: personalMonthInfo,
          },
          day: {
            number: personalNumbers.day.number,
            info: personalDayInfo,
          },
        },
        karmicNumbers: karmicNumbers,
        cycleKarmicNumbers: cycleKarmicNumbers,
        karmicDebts: karmicDebts,
      });
    } catch (error) {
      console.error("Erreur lors du calcul numérologique:", error);
    } finally {
      setIsLoading(false);
    }
  }, [readingData]);

  useEffect(() => {
    if (readingData) {
      calculateNumerologyResults();
    }
  }, [readingData, calculateNumerologyResults]);

  if (isLoading) {
    return (
      <div className="reading-detail">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Calcul de votre profil numérologique...</p>
        </div>
      </div>
    );
  }

  if (!numerologyResults) {
    return (
      <div className="reading-detail">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>Impossible de calculer votre profil numérologique.</p>
          <button
            onClick={() => onNavigate("newReading")}
            className="btn-primary"
          >
            Créer une nouvelle lecture
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reading-detail">
      <div className="reading-detail-header">
        <h1 className="reading-title">
          {readingData?.readingName || "Lecture Numérologique"}
        </h1>
        <p className="reading-subtitle">
          Analyse complète de votre profil numérologique
        </p>
      </div>

      {/* Navigation par onglets */}
      <div className="navigation-tabs">
        <div className="tabs-container">
          <button
            className={`tab-button ${activeTab === "basiques" ? "active" : ""}`}
            onClick={() => setActiveTab("basiques")}
          >
            <span className="tab-icon">
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
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </span>
            <span className="tab-label">Basiques</span>
          </button>
          <button
            className={`tab-button ${activeTab === "dates" ? "active" : ""}`}
            onClick={() => setActiveTab("dates")}
          >
            <span className="tab-icon">
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
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <span className="tab-label">Dates</span>
          </button>
          <button
            className={`tab-button ${activeTab === "karmique" ? "active" : ""}`}
            onClick={() => setActiveTab("karmique")}
          >
            <span className="tab-icon">
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
                <path
                  d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"
                  fill="none"
                />
                <path d="M12 6v6" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <path d="M12 12l5.2 3" />
                <path d="M8 8.5c1.5-1 3.5-1.5 5.5-.5" />
                <path d="M8 15.5c1.5 1 3.5 1.5 5.5.5" />
                <circle cx="12" cy="12" r="7" opacity="0.3" />
              </svg>
            </span>
            <span className="tab-label">Karmique</span>
          </button>
          <button
            className={`tab-button ${activeTab === "matrix" ? "active" : ""}`}
            onClick={() => setActiveTab("matrix")}
          >
            <span className="tab-icon">
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
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </span>
            <span className="tab-label">Matrix Destiny</span>
          </button>
          <button
            className={`tab-button ${activeTab === "arbre" ? "active" : ""}`}
            onClick={() => setActiveTab("arbre")}
          >
            <span className="tab-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="12"
                  cy="4"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <circle
                  cx="8"
                  cy="8"
                  r="1.8"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle
                  cx="16"
                  cy="8"
                  r="1.8"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="2"
                  fill="currentColor"
                  opacity="0.9"
                />
                <circle
                  cx="6"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="18"
                  cy="12"
                  r="1.5"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="8"
                  cy="16"
                  r="1.8"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="1.8"
                  fill="currentColor"
                  opacity="0.7"
                />
                <circle
                  cx="12"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  opacity="0.8"
                />
                <line x1="12" y1="4" x2="8" y2="8" opacity="0.5" />
                <line x1="12" y1="4" x2="16" y2="8" opacity="0.5" />
                <line x1="8" y1="8" x2="12" y2="12" opacity="0.5" />
                <line x1="16" y1="8" x2="12" y2="12" opacity="0.5" />
                <line x1="6" y1="12" x2="8" y2="8" opacity="0.4" />
                <line x1="18" y1="12" x2="16" y2="8" opacity="0.4" />
                <line x1="6" y1="12" x2="8" y2="16" opacity="0.4" />
                <line x1="18" y1="12" x2="16" y2="16" opacity="0.4" />
                <line x1="12" y1="12" x2="8" y2="16" opacity="0.5" />
                <line x1="12" y1="12" x2="16" y2="16" opacity="0.5" />
                <line x1="8" y1="16" x2="12" y2="20" opacity="0.5" />
                <line x1="16" y1="16" x2="12" y2="20" opacity="0.5" />
              </svg>
            </span>
            <span className="tab-label">Arbre de Vie</span>
          </button>
        </div>
      </div>

      <div className="reading-content">
        {/* Informations personnelles */}
        <section className="personal-info-section">
          <h2>Informations personnelles</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Nom complet:</span>
              <span className="info-value">
                {[
                  readingData?.firstGivenName,
                  readingData?.secondGivenName,
                  readingData?.thirdGivenName,
                  readingData?.familyName,
                ]
                  .filter(Boolean)
                  .join(" ")}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Date de naissance:</span>
              <span className="info-value">
                {readingData?.birthDate &&
                  new Date(readingData.birthDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Catégorie:</span>
              <span className="info-value capitalize">
                {readingData?.category}
              </span>
            </div>
          </div>
        </section>
        {/* ONGLET BASIQUES */}
        {activeTab === "basiques" && readingData && (
          <BasiquesTab
            numerologyResults={numerologyResults}
            readingData={readingData}
          />
        )}
        {/* ONGLET DATES */}
        {activeTab === "dates" && (
          <DatesTab numerologyResults={numerologyResults} />
        )}
        {/* ONGLET KARMIQUE */}{" "}
        {activeTab === "karmique" && (
          <KarmiqueTab numerologyResults={numerologyResults} />
        )}{" "}
        {/* ONGLET MATRIX DESTINY */}
        {activeTab === "matrix" && readingData && (
          <MatrixTab readingData={readingData} />
        )}
        {/* ONGLET ARBRE DE VIE */}
        {activeTab === "arbre" && readingData && (
          <ArbreTab
            numerologyResults={numerologyResults}
            readingData={readingData}
          />
        )}
      </div>

      <div className="reading-actions">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => onNavigate("readings")}
              className="btn-secondary"
            >
              Retour aux lectures
            </button>
            <button
              onClick={() => onNavigate("newReading")}
              className="btn-primary"
            >
              Nouvelle lecture
            </button>
          </>
        ) : (
          <button onClick={() => onNavigate("home")} className="btn-primary">
            Retour à l'accueil
          </button>
        )}
      </div>
    </div>
  );
};

export default ReadingDetailSection;
