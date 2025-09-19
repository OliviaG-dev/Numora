import React from "react";
import "./HomeSection.css";

interface HomeSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "dateAnalyzer"
      | "nameAnalyzer"
  ) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <section className="home">
      <div className="home-content">
        <h1 className="home-title">
          <img
            src="/src/assets/logo.png"
            alt="Numora Logo"
            className="home-logo"
          />
          Numora
        </h1>
        <p className="home-subtitle">Chaque nombre raconte ton histoire.</p>

        <div className="home-description">
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

export default HomeSection;
