import React from "react";

const TargetAudience: React.FC = () => {
  const audiences = [
    {
      icon: "🤔",
      text: "Curieux de mieux se connaître",
    },
    {
      icon: "🧘‍♀️",
      text: "Passionnés de spiritualité et développement personnel",
    },
    {
      icon: "💕",
      text: "Couples et amis cherchant leur compatibilité",
    },
    {
      icon: "🎓",
      text: "Coachs et praticiens qui veulent enrichir leurs outils",
    },
  ];

  return (
    <section className="target-audience">
      <div className="target-audience-content">
        {/* Citation inspirante */}
        <div className="quote-section">
          <blockquote className="inspirational-quote">
            <p>
              💬 « les nombres révèlent tes talents, ton énergie et tes cycles de vie »
            </p>
          </blockquote>
        </div>

        {/* Pour qui section */}
        <div className="audience-section">
          <h2 className="section-title">🚀 Pour qui ?</h2>
          <div className="audience-list">
            {audiences.map((audience, index) => (
              <div key={index} className="audience-item">
                <span className="audience-icon">{audience.icon}</span>
                <span className="audience-text">{audience.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;
