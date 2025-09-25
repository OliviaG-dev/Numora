import React from "react";
import type { ReadingData } from "./types";

interface PersonalInfoSectionProps {
  readingData: ReadingData;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  readingData,
}) => {
  return (
    <section className="personal-info-section">
      <h2>Informations personnelles</h2>
      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">Nom complet:</span>
          <span className="info-value">
            {[
              readingData?.firstGivenName,
              readingData?.secondGivenName,
              readingData?.thirdGivenName,
              readingData?.familyName,
            ]
              .filter(Boolean)
              .join(" ")}
          </span>
        </div>
        <div className="info-item">
          <span className="info-label">Date de naissance:</span>
          <span className="info-value">
            {readingData?.birthDate &&
              new Date(readingData.birthDate).toLocaleDateString("fr-FR")}
          </span>
        </div>
        {readingData?.birthTime && (
          <div className="info-item">
            <span className="info-label">Heure de naissance:</span>
            <span className="info-value">{readingData.birthTime}</span>
          </div>
        )}
        <div className="info-item">
          <span className="info-label">Catégorie:</span>
          <span className="info-value capitalize">{readingData?.category}</span>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
