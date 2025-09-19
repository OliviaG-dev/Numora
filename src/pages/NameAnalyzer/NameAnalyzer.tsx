import React from "react";
import "./NameAnalyzer.css";
import NameAnalyzerSection from "../../components/NameAnalyzerSection/NameAnalyzerSection";
import Header from "../../components/Header/Header";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";

interface NameAnalyzerProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "dateAnalyzer"
      | "nameAnalyzer"
  ) => void;
}

const NameAnalyzer: React.FC<NameAnalyzerProps> = ({ onNavigate }) => {
  return (
    <div className="name-analyzer-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <NameAnalyzerSection onNavigate={onNavigate} />
    </div>
  );
};

export default NameAnalyzer;
