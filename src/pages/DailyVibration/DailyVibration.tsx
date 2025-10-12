import React from "react";
import Header from "../../components/Header/Header";
import DailyVibrationSection from "../../components/DailyVibrationSection/DailyVibrationSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import "./DailyVibration.css";

interface DailyVibrationProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "readingDetail"
      | "dateAnalyzer"
      | "nameAnalyzer"
      | "dailyVibration"
  ) => void;
}

const DailyVibration: React.FC<DailyVibrationProps> = ({ onNavigate }) => {
  return (
    <div className="daily-vibration-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <DailyVibrationSection />
    </div>
  );
};

export default DailyVibration;
