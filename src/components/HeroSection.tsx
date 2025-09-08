import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-emoji">🌌</span>
          Numora
        </h1>
        <p className="hero-subtitle">
          Ton âme a un code, les nombres l'éclairent.
        </p>

        <div className="hero-description">
          <h2>✨ Ton compagnon numérique de numérologie</h2>
          <p>
            Découvre la puissance cachée des nombres et révèle ton chemin de vie
            avec une application simple, moderne et inspirante.
          </p>
          <p className="hero-cta-text">
            👉 Télécharge dès maintenant et commence ton voyage intérieur.
          </p>
        </div>

        <button className="cta-button">⚡ Découvrir Numora</button>
      </div>
    </section>
  );
};

export default HeroSection;
