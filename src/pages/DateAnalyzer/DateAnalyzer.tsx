import React from "react";
import "./DateAnalyzer.css";
import DateAnalyzerSection from "../../components/DateAnalyzerSection/DateAnalyzerSection";
import Header from "../../components/Header/Header";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";

interface DateAnalyzerProps {
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

const DateAnalyzer: React.FC<DateAnalyzerProps> = ({ onNavigate }) => {
  return (
    <div className="date-analyzer-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <DateAnalyzerSection onNavigate={onNavigate} />
    </div>
  );
};

export default DateAnalyzer;
