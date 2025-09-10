import React, { useState } from "react";
import "./Header.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État temporaire pour la démo

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">🌌</span>
          <span className="logo-text">Numora</span>
        </div>

        {/* Navigation Desktop */}
        <nav className="nav-desktop">
          {isLoggedIn ? (
            <>
              <a href="#accueil" className="nav-link">
                Accueil
              </a>
              <a href="#lectures" className="nav-link">
                Mes Lectures
              </a>
              <a href="#nouvelle" className="nav-link">
                Nouvelle Lecture
              </a>
              <div className="user-menu">
                <button className="user-button">
                  <span className="user-icon">👤</span>
                  <span className="user-name">Mon Profil</span>
                  <span className="dropdown-arrow">▼</span>
                </button>
                <div className="user-dropdown">
                  <a href="#profil" className="dropdown-link">
                    Mon Profil
                  </a>
                  <a href="#parametres" className="dropdown-link">
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
              <button className="btn-secondary" onClick={handleLogin}>
                S'inscrire
              </button>
              <button className="btn-primary" onClick={handleLogin}>
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
          {isLoggedIn ? (
            <>
              <a
                href="#accueil"
                className="mobile-nav-link"
                onClick={toggleMenu}
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
                href="#nouvelle"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Nouvelle Lecture
              </a>
              <a
                href="#profil"
                className="mobile-nav-link"
                onClick={toggleMenu}
              >
                Mon Profil
              </a>
              <a
                href="#parametres"
                className="mobile-nav-link"
                onClick={toggleMenu}
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
                onClick={handleLogin}
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
