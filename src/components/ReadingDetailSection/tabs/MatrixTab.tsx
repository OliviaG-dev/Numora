import React, { useMemo } from "react";
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny";
import MatrixDestinyImage from "../../../assets/Matrix_destiny.webp";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  gender: string;
}

interface MatrixTabProps {
  readingData: ReadingData;
}

const MatrixTab: React.FC<MatrixTabProps> = ({ readingData }) => {
  const matrixDestiny = useMemo(() => {
    if (!readingData) return null;

    const [year, month, day] = readingData.birthDate.split("-").map(Number);
    const fullName =
      `${readingData.firstGivenName} ${readingData.secondGivenName} ${readingData.thirdGivenName} ${readingData.familyName}`.trim();
    return calculateMatrixDestiny(day, month, year, fullName);
  }, [readingData]);

  if (!matrixDestiny || !readingData) {
    return (
      <section className="numerology-section matrix-section">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h2>Matrix Destiny</h2>
          </div>
        </div>
        <div className="placeholder-content">
          <p>Calcul de votre Matrix Destiny en cours...</p>
        </div>
      </section>
    );
  }

  const chakraNames = {
    sahasrara: "Sahasrara (Couronne)",
    ajna: "Ajna (3ème Œil)",
    vissudha: "Vishuddha (Gorge)",
    anahata: "Anahata (Cœur)",
    manipura: "Manipura (Plexus Solaire)",
    svadhisthana: "Svadhisthana (Sacré)",
    muladhara: "Muladhara (Racine)",
  };

  const chakraColors = {
    sahasrara: "#9c27b0",
    ajna: "#673ab7",
    vissudha: "#2196f3",
    anahata: "#4caf50",
    manipura: "#ff9800",
    svadhisthana: "#f44336",
    muladhara: "#795548",
  };

  return (
    <section className="numerology-section matrix-section">
      <div className="section-header">
        <div className="title-with-tooltip">
          <h2>Matrix Destiny</h2>
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
                <strong>Méthode Grabovoi</strong> - La Matrix Destiny révèle
                votre mission de vie à travers l'analyse des chakras et des
                cycles temporels.
              </p>
              <p>
                Basée sur les mathématiques pures et la physique quantique, elle
                combine votre date de naissance et votre nom avec les principes
                de la numérologie pour révéler votre potentiel avec une
                précision maximale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information sur la méthode */}
      <div className="matrix-method-info">
        <div className="method-badge">
          <span className="method-name">Méthode Grabovoi</span>
          <span className="method-rating">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="method-description">
          Calculs basés sur les mathématiques pures et la physique quantique
          pour une précision maximale.
        </p>
      </div>

      {/* Base Numbers */}
      <div className="matrix-base-section">
        <h3>Nombres de Base</h3>
        <div className="matrix-base-grid">
          <div className="matrix-base-item">
            <div className="matrix-number-badge day-badge">
              {matrixDestiny.base.day}
            </div>
            <span>Jour</span>
          </div>
          <div className="matrix-base-item">
            <div className="matrix-number-badge month-badge">
              {matrixDestiny.base.month}
            </div>
            <span>Mois</span>
          </div>
          <div className="matrix-base-item">
            <div className="matrix-number-badge year-badge">
              {matrixDestiny.base.year}
            </div>
            <span>Année</span>
          </div>
          <div className="matrix-base-item">
            <div className="matrix-number-badge mission-badge">
              {matrixDestiny.base.lifeMission}
            </div>
            <span>Mission de Vie</span>
          </div>
        </div>
      </div>

      {/* Center */}
      <div className="matrix-center-section">
        <h3>Centre de la Matrix</h3>
        <div className="matrix-center-grid">
          <div className="matrix-center-item">
            <div className="matrix-number-badge mission-badge">
              {matrixDestiny.center.mission}
            </div>
            <span>Mission</span>
          </div>
          <div className="matrix-center-item">
            <div className="matrix-number-badge male-badge">
              {matrixDestiny.center.maleLine}
            </div>
            <span>Ligne Masculine</span>
          </div>
          <div className="matrix-center-item">
            <div className="matrix-number-badge female-badge">
              {matrixDestiny.center.femaleLine}
            </div>
            <span>Ligne Féminine</span>
          </div>
        </div>
      </div>

      {/* Chakras */}
      <div className="matrix-chakras-section">
        <h3>Chakras et Énergies</h3>
        <div className="matrix-chakras-grid">
          {Object.entries(matrixDestiny.chakras).map(([chakraKey, values]) => (
            <div key={chakraKey} className="matrix-chakra-card">
              <div className="chakra-header">
                <h4
                  style={{
                    color: chakraColors[chakraKey as keyof typeof chakraColors],
                  }}
                >
                  {chakraNames[chakraKey as keyof typeof chakraNames]}
                </h4>
              </div>
              <div className="chakra-values">
                <div className="chakra-value">
                  <span className="value-label">Physique</span>
                  <div
                    className="matrix-number-badge chakra-badge"
                    style={{
                      backgroundColor:
                        chakraColors[chakraKey as keyof typeof chakraColors],
                    }}
                  >
                    {values.physique}
                  </div>
                </div>
                <div className="chakra-value">
                  <span className="value-label">Énergie</span>
                  <div
                    className="matrix-number-badge chakra-badge"
                    style={{
                      backgroundColor:
                        chakraColors[chakraKey as keyof typeof chakraColors],
                    }}
                  >
                    {values.energy}
                  </div>
                </div>
                <div className="chakra-value">
                  <span className="value-label">Émotions</span>
                  <div
                    className="matrix-number-badge chakra-badge"
                    style={{
                      backgroundColor:
                        chakraColors[chakraKey as keyof typeof chakraColors],
                    }}
                  >
                    {values.emotions}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cycles */}
      <div className="matrix-cycles-section">
        <h3>Cycles de Vie</h3>
        <div className="matrix-cycles-grid">
          {Object.entries(matrixDestiny.cycles).map(([age, number]) => (
            <div key={age} className="matrix-cycle-item">
              <div className="cycle-age">{age} ans</div>
              <div className="matrix-number-badge cycle-badge">{number}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Special */}
      <div className="matrix-special-section">
        <h3>Domaines Spéciaux</h3>
        <div className="matrix-special-grid">
          <div className="matrix-special-item">
            <div className="special-icon">💕</div>
            <div className="matrix-number-badge love-badge">
              {matrixDestiny.special.love}
            </div>
            <span>Amour</span>
          </div>
          <div className="matrix-special-item">
            <div className="special-icon">💰</div>
            <div className="matrix-number-badge money-badge">
              {matrixDestiny.special.money}
            </div>
            <span>Argent</span>
          </div>
        </div>
      </div>

      {/* Schéma visuel Matrix Destiny */}
      <div className="matrix-visual-section">
        <h3>Schéma de votre Matrix Destiny</h3>
        <div className="matrix-visual-container">
          <div className="matrix-image-wrapper">
            <img
              src={MatrixDestinyImage}
              alt="Matrix Destiny"
              className="matrix-destiny-image"
            />

            {/* Positionnement des chiffres sur l'image */}
            <div className="matrix-numbers-overlay">
              {/* Nombres de base - Positionnement autour de l'image */}
              <div
                className="matrix-number-position base-day"
                style={{ top: "49.5%", left: "6.5%" }}
              >
                <div className="base">{matrixDestiny.base.day}</div>
              </div>

              <div
                className="matrix-number-position base-month"
                style={{ top: "6.5%", right: "48.25%" }}
              >
                <div className="base">{matrixDestiny.base.month}</div>
              </div>

              <div
                className="matrix-number-position base-year"
                style={{ bottom: "42.5%", right: "3%" }}
              >
                <div className="base">{matrixDestiny.base.year}</div>
              </div>

              <div
                className="matrix-number-position base-mission"
                style={{ bottom: "25%", right: "15%" }}
              >
                <div className="base">{matrixDestiny.base.lifeMission}</div>
              </div>

              {/* Centre de la Matrix */}
              <div
                className="matrix-number-position center-mission"
                style={{ top: "50%", left: "50%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.mission}
                </div>
              </div>

              {/* Lignes masculine et féminine */}
              <div
                className="matrix-number-position male-line"
                style={{ top: "19%", left: "19.5%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.maleLine}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "19%", right: "15.75%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.femaleLine}
                </div>
              </div>

              {/* Domaines spéciaux */}
              <div
                className="matrix-number-position special-love"
                style={{ bottom: "15%", left: "50%" }}
              >
                <div className="base">{matrixDestiny.special.love}</div>
              </div>

              <div
                className="matrix-number-position special-money"
                style={{ top: "15%", left: "50%" }}
              >
                <div className="base">{matrixDestiny.special.money}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatrixTab;
