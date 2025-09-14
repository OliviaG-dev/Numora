import React, { useState } from "react";
import "./NewReadingSection.css";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  birthTime: string;
}

interface NewReadingSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "readingDetail",
    readingData?: ReadingData
  ) => void;
}

const NewReadingSection: React.FC<NewReadingSectionProps> = ({
  onNavigate,
}) => {
  // Simulation de l'état de connexion (à remplacer par votre logique d'authentification)
  const [isLoggedIn] = useState(false); // Changez à true pour tester l'état connecté

  const [formData, setFormData] = useState({
    // Informations de la lecture
    readingName: "",
    category: "personnelle", // personnelle, amie, connaissance, famille, collegue

    // Données numérologiques détaillées
    firstGivenName: "",
    secondGivenName: "",
    thirdGivenName: "",
    familyName: "",

    // Données de naissance
    birthDate: "",
    birthTime: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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

    // Validation des informations de la lecture (seulement si connecté)
    if (isLoggedIn && !formData.readingName.trim()) {
      newErrors.readingName = "Le nom de la lecture est requis";
    }

    // Validation des données numérologiques
    if (!formData.firstGivenName.trim()) {
      newErrors.firstGivenName =
        "Le premier prénom est requis pour l'analyse numérologique";
    }

    if (!formData.familyName.trim()) {
      newErrors.familyName =
        "Le nom de famille est requis pour l'analyse numérologique";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "La date de naissance est requise";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Simulation d'une requête de lecture numérologique
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Données de lecture numérologique:", formData);

        // Redirection vers la page de détail de la lecture avec les données
        onNavigate("readingDetail", formData);
      } catch {
        setErrors({
          general:
            "Erreur lors de la création de la lecture. Veuillez réessayer.",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <section className="new-reading">
      <div className="new-reading-content">
        <div className="new-reading-header">
          <h1 className="new-reading-title">Nouvelle Lecture Numérologique</h1>
          <p className="new-reading-subtitle">
            Crée une nouvelle analyse numérologique personnalisée
          </p>
        </div>

        <div className="new-reading-form-container">
          <form className="new-reading-form" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="error-banner">
                <span className="error-icon">⚠️</span>
                {errors.general}
              </div>
            )}

            {isLoggedIn ? (
              <div className="form-section">
                <h3 className="form-section-title">
                  Informations de la lecture
                </h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="readingName" className="form-label">
                      Nom de la lecture *
                    </label>
                    <input
                      type="text"
                      id="readingName"
                      name="readingName"
                      value={formData.readingName}
                      onChange={handleInputChange}
                      className={`form-input ${
                        errors.readingName ? "error" : ""
                      }`}
                      placeholder="Ex: Lecture de Marie, Analyse de Jean..."
                    />
                    {errors.readingName && (
                      <span className="error-message">
                        {errors.readingName}
                      </span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="category" className="form-label">
                      Catégorie *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="personnelle">Personnelle</option>
                      <option value="amie">Amie</option>
                      <option value="connaissance">Connaissance</option>
                      <option value="famille">Famille</option>
                      <option value="collegue">Collègue</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-section auth-warning">
                <div className="warning-content">
                  <p className="warning-message">
                    Pour garder vos lectures sous la main et accéder à toutes
                    les fonctionnalités,{" "}
                    <span
                      className="highlight-text"
                      onClick={() => onNavigate("login")}
                    >
                      connectez-vous
                    </span>
                    .
                  </p>
                </div>
              </div>
            )}

            <div className="form-section">
              <h3 className="form-section-title">Données numérologiques</h3>
              <p className="form-section-description">
                Ces informations sont essentielles pour calculer le profil
                numérologique. Chaque prénom et le nom de famille ont une valeur
                numérologique spécifique.
              </p>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstGivenName" className="form-label">
                    Premier prénom *
                  </label>
                  <input
                    type="text"
                    id="firstGivenName"
                    name="firstGivenName"
                    value={formData.firstGivenName}
                    onChange={handleInputChange}
                    className={`form-input ${
                      errors.firstGivenName ? "error" : ""
                    }`}
                    placeholder="Premier prénom de naissance"
                  />
                  {errors.firstGivenName && (
                    <span className="error-message">
                      {errors.firstGivenName}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="secondGivenName" className="form-label">
                    Deuxième prénom
                  </label>
                  <input
                    type="text"
                    id="secondGivenName"
                    name="secondGivenName"
                    value={formData.secondGivenName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Deuxième prénom (optionnel)"
                  />
                  <span className="form-hint">Si il y en a un</span>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="thirdGivenName" className="form-label">
                    Troisième prénom
                  </label>
                  <input
                    type="text"
                    id="thirdGivenName"
                    name="thirdGivenName"
                    value={formData.thirdGivenName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Troisième prénom (optionnel)"
                  />
                  <span className="form-hint">Si il y en a un</span>
                </div>

                <div className="form-group">
                  <label htmlFor="familyName" className="form-label">
                    Nom de famille *
                  </label>
                  <input
                    type="text"
                    id="familyName"
                    name="familyName"
                    value={formData.familyName}
                    onChange={handleInputChange}
                    className={`form-input ${errors.familyName ? "error" : ""}`}
                    placeholder="Nom de famille de naissance"
                  />
                  {errors.familyName && (
                    <span className="error-message">{errors.familyName}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birthDate" className="form-label">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    className={`form-input ${errors.birthDate ? "error" : ""}`}
                  />
                  {errors.birthDate && (
                    <span className="error-message">{errors.birthDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="birthTime" className="form-label">
                    Heure de naissance
                  </label>
                  <input
                    type="time"
                    id="birthTime"
                    name="birthTime"
                    value={formData.birthTime}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                  <span className="form-hint">
                    Optionnel, mais améliore la précision
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="new-reading-button"
              disabled={isLoading}
            >
              <span className="button-text">
                {isLoading ? "Création en cours..." : "Créer la lecture"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewReadingSection;
