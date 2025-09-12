import React from "react";
import Header from "../../components/Header/Header";
import SettingsSection from "../../components/SettingsSection/SettingsSection";
import "./Settings.css";

interface SettingsProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <div className="settings-page">
      <Header onNavigate={onNavigate} />
      <SettingsSection onNavigate={onNavigate} />
    </div>
  );
};

export default Settings;
