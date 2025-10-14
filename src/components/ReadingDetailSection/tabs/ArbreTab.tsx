import React, { useMemo, useState } from "react";
import type { TabProps } from "../shared/types";
import {
  analyzeTreeOfLife,
  type TreeOfLifeAnalysis,
  TREE_PATHS,
} from "../../../utils/arbreDeVie/calculateSephiroth";
import {
  getSephiraMeaning,
  getPillarDescription,
  getSephiraNumberMeaning,
  getPathNumberMeaning,
  createPathKey,
} from "../../../utils/arbreDeVie";
import "./ArbreTab.css";

const ArbreTab: React.FC<TabProps> = ({ readingData }) => {
  const [selectedSephira, setSelectedSephira] = useState<number | null>(null);

  // Calculer l'analyse de l'Arbre de Vie
  const treeAnalysis: TreeOfLifeAnalysis | null = useMemo(() => {
    if (!readingData?.birthDate) return null;
    return analyzeTreeOfLife(readingData.birthDate);
  }, [readingData]);

  if (!treeAnalysis || !readingData) {
    return (
      <section className="numerology-section arbre-section">
        <div className="placeholder-content">
          <p>Calcul de votre Arbre de Vie en cours...</p>
        </div>
      </section>
    );
  }

  const { sephirothValues, pillarBalance, dominantPillar, significantPaths } =
    treeAnalysis;

  // Mapping des noms des Sephiroth
  const sephirothNames = {
    kether: "Kether",
    chokhmah: "Chokhmah",
    binah: "Binah",
    chesed: "Chesed",
    gevurah: "Gevurah",
    tipheret: "Tipheret",
    netzach: "Netzach",
    hod: "Hod",
    yesod: "Yesod",
    malkuth: "Malkuth",
  };

  // Mapping des couleurs pour chaque Sephira (correspondant au CSS)
  const sephirothColors = {
    kether: {
      gradient:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(240, 240, 250, 0.4))",
      border: "rgba(255, 255, 255, 0.8)",
    },
    chokhmah: {
      gradient:
        "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.4))",
      border: "rgba(99, 102, 241, 0.8)",
    },
    binah: {
      gradient:
        "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(126, 34, 206, 0.4))",
      border: "rgba(147, 51, 234, 0.8)",
    },
    chesed: {
      gradient:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.4))",
      border: "rgba(59, 130, 246, 0.8)",
    },
    gevurah: {
      gradient:
        "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.4))",
      border: "rgba(239, 68, 68, 0.8)",
    },
    tipheret: {
      gradient:
        "linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.4))",
      border: "rgba(251, 191, 36, 0.8)",
    },
    netzach: {
      gradient:
        "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(22, 163, 74, 0.4))",
      border: "rgba(34, 197, 94, 0.8)",
    },
    hod: {
      gradient:
        "linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.4))",
      border: "rgba(249, 115, 22, 0.8)",
    },
    yesod: {
      gradient:
        "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(147, 51, 234, 0.4))",
      border: "rgba(168, 85, 247, 0.8)",
    },
    malkuth: {
      gradient:
        "linear-gradient(135deg, rgba(115, 70, 50, 0.3), rgba(92, 56, 40, 0.4))",
      border: "rgba(115, 70, 50, 0.8)",
    },
  };

  // Positions des Sephiroth pour le SVG (coordonnées relatives)
  const sephirothPositions = {
    kether: { x: 50, y: 8 },
    chokhmah: { x: 20, y: 20 },
    binah: { x: 80, y: 20 },
    chesed: { x: 20, y: 38 },
    gevurah: { x: 80, y: 38 },
    tipheret: { x: 50, y: 46 },
    netzach: { x: 20, y: 64 },
    hod: { x: 80, y: 64 },
    yesod: { x: 50, y: 80 },
    malkuth: { x: 50, y: 95 },
  };

  // Fonction pour dessiner les chemins
  const renderPaths = () => {
    return TREE_PATHS.map((path, index) => {
      const fromPos =
        sephirothPositions[path.from as keyof typeof sephirothPositions];
      const toPos =
        sephirothPositions[path.to as keyof typeof sephirothPositions];

      return (
        <line
          key={index}
          x1={`${fromPos.x}%`}
          y1={`${fromPos.y}%`}
          x2={`${toPos.x}%`}
          y2={`${toPos.y}%`}
          className="tree-path"
        />
      );
    });
  };

  // Fonction pour rendre une Sephira
  const renderSephira = (
    key: keyof typeof sephirothValues,
    position: number
  ) => {
    const value = sephirothValues[key];
    const name = sephirothNames[key];

    return (
      <div
        key={key}
        className={`sephira ${key} ${
          selectedSephira === position ? "active" : ""
        }`}
        onClick={() => setSelectedSephira(position)}
      >
        <div className="sephira-circle">
          <div className="sephira-number">{value}</div>
          <div className="sephira-name">{name}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Section Title */}
      <section className="numerology-section section-title-container">
        <div className="section-main-header">
          <div className="title-with-tooltip">
            <h2 className="section-elegant-title">
              <span className="matrix-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
              </span>
              Arbre de Vie
              <span className="matrix-icon-end">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
              </span>
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
                  L'Arbre de Vie kabbalistique cartographie les 10 sphères
                  (Sephiroth) de ton existence spirituelle.
                </p>
                <p>
                  Chaque sphère représente une dimension de ton être, calculée à
                  partir de ta date de naissance.
                </p>
                <p>
                  Les 22 chemins qui les relient symbolisent les dynamiques
                  entre ces différentes énergies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="numerology-section arbre-section">
        <div className="arbre-intro">
          <h3>Ton Arbre de Vie Personnel</h3>
          <p>
            L'Arbre de Vie est une carte sacrée de ton parcours spirituel, basée
            sur la sagesse de la Kabbale millénaire.
          </p>
          <p>
            Les 10 Sephiroth (sphères) représentent différents aspects de ton
            être, du divin (Kether) au terrestre (Malkuth).
          </p>
          <p>
            Chaque nombre est calculé à partir de ta date de naissance et révèle
            une facette unique de ton âme.
          </p>
        </div>
      </section>

      {/* Visualisation de l'Arbre */}
      <section className="numerology-section arbre-section">
        <div className="arbre-container">
          <div className="tree-of-life-visual">
            {/* SVG pour les chemins et les piliers */}
            <svg className="tree-svg" viewBox="0 0 100 100">
              {/* Barres des Piliers */}
              {/* Pilier de la Miséricorde (Gauche) - Bleu */}
              <line
                x1="20%"
                y1="20%"
                x2="20%"
                y2="64%"
                className={`pillar-line pillar-mercy ${
                  dominantPillar === "mercy" ? "pillar-dominant" : ""
                }`}
                strokeWidth={dominantPillar === "mercy" ? "6" : "4"}
                stroke="#3b82f6"
                strokeOpacity={dominantPillar === "mercy" ? "0.7" : "0.4"}
                strokeDasharray="5,5"
              />

              {/* Pilier de la Rigueur (Droite) - Rouge */}
              <line
                x1="80%"
                y1="20%"
                x2="80%"
                y2="64%"
                className={`pillar-line pillar-severity ${
                  dominantPillar === "severity" ? "pillar-dominant" : ""
                }`}
                strokeWidth={dominantPillar === "severity" ? "6" : "4"}
                stroke="#ef4444"
                strokeOpacity={dominantPillar === "severity" ? "0.7" : "0.4"}
                strokeDasharray="5,5"
              />

              {/* Pilier de l'Équilibre (Centre) - Or */}
              <line
                x1="50%"
                y1="8%"
                x2="50%"
                y2="95%"
                className={`pillar-line pillar-equilibrium ${
                  dominantPillar === "equilibrium" ? "pillar-dominant" : ""
                }`}
                strokeWidth={dominantPillar === "equilibrium" ? "6" : "4"}
                stroke="#fbbf24"
                strokeOpacity={dominantPillar === "equilibrium" ? "0.7" : "0.4"}
                strokeDasharray="5,5"
              />

              {/* Chemins entre les Sephiroth */}
              {renderPaths()}
            </svg>

            {/* Les 10 Sephiroth */}
            {renderSephira("kether", 1)}
            {renderSephira("chokhmah", 2)}
            {renderSephira("binah", 3)}
            {renderSephira("chesed", 4)}
            {renderSephira("gevurah", 5)}
            {renderSephira("tipheret", 6)}
            {renderSephira("netzach", 7)}
            {renderSephira("hod", 8)}
            {renderSephira("yesod", 9)}
            {renderSephira("malkuth", 10)}
          </div>

          {/* Légende */}
          <div className="tree-legend">
            <h4>Les Trois Piliers</h4>
            <div className="legend-items">
              <div className="legend-item">
                <div
                  className="legend-line"
                  style={{ background: "#3b82f6" }}
                ></div>
                <span className="legend-text">
                  Pilier de la Miséricorde: {pillarBalance.mercy}
                </span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-line"
                  style={{ background: "#ef4444" }}
                ></div>
                <span className="legend-text">
                  Pilier de la Rigueur: {pillarBalance.severity}
                </span>
              </div>
              <div className="legend-item">
                <div
                  className="legend-line"
                  style={{ background: "#fbbf24" }}
                ></div>
                <span className="legend-text">
                  Pilier de l'Équilibre: {pillarBalance.equilibrium}
                </span>
              </div>
            </div>
            <p style={{ marginTop: "1rem", color: "rgba(255,255,255,0.7)" }}>
              Ton pilier dominant:{" "}
              <strong>
                {getPillarDescription(dominantPillar).name} (
                {pillarBalance[dominantPillar]})
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* Analyse du Pilier Dominant */}
      <section className="numerology-section arbre-section">
        <div className="sephira-card">
          <div className="sephira-card-header">
            <div
              className="sephira-card-number"
              style={{
                background:
                  dominantPillar === "mercy"
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.4))"
                    : dominantPillar === "severity"
                    ? "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.4))"
                    : "linear-gradient(135deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.4))",
              }}
            >
              {pillarBalance[dominantPillar]}
            </div>
            <div className="sephira-card-title">
              <h3>{getPillarDescription(dominantPillar).name}</h3>
              <p className="sephira-card-subtitle">
                Ton orientation principale
              </p>
            </div>
          </div>
          <div className="sephira-card-content">
            <p>{getPillarDescription(dominantPillar).description}</p>
            <div className="sephira-keywords">
              {getPillarDescription(dominantPillar).keywords.map(
                (keyword, index) => (
                  <span key={index} className="sephira-keyword-tag">
                    {keyword}
                  </span>
                )
              )}
            </div>
            <div className="sephira-details-grid">
              <div className="sephira-detail-item">
                <h4>Guidance</h4>
                <p>{getPillarDescription(dominantPillar).guidance}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interprétation de chaque Sephira */}
      <section className="numerology-section arbre-section">
        <div className="sephiroth-interpretations">
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Les 10 Sephiroth de ton Arbre de Vie
          </h3>

          {(
            Object.keys(sephirothValues) as Array<keyof typeof sephirothValues>
          ).map((key, index) => {
            const position = index + 1;
            const value = sephirothValues[key];
            const meaning = getSephiraMeaning(position);
            const numberMeaning = getSephiraNumberMeaning(key, value);
            const colors = sephirothColors[key];

            if (!meaning) return null;

            return (
              <div
                key={key}
                className="sephira-card"
                style={{
                  borderColor: colors.border,
                }}
              >
                <div className="sephira-card-header">
                  <div
                    className={`sephira-card-number`}
                    style={{
                      background: colors.gradient,
                      borderColor: colors.border,
                    }}
                  >
                    {value}
                  </div>
                  <div className="sephira-card-title">
                    <h3>
                      {position}. {meaning.name} - {meaning.title}
                    </h3>
                    <p className="sephira-card-subtitle">
                      {meaning.hebrewName} - {meaning.subtitle}
                    </p>
                  </div>
                </div>
                <div className="sephira-card-content">
                  {/* Description de l'essence philosophique de la Sephira */}
                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4
                      style={{
                        color: colors.border,
                        fontSize: "1rem",
                        marginBottom: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                      </svg>
                      Essence philosophique
                    </h4>
                    <p
                      style={{
                        fontSize: "0.95rem",
                        opacity: 0.85,
                        fontStyle: "italic",
                      }}
                    >
                      {meaning.description}
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        opacity: 0.7,
                        marginTop: "0.5rem",
                        color: colors.border,
                      }}
                    >
                      <strong>Domaine :</strong> {meaning.domain}
                    </p>
                  </div>

                  {/* Interprétation personnalisée selon le nombre calculé */}
                  {numberMeaning ? (
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        borderLeft: `4px solid ${colors.border}`,
                        padding: "1.5rem",
                        borderRadius: "8px",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <h4
                        style={{
                          color: colors.border,
                          fontSize: "1.2rem",
                          marginBottom: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                          <circle cx="12" cy="12" r="2" fill="currentColor" />
                        </svg>
                        {numberMeaning.summary}
                      </h4>
                      <p
                        style={{
                          fontSize: "1rem",
                          lineHeight: 1.6,
                          marginBottom: "1rem",
                        }}
                      >
                        {numberMeaning.description}
                      </p>

                      {/* Mots-clés personnalisés */}
                      <div
                        className="sephira-keywords"
                        style={{ marginBottom: "1.5rem" }}
                      >
                        {numberMeaning.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="sephira-keyword-tag"
                            style={{
                              borderColor: colors.border,
                              background: colors.gradient,
                            }}
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>

                      {/* Forces et Défis personnalisés */}
                      <div
                        className="sephira-details-grid"
                        style={{ marginBottom: "1.5rem" }}
                      >
                        <div className="sephira-detail-item">
                          <h4
                            style={{
                              color: colors.border,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                            Forces
                          </h4>
                          <p>{numberMeaning.strengths}</p>
                        </div>
                        <div className="sephira-detail-item">
                          <h4
                            style={{
                              color: colors.border,
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                            }}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M12 2L2 22h20L12 2z" />
                              <line x1="12" y1="9" x2="12" y2="13" />
                              <circle
                                cx="12"
                                cy="17"
                                r="1"
                                fill="currentColor"
                              />
                            </svg>
                            Défis
                          </h4>
                          <p>{numberMeaning.challenges}</p>
                        </div>
                      </div>

                      {/* Guidance personnalisée */}
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          padding: "1rem",
                          borderRadius: "6px",
                          borderLeft: `3px solid ${colors.border}`,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.95rem",
                            fontStyle: "italic",
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            style={{ flexShrink: 0 }}
                          >
                            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                          </svg>
                          <span>
                            <strong>Guidance :</strong> {numberMeaning.guidance}
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="placeholder-content">
                      <p>
                        Aucune interprétation personnalisée disponible pour ce
                        nombre.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chemins Significatifs */}
      <section className="numerology-section arbre-section">
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h3
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "1rem",
            }}
          >
            Tes 5 Chemins les Plus Importants
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.7)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Les chemins de l'Arbre de Vie représentent les connexions et les
            dynamiques entre les différentes sphères de ton existence. Voici les
            5 flux d'énergie les plus puissants dans ton arbre personnel.
          </p>
        </div>

        {significantPaths.map(({ path, value }, index) => {
          const pathKey = createPathKey(path.from, path.to);
          const pathNumberMeaning = getPathNumberMeaning(pathKey, value);

          return (
            <div key={index} className="sephira-card">
              <div className="sephira-card-header">
                <div
                  className="sephira-card-number"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(99, 102, 241, 0.4))",
                    borderColor: "rgba(139, 92, 246, 0.7)",
                  }}
                >
                  {value}
                </div>
                <div className="sephira-card-title">
                  <h3>
                    #{index + 1} -{" "}
                    {sephirothNames[path.from as keyof typeof sephirothNames]} ↔{" "}
                    {sephirothNames[path.to as keyof typeof sephirothNames]}
                  </h3>
                  <p className="sephira-card-subtitle">
                    {path.arcana && `${path.arcana} - `}Chemin d'intensité{" "}
                    {value}
                  </p>
                </div>
              </div>

              {pathNumberMeaning ? (
                <div className="sephira-card-content">
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.2)",
                      borderLeft: "4px solid rgba(139, 92, 246, 0.7)",
                      padding: "1.5rem",
                      borderRadius: "8px",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgba(139, 92, 246, 0.9)",
                        fontSize: "1.2rem",
                        marginBottom: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                      {pathNumberMeaning.summary}
                    </h4>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                      }}
                    >
                      {pathNumberMeaning.description}
                    </p>

                    <div
                      className="sephira-keywords"
                      style={{ marginBottom: "1.5rem" }}
                    >
                      {pathNumberMeaning.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="sephira-keyword-tag"
                          style={{
                            borderColor: "rgba(139, 92, 246, 0.5)",
                            background: "rgba(139, 92, 246, 0.2)",
                          }}
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>

                    <div className="sephira-details-grid">
                      <div className="sephira-detail-item">
                        <h4
                          style={{
                            color: "rgba(139, 92, 246, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                          </svg>
                          Forces
                        </h4>
                        <p>{pathNumberMeaning.strengths}</p>
                      </div>
                      <div className="sephira-detail-item">
                        <h4
                          style={{
                            color: "rgba(139, 92, 246, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 2L2 22h20L12 2z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <circle cx="12" cy="17" r="1" fill="currentColor" />
                          </svg>
                          Défis
                        </h4>
                        <p>{pathNumberMeaning.challenges}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        padding: "1rem",
                        borderRadius: "6px",
                        borderLeft: "3px solid rgba(139, 92, 246, 0.7)",
                        marginTop: "1rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.95rem",
                          fontStyle: "italic",
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                        </svg>
                        <span>
                          <strong>Guidance :</strong>{" "}
                          {pathNumberMeaning.guidance}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sephira-card-content">
                  <p>
                    Interprétation en cours de développement pour ce chemin.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default ArbreTab;
