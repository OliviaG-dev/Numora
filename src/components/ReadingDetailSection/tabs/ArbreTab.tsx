import React from "react";
import type { TabProps } from "../shared/types";

const ArbreTab: React.FC<TabProps> = () => {
  return (
    <>
      {/* Section Title */}
      <section className="numerology-section section-title-container">
        <div className="section-main-header">
          <div className="title-with-tooltip">
            <h2 className="section-elegant-title">
              <span className="matrix-icon">✦</span>
              Arbre de Vie
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
                  L'Arbre de Vie est une représentation symbolique de ton
                  parcours spirituel.
                </p>
                <p>
                  Il cartographie les différentes sphères (Sephiroth) de ton
                  existence et les chemins entre elles.
                </p>
                <p>
                  Cette analyse révélera bientôt ta position sur l'Arbre de Vie
                  et les leçons associées à chaque sphère.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="numerology-section arbre-section">
        <div className="placeholder-content">
          <p>
            Cette section sera bientôt disponible avec l'analyse de l'Arbre de
            Vie.
          </p>
        </div>
      </section>
    </>
  );
};

export default ArbreTab;
