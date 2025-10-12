import React from "react";
import Header from "../../components/Header/Header";
import DailyVibrationSection from "../../components/DailyVibrationSection/DailyVibrationSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./DailyVibration.css";

interface DailyVibrationProps {
  onNavigate: NavigateFunction;
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
