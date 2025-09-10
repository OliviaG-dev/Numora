import React from "react";
import "./HeroSection.css";

interface HeroSectionProps {
  onNavigate: (page: "home" | "signup") => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="hero">
      {/* Background numérologique */}
      <div className="numerology-bg">
        {/* Chiffres statiques de différentes tailles et angles */}
        <div className="numerology-pattern numerology-large">1</div>
        <div className="numerology-pattern numerology-medium">7</div>
        <div className="numerology-pattern numerology-small">3</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          9
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          5
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          2
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-small">1</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          7
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium">3</div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          7
        </div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          5
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          9
        </div>
        <div className="numerology-pattern numerology-small">2</div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-medium">3</div>

        {/* Chiffres supplémentaires pour un effet plus dense */}
        <div className="numerology-pattern numerology-small numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          3
        </div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          7
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          5
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          9
        </div>
        <div className="numerology-pattern numerology-small">2</div>
        <div className="numerology-pattern numerology-large numerology-tilted">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-medium">3</div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-large numerology-tilted">
          3
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          7
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          5
        </div>
        <div className="numerology-pattern numerology-medium">9</div>
        <div className="numerology-pattern numerology-small numerology-rotated">
          2
        </div>
        <div className="numerology-pattern numerology-large numerology-tilted">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-medium">3</div>

        {/* Chiffres supplémentaires pour la zone bas-droite */}
        <div className="numerology-pattern numerology-small numerology-rotated">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-tilted">
          3
        </div>
        <div className="numerology-pattern numerology-large numerology-rotated">
          7
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          5
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          9
        </div>
        <div className="numerology-pattern numerology-small">2</div>
        <div className="numerology-pattern numerology-large numerology-tilted">
          1
        </div>
        <div className="numerology-pattern numerology-medium numerology-rotated">
          6
        </div>
        <div className="numerology-pattern numerology-small numerology-tilted">
          8
        </div>
        <div className="numerology-pattern numerology-medium">3</div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-emoji">🌌</span>
          Numora
        </h1>
        <p className="hero-subtitle">Chaque nombre raconte ton histoire.</p>

        <div className="hero-description">
          <h2>✨ Ton compagnon numérique de numérologie</h2>
          <p>
            Découvre comment les nombres de ta naissance révèlent tes talents,
            ton énergie et tes cycles de vie. Une application simple, moderne et
            claire pour mieux te comprendre et avancer sereinement.
          </p>
        </div>

        <button className="cta-button" onClick={() => onNavigate("signup")}>
          Découvrir toi
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
