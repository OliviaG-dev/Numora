import React, { useState } from "react";
import "./Header.css";

interface HeaderProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État temporaire pour la démo

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleQuickLogin = () => {
    setIsLoggedIn(true);
    onNavigate("home");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div
          className="logo"
          onClick={handleHome}
          style={{ cursor: "pointer" }}
        >
          <span className="logo-icon">🌌</span>
          <span className="logo-text">Numora</span>
        </div>

        {/* Navigation Desktop */}
        <nav className="nav-desktop">
          {isLoggedIn ? (
            <>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleHome();
                }}
              >
                Accueil
              </a>
              <a href="#lectures" className="nav-link">
                Mes Lectures
              </a>
              <a
                href="#"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNewReading();
                }}
              >
                Nouvelle Lecture
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
              <button className="btn-secondary" onClick={handleSignup}>
                S'inscrire
              </button>
              <button className="btn-primary" onClick={handleLogin}>
                Se connecter
              </button>
              <button className="btn-quick-login" onClick={handleQuickLogin}>
                🚀 Connexion rapide
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
          {isLoggedIn ? (
            <>
              <a
                href="#"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleHome();
                  toggleMenu();
                }}
              >
                Accueil
              </a>
              <a
                href="#lectures"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Mes Lectures
              </a>
              <a
                href="#"
                className="mobile-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNewReading();
                  toggleMenu();
                }}
              >
                Nouvelle Lecture
              </a>
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
              <button
                className="btn-quick-login mobile-btn"
                onClick={handleQuickLogin}
              >
                🚀 Connexion rapide
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
