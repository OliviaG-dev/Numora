import React from "react";

interface CycleData {
  age: number;
  number: number;
  subPeriods?: {
    period: string;
    number: number;
  }[];
}

interface MatrixTimelineProps {
  cycles: Record<string, number>;
}

const MatrixTimeline: React.FC<MatrixTimelineProps> = ({ cycles }) => {
  // Convertir les cycles en données structurées
  const cycleData: CycleData[] = [];
  
  // Extraire les cycles principaux (0, 5, 10, 15, etc.)
  for (let age = 0; age <= 75; age += 5) {
    const cycleNumber = cycles[age.toString()];
    if (cycleNumber !== undefined) {
      const subPeriods = [];
      
      // Ajouter les sous-périodes si elles existent
      const subPeriod1 = cycles[`${age}-${age + 2.5}`];
      const subPeriod2 = cycles[`${age + 2.5}-${age + 5}`];
      
      if (subPeriod1 !== undefined) {
        subPeriods.push({
          period: `${age}-${age + 2.5} ans`,
          number: subPeriod1
        });
      }
      
      if (subPeriod2 !== undefined) {
        subPeriods.push({
          period: `${age + 2.5}-${age + 5} ans`,
          number: subPeriod2
        });
      }
      
      cycleData.push({
        age,
        number: cycleNumber,
        subPeriods: subPeriods.length > 0 ? subPeriods : undefined
      });
    }
  }

  // Interprétations des cycles
  const getCycleInterpretation = (number: number, age: number) => {
    const interpretations: Record<number, string> = {
      1: "Nouveau départ, initiative, leadership",
      2: "Coopération, diplomatie, patience",
      3: "Créativité, expression, communication",
      4: "Travail, stabilité, construction",
      5: "Liberté, changement, aventure",
      6: "Responsabilité, famille, service",
      7: "Spiritualité, analyse, introspection",
      8: "Pouvoir, ambition, réussite matérielle",
      9: "Sagesse, accomplissement, transmission",
      10: "Nouveau cycle, potentiel illimité",
      11: "Inspiration, intuition, vision",
      12: "Service, sacrifice, dévouement",
      13: "Transformation, renaissance, changement",
      14: "Équilibre, harmonie, adaptation",
      15: "Créativité, expression artistique",
      16: "Construction, fondations solides",
      17: "Spiritualité, élévation, sagesse",
      18: "Service humanitaire, générosité",
      19: "Leadership, autorité, accomplissement",
      20: "Nouveau départ, potentiel infini",
      21: "Créativité, inspiration, génie",
      22: "Maîtrise, accomplissement total"
    };

    const baseInterpretation = interpretations[number] || "Période de développement";
    
    // Ajouter des nuances selon l'âge
    if (age <= 20) {
      return `${baseInterpretation} - Période d'apprentissage et de formation`;
    } else if (age <= 40) {
      return `${baseInterpretation} - Période d'action et de réalisation`;
    } else if (age <= 60) {
      return `${baseInterpretation} - Période de maturité et de sagesse`;
    } else {
      return `${baseInterpretation} - Période de transmission et d'héritage`;
    }
  };

  // Couleurs selon le nombre
  const getCycleColor = (number: number) => {
    if (number <= 3) return "#4CAF50"; // Vert - Début
    if (number <= 6) return "#2196F3"; // Bleu - Développement
    if (number <= 9) return "#FF9800"; // Orange - Accomplissement
    if (number <= 12) return "#9C27B0"; // Violet - Spiritualité
    if (number <= 15) return "#F44336"; // Rouge - Transformation
    if (number <= 18) return "#00BCD4"; // Cyan - Élévation
    if (number <= 21) return "#E91E63"; // Rose - Créativité
    return "#795548"; // Marron - Maîtrise
  };

  return (
    <div className="matrix-timeline-container">
      <h3>Timeline des Cycles de Vie</h3>
      <div className="matrix-timeline">
        {cycleData.map((cycle, index) => (
          <div key={cycle.age} className="timeline-item">
            <div className="timeline-marker">
              <div 
                className="cycle-number"
                style={{ backgroundColor: getCycleColor(cycle.number) }}
              >
                {cycle.number}
              </div>
              <div className="cycle-age">{cycle.age} ans</div>
            </div>
            
            <div className="timeline-content">
              <div className="cycle-interpretation">
                {getCycleInterpretation(cycle.number, cycle.age)}
              </div>
              
              {cycle.subPeriods && (
                <div className="sub-periods">
                  {cycle.subPeriods.map((subPeriod, subIndex) => (
                    <div key={subIndex} className="sub-period">
                      <span className="sub-period-label">{subPeriod.period}</span>
                      <span 
                        className="sub-period-number"
                        style={{ color: getCycleColor(subPeriod.number) }}
                      >
                        {subPeriod.number}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <div className="timeline-legend">
        <h4>Légende des Couleurs</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#4CAF50" }}></div>
            <span>1-3 : Nouveaux départs</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#2196F3" }}></div>
            <span>4-6 : Développement</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#FF9800" }}></div>
            <span>7-9 : Accomplissement</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#9C27B0" }}></div>
            <span>10-12 : Spiritualité</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#F44336" }}></div>
            <span>13-15 : Transformation</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#00BCD4" }}></div>
            <span>16-18 : Élévation</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#E91E63" }}></div>
            <span>19-21 : Créativité</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: "#795548" }}></div>
            <span>22 : Maîtrise</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatrixTimeline;
