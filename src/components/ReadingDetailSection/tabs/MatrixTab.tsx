import React, { useMemo } from "react";
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny/matrixDestiny";
import { getRelationMeaning } from "../../../utils/matrixDestiny/matrixRelations";
import { getMatrixMeaning } from "../../../utils/matrixDestiny/getMatrixMeaning";
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
    return calculateMatrixDestiny(day, month, year);
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
                <strong>Méthode Traditionnelle</strong> - La Matrix Destiny
                révèle votre mission de vie à travers une structure octogonale
                complexe et des calculs non réduits.
              </p>
              <p>
                Basée sur les traditions numérologiques anciennes, elle utilise
                des nombres jusqu'à 22 et des cycles d'âge détaillés pour
                révéler votre potentiel avec une précision maximale.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Information sur la méthode */}
      <div className="matrix-method-info">
        <div className="method-badge">
          <span className="method-name">Méthode Traditionnelle</span>
          <span className="method-rating">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="method-description">
          Calculs basés sur les traditions numérologiques anciennes avec
          structure octogonale et nombres non réduits pour une précision
          maximale.
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

        {/* Lignes de génération */}
        <div className="generation-lines-container">
          {/* Ligne Masculine */}
          <div className="matrix-generation-line">
            <h4 className="generation-line-title male-title">
              <span className="generation-icon">♂</span>
              Ligne Masculine
            </h4>
            <div className="generation-line-horizontal">
              <div className="generation-number">
                <div className="matrix-number-badge male-badge">
                  {matrixDestiny.center.maleLine.dayMonth}
                </div>
              </div>
              <div className="generation-number">
                <div className="matrix-number-badge mission-badge">
                  {matrixDestiny.center.maleLine.mission}
                </div>
              </div>
              <div className="generation-number">
                <div className="matrix-number-badge male-badge">
                  {matrixDestiny.center.maleLine.dayYear}
                </div>
              </div>
            </div>
          </div>

          {/* Ligne Féminine */}
          <div className="matrix-generation-line">
            <h4 className="generation-line-title female-title">
              <span className="generation-icon">♀</span>
              Ligne Féminine
            </h4>
            <div className="generation-line-horizontal">
              <div className="generation-number">
                <div className="matrix-number-badge female-badge">
                  {matrixDestiny.center.femaleLine.monthYear}
                </div>
              </div>
              <div className="generation-number">
                <div className="matrix-number-badge mission-badge">
                  {matrixDestiny.center.femaleLine.mission}
                </div>
              </div>
              <div className="generation-number">
                <div className="matrix-number-badge female-badge">
                  {matrixDestiny.center.femaleLine.monthDay}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lignes Karmiques */}
      <div className="matrix-karmic-section">
        <h3>Lignes Karmiques</h3>
        <div className="matrix-karmic-grid">
          {/* Ligne 1 */}
          <div className="matrix-karmic-row">
            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.financialKarmicTail.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.financialKarmicTail.secondary}
                </div>
              </div>
              <span>Queue Karmique Financière</span>
              <p className="karmic-description">
                Dettes karmiques liées à l'argent et aux ressources matérielles
              </p>
            </div>

            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.talentZone.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.talentZone.secondary}
                </div>
              </div>
              <span>Zone de Talent</span>
              <p className="karmic-description">
                Dons naturels et compétences hérités karmiquement
              </p>
            </div>
          </div>

          {/* Ligne 2 */}
          <div className="matrix-karmic-row">
            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.parents.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.parents.secondary}
                </div>
              </div>
              <span>Parents & Lien en Société</span>
              <p className="karmic-description">
                Relations karmiques parentales et capacité d'intégration sociale
              </p>
            </div>

            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.karmicLife.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.karmicLife.secondary}
                </div>
              </div>
              <span>Vie Karmique</span>
              <p className="karmic-description">
                Expériences et leçons accumulées des vies antérieures
              </p>
            </div>
          </div>

          {/* Ligne 3 */}
          <div className="matrix-karmic-row">
            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.feminineAncestry.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.feminineAncestry.secondary}
                </div>
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.feminineAncestry.tertiary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.feminineAncestry.quaternary}
                </div>
              </div>
              <span>Antécédents Féminins</span>
              <p className="karmic-description">
                Héritage spirituel de la lignée maternelle
              </p>
            </div>

            <div className="matrix-karmic-item">
              <div className="karmic-badges">
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.masculineAncestry.primary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.masculineAncestry.secondary}
                </div>
                <div className="karmic-badge-primary">
                  {matrixDestiny.karmicLines.masculineAncestry.tertiary}
                </div>
                <div className="karmic-badge-secondary">
                  {matrixDestiny.karmicLines.masculineAncestry.quaternary}
                </div>
              </div>
              <span>Antécédents Masculins</span>
              <p className="karmic-description">
                Héritage spirituel de la lignée paternelle
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chakras */}
      <div className="matrix-chakras-section">
        <h3>Chakras et Énergies</h3>
        <div className="matrix-chakras-grid">
          {/* Sahasrara */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.sahasrara }}>
                {chakraNames.sahasrara}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.sahasrara }}
                >
                  {matrixDestiny.base.day}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.sahasrara }}
                >
                  {matrixDestiny.base.month}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.sahasrara }}
                >
                  {matrixDestiny.chakras.sahasrara.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Ajna */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.ajna }}>{chakraNames.ajna}</h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.ajna }}
                >
                  {matrixDestiny.karmicLines.parents.secondary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.ajna }}
                >
                  {matrixDestiny.karmicLines.talentZone.secondary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.ajna }}
                >
                  {matrixDestiny.chakras.ajna.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Vishuddha */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.vissudha }}>
                {chakraNames.vissudha}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.vissudha }}
                >
                  {matrixDestiny.karmicLines.parents.primary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.vissudha }}
                >
                  {matrixDestiny.karmicLines.talentZone.primary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.vissudha }}
                >
                  {matrixDestiny.chakras.vissudha.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Anahata */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.anahata }}>
                {chakraNames.anahata}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.anahata }}
                >
                  {matrixDestiny.chakras.anahata.physique}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.anahata }}
                >
                  {matrixDestiny.chakras.anahata.energy}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.anahata }}
                >
                  {matrixDestiny.chakras.anahata.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Manipura */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.manipura }}>
                {chakraNames.manipura}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.manipura }}
                >
                  {matrixDestiny.center.maleLine.mission}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.manipura }}
                >
                  {matrixDestiny.center.maleLine.mission}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.manipura }}
                >
                  {matrixDestiny.chakras.manipura.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Svadhisthana */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.svadhisthana }}>
                {chakraNames.svadhisthana}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.svadhisthana }}
                >
                  {matrixDestiny.karmicLines.financialKarmicTail.primary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.svadhisthana }}
                >
                  {matrixDestiny.karmicLines.karmicLife.primary}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.svadhisthana }}
                >
                  {matrixDestiny.chakras.svadhisthana.emotions}
                </div>
              </div>
            </div>
          </div>

          {/* Muladhara */}
          <div className="matrix-chakra-card">
            <div className="chakra-header">
              <h4 style={{ color: chakraColors.muladhara }}>
                {chakraNames.muladhara}
              </h4>
            </div>
            <div className="chakra-values">
              <div className="chakra-value">
                <span className="value-label">Physique</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.muladhara }}
                >
                  {matrixDestiny.base.year}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Énergie</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.muladhara }}
                >
                  {matrixDestiny.base.lifeMission}
                </div>
              </div>
              <div className="chakra-value">
                <span className="value-label">Émotions</span>
                <div
                  className="matrix-number-badge chakra-badge"
                  style={{ backgroundColor: chakraColors.muladhara }}
                >
                  {matrixDestiny.chakras.muladhara.emotions}
                </div>
              </div>
            </div>
          </div>
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
            <div className="special-description">
              <p className="special-text">
                {getMatrixMeaning(matrixDestiny.special.love, "love")}
              </p>
            </div>
          </div>
          <div className="matrix-special-item">
            <div className="special-icon">⚖️</div>
            <div className="matrix-number-badge balance-badge">
              {matrixDestiny.special.balance}
            </div>
            <span>Balance</span>
            <div className="special-description">
              <p className="special-text">
                {getMatrixMeaning(matrixDestiny.special.balance, "pivot")}
              </p>
            </div>
          </div>
          <div className="matrix-special-item">
            <div className="special-icon">💰</div>
            <div className="matrix-number-badge money-badge">
              {matrixDestiny.special.money}
            </div>
            <span>Argent</span>
            <div className="special-description">
              <p className="special-text">
                {getMatrixMeaning(matrixDestiny.special.money, "money")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heart Line */}
      {matrixDestiny.heartLine && (
        <div className="matrix-health-section">
          <h3>Ligne du Cœur</h3>
          <div className="matrix-health-grid">
            <div className="matrix-health-item">
              <div className="matrix-number-badge health-badge">
                {matrixDestiny.heartLine.physique}
              </div>
              <span>Physique</span>
              <p className="health-description">
                Comment tu reçois l'amour / ton monde émotionnel interne.
              </p>
              <div className="relation-meaning">
                <p className="relation-text">
                  {getRelationMeaning(
                    matrixDestiny.heartLine.physique,
                    "interior"
                  )}
                </p>
              </div>
            </div>
            <div className="matrix-health-item">
              <div className="matrix-number-badge health-badge">
                {matrixDestiny.heartLine.energy}
              </div>
              <span>Énergie</span>
              <p className="health-description">
                Comment tu donnes l'amour / ton rapport aux autres.
              </p>
              <div className="relation-meaning">
                <p className="relation-text">
                  {getRelationMeaning(
                    matrixDestiny.heartLine.energy,
                    "exterior"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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
                style={{ top: "50%", left: "6.5%" }}
              >
                <div className="base white-text">{matrixDestiny.base.day}</div>
              </div>

              <div
                className="matrix-number-position base-month"
                style={{ top: "6.5%", left: "50%" }}
              >
                <div className="base white-text">
                  {matrixDestiny.base.month}
                </div>
              </div>

              <div
                className="matrix-number-position base-year"
                style={{ bottom: "41.5%", left: "94%" }}
              >
                <div className="base white-text">{matrixDestiny.base.year}</div>
              </div>

              <div
                className="matrix-number-position base-mission"
                style={{ bottom: "-2%", left: "50%" }}
              >
                <div className="base white-text">
                  {matrixDestiny.base.lifeMission}
                </div>
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
                  {matrixDestiny.center.maleLine.dayMonth}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ top: "29%", left: "29.5%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.primary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ top: "25.1%", left: "25.2%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.secondary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ bottom: "24.8%", left: "71.1%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.tertiary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ bottom: "19.9%", left: "75.3%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.quaternary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ bottom: "10.55%", left: "80.5%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.maleLine.dayYear}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "19%", left: "80.5%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.femaleLine.monthYear}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "29.8%", left: "71%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.primary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "25%", left: "75%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.secondary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ bottom: "24.7%", left: "29.30%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.tertiary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ bottom: "20%", left: "25%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.quaternary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ bottom: "10.5%", left: "19.50%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.femaleLine.monthDay}
                </div>
              </div>

              {/* Domaines spéciaux */}
              <div
                className="matrix-number-position special-love"
                style={{ bottom: "26.2%", left: "63%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.special.love}
                </div>
              </div>

              <div
                className="matrix-number-position special-balance"
                style={{ bottom: "32%", left: "63.5%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.special.balance}
                </div>
              </div>

              <div
                className="matrix-number-position special-money"
                style={{ bottom: "32.5%", left: "69.6%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.special.money}
                </div>
              </div>

              {/* Heart Line */}
              {matrixDestiny.heartLine && (
                <>
                  <div
                    className="matrix-number-position heart-line"
                    style={{ top: "34.8%", left: "50%" }}
                  >
                    <div className="petit black-text">
                      {matrixDestiny.heartLine.energy}
                    </div>
                  </div>
                  <div
                    className="matrix-number-position heart-line"
                    style={{ top: "50%", left: "35.65%" }}
                  >
                    <div className="petit black-text">
                      {matrixDestiny.heartLine.physique}
                    </div>
                  </div>
                </>
              )}
              {/* Zone de Talent */}
              <div
                className="matrix-number-position talent-zone"
                style={{ top: "20.8%", left: "50.2%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.talentZone.primary}
                </div>
              </div>

              <div
                className="matrix-number-position talent-zone"
                style={{ top: "14.8%", left: "50.2%" }}
              >
                <div className="moyen white-text">
                  {matrixDestiny.karmicLines.talentZone.secondary}
                </div>
              </div>

              {/* Parents & Lien en Société */}
              <div
                className="matrix-number-position parents-zone"
                style={{ top: "50%", left: "21%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.parents.primary}
                </div>
              </div>

              <div
                className="matrix-number-position parents-zone"
                style={{ top: "50%", left: "15%" }}
              >
                <div className="petit white-text">
                  {matrixDestiny.karmicLines.parents.secondary}
                </div>
              </div>

              {/*Vie Karmique */}
              <div
                className="matrix-number-position karmic-life"
                style={{ bottom: "16%", left: "50%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.karmicLife.primary}
                </div>
              </div>

              <div
                className="matrix-number-position karmic-life"
                style={{ bottom: "9.5%", left: "50%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.karmicLife.secondary}
                </div>
              </div>

              {/*Queue Karmique Financière*/}
              <div
                className="matrix-number-position financial-karmic-tail"
                style={{ bottom: "45.5%", left: "79.5%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.financialKarmicTail.primary}
                </div>
              </div>

              <div
                className="matrix-number-position financial-karmic-tail"
                style={{ bottom: "44.8%", left: "85.8%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.financialKarmicTail.secondary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatrixTab;
