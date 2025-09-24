import React from "react";
import type { TabProps } from "../shared/types";

const MatrixTab: React.FC<TabProps> = ({ numerologyResults, readingData }) => {
  return (
    <section className="numerology-section matrix-section">
      <div className="section-header">
        <div className="title-with-tooltip">
          <h2>Matrix Destiny</h2>
        </div>
      </div>
      <div className="placeholder-content">
        <p>
          Cette section sera bientôt disponible avec l'analyse Matrix Destiny.
        </p>
      </div>
    </section>
  );
};

export default MatrixTab;
