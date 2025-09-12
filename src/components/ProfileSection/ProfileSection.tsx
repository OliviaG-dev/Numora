import React, { useState } from "react";
import "./ProfileSection.css";

interface ProfileSectionProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Olivia",
    email: "olivia@example.com",
    birthDate: "1990-05-15",
    birthTime: "14:30",
    birthPlace: "Paris, France",
    bio: "Passionnée de numérologie et d'astrologie depuis mon plus jeune âge.",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Ici vous pourriez ajouter la logique pour sauvegarder les données
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Mon Profil</h1>
          <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Annuler" : "Modifier"}
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              <span>{profileData.name.charAt(0)}</span>
            </div>
            {isEditing && (
              <button className="change-avatar-btn">Changer la photo</button>
            )}
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Nom complet</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate">Date de naissance</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={profileData.birthDate}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label htmlFor="birthTime">Heure de naissance</label>
                <input
                  type="time"
                  id="birthTime"
                  name="birthTime"
                  value={profileData.birthTime}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="birthPlace">Lieu de naissance</label>
              <input
                type="text"
                id="birthPlace"
                name="birthPlace"
                value={profileData.birthPlace}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={isEditing ? "editable" : ""}
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
              />
            </div>

            {isEditing && (
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  Sauvegarder
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-actions">
          <button
            className="settings-btn"
            onClick={() => onNavigate("settings")}
          >
            Paramètres
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;

