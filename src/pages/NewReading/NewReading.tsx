import React from "react";
import Header from "../../components/Header/Header";
import NewReadingSection from "../../components/NewReadingSection/NewReadingSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./NewReading.css";

interface NewReadingProps {
  onNavigate: NavigateFunction;
}

const NewReading: React.FC<NewReadingProps> = ({ onNavigate }) => {
  return (
    <div className="new-reading-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <NewReadingSection onNavigate={onNavigate} />
    </div>
  );
};

export default NewReading;
