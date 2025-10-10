import React, { useState } from "react";
import "./Header.css";
import { useAuth } from "../../hooks/useAuth";

interface HeaderProps {
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
      | "dailyVibration"
  ) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { isAuthenticated, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnalysisMenuOpen, setIsAnalysisMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onNavigate("home");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  const handleSignup = () => {
    onNavigate("signup");
  };

  const handleLogin = () => {
    onNavigate("login");
  };

  const handleHome = () => {
    onNavigate("home");
  };

  const handleNewReading = () => {
    onNavigate("newReading");
  };

  const handleProfile = () => {
    onNavigate("profile");
  };

  const handleSettings = () => {
    onNavigate("settings");
  };

  const handleReadings = () => {
    onNavigate("readings");
  };

  const handleDateAnalyzer = () => {
    onNavigate("dateAnalyzer");
  };

  const handleNameAnalyzer = () => {
    onNavigate("nameAnalyzer");
  };

  const handleDailyVibration = () => {
    onNavigate("dailyVibration");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div
          className="logo"
          onClick={handleHome}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/src/assets/logo.png"
            alt="Numora Logo"
            className="logo-icon"
          />
          <span className="logo-text">Numora</span>
        </div>

        {/* Navigation Desktop */}
        <nav className="nav-desktop">
          {isAuthenticated ? (
            <>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleReadings();
                }}
              >
                Mes Lectures
              </a>
              <div className="analysis-menu">
                <button className="analysis-button">
                  <span>Nouvelle Analyse</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="analysis-dropdown">
                  <a
                    href="#"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNewReading();
                    }}
                  >
                    Lecture Complète
                  </a>
                  <a
                    href="#"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDateAnalyzer();
                    }}
                  >
                    Analyse de Date
                  </a>
                  <a
                    href="#"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNameAnalyzer();
                    }}
                  >
                    Analyse de Nom
                  </a>
                </div>
              </div>
              <a
                href="#"
                className="nav-link vibration-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleDailyVibration();
                }}
              >
                Vibration du Jour
              </a>
              <div className="user-menu">
                <button className="user-button">
                  <span className="user-icon">👤</span>
                  <span className="user-name">Mon Profil</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="user-dropdown">
                  <a
                    href="#profil"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfile();
                    }}
                  >
                    Mon Profil
                  </a>
                  <a
                    href="#parametres"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSettings();
                    }}
                  >
                    Paramètres
                  </a>
                  <a
                    href="#deconnexion"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                    className="dropdown-link logout"
                  >
                    Déconnexion
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <button className="auth-btn-secondary" onClick={handleSignup}>
                S'inscrire
              </button>
              <button className="auth-btn-primary" onClick={handleLogin}>
                Se connecter
              </button>
            </div>
          )}
        </nav>

        {/* Menu Mobile */}
        <div className="mobile-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Mobile */}
      <nav className={`nav-mobile ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-content">
          {isAuthenticated ? (
            <>
              <a
                href="#"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleReadings();
                  toggleMenu();
                }}
              >
                Mes Lectures
              </a>
              <a
                href="#"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleDailyVibration();
                  toggleMenu();
                }}
              >
                Vibration du Jour
              </a>
              <div className="mobile-analysis-section">
                <button
                  className="mobile-nav-link mobile-analysis-toggle"
                  onClick={() => setIsAnalysisMenuOpen(!isAnalysisMenuOpen)}
                >
                  Nouvelle Analyse
                  <span
                    className={`mobile-arrow ${
                      isAnalysisMenuOpen ? "open" : ""
                    }`}
                  >
                    ›
                  </span>
                </button>
                <div
                  className={`mobile-analysis-submenu ${
                    isAnalysisMenuOpen ? "open" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="mobile-submenu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNewReading();
                      toggleMenu();
                      setIsAnalysisMenuOpen(false);
                    }}
                  >
                    Lecture Complète
                  </a>
                  <a
                    href="#"
                    className="mobile-submenu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDateAnalyzer();
                      toggleMenu();
                      setIsAnalysisMenuOpen(false);
                    }}
                  >
                    Analyse de Date
                  </a>
                  <a
                    href="#"
                    className="mobile-submenu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNameAnalyzer();
                      toggleMenu();
                      setIsAnalysisMenuOpen(false);
                    }}
                  >
                    Analyse de Nom
                  </a>
                </div>
              </div>
              <a
                href="#profil"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleProfile();
                  toggleMenu();
                }}
              >
                Mon Profil
              </a>
              <a
                href="#parametres"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleSettings();
                  toggleMenu();
                }}
              >
                Paramètres
              </a>
              <a
                href="#deconnexion"
                className="mobile-nav-link logout"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                  toggleMenu();
                }}
              >
                Déconnexion
              </a>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <button
                className="btn-secondary mobile-btn"
                onClick={handleSignup}
              >
                S'inscrire
              </button>
              <button className="btn-primary mobile-btn" onClick={handleLogin}>
                Se connecter
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
