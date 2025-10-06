import React, { useMemo } from "react";
import { calculateMatrixDestiny } from "../../../utils/matrixDestiny/matrixDestiny";
import { getRelationMeaning } from "../../../utils/matrixDestiny/matrixRelations";
import { getMatrixMeaning } from "../../../utils/matrixDestiny/getMatrixMeaning";
import { getExternalRelationsMeaning } from "../../../utils/matrixDestiny/getExternalRelationsMeaning";
import { getBaseNumberMeaning } from "../../../utils/matrixDestiny/getBaseNumberMeaning";
import { getCentralMissionMeaning } from "../../../utils/matrixDestiny/getCentralMissionMeaning";
import { getFeminineLineMeaning } from "../../../utils/matrixDestiny/getFeminineLineMeaning";
import { getMasculineLineMeaning } from "../../../utils/matrixDestiny/getMasculineLineMeaning";
import MatrixDestinyImage from "../../../assets/Matrix_destiny.webp";
import "./MatrixTab.css";

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
            <h3>Matrix Destiny</h3>
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
    sahasrara: "#9e4492", // Violet magenta du schéma Matrix Destiny
    ajna: "#1e4396", // Bleu foncé du schéma Matrix Destiny
    vissudha: "#00ade3", // Bleu cyan du schéma Matrix Destiny
    anahata: "#5fb228", // Vert du schéma Matrix Destiny
    manipura: "#f5eb3a", // Jaune du schéma Matrix Destiny
    svadhisthana: "#FAB632", // Orange du schéma Matrix Destiny
    muladhara: "#e83b11", // Rouge-orange du schéma Matrix Destiny
  };

  return (
    <>
      {/* Section Title */}
      <section className="numerology-section section-title-container">
        <div className="section-main-header">
          <div className="title-with-tooltip">
            <h2 className="section-elegant-title">
              <span className="matrix-icon">✦</span>
              Matrix Destiny
              <span className="matrix-icon-end">✦</span>
            </h2>
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
                  Basée sur les traditions numérologiques anciennes, elle
                  utilise des nombres jusqu'à 22 et des cycles d'âge détaillés
                  pour révéler votre potentiel avec une précision maximale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Base Numbers */}
      <div className="matrix-base-section">
        <div className="title-with-tooltip">
          <h3>Nombres de Base</h3>
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
                Les nombres de base sont les éléments fondamentaux de ta Matrix
                Destiny.
              </p>
              <p>
                <strong>Jour, Mois, Année</strong> : représentent les énergies
                de ta date de naissance qui façonnent ton essence.
              </p>
              <p>
                Ces trois nombres forment la base de tous les autres calculs de
                ta matrice personnelle.
              </p>
            </div>
          </div>
        </div>
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

      {/* Significations des Nombres de Base */}
      <div className="matrix-base-meanings-section">
        <div className="title-with-tooltip">
          <h3>Significations des Nombres de Base</h3>
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
                Chaque nombre de base porte une signification profonde et des
                mots-clés spécifiques.
              </p>
              <p>
                Ces significations révèlent les énergies fondamentales qui
                influencent ta destinée et ton chemin de vie.
              </p>
              <p>
                Comprendre ces significations t'aide à mieux saisir l'essence de
                ta Matrix Destiny.
              </p>
            </div>
          </div>
        </div>
        <div className="matrix-base-meanings-grid">
          {/* Jour */}
          <div className="matrix-base-meaning-card">
            <div className="meaning-card-header">
              <div className="matrix-number-badge day-badge">
                {matrixDestiny.base.day}
              </div>
              <div className="title-with-tooltip">
                <h4>Essence intérieure</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Essence intérieure</strong> : Ta nature profonde,
                      ton être authentique qui se manifeste dans tes actions et
                      tes choix de vie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="meaning-card-content">
              <div className="keywords-section">
                <h5>Mots-clés</h5>
                <p className="keywords-text">
                  {getBaseNumberMeaning(matrixDestiny.base.day, "jour")
                    ?.mots_cles || "N/A"}
                </p>
              </div>
              <div className="description-section">
                <h5>Description</h5>
                <p className="description-text">
                  {getBaseNumberMeaning(matrixDestiny.base.day, "jour")
                    ?.description || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Mois */}
          <div className="matrix-base-meaning-card">
            <div className="meaning-card-header">
              <div className="matrix-number-badge month-badge">
                {matrixDestiny.base.month}
              </div>
              <div className="title-with-tooltip">
                <h4>Personnalité</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Personnalité</strong> : Tes traits de caractère,
                      tes comportements et la façon dont tu interagis avec le
                      monde qui t'entoure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="meaning-card-content">
              <div className="keywords-section">
                <h5>Mots-clés</h5>
                <p className="keywords-text">
                  {getBaseNumberMeaning(matrixDestiny.base.month, "mois")
                    ?.mots_cles || "N/A"}
                </p>
              </div>
              <div className="description-section">
                <h5>Description</h5>
                <p className="description-text">
                  {getBaseNumberMeaning(matrixDestiny.base.month, "mois")
                    ?.description || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Année */}
          <div className="matrix-base-meaning-card">
            <div className="meaning-card-header">
              <div className="matrix-number-badge year-badge">
                {matrixDestiny.base.year}
              </div>
              <div className="title-with-tooltip">
                <h4>Le monde extérieur</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Le monde extérieur</strong> : Ton rapport à la
                      société, à l'environnement et aux influences extérieures
                      qui façonnent ta vie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="meaning-card-content">
              <div className="keywords-section">
                <h5>Mots-clés</h5>
                <p className="keywords-text">
                  {getBaseNumberMeaning(matrixDestiny.base.year, "annee")
                    ?.mots_cles || "N/A"}
                </p>
              </div>
              <div className="description-section">
                <h5>Description</h5>
                <p className="description-text">
                  {getBaseNumberMeaning(matrixDestiny.base.year, "annee")
                    ?.description || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Mission de Vie */}
          <div className="matrix-base-meaning-card">
            <div className="meaning-card-header">
              <div className="matrix-number-badge mission-badge">
                {matrixDestiny.base.lifeMission}
              </div>
              <div className="title-with-tooltip">
                <h4>But spirituel global</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>But spirituel global</strong> : Ta mission de vie
                      ultime, ton objectif spirituel et le sens profond de ton
                      existence sur cette terre.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="meaning-card-content">
              <div className="keywords-section">
                <h5>Mots-clés</h5>
                <p className="keywords-text">
                  {getBaseNumberMeaning(
                    matrixDestiny.base.lifeMission,
                    "mission_vie"
                  )?.mots_cles || "N/A"}
                </p>
              </div>
              <div className="description-section">
                <h5>Description</h5>
                <p className="description-text">
                  {getBaseNumberMeaning(
                    matrixDestiny.base.lifeMission,
                    "mission_vie"
                  )?.description || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center */}
      <div className="matrix-center-section">
        <div className="title-with-tooltip">
          <h3>Centre de la Matrix</h3>
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
                Le centre de la Matrix représente ton essence spirituelle et ta
                mission de vie.
              </p>
              <p>
                Les <strong>lignes de génération</strong> (masculine et
                féminine) montrent les héritages énergétiques de tes lignées
                paternelle et maternelle.
              </p>
              <p>
                Le <strong>nombre central</strong> est ton point d'ancrage, le
                cœur de ton identité spirituelle et ta mission principale.
              </p>
            </div>
          </div>
        </div>

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

      {/* Significations des Lignes */}
      <div className="matrix-lines-meanings-section">
        <div className="title-with-tooltip">
          <h3>Significations des Lignes</h3>
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
                Les lignes masculine, féminine et la mission centrale révèlent
                les aspects profonds de ton identité spirituelle.
              </p>
              <p>
                <strong>Mission Centrale</strong> : ton équilibre intérieur et
                ta mission de vie ultime.
              </p>
              <p>
                <strong>Ligne Masculine</strong> : ton héritage paternel et tes
                énergies d'action.
              </p>
              <p>
                <strong>Ligne Féminine</strong> : ton héritage maternel et tes
                énergies réceptives.
              </p>
            </div>
          </div>
        </div>
        <div className="matrix-lines-meanings-grid">
          {/* Ligne Masculine - Spirit */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-masculine-badge">
                {matrixDestiny.center.maleLine.dayMonth}
              </div>
              <div className="title-with-tooltip">
                <h4>Masculin - Esprit</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Esprit</strong> : L'aspect mental et intellectuel
                      de ta ligne masculine.
                    </p>
                    <p>
                      Représente ta capacité de réflexion, d'analyse et de
                      compréhension des concepts abstraits.
                    </p>
                    <p>
                      C'est l'énergie de la pensée logique et de la vision
                      stratégique héritée de ta lignée paternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.dayMonth,
                    "spirit"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.dayMonth,
                    "spirit"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne Masculine - Heart */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-masculine-badge">
                {matrixDestiny.center.maleLine.mission}
              </div>
              <div className="title-with-tooltip">
                <h4>Masculin - Cœur</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Cœur</strong> : L'aspect émotionnel et relationnel
                      de ta ligne masculine.
                    </p>
                    <p>
                      Représente ta capacité à exprimer tes émotions et à créer
                      des liens profonds avec les autres.
                    </p>
                    <p>
                      C'est l'énergie de l'amour, de la compassion et de
                      l'empathie héritée de ta lignée paternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.mission,
                    "heart"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.mission,
                    "heart"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne Masculine - Energy */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-masculine-badge">
                {matrixDestiny.center.maleLine.dayYear}
              </div>
              <div className="title-with-tooltip">
                <h4>Masculin - Manifestation</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Manifestation</strong> : L'aspect action et
                      réalisation de ta ligne masculine.
                    </p>
                    <p>
                      Représente ta capacité à transformer tes idées en actions
                      concrètes et à manifester tes projets.
                    </p>
                    <p>
                      C'est l'énergie de la volonté, de la persévérance et de
                      l'accomplissement héritée de ta lignée paternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.dayYear,
                    "energy"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getMasculineLineMeaning(
                    matrixDestiny.center.maleLine.dayYear,
                    "energy"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne Féminine - Spirit */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-feminine-badge">
                {matrixDestiny.center.femaleLine.monthYear}
              </div>
              <div className="title-with-tooltip">
                <h4>Féminin - Âme</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Âme</strong> : L'aspect spirituel et intuitif de
                      ta ligne féminine.
                    </p>
                    <p>
                      Représente ta connexion à l'inconscient, à l'intuition et
                      à la sagesse intérieure.
                    </p>
                    <p>
                      C'est l'énergie de la sensibilité, de la réceptivité et de
                      la guidance spirituelle héritée de ta lignée maternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.monthYear,
                    "spirit"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.monthYear,
                    "spirit"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne Féminine - Heart */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-feminine-badge">
                {matrixDestiny.center.femaleLine.mission}
              </div>
              <div className="title-with-tooltip">
                <h4>Féminin - Cœur</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Cœur</strong> : L'aspect émotionnel et relationnel
                      de ta ligne féminine.
                    </p>
                    <p>
                      Représente ta capacité à ressentir profondément et à créer
                      des liens authentiques avec les autres.
                    </p>
                    <p>
                      C'est l'énergie de l'amour inconditionnel, de la
                      compassion et de la guérison héritée de ta lignée
                      maternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.mission,
                    "heart"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.mission,
                    "heart"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Ligne Féminine - Energy */}
          <div className="matrix-line-meaning-card">
            <div className="line-meaning-card-header">
              <div className="line-feminine-badge">
                {matrixDestiny.center.femaleLine.monthDay}
              </div>
              <div className="title-with-tooltip">
                <h4>Féminin - Réalisation</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Réalisation</strong> : L'aspect créatif et
                      nourricier de ta ligne féminine.
                    </p>
                    <p>
                      Représente ta capacité à créer, à donner naissance et à
                      nourrir tes projets et relations.
                    </p>
                    <p>
                      C'est l'énergie de la fertilité, de la créativité et de
                      l'accomplissement maternel héritée de ta lignée
                      maternelle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-meaning-card-content">
              <div className="line-keywords-section">
                <h5>Mot-clé</h5>
                <p className="line-keywords-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.monthDay,
                    "energy"
                  )?.keyword || "N/A"}
                </p>
              </div>
              <div className="line-interpretation-section">
                <h5>Interprétation</h5>
                <p className="line-interpretation-text">
                  {getFeminineLineMeaning(
                    matrixDestiny.center.femaleLine.monthDay,
                    "energy"
                  )?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Mission Centrale - Carte en pleine largeur */}
          <div className="central-mission-full-card">
            <div className="central-mission-full-header">
              <div className="central-mission-badge">
                {matrixDestiny.center.mission}
              </div>
              <div className="title-with-tooltip">
                <h4>Mission Centrale</h4>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Mission Centrale</strong> : Le cœur de ta Matrix
                      Destiny et ton équilibre intérieur.
                    </p>
                    <p>
                      Représente ta mission de vie ultime, l'essence de ton être
                      et le point d'ancrage de ton identité spirituelle.
                    </p>
                    <p>
                      C'est l'énergie qui unifie tous les aspects de ta
                      personnalité et guide tes choix de vie les plus
                      importants.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="central-mission-full-content">
              <div className="central-mission-full-keywords">
                <h5>Mot-clé</h5>
                <p className="central-mission-full-keywords-text">
                  {getCentralMissionMeaning(matrixDestiny.center.mission)
                    ?.keyword || "N/A"}
                </p>
              </div>
              <div className="central-mission-full-interpretation">
                <h5>Interprétation</h5>
                <p className="central-mission-full-interpretation-text">
                  {getCentralMissionMeaning(matrixDestiny.center.mission)
                    ?.interpretation || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lignes Karmiques */}
      <div className="matrix-karmic-section">
        <div className="title-with-tooltip">
          <h3>Lignes Karmiques</h3>
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
                Les lignes karmiques révèlent les schémas hérités de tes
                ancêtres et les leçons karmiques à apprendre.
              </p>
              <p>
                Elles représentent les énergies familiales transmises à travers
                les générations et leur impact sur ta vie.
              </p>
              <p>
                Comprendre ces lignes t'aide à identifier les patterns à
                transformer et les héritages énergétiques à libérer.
              </p>
            </div>
          </div>
        </div>
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
        <div className="title-with-tooltip">
          <h3>Chakras et Énergies</h3>
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
                Les chakras représentent les 7 centres énergétiques de ton corps
                et leur influence sur ta vie.
              </p>
              <p>
                Chaque chakra combine des aspects physiques, énergétiques et
                émotionnels qui définissent ton équilibre intérieur.
              </p>
              <p>
                De la racine (Muladhara) à la couronne (Sahasrara), ils forment
                une carte de ton évolution spirituelle et énergétique.
              </p>
            </div>
          </div>
        </div>
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
        <div className="title-with-tooltip">
          <h3>Domaines Spéciaux</h3>
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
                Les domaines spéciaux représentent trois aspects fondamentaux de
                ta vie.
              </p>
              <p>
                <strong>Amour</strong> : ta capacité à aimer et être aimé, tes
                relations affectives.
              </p>
              <p>
                <strong>Balance</strong> : l'équilibre entre l'amour et
                l'argent, ton centre de stabilité.
              </p>
              <p>
                <strong>Argent</strong> : ta relation à l'abondance matérielle
                et ta prospérité financière.
              </p>
            </div>
          </div>
        </div>
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
          <div className="title-with-tooltip">
            <h3>Ligne du Cœur</h3>
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
                  La ligne du cœur révèle ta relation à l'amour et aux émotions.
                </p>
                <p>
                  <strong>Physique</strong> indique comment tu reçois l'amour et
                  ton monde émotionnel interne.
                </p>
                <p>
                  <strong>Énergie</strong> montre comment tu donnes l'amour et
                  ton rapport aux autres.
                </p>
                <p>
                  Ces deux aspects forment le chakra Anahata, centre de l'amour
                  universel.
                </p>
              </div>
            </div>
          </div>
          <div className="matrix-health-grid">
            <div className="matrix-health-item">
              <div className="matrix-number-badge health-badge">
                {matrixDestiny.heartLine.physique}
              </div>
              <div className="title-with-tooltip">
                <span>Physique</span>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Physique</strong> : Comment tu reçois l'amour et
                      ton monde émotionnel interne.
                    </p>
                    <p>
                      Représente ta capacité à accueillir l'amour des autres et
                      à ressentir les émotions profondément.
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="title-with-tooltip">
                <span>Énergie</span>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="14"
                      height="14"
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
                      <strong>Énergie</strong> : Comment tu donnes l'amour et
                      ton rapport aux autres.
                    </p>
                    <p>
                      Représente ta capacité à exprimer ton amour et à créer des
                      liens émotionnels avec autrui.
                    </p>
                  </div>
                </div>
              </div>
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

      {/* Relations Extérieures */}
      <div className="matrix-external-relations-section">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Relations Extérieures</h3>
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
                  Cette section révèle la manière dont une personne ou une
                  organisation interagit avec le monde extérieur. Elle montre
                  comment l'énergie se manifeste dans les relations sociales,
                  professionnelles et matérielles.
                </p>
                <p>
                  Les nombres ici traduisent la capacité à influencer, donner et
                  agir dans la société.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="matrix-external-relations-grid">
          <div className="matrix-external-relation-item">
            <div className="matrix-number-badge external-relation-badge">
              {matrixDestiny.externalRelations.personalPower}
            </div>
            <div className="title-with-tooltip">
              <span>Pouvoir Personnel</span>
              <div className="tooltip">
                <span className="tooltip-icon">
                  <svg
                    width="14"
                    height="14"
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
                    <strong>Pouvoir Personnel</strong> : Ce chiffre reflète la
                    manière dont tu t'affirmes au sein des groupes, au travail
                    ou dans la société en général.
                  </p>
                  <p>
                    Représente ta capacité à prendre des décisions, à diriger et
                    à exercer ton autorité naturelle.
                  </p>
                </div>
              </div>
            </div>
            <div className="relation-meaning">
              <p className="relation-text">
                {getExternalRelationsMeaning(
                  matrixDestiny.externalRelations.personalPower,
                  "pouvoir_social"
                )}
              </p>
            </div>
          </div>
          <div className="matrix-external-relation-item">
            <div className="matrix-number-badge external-relation-badge">
              {matrixDestiny.externalRelations.socialInfluence}
            </div>
            <div className="title-with-tooltip">
              <span>Influence Sociale</span>
              <div className="tooltip">
                <span className="tooltip-icon">
                  <svg
                    width="14"
                    height="14"
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
                    <strong>Influence Sociale</strong> : Cela montre comment ton
                    énergie inspire et influence naturellement les autres, sans
                    avoir à imposer quoi que ce soit.
                  </p>
                  <p>
                    Représente ton charisme, ton pouvoir de persuasion et ta
                    capacité à motiver les autres.
                  </p>
                </div>
              </div>
            </div>
            <div className="relation-meaning">
              <p className="relation-text">
                {getExternalRelationsMeaning(
                  matrixDestiny.externalRelations.socialInfluence,
                  "influence_social"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schéma visuel Matrix Destiny */}
      <div className="matrix-visual-section">
        <div className="title-with-tooltip">
          <h3>Schéma de votre Matrix Destiny</h3>
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
                Le schéma octogonal de la Matrix Destiny représente visuellement
                tous les aspects de ton être.
              </p>
              <p>
                Chaque position a une signification précise : du centre (ta
                mission de vie) aux lignes karmiques, en passant par les chakras
                et les domaines spéciaux.
              </p>
              <p>
                Les nombres sont positionnés selon la méthode traditionnelle
                pour révéler la structure énergétique complète de ta destinée.
              </p>
            </div>
          </div>
        </div>
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
                style={{ top: "50%", left: "94%" }}
              >
                <div className="base white-text">{matrixDestiny.base.year}</div>
              </div>

              <div
                className="matrix-number-position base-mission"
                style={{ top: "94%", left: "50%" }}
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

              {/* Badges à côté du centre */}
              <div
                className="matrix-number-position center-adjacent-medium"
                style={{ top: "50%", left: "58.5%" }}
              >
                <div className="moyen center-adjacent-badge">
                  {matrixDestiny.externalRelations.personalPower}
                </div>
              </div>

              <div
                className="matrix-number-position center-adjacent-small"
                style={{ top: "50%", left: "64.5%" }}
              >
                <div className="petit center-adjacent-badge">
                  {matrixDestiny.externalRelations.socialInfluence}
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
                style={{ top: "70.8%", left: "71.1%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.tertiary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ top: "75%", left: "75.3%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.masculineAncestry.quaternary}
                </div>
              </div>

              <div
                className="matrix-number-position male-line"
                style={{ top: "81%", left: "80.5%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.maleLine.dayYear}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "19.5%", left: "80.5%" }}
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
                style={{ top: "70.8%", left: "29.30%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.tertiary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "75%", left: "25%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.feminineAncestry.quaternary}
                </div>
              </div>

              <div
                className="matrix-number-position female-line"
                style={{ top: "81%", left: "19.50%" }}
              >
                <div className="base black-text">
                  {matrixDestiny.center.femaleLine.monthDay}
                </div>
              </div>

              {/* Domaines spéciaux */}
              <div
                className="matrix-number-position special-love"
                style={{ top: "69.5%", left: "63%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.special.love}
                </div>
              </div>

              <div
                className="matrix-number-position special-balance"
                style={{ top: "63.5%", left: "63.5%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.special.balance}
                </div>
              </div>

              <div
                className="matrix-number-position special-money"
                style={{ top: "63%", left: "69.6%" }}
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
                style={{ top: "79.7%", left: "50%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.karmicLife.primary}
                </div>
              </div>

              <div
                className="matrix-number-position karmic-life"
                style={{ top: "85.5%", left: "50%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.karmicLife.secondary}
                </div>
              </div>

              {/*Queue Karmique Financière*/}
              <div
                className="matrix-number-position financial-karmic-tail"
                style={{ top: "50%", left: "79.5%" }}
              >
                <div className="petit black-text">
                  {matrixDestiny.karmicLines.financialKarmicTail.primary}
                </div>
              </div>

              <div
                className="matrix-number-position financial-karmic-tail"
                style={{ top: "50%", left: "85.8%" }}
              >
                <div className="moyen black-text">
                  {matrixDestiny.karmicLines.financialKarmicTail.secondary}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatrixTab;
