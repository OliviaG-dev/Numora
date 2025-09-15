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
} from "../../utils/numerology";
import {
  lifePathData,
  expressionData,
  soulUrgeData,
  personalityData,
  birthdayData,
  lifeCycleData,
  realizationPeriodData,
} from "../../data";
import type {
  LifePathDetail,
  ExpressionDetail,
  LifeCycleDetail,
  RealizationPeriodDetail,
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
                    Le chemin de vie est le chiffre central en numérologie qui
                    révèle la mission principale de ton existence.
                  </p>
                  <p>
                    Il indique les forces à développer, les défis à surmonter et
                    les leçons de vie que ton âme est venue expérimenter.
                  </p>
                  <p>
                    C'est comme une boussole intérieure qui guide tes choix et
                    ton évolution tout au long de ta vie.
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
                    Le nombre d'expression révèle tes talents naturels et tes
                    capacités innées.
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

        {/* Nombres Personnels */}
        <section className="numerology-section personal-numbers">
          <h2>Nombres Personnels</h2>
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
                        Le nombre de l'âme révèle tes motivations profondes et
                        tes désirs intérieurs.
                      </p>
                      <p>
                        Il indique ce qui te pousse vraiment à agir, tes
                        aspirations secrètes et tes besoins spirituels.
                      </p>
                      <p>
                        C'est la voix de ton âme qui guide tes choix les plus
                        authentiques.
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
                        Le nombre de personnalité révèle comment tu apparais aux
                        autres.
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
                        C'est l'énergie créative que tu portes en toi depuis ta
                        naissance.
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

        {/* Nombres de Défi */}
        <section className="numerology-section challenges">
          <div className="title-with-tooltip">
            <h2>Nombres de Défi</h2>
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
                  Les nombres de défi révèlent les obstacles et les leçons que
                  tu dois surmonter.
                </p>
                <p>
                  Ils indiquent les défis spécifiques à chaque période de ta vie
                  et les compétences à développer.
                </p>
                <p>
                  C'est un guide pour transformer tes difficultés en forces et
                  grandir spirituellement.
                </p>
              </div>
            </div>
          </div>
          <div className="challenges-grid">
            <div className="challenge-card">
              <h3>
                <span className="challenge-title">Défi de jeunesse</span>
                <span className="challenge-period">(0-30 ans)</span>
              </h3>
              <div className="number-badge challenge-badge">
                {numerologyResults.challenges.first.number}
              </div>
              <p>{numerologyResults.challenges.first.description}</p>
            </div>
            <div className="challenge-card">
              <h3>
                <span className="challenge-title">Défi de maturité</span>
                <span className="challenge-period">(31-60 ans)</span>
              </h3>
              <div className="number-badge challenge-badge">
                {numerologyResults.challenges.second.number}
              </div>
              <p>{numerologyResults.challenges.second.description}</p>
            </div>
            <div className="challenge-card">
              <h3>
                <span className="challenge-title">Défi de sagesse</span>
                <span className="challenge-period">(61+ ans)</span>
              </h3>
              <div className="number-badge challenge-badge">
                {numerologyResults.challenges.third.number}
              </div>
              <p>{numerologyResults.challenges.third.description}</p>
            </div>
            <div className="challenge-card">
              <h3>
                <span className="challenge-title">Défi principal</span>
                <span className="challenge-period">(toute la vie)</span>
              </h3>
              <div className="number-badge challenge-badge">
                {numerologyResults.challenges.fourth.number}
              </div>
              <p>{numerologyResults.challenges.fourth.description}</p>
            </div>
          </div>
        </section>

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
                  Les cycles de vie décrivent les trois grandes périodes de ton
                  existence.
                </p>
                <p>
                  Chaque cycle apporte ses propres leçons, défis et opportunités
                  de croissance.
                </p>
                <p>
                  C'est une carte temporelle qui guide ton évolution spirituelle
                  et personnelle.
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
                <>
                  <p className="cycle-summary">
                    {numerologyResults.lifeCycles.firstCycle.info.summary}
                  </p>
                  <div className="cycle-details">
                    <p>
                      {numerologyResults.lifeCycles.firstCycle.info.details}
                    </p>
                  </div>
                </>
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
                <>
                  <p className="cycle-summary">
                    {numerologyResults.lifeCycles.secondCycle.info.summary}
                  </p>
                  <div className="cycle-details">
                    <p>
                      {numerologyResults.lifeCycles.secondCycle.info.details}
                    </p>
                  </div>
                </>
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
                <>
                  <p className="cycle-summary">
                    {numerologyResults.lifeCycles.thirdCycle.info.summary}
                  </p>
                  <div className="cycle-details">
                    <p>
                      {numerologyResults.lifeCycles.thirdCycle.info.details}
                    </p>
                  </div>
                </>
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
                  Chaque période offre des conditions favorables pour accomplir
                  tes objectifs.
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
                <>
                  <p className="period-summary">
                    {
                      numerologyResults.realizationPeriods.firstPeriod.info
                        .summary
                    }
                  </p>
                  <div className="period-details">
                    <p>
                      {
                        numerologyResults.realizationPeriods.firstPeriod.info
                          .details
                      }
                    </p>
                  </div>
                </>
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
                <>
                  <p className="period-summary">
                    {
                      numerologyResults.realizationPeriods.secondPeriod.info
                        .summary
                    }
                  </p>
                  <div className="period-details">
                    <p>
                      {
                        numerologyResults.realizationPeriods.secondPeriod.info
                          .details
                      }
                    </p>
                  </div>
                </>
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
                <>
                  <p className="period-summary">
                    {
                      numerologyResults.realizationPeriods.thirdPeriod.info
                        .summary
                    }
                  </p>
                  <div className="period-details">
                    <p>
                      {
                        numerologyResults.realizationPeriods.thirdPeriod.info
                          .details
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
            <div className="period-card">
              <h3>
                <span className="period-title">Quatrième Période</span>
                <span className="period-duration">(48 ans → fin de vie)</span>
              </h3>
              <div className="number-badge period-badge">
                {numerologyResults.realizationPeriods.fourthPeriod.number}
              </div>
              {numerologyResults.realizationPeriods.fourthPeriod.info && (
                <>
                  <p className="period-summary">
                    {
                      numerologyResults.realizationPeriods.fourthPeriod.info
                        .summary
                    }
                  </p>
                  <div className="period-details">
                    <p>
                      {
                        numerologyResults.realizationPeriods.fourthPeriod.info
                          .details
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
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
