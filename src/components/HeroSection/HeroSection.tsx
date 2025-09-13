import React from "react";
import "./HeroSection.css";

interface HeroSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
  ) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <img
            src="/src/assets/logo.png"
            alt="Numora Logo"
            className="hero-logo"
          />
          Numora
        </h1>
        <p className="hero-subtitle">Chaque nombre raconte ton histoire.</p>

        <div className="hero-description">
          <h2>Ton compagnon numérique de numérologie</h2>
          <p>
            Découvre comment les nombres de ta naissance révèlent tes talents,
            ton énergie et tes cycles de vie. Une application simple, moderne et
            claire pour mieux te comprendre et avancer sereinement.
          </p>
        </div>

        <button className="cta-button" onClick={() => onNavigate("newReading")}>
          Découvre toi
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
