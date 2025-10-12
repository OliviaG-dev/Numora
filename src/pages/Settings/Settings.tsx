import React from "react";
import Header from "../../components/Header/Header";
import SettingsSection from "../../components/SettingsSection/SettingsSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./Settings.css";

interface SettingsProps {
  onNavigate: NavigateFunction;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
  return (
    <div className="settings-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <SettingsSection onNavigate={onNavigate} />
    </div>
  );
};

export default Settings;
