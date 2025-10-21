import React, { useState } from "react";
import "./Header.css";
import { useAuth } from "../../hooks/useAuth";
import type { NavigateFunction } from "../../types/navigation";

interface HeaderProps {
  onNavigate: NavigateFunction;
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

  const handleCompatibilityAnalyzer = () => {
    onNavigate("compatibilityAnalyzer");
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
          <img src="/logo.png" alt="Numora Logo" className="logo-icon" />
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
                  <a
                    href="#"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCompatibilityAnalyzer();
                    }}
                  >
                    Compatibilité
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
                  <svg
                    className="user-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="8"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
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
                    <svg
                      className="dropdown-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="8"
                        r="4"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
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
                    <svg
                      className="dropdown-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.745 1.475-2.65-1.097-.54-2.378h-2.13l-.54 2.378-2.65 1.097L6 3.6 4 5.6l1.475 1.745-1.097 2.65L2 10.535v2.13l2.378.54 1.097 2.65L4 17.4 6 19.4l1.745-1.475 2.65 1.097.54 2.378h2.13l.54-2.378 2.65-1.097L17.4 20l2-2-1.475-1.745 1.097-2.65L21.4 13.065v-2.13l-2.378-.54z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
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
                    <svg
                      className="dropdown-icon logout-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                  <a
                    href="#"
                    className="mobile-submenu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCompatibilityAnalyzer();
                      toggleMenu();
                      setIsAnalysisMenuOpen(false);
                    }}
                  >
                    Compatibilité
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
                <svg
                  className="dropdown-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
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
                <svg
                  className="dropdown-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M19.622 10.395l-1.097-2.65L20 6l-2-2-1.745 1.475-2.65-1.097-.54-2.378h-2.13l-.54 2.378-2.65 1.097L6 3.6 4 5.6l1.475 1.745-1.097 2.65L2 10.535v2.13l2.378.54 1.097 2.65L4 17.4 6 19.4l1.745-1.475 2.65 1.097.54 2.378h2.13l.54-2.378 2.65-1.097L17.4 20l2-2-1.475-1.745 1.097-2.65L21.4 13.065v-2.13l-2.378-.54z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
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
                <svg
                  className="dropdown-icon logout-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
