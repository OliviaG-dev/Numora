import React, { useState } from "react";
import "./SignupSection.css";

interface SignupSectionProps {
  onNavigate: (page: "home" | "signup" | "login" | "newReading") => void;
}

const SignupSection: React.FC<SignupSectionProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Le nom est requis";
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms =
        "Vous devez accepter les conditions d'utilisation";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Ici vous pouvez ajouter la logique d'inscription
      console.log("Données d'inscription:", formData);
      alert("Inscription réussie ! Bienvenue dans l'univers de Numora 🌟");
    }
  };

  return (
    <section className="signup">
      {/* Background numérologique */}
      <div className="numerology-bg">
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
      </div>

      <div className="signup-content">
        <div className="signup-header">
          <h1 className="signup-title">
            <span className="signup-emoji">🌌</span>
            Rejoins l'univers Numora
          </h1>
          <p className="signup-subtitle">
            Découvre les secrets de ta personnalité à travers les nombres
          </p>
        </div>

        <div className="signup-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-section">
              <h3 className="form-section-title">Informations personnelles</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.firstName ? "error" : ""}`}
                    placeholder="Ton prénom"
                  />
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.lastName ? "error" : ""}`}
                    placeholder="Ton nom"
                  />
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  placeholder="ton.email@exemple.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Sécurité</h3>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Minimum 8 caractères"
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.confirmPassword ? "error" : ""
                    }`}
                    placeholder="Répète ton mot de passe"
                  />
                  {errors.confirmPassword && (
                    <span className="error-message">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    J'accepte les{" "}
                    <a href="#" className="link">
                      conditions d'utilisation
                    </a>{" "}
                    et la{" "}
                    <a href="#" className="link">
                      politique de confidentialité
                    </a>{" "}
                    de Numora *
                  </span>
                </label>
                {errors.acceptTerms && (
                  <span className="error-message">{errors.acceptTerms}</span>
                )}
              </div>
            </div>

            <button type="submit" className="signup-button">
              <span className="button-text">Créer mon compte</span>
              <span className="button-emoji">✨</span>
            </button>

            <div className="signup-footer">
              <p>
                Déjà un compte ?{" "}
                <a href="#" className="link">
                  Se connecter
                </a>
              </p>
              <button
                className="back-button"
                onClick={() => onNavigate("home")}
                type="button"
              >
                ← Retour à l'accueil
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
