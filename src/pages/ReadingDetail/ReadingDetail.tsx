import React from "react";
import Header from "../../components/Header/Header";
import ReadingDetailSection from "../../components/ReadingDetailSection/ReadingDetailSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
}

interface ReadingDetailProps {
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
  readingData?: ReadingData;
}

const ReadingDetail: React.FC<ReadingDetailProps> = ({
  onNavigate,
  readingData,
}) => {
  return (
    <div className="reading-detail-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <ReadingDetailSection onNavigate={onNavigate} readingData={readingData} />
    </div>
  );
};

export default ReadingDetail;
