import React from "react";
import ReadingDetailSection from "../../components/ReadingDetailSection/ReadingDetailSection";

interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  birthTime: string;
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
    <ReadingDetailSection onNavigate={onNavigate} readingData={readingData} />
  );
};

export default ReadingDetail;
