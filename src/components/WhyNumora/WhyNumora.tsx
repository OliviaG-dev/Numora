import React from "react";
import "./WhyNumora.css";

const WhyNumora: React.FC = () => {
  const reasons = [
    {
      icon: "🎯",
      title: "Accessible",
      description: "une app intuitive, sans jargon compliqué",
    },
    {
      icon: "🚀",
      title: "Moderne",
      description: "visualisations interactives et interface élégante",
    },
    {
      icon: "🌟",
      title: "Spirituelle et pratique",
      description: "pour mieux se connaître et mieux évoluer",
    },
    {
      icon: "💎",
      title: "Unique",
      description: "un mélange de tradition numérologique et de technologie",
    },
  ];

  return (
    <section className="why-numora">
      <div className="why-numora-content">
        <h2 className="section-title">🌟 Pourquoi Numora ?</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyNumora;
