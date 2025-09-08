import React from "react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: "🔮",
      title: "Chemin de vie",
      description: "décrypte ton nombre principal et sa signification",
    },
    {
      icon: "✨",
      title: "Nombres personnels",
      description: "âme, destinée, personnalité",
    },
    {
      icon: "🌙",
      title: "Cycles de vie",
      description: "années, mois et jours personnels",
    },
    {
      icon: "💫",
      title: "Compatibilité",
      description: "analyse des énergies entre deux personnes",
    },
    {
      icon: "📜",
      title: "Rapports personnalisés",
      description: "textes clairs et inspirants",
    },
    {
      icon: "🔄",
      title: "Partage facile",
      description: "exporte ou envoie ton profil",
    },
  ];

  return (
    <section className="features">
      <div className="features-content">
        <h2 className="features-title">🔮 Fonctionnalités principales</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
