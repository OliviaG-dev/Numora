import React, { useState } from "react";
import "./LoginSection.css";

interface LoginSectionProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const LoginSection: React.FC<LoginSectionProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

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

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      // Simulation d'une requête de connexion
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulation délai

        // Ici vous pouvez ajouter la logique de connexion réelle
        console.log("Données de connexion:", formData);
        alert("Connexion réussie ! Bienvenue dans l'univers de Numora 🌟");

        // Redirection vers l'accueil après connexion
        onNavigate("home");
      } catch (error) {
        setErrors({ general: "Erreur de connexion. Veuillez réessayer." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordEmail.trim()) {
      setErrors({ forgotPassword: "Veuillez entrer votre email" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
      setErrors({ forgotPassword: "L'email n'est pas valide" });
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulation délai
      alert(
        "Un email de réinitialisation a été envoyé à " + forgotPasswordEmail
      );
      setShowForgotPassword(false);
      setForgotPasswordEmail("");
    } catch (error) {
      setErrors({ forgotPassword: "Erreur lors de l'envoi de l'email" });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <section className="login">
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
        </div>

        <div className="login-content">
          <div className="login-header">
            <h1 className="login-title">Mot de passe oublié</h1>
            <p className="login-subtitle">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <div className="login-form-container">
            <form className="login-form" onSubmit={handleForgotPassword}>
              <div className="form-group">
                <label htmlFor="forgotPasswordEmail" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="forgotPasswordEmail"
                  name="forgotPasswordEmail"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  className={`form-input ${
                    errors.forgotPassword ? "error" : ""
                  }`}
                  placeholder="ton.email@exemple.com"
                />
                {errors.forgotPassword && (
                  <span className="error-message">{errors.forgotPassword}</span>
                )}
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                <span className="button-text">
                  {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
                </span>
              </button>

              <div className="login-footer">
                <button
                  type="button"
                  className="back-to-login-button"
                  onClick={() => setShowForgotPassword(false)}
                >
                  ← Retour à la connexion
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="login">
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
      </div>

      <div className="login-content">
        <div className="login-header">
          <h1 className="login-title">Bienvenue dans Numora</h1>
          <p className="login-subtitle">
            Connecte-toi pour découvrir ton profil numérologique
          </p>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleLogin}>
            {errors.general && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {errors.general}
              </div>
            )}

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
                placeholder="Ton mot de passe"
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Se souvenir de moi</span>
                </label>
              </div>

              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setShowForgotPassword(true)}
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              <span className="button-text">
                {isLoading ? "Connexion..." : "Se connecter"}
              </span>
            </button>

            <div className="login-footer">
              <p>
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  className="link"
                  onClick={() => onNavigate("signup")}
                >
                  S'inscrire
                </button>
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

export default LoginSection;
