import React from "react";
import Header from "../../components/Header/Header";
import ReadingsSection from "../../components/ReadingsSection/ReadingsSection";
import "./Readings.css";

interface ReadingsProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
  ) => void;
}

const Readings: React.FC<ReadingsProps> = ({ onNavigate }) => {
  return (
    <div className="readings-page">
      <Header onNavigate={onNavigate} />
      <ReadingsSection onNavigate={onNavigate} />
    </div>
  );
};

export default Readings;
