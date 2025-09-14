import React, { useState, useEffect, useCallback } from "react";
import "./ReadingDetailSection.css";
import {
  calculateLifePathNumber,
  calculateExpressionNumber,
  calculateSoulUrgeNumber,
  calculatePersonalityNumber,
  calculateBirthdayNumber,
  calculateChallengeNumbers,
} from "../../utils/numerology";
import {
  lifePathData,
  expressionData,
  soulUrgeData,
  personalityData,
  birthdayData,
} from "../../data";
import type { LifePathDetail, ExpressionDetail } from "../../data";

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
            <h2>Chemin de Vie</h2>
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
            <h2>Nombre d'Expression</h2>
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
                <h3>Nombre de l'Âme</h3>
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
                <h3>Nombre de Personnalité</h3>
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
                <h3>Nombre du Jour</h3>
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
          <h2>Nombres de Défi</h2>
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
      </div>

      <div className="reading-actions">
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
      </div>
    </div>
  );
};

export default ReadingDetailSection;
