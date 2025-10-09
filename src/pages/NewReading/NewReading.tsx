import React from "react";
import Header from "../../components/Header/Header";
import NewReadingSection from "../../components/NewReadingSection/NewReadingSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import "./NewReading.css";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
}

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
      | "readingDetail",
    readingData?: ReadingData
  ) => void;
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
