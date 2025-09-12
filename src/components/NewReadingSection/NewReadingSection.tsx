import React, { useState } from "react";
import "./NewReadingSection.css";

interface NewReadingSectionProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const NewReadingSection: React.FC<NewReadingSectionProps> = ({
  onNavigate,
}) => {
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

    // Validation des informations de la lecture
    if (!formData.readingName.trim()) {
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
        alert(
          "Lecture numérologique créée avec succès ! 🔮✨\n\nVotre analyse personnalisée est en cours de génération..."
        );

        // Redirection vers l'accueil après création
        onNavigate("home");
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

      <div className="new-reading-content">
        <div className="new-reading-header">
          <h1 className="new-reading-title">
            <span className="new-reading-text">
              Nouvelle Lecture Numérologique
            </span>
            <span className="title-star">9</span>
            <span className="title-number">7</span>
            <span className="title-num-1">1</span>
            <span className="title-num-2">3</span>
            <span className="title-num-3">5</span>
            <span className="title-num-4">2</span>
            <span className="title-num-5">8</span>
            <span className="title-num-6">4</span>
            <span className="title-num-7">6</span>
            <span className="title-num-8">1</span>
            <span className="title-num-9">9</span>
            <span className="title-num-10">3</span>
          </h1>
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

            <div className="form-section">
              <h3 className="form-section-title">Informations de la lecture</h3>

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
                    <span className="error-message">{errors.readingName}</span>
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
