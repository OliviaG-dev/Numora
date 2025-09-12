import React from "react";
import Header from "../../components/Header/Header";
import NewReadingSection from "../../components/NewReadingSection/NewReadingSection";
import "./NewReading.css";

interface NewReadingProps {
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

const NewReading: React.FC<NewReadingProps> = ({ onNavigate }) => {
  return (
    <div className="new-reading-page">
      <Header onNavigate={onNavigate} />
      <NewReadingSection onNavigate={onNavigate} />
    </div>
  );
};

export default NewReading;
