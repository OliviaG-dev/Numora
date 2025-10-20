import React from "react";
import "./CompatibilityAnalyzer.css";
import CompatibilityAnalyzerSection from "../../components/CompatibilityAnalyzerSection/CompatibilityAnalyzerSection";
import Header from "../../components/Header/Header";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";

interface CompatibilityAnalyzerProps {
  onNavigate: NavigateFunction;
}

const CompatibilityAnalyzer: React.FC<CompatibilityAnalyzerProps> = ({
  onNavigate,
}) => {
  return (
    <div className="compatibility-analyzer-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <CompatibilityAnalyzerSection onNavigate={onNavigate} />
    </div>
  );
};

export default CompatibilityAnalyzer;

