import React from "react";
import type { TabProps } from "../shared/types";

const ArbreTab: React.FC<TabProps> = () => {
  return (
    <section className="numerology-section arbre-section">
      <div className="section-header">
        <div className="title-with-tooltip">
          <h2>Arbre de Vie</h2>
        </div>
      </div>
      <div className="placeholder-content">
        <p>
          Cette section sera bientôt disponible avec l'analyse de l'Arbre de
          Vie.
        </p>
      </div>
    </section>
  );
};

export default ArbreTab;
