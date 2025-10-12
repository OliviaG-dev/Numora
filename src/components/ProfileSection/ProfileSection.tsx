import React, { useState, useEffect } from "react";
import "./ProfileSection.css";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";

interface ProfileSectionProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onNavigate }) => {
  const { user, isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({
    full_name: "",
    email: "",
    birth_date: "",
    birth_time: "",
    birth_place: "",
    bio: "",
  });

  // Charger les données du profil depuis Supabase
  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserProfile();
    }
  }, [isAuthenticated, user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      setIsLoading(true);

      // Récupérer les données depuis la table users
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Erreur lors du chargement du profil:", error);
        setError("Erreur lors du chargement du profil");
        return;
      }

      if (data) {
        setProfileData({
          full_name: data.full_name || "",
          email: data.email || user.email || "",
          birth_date: data.birth_date || "",
          birth_time: data.birth_time || "",
          birth_place: data.birth_place || "",
          bio: data.bio || "",
        });
      } else {
        // Si aucune donnée n'est trouvée, initialiser avec les données de base
        setProfileData({
          full_name: user.user_metadata?.full_name || "",
          email: user.email || "",
          birth_date: "",
          birth_time: "",
          birth_place: "",
          bio: "",
        });
      }
    } catch (err) {
      console.error("Erreur lors du chargement du profil:", err);
      setError("Erreur lors du chargement du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      setSuccess(null);

      // Mettre à jour les données dans la table users
      const updateData: any = {
        full_name: profileData.full_name,
        birth_date: profileData.birth_date || null,
        birth_place: profileData.birth_place || null,
        updated_at: new Date().toISOString(),
      };

      // Ajouter les champs optionnels seulement s'ils ont une valeur
      if (profileData.birth_time) {
        updateData.birth_time = profileData.birth_time;
      }
      if (profileData.bio) {
        updateData.bio = profileData.bio;
      }

      const { error } = await supabase
        .from("users")
        .update(updateData)
        .eq("id", user.id);

      if (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        setError("Erreur lors de la sauvegarde du profil");
        return;
      }

      setSuccess("Profil mis à jour avec succès !");
      setIsEditing(false);

      // Effacer le message de succès après 3 secondes
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Erreur lors de la sauvegarde:", err);
      setError("Erreur lors de la sauvegarde du profil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Recharger les données originales
    loadUserProfile();
    setIsEditing(false);
    setError(null);
    setSuccess(null);
  };

  // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return (
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-header">
            <h1>Mon Profil</h1>
          </div>
          <div className="profile-content">
            <p>Vous devez être connecté pour accéder à votre profil.</p>
            <button className="btn-primary" onClick={() => onNavigate("login")}>
              Se connecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mon Profil</h1>
        </div>

        {/* Messages d'erreur et de succès */}
        {error && (
          <div className="error-banner">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        {success && (
          <div className="success-banner">
            <span className="success-icon">✅</span>
            {success}
          </div>
        )}

        <div className="profile-content">
          {isLoading ? (
            <div className="loading-spinner">
              <p>Chargement du profil...</p>
            </div>
          ) : (
            <div className="profile-form">
              <div className="form-group">
                <label htmlFor="full_name">Nom complet</label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={profileData.full_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                  placeholder="Votre nom complet"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profileData.email}
                  disabled={true} // L'email ne peut pas être modifié
                  className="disabled"
                  title="L'email ne peut pas être modifié"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="birth_date">Date de naissance</label>
                  <input
                    type="date"
                    id="birth_date"
                    name="birth_date"
                    value={profileData.birth_date}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={isEditing ? "editable" : ""}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birth_time">Heure de naissance</label>
                  <input
                    type="time"
                    id="birth_time"
                    name="birth_time"
                    value={profileData.birth_time}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={isEditing ? "editable" : ""}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="birth_place">Lieu de naissance</label>
                <input
                  type="text"
                  id="birth_place"
                  name="birth_place"
                  value={profileData.birth_place}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                  placeholder="Ville, Pays"
                />
              </div>

              <div className="form-group">
                <label htmlFor="bio">Biographie</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                  rows={4}
                  placeholder="Parlez-nous de vous, vos intérêts en numérologie..."
                />
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button
            className="edit-btn"
            onClick={() => {
              if (isEditing) {
                handleCancel();
              } else {
                setIsEditing(true);
              }
            }}
            disabled={isLoading}
          >
            {isEditing ? "Annuler" : "Modifier"}
          </button>
          {isEditing && (
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Sauvegarde..." : "Sauvegarder"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
