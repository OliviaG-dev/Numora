import React from "react";
import Header from "../../components/Header/Header";
import ReadingDetailSection from "../../components/ReadingDetailSection/ReadingDetailSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction, ReadingData } from "../../types/navigation";

interface ReadingDetailProps {
  onNavigate: NavigateFunction;
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
