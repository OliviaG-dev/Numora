import React from "react";
import Header from "../../components/Header/Header";
import ReadingsSection from "../../components/ReadingsSection/ReadingsSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./Readings.css";

interface ReadingsProps {
  onNavigate: NavigateFunction;
}

const Readings: React.FC<ReadingsProps> = ({ onNavigate }) => {
  return (
    <div className="readings-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <ReadingsSection onNavigate={onNavigate} />
    </div>
  );
};

export default Readings;
