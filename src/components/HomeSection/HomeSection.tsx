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
        </div>

        <div className="analyzer-sections">
          <div className="analyzer-card left-card">
            <h3>Analyse de Nom</h3>
            <p>
              Découvre la signification cachée de ton nom et révèle ta
              personnalité, tes talents naturels et ton chemin de vie à travers
              la numérologie.
            </p>
            <button
              className="analyzer-button"
              onClick={() => onNavigate("nameAnalyzer")}
            >
              Analyser mon nom
            </button>
          </div>

          <div className="analyzer-card center-card">
            <h3>Découvre toi</h3>
            <p>
              Découvre comment les nombres de ta naissance révèlent tes talents,
              ton énergie et tes cycles de vie. Une application simple, moderne
              et claire pour mieux te comprendre et avancer sereinement.
            </p>
            <button
              className="analyzer-button center-button"
              onClick={() => onNavigate("newReading")}
            >
              Découvre toi
            </button>
          </div>

          <div className="analyzer-card right-card">
            <h3>Analyse de Date</h3>
            <p>
              Explore les cycles de vie, les défis et les opportunités révélés
              par ta date de naissance pour mieux comprendre ton destin.
            </p>
            <button
              className="analyzer-button"
              onClick={() => onNavigate("dateAnalyzer")}
            >
              Analyser ma date
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
