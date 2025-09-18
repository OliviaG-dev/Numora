import React, { useState, useEffect, useCallback } from "react";
import "./ReadingDetailSection.css";
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
import {
  lifePathData,
  expressionData,
  soulUrgeData,
  personalityData,
  birthdayData,
  lifeCycleData,
  realizationPeriodData,
  personelCycleData,
  karmicDebtsData,
} from "../../data";
import type {
  LifePathDetail,
  ExpressionDetail,
  LifeCycleDetail,
  RealizationPeriodDetail,
  PersonelCycleDetail,
} from "../../data";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  birthTime: string;
}

interface ReadingDetailSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "readingDetail",
    readingData?: ReadingData
  ) => void;
  readingData?: ReadingData;
}

const ReadingDetailSection: React.FC<ReadingDetailSectionProps> = ({
  onNavigate,
  readingData,
}) => {
  // État pour vérifier si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier l'état de connexion au chargement du composant
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté (exemple avec localStorage)
    const checkAuthStatus = () => {
      const userToken = localStorage.getItem("userToken");
      const isAuthenticated = userToken !== null && userToken !== "";
      setIsLoggedIn(isAuthenticated);
    };

    checkAuthStatus();

    // Écouter les changements d'état de connexion
    window.addEventListener("storage", checkAuthStatus);

    return () => {
      window.removeEventListener("storage", checkAuthStatus);
    };
  }, []);
  // État pour la navigation par onglets
  const [activeTab, setActiveTab] = useState<string>("basiques");

  // État pour gérer l'ouverture/fermeture des accordéons karmiques
  const [openKarmicAccordions, setOpenKarmicAccordions] = useState<Set<number>>(
    new Set()
  );

  // État pour gérer l'ouverture/fermeture des accordéons des cycles karmiques
  const [openCycleKarmicAccordions, setOpenCycleKarmicAccordions] = useState<
    Set<number>
  >(new Set());

  // Fonction pour gérer l'ouverture/fermeture des accordéons karmiques
  const toggleKarmicAccordion = (number: number) => {
    setOpenKarmicAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.add(number);
      }
      return newSet;
    });
  };

  // Fonction pour gérer l'ouverture/fermeture des accordéons des cycles karmiques
  const toggleCycleKarmicAccordion = (number: number) => {
    setOpenCycleKarmicAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.add(number);
      }
      return newSet;
    });
  };

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
            <span className="tab-icon">🔢</span>
            <span className="tab-label">Basiques</span>
          </button>
          <button
            className={`tab-button ${activeTab === "dates" ? "active" : ""}`}
            onClick={() => setActiveTab("dates")}
          >
            <span className="tab-icon">📅</span>
            <span className="tab-label">Dates</span>
          </button>
          <button
            className={`tab-button ${activeTab === "karmique" ? "active" : ""}`}
            onClick={() => setActiveTab("karmique")}
          >
            <span className="tab-icon">⚖️</span>
            <span className="tab-label">Karmique</span>
          </button>
          <button
            className={`tab-button ${activeTab === "matrix" ? "active" : ""}`}
            onClick={() => setActiveTab("matrix")}
          >
            <span className="tab-icon">🔮</span>
            <span className="tab-label">Matrix Destiny</span>
          </button>
          <button
            className={`tab-button ${activeTab === "arbre" ? "active" : ""}`}
            onClick={() => setActiveTab("arbre")}
          >
            <span className="tab-icon">🌳</span>
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
            {readingData?.birthTime && (
              <div className="info-item">
                <span className="info-label">Heure de naissance:</span>
                <span className="info-value">{readingData.birthTime}</span>
              </div>
            )}
            <div className="info-item">
              <span className="info-label">Catégorie:</span>
              <span className="info-value capitalize">
                {readingData?.category}
              </span>
            </div>
          </div>
        </section>

        {/* ONGLET BASIQUES */}
        {activeTab === "basiques" && (
          <>
            {/* Chemin de Vie */}
            <section className="numerology-section life-path">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Chemin de Vie</h2>
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
                        Le chemin de vie est le chiffre central en numérologie
                        qui révèle la mission principale de ton existence.
                      </p>
                      <p>
                        Il indique les forces à développer, les défis à
                        surmonter et les leçons de vie que ton âme est venue
                        expérimenter.
                      </p>
                      <p>
                        C'est comme une boussole intérieure qui guide tes choix
                        et ton évolution tout au long de ta vie.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="number-badge life-path-badge">
                  {numerologyResults.lifePath.number}
                </div>
              </div>
              {numerologyResults.lifePath.info && (
                <div className="section-content">
                  <h3>{numerologyResults.lifePath.info.title}</h3>
                  <p className="description">
                    {numerologyResults.lifePath.info.description}
                  </p>
                  <div className="keywords">
                    {numerologyResults.lifePath.info.keywords.map(
                      (keyword: string, index: number) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                  <div className="details-grid">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{numerologyResults.lifePath.info.strengths}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{numerologyResults.lifePath.info.challenges}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Mission</h4>
                      <p>{numerologyResults.lifePath.info.mission}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Nombre d'Expression */}
            <section className="numerology-section expression">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Nombre d'Expression</h2>
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
                        Le nombre d'expression révèle tes talents naturels et
                        tes capacités innées.
                      </p>
                      <p>
                        Il indique comment tu t'exprimes dans le monde, tes dons
                        créatifs et tes aptitudes professionnelles.
                      </p>
                      <p>
                        C'est la façon dont tu utilises tes compétences pour
                        accomplir ta mission de vie.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="number-badge expression-badge">
                  {numerologyResults.expression.number}
                </div>
              </div>
              {numerologyResults.expression.info && (
                <div className="section-content">
                  <h3>{numerologyResults.expression.info.title}</h3>
                  <p className="description">
                    {numerologyResults.expression.info.description}
                  </p>
                  <div className="keywords">
                    {numerologyResults.expression.info.keywords.map(
                      (keyword: string, index: number) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      )
                    )}
                  </div>
                  <div className="details-grid">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{numerologyResults.expression.info.strengths}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{numerologyResults.expression.info.challenges}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Mission</h4>
                      <p>{numerologyResults.expression.info.mission}</p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Nombres de l'Âme, Personnalité et Jour */}
            <section className="numerology-section personal-numbers">
              <h2>Nombres de l'Âme, Personnalité et Jour</h2>
              <div className="personal-numbers-grid">
                {/* Nombre de l'Âme */}
                <div className="personal-number-card soul-urge">
                  <div className="section-header">
                    <div className="title-with-tooltip">
                      <h3>Nombre de l'Âme</h3>
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
                            Le nombre de l'âme révèle tes motivations profondes
                            et tes désirs intérieurs.
                          </p>
                          <p>
                            Il indique ce qui te pousse vraiment à agir, tes
                            aspirations secrètes et tes besoins spirituels.
                          </p>
                          <p>
                            C'est la voix de ton âme qui guide tes choix les
                            plus authentiques.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="number-badge soul-badge">
                      {numerologyResults.soulUrge.number}
                    </div>
                  </div>
                  {numerologyResults.soulUrge.info && (
                    <div className="section-content">
                      <p className="description">
                        Vos motivations profondes et vos désirs intérieurs
                      </p>
                      <div className="keywords">
                        {numerologyResults.soulUrge.info.map(
                          (keyword: string, index: number) => (
                            <span key={index} className="keyword-tag">
                              {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre de Personnalité */}
                <div className="personal-number-card personality">
                  <div className="section-header">
                    <div className="title-with-tooltip">
                      <h3>Nombre de Personnalité</h3>
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
                            Le nombre de personnalité révèle comment tu apparais
                            aux autres.
                          </p>
                          <p>
                            Il indique l'image que tu projettes, ton style de
                            communication et ton charisme naturel.
                          </p>
                          <p>
                            C'est la façade que tu présentes au monde et qui
                            influence les premières impressions.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="number-badge personality-badge">
                      {numerologyResults.personality.number}
                    </div>
                  </div>
                  {numerologyResults.personality.info && (
                    <div className="section-content">
                      <p className="description">
                        Comment vous apparaissez aux autres
                      </p>
                      <div className="keywords">
                        {numerologyResults.personality.info.map(
                          (keyword: string, index: number) => (
                            <span key={index} className="keyword-tag">
                              {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Nombre du Jour */}
                <div className="personal-number-card birthday">
                  <div className="section-header">
                    <div className="title-with-tooltip">
                      <h3>Nombre du Jour</h3>
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
                            Le nombre du jour révèle tes talents naturels et tes
                            capacités innées.
                          </p>
                          <p>
                            Il indique tes dons particuliers, tes aptitudes
                            spéciales et tes compétences naturelles.
                          </p>
                          <p>
                            C'est l'énergie créative que tu portes en toi depuis
                            ta naissance.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="number-badge birthday-badge">
                      {numerologyResults.birthday.number}
                    </div>
                  </div>
                  {numerologyResults.birthday.info && (
                    <div className="section-content">
                      <p className="description">
                        Vos talents naturels et capacités
                      </p>
                      <div className="keywords">
                        {numerologyResults.birthday.info.map(
                          (keyword: string, index: number) => (
                            <span key={index} className="keyword-tag">
                              {keyword}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ONGLET DATES */}
        {activeTab === "dates" && (
          <>
            {/* Cycles de Vie */}
            <section className="numerology-section life-cycles">
              <div className="title-with-tooltip">
                <h2>Cycles de Vie</h2>
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
                      Les cycles de vie décrivent les trois grandes périodes de
                      ton existence.
                    </p>
                    <p>
                      Chaque cycle apporte ses propres leçons, défis et
                      opportunités de croissance.
                    </p>
                    <p>
                      C'est une carte temporelle qui guide ton évolution
                      spirituelle et personnelle.
                    </p>
                  </div>
                </div>
              </div>
              <div className="life-cycles-grid">
                <div className="cycle-card">
                  <h3>
                    <span className="cycle-title">Premier Cycle</span>
                    <span className="cycle-period">(Naissance → ~28 ans)</span>
                  </h3>
                  <div className="number-badge cycle-badge">
                    {numerologyResults.lifeCycles.firstCycle.number}
                  </div>
                  {numerologyResults.lifeCycles.firstCycle.info && (
                    <div className="cycle-content">
                      <p className="cycle-summary">
                        {numerologyResults.lifeCycles.firstCycle.info.summary}
                      </p>
                      <div className="cycle-details">
                        <p>
                          {
                            numerologyResults.lifeCycles.firstCycle.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="cycle-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.lifeCycles.firstCycle.info
                              .challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="cycle-card">
                  <h3>
                    <span className="cycle-title">Deuxième Cycle</span>
                    <span className="cycle-period">(29 → ~56 ans)</span>
                  </h3>
                  <div className="number-badge cycle-badge">
                    {numerologyResults.lifeCycles.secondCycle.number}
                  </div>
                  {numerologyResults.lifeCycles.secondCycle.info && (
                    <div className="cycle-content">
                      <p className="cycle-summary">
                        {numerologyResults.lifeCycles.secondCycle.info.summary}
                      </p>
                      <div className="cycle-details">
                        <p>
                          {
                            numerologyResults.lifeCycles.secondCycle.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="cycle-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.lifeCycles.secondCycle.info
                              .challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="cycle-card">
                  <h3>
                    <span className="cycle-title">Troisième Cycle</span>
                    <span className="cycle-period">(57 ans → fin de vie)</span>
                  </h3>
                  <div className="number-badge cycle-badge">
                    {numerologyResults.lifeCycles.thirdCycle.number}
                  </div>
                  {numerologyResults.lifeCycles.thirdCycle.info && (
                    <div className="cycle-content">
                      <p className="cycle-summary">
                        {numerologyResults.lifeCycles.thirdCycle.info.summary}
                      </p>
                      <div className="cycle-details">
                        <p>
                          {
                            numerologyResults.lifeCycles.thirdCycle.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="cycle-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.lifeCycles.thirdCycle.info
                              .challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Périodes de Réalisation */}
            <section className="numerology-section realization-periods">
              <div className="title-with-tooltip">
                <h2>Périodes de Réalisation</h2>
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
                      Les périodes de réalisation (ou pinacles) révèlent les
                      opportunités de réussite.
                    </p>
                    <p>
                      Chaque période offre des conditions favorables pour
                      accomplir tes objectifs.
                    </p>
                    <p>
                      C'est un calendrier spirituel qui indique les meilleurs
                      moments pour agir.
                    </p>
                  </div>
                </div>
              </div>
              <div className="realization-periods-grid">
                <div className="period-card">
                  <h3>
                    <span className="period-title">Première Période</span>
                    <span className="period-duration">(jusqu'à ~30 ans)</span>
                  </h3>
                  <div className="number-badge period-badge">
                    {numerologyResults.realizationPeriods.firstPeriod.number}
                  </div>
                  {numerologyResults.realizationPeriods.firstPeriod.info && (
                    <div className="period-content">
                      <p className="period-summary">
                        {
                          numerologyResults.realizationPeriods.firstPeriod.info
                            .summary
                        }
                      </p>
                      <div className="period-details">
                        <p>
                          {
                            numerologyResults.realizationPeriods.firstPeriod
                              .info.description
                          }
                        </p>
                      </div>
                      <div className="period-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.realizationPeriods.firstPeriod
                              .info.challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="period-card">
                  <h3>
                    <span className="period-title">Deuxième Période</span>
                    <span className="period-duration">(30 → 39 ans)</span>
                  </h3>
                  <div className="number-badge period-badge">
                    {numerologyResults.realizationPeriods.secondPeriod.number}
                  </div>
                  {numerologyResults.realizationPeriods.secondPeriod.info && (
                    <div className="period-content">
                      <p className="period-summary">
                        {
                          numerologyResults.realizationPeriods.secondPeriod.info
                            .summary
                        }
                      </p>
                      <div className="period-details">
                        <p>
                          {
                            numerologyResults.realizationPeriods.secondPeriod
                              .info.description
                          }
                        </p>
                      </div>
                      <div className="period-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.realizationPeriods.secondPeriod
                              .info.challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="period-card">
                  <h3>
                    <span className="period-title">Troisième Période</span>
                    <span className="period-duration">(39 → 48 ans)</span>
                  </h3>
                  <div className="number-badge period-badge">
                    {numerologyResults.realizationPeriods.thirdPeriod.number}
                  </div>
                  {numerologyResults.realizationPeriods.thirdPeriod.info && (
                    <div className="period-content">
                      <p className="period-summary">
                        {
                          numerologyResults.realizationPeriods.thirdPeriod.info
                            .summary
                        }
                      </p>
                      <div className="period-details">
                        <p>
                          {
                            numerologyResults.realizationPeriods.thirdPeriod
                              .info.description
                          }
                        </p>
                      </div>
                      <div className="period-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.realizationPeriods.thirdPeriod
                              .info.challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="period-card">
                  <h3>
                    <span className="period-title">Quatrième Période</span>
                    <span className="period-duration">
                      (48 ans → fin de vie)
                    </span>
                  </h3>
                  <div className="number-badge period-badge">
                    {numerologyResults.realizationPeriods.fourthPeriod.number}
                  </div>
                  {numerologyResults.realizationPeriods.fourthPeriod.info && (
                    <div className="period-content">
                      <p className="period-summary">
                        {
                          numerologyResults.realizationPeriods.fourthPeriod.info
                            .summary
                        }
                      </p>
                      <div className="period-details">
                        <p>
                          {
                            numerologyResults.realizationPeriods.fourthPeriod
                              .info.description
                          }
                        </p>
                      </div>
                      <div className="period-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.realizationPeriods.fourthPeriod
                              .info.challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Nombres Personnels (Année, Mois, Jour) */}
            <section className="numerology-section personal-numbers">
              <div className="title-with-tooltip">
                <h2>Nombres Personnels</h2>
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
                      Les nombres personnels (année, mois, jour) vous donnent
                      des indications sur les énergies qui vous accompagnent au
                      cours de l'année, du mois et du jour en cours.
                    </p>
                  </div>
                </div>
              </div>
              <div className="personal-numbers-grid">
                <div className="personal-card">
                  <h3>
                    <span className="personal-title">Année Personnelle</span>
                    <span className="personal-period">
                      (Janvier → Décembre {new Date().getFullYear()})
                    </span>
                  </h3>
                  <div className="number-badge personal-badge">
                    {numerologyResults.personalNumbers.year.number}
                  </div>
                  {numerologyResults.personalNumbers.year.info && (
                    <div className="personal-content">
                      <p className="personal-summary">
                        {numerologyResults.personalNumbers.year.info.summary}
                      </p>
                      <div className="personal-details">
                        <p>
                          {
                            numerologyResults.personalNumbers.year.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="personal-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.personalNumbers.year.info
                              .challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="personal-card">
                  <h3>
                    <span className="personal-title">Mois Personnel</span>
                    <span className="personal-period">
                      (
                      {new Date().toLocaleDateString("fr-FR", {
                        month: "long",
                        year: "numeric",
                      })}
                      )
                    </span>
                  </h3>
                  <div className="number-badge personal-badge">
                    {numerologyResults.personalNumbers.month.number}
                  </div>
                  {numerologyResults.personalNumbers.month.info && (
                    <div className="personal-content">
                      <p className="personal-summary">
                        {numerologyResults.personalNumbers.month.info.summary}
                      </p>
                      <div className="personal-details">
                        <p>
                          {
                            numerologyResults.personalNumbers.month.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="personal-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {
                            numerologyResults.personalNumbers.month.info
                              .challenge
                          }
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="personal-card">
                  <h3>
                    <span className="personal-title">Jour Personnel</span>
                    <span className="personal-period">
                      (
                      {new Date().toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      )
                    </span>
                  </h3>
                  <div className="number-badge personal-badge">
                    {numerologyResults.personalNumbers.day.number}
                  </div>
                  {numerologyResults.personalNumbers.day.info && (
                    <div className="personal-content">
                      <p className="personal-summary">
                        {numerologyResults.personalNumbers.day.info.summary}
                      </p>
                      <div className="personal-details">
                        <p>
                          {
                            numerologyResults.personalNumbers.day.info
                              .description
                          }
                        </p>
                      </div>
                      <div className="personal-challenge">
                        <h4>Défi à relever</h4>
                        <p>
                          {numerologyResults.personalNumbers.day.info.challenge}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {/* ONGLET KARMIQUE */}
        {activeTab === "karmique" && (
          <>
            {/* Section des Nombres Karmiques */}
            <section className="numerology-section karmic-section">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Nombres Karmiques</h2>
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
                        Les nombres karmiques révèlent les leçons profondes
                        d'âme basées sur votre date de naissance. Ils indiquent
                        les chiffres manquants dans votre date de naissance qui
                        révèlent des faiblesses intérieures à travailler.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="karmic-overview">
                <div className="karmic-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {numerologyResults.karmicNumbers.presentNumbers.length}
                    </span>
                    <span className="stat-label">Nombres présents</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {numerologyResults.karmicNumbers.missingNumbers.length}
                    </span>
                    <span className="stat-label">Défis karmiques</span>
                  </div>
                </div>

                <div className="present-numbers">
                  <h4>Chiffres présents dans votre date de naissance :</h4>
                  <div className="number-list">
                    {numerologyResults.karmicNumbers.presentNumbers.map(
                      (num) => (
                        <span key={num} className="number-tag present">
                          {num}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="karmic-definitions">
                {numerologyResults.karmicNumbers.karmicDefinitions.length >
                0 ? (
                  numerologyResults.karmicNumbers.karmicDefinitions.map(
                    (karmic) => (
                      <div key={karmic.number} className="karmic-card">
                        <div
                          className="karmic-header accordion-header"
                          onClick={() => toggleKarmicAccordion(karmic.number)}
                        >
                          <h3>
                            Défi Karmique {karmic.number}
                            <span className="karmic-period">
                              (Chiffre manquant)
                            </span>
                          </h3>
                          <div className="header-right">
                            <div className="number-badge karmic-badge">
                              {karmic.number}
                            </div>
                            <div
                              className={`accordion-arrow ${
                                openKarmicAccordions.has(karmic.number)
                                  ? "open"
                                  : ""
                              }`}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {openKarmicAccordions.has(karmic.number) && (
                          <div className="karmic-content accordion-content">
                            <div className="karmic-summary">
                              <h4>Résumé</h4>
                              <p>{karmic.summary}</p>
                            </div>

                            <div className="karmic-challenge">
                              <h4>Défi à relever</h4>
                              <p>{karmic.challenge}</p>
                            </div>

                            <div className="karmic-details">
                              <h4>Détails</h4>
                              <p>{karmic.details}</p>
                            </div>

                            {karmic.keywords.length > 0 && (
                              <div className="karmic-keywords">
                                <h4>Mots-clés</h4>
                                <div className="keywords-list">
                                  {karmic.keywords.map((keyword, index) => (
                                    <span key={index} className="keyword-tag">
                                      {keyword}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )
                ) : (
                  <div className="no-karmic-challenges">
                    <h3>Félicitations !</h3>
                    <p>
                      Tous les chiffres de 1 à 9 sont présents dans votre date
                      de naissance. Vous n'avez pas de défis karmiques
                      spécifiques à relever.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section des Cycles Karmiques */}
            <section className="numerology-section cycle-karmic-section">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Cycles Karmiques</h2>
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
                        Les cycles karmiques représentent les expériences que
                        vous devez intégrer dans votre rapport au monde et votre
                        identité sociale. Ils sont basés sur les lettres
                        manquantes dans votre nom complet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cycle-karmic-overview">
                <div className="cycle-karmic-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {
                        numerologyResults.cycleKarmicNumbers.presentNumbers
                          .length
                      }
                    </span>
                    <span className="stat-label">Nombres présents</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {
                        numerologyResults.cycleKarmicNumbers.missingNumbers
                          .length
                      }
                    </span>
                    <span className="stat-label">Cycles karmiques</span>
                  </div>
                </div>

                <div className="present-numbers">
                  <h4>Nombres présents dans votre nom complet :</h4>
                  <div className="number-list">
                    {numerologyResults.cycleKarmicNumbers.presentNumbers.map(
                      (num) => (
                        <span key={num} className="number-tag present">
                          {num}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="cycle-karmic-definitions">
                {numerologyResults.cycleKarmicNumbers.cycleKarmicDefinitions
                  .length > 0 ? (
                  numerologyResults.cycleKarmicNumbers.cycleKarmicDefinitions.map(
                    (cycleKarmic) => (
                      <div
                        key={cycleKarmic.number}
                        className="cycle-karmic-card"
                      >
                        <div
                          className="cycle-karmic-header accordion-header"
                          onClick={() =>
                            toggleCycleKarmicAccordion(cycleKarmic.number)
                          }
                        >
                          <h3>
                            Cycle Karmique {cycleKarmic.number}
                            <span className="cycle-karmic-period">
                              (Lettre manquante)
                            </span>
                          </h3>
                          <div className="header-right">
                            <div className="number-badge cycle-karmic-badge">
                              {cycleKarmic.number}
                            </div>
                            <div
                              className={`accordion-arrow ${
                                openCycleKarmicAccordions.has(
                                  cycleKarmic.number
                                )
                                  ? "open"
                                  : ""
                              }`}
                            >
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M6 9L12 15L18 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {openCycleKarmicAccordions.has(cycleKarmic.number) && (
                          <div className="cycle-karmic-content accordion-content">
                            <div className="cycle-karmic-summary">
                              <h4>Résumé</h4>
                              <p>{cycleKarmic.summary}</p>
                            </div>

                            <div className="cycle-karmic-challenge">
                              <h4>Défi à relever</h4>
                              <p>{cycleKarmic.challenge}</p>
                            </div>

                            <div className="cycle-karmic-details">
                              <h4>Détails</h4>
                              <p>{cycleKarmic.details}</p>
                            </div>

                            {cycleKarmic.keywords.length > 0 && (
                              <div className="cycle-karmic-keywords">
                                <h4>Mots-clés</h4>
                                <div className="keywords-list">
                                  {cycleKarmic.keywords.map(
                                    (keyword, index) => (
                                      <span key={index} className="keyword-tag">
                                        {keyword}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )
                ) : (
                  <div className="no-cycle-karmic-challenges">
                    <h3>Félicitations !</h3>
                    <p>
                      Tous les nombres de 1 à 9 sont présents dans votre nom
                      complet. Vous n'avez pas de cycles karmiques spécifiques à
                      relever.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Section des Dettes Karmiques */}
            <section className="numerology-section karmic-debts-section">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Dettes Karmiques</h2>
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
                        Les dettes karmiques (13, 14, 16, 19) révèlent des
                        leçons importantes à apprendre dans cette vie.
                      </p>
                      <p>
                        Elles indiquent des défis spécifiques liés à des abus ou
                        des négligences dans des vies passées.
                      </p>
                      <p>
                        Ces nombres apparaissent dans vos nombres principaux
                        avant réduction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="karmic-debts-overview">
                <div className="karmic-debts-stats">
                  <div className="stat-item">
                    <span className="stat-number">
                      {
                        numerologyResults.karmicDebts.allDebts.filter(
                          (debt) => debt.isKarmicDebt
                        ).length
                      }
                    </span>
                    <span className="stat-label">Dettes karmiques</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">
                      {
                        numerologyResults.karmicDebts.allDebts.filter(
                          (debt) => !debt.isKarmicDebt
                        ).length
                      }
                    </span>
                    <span className="stat-label">Nombres normaux</span>
                  </div>
                </div>
              </div>

              <div className="karmic-debts-analysis">
                <h3>Analyse de vos nombres principaux</h3>
                <div className="debt-analysis-grid">
                  <div className="debt-analysis-item">
                    <h4>Chemin de Vie</h4>
                    <div className="debt-number">
                      {numerologyResults.karmicDebts.lifePathDebt.number}
                      {numerologyResults.karmicDebts.lifePathDebt
                        .isKarmicDebt && (
                        <span className="karmic-debt-badge">
                          Dette{" "}
                          {
                            numerologyResults.karmicDebts.lifePathDebt
                              .karmicDebtType
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="debt-analysis-item">
                    <h4>Expression</h4>
                    <div className="debt-number">
                      {numerologyResults.karmicDebts.expressionDebt.number}
                      {numerologyResults.karmicDebts.expressionDebt
                        .isKarmicDebt && (
                        <span className="karmic-debt-badge">
                          Dette{" "}
                          {
                            numerologyResults.karmicDebts.expressionDebt
                              .karmicDebtType
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="debt-analysis-item">
                    <h4>Âme</h4>
                    <div className="debt-number">
                      {numerologyResults.karmicDebts.soulUrgeDebt.number}
                      {numerologyResults.karmicDebts.soulUrgeDebt
                        .isKarmicDebt && (
                        <span className="karmic-debt-badge">
                          Dette{" "}
                          {
                            numerologyResults.karmicDebts.soulUrgeDebt
                              .karmicDebtType
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="debt-analysis-item">
                    <h4>Personnalité</h4>
                    <div className="debt-number">
                      {numerologyResults.karmicDebts.personalityDebt.number}
                      {numerologyResults.karmicDebts.personalityDebt
                        .isKarmicDebt && (
                        <span className="karmic-debt-badge">
                          Dette{" "}
                          {
                            numerologyResults.karmicDebts.personalityDebt
                              .karmicDebtType
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="debt-analysis-item">
                    <h4>Jour de Naissance</h4>
                    <div className="debt-number">
                      {numerologyResults.karmicDebts.birthdayDebt.number}
                      {numerologyResults.karmicDebts.birthdayDebt
                        .isKarmicDebt && (
                        <span className="karmic-debt-badge">
                          Dette{" "}
                          {
                            numerologyResults.karmicDebts.birthdayDebt
                              .karmicDebtType
                          }
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="karmic-debts-definitions">
                {numerologyResults.karmicDebts.allDebts
                  .filter((debt) => debt.isKarmicDebt)
                  .map((debt) => {
                    const debtData =
                      karmicDebtsData[
                        debt.karmicDebtType!.toString() as keyof typeof karmicDebtsData
                      ];
                    return (
                      <div
                        key={debt.karmicDebtType}
                        className="karmic-debt-card"
                      >
                        <div className="karmic-debt-header">
                          <h3>
                            Dette Karmique {debt.karmicDebtType}
                            <span className="karmic-debt-period">
                              (Leçon à apprendre)
                            </span>
                          </h3>
                          <div className="number-badge karmic-debt-badge">
                            {debt.karmicDebtType}
                          </div>
                        </div>

                        <div className="karmic-debt-content">
                          <div className="karmic-debt-summary">
                            <h4>Résumé</h4>
                            <p>{debtData.summary}</p>
                          </div>

                          <div className="karmic-debt-challenge">
                            <h4>Défi à relever</h4>
                            <p>{debtData.challenge}</p>
                          </div>

                          <div className="karmic-debt-details">
                            <h4>Détails</h4>
                            <p>{debtData.details}</p>
                          </div>

                          {debtData.keywords.length > 0 && (
                            <div className="karmic-debt-keywords">
                              <h4>Mots-clés</h4>
                              <div className="keywords-list">
                                {debtData.keywords.map(
                                  (keyword: string, index: number) => (
                                    <span key={index} className="keyword-tag">
                                      {keyword}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                {numerologyResults.karmicDebts.allDebts.filter(
                  (debt) => debt.isKarmicDebt
                ).length === 0 && (
                  <div className="no-karmic-debts">
                    <h3>Félicitations !</h3>
                    <p>
                      Aucune dette karmique détectée dans vos nombres
                      principaux. Vous n'avez pas de leçons karmiques
                      spécifiques à apprendre dans cette vie.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* ONGLET MATRIX DESTINY */}
        {activeTab === "matrix" && (
          <>
            <section className="numerology-section matrix-section">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Matrix Destiny</h2>
                </div>
              </div>
              <div className="placeholder-content">
                <p>
                  Cette section sera bientôt disponible avec l'analyse Matrix
                  Destiny.
                </p>
              </div>
            </section>
          </>
        )}

        {/* ONGLET ARBRE DE VIE */}
        {activeTab === "arbre" && (
          <>
            <section className="numerology-section arbre-section">
              <div className="section-header">
                <div className="title-with-tooltip">
                  <h2>Arbre de Vie</h2>
                </div>
              </div>
              <div className="placeholder-content">
                <p>
                  Cette section sera bientôt disponible avec l'analyse de
                  l'Arbre de Vie.
                </p>
              </div>
            </section>
          </>
        )}
      </div>

      <div className="reading-actions">
        {isLoggedIn && (
          <button
            onClick={() => onNavigate("readings")}
            className="btn-secondary"
          >
            Retour aux lectures
          </button>
        )}
        <button
          onClick={() => onNavigate("newReading")}
          className="btn-primary"
        >
          Nouvelle lecture
        </button>
      </div>
    </div>
  );
};

export default ReadingDetailSection;
