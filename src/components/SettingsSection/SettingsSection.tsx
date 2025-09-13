import React, { useState } from "react";
import "./SettingsSection.css";

interface SettingsSectionProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ onNavigate }) => {
  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: "public",
      showBirthInfo: true,
      allowMessages: true,
    },
    preferences: {
      theme: "light",
    },
  });

  const handlePrivacyChange = (type: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: value,
      },
    }));
  };

  const handlePreferenceChange = (type: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // Ici vous pourriez ajouter la logique pour sauvegarder les paramètres
    console.log("Paramètres sauvegardés:", settings);
  };

  return (
    <div className="settings-section">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Mes Paramètres</h1>
        </div>

        <div className="settings-content">
          {/* Privacy */}
          <div className="settings-group">
            <h2>Confidentialité</h2>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Visibilité du profil</h3>
                  <p>Qui peut voir votre profil</p>
                </div>
                <select
                  value={settings.privacy.profileVisibility}
                  onChange={(e) =>
                    handlePrivacyChange("profileVisibility", e.target.value)
                  }
                  className="setting-select"
                >
                  <option value="public">Public</option>
                  <option value="friends">Amis uniquement</option>
                  <option value="private">Privé</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Afficher les informations de naissance</h3>
                  <p>
                    Permettre aux autres de voir votre date et lieu de naissance
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.showBirthInfo}
                    onChange={(e) =>
                      handlePrivacyChange("showBirthInfo", e.target.checked)
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <h3>Autoriser les messages</h3>
                  <p>
                    Permettre aux autres utilisateurs de vous envoyer des
                    messages
                  </p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={settings.privacy.allowMessages}
                    onChange={(e) =>
                      handlePrivacyChange("allowMessages", e.target.checked)
                    }
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="settings-group">
            <h2>Préférences</h2>
            <div className="settings-options">
              <div className="setting-item">
                <div className="setting-info">
                  <h3>Thème</h3>
                  <p>Apparence de l'interface</p>
                </div>
                <select
                  value={settings.preferences.theme}
                  onChange={(e) =>
                    handlePreferenceChange("theme", e.target.value)
                  }
                  className="setting-select"
                >
                  <option value="light">Clair</option>
                  <option value="dark">Sombre</option>
                  <option value="auto">Automatique</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="settings-actions">
          <button className="save-settings-btn" onClick={handleSaveSettings}>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
