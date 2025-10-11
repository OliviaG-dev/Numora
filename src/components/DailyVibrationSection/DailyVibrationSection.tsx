import React, { useState, useEffect } from "react";
import "./DailyVibrationSection.css";
import {
  calculateDayVibration,
  calculateMonthVibration,
  calculateYearVibration,
  calculateUniversalVibration,
} from "../../utils/numerology/daily";
import { dateVibeData } from "../../data";
import type { DateVibeDetail } from "../../data";

const DailyVibrationSection: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayVibration, setDayVibration] = useState<number>(0);
  const [monthVibration, setMonthVibration] = useState<number>(0);
  const [yearVibration, setYearVibration] = useState<number>(0);
  const [universalVibration, setUniversalVibration] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{
    type: "universal" | "day" | "month" | "year";
    vibration: number;
    info: DateVibeDetail | null;
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now);

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Calcul des vibrations individuelles
    const dayVib = calculateDayVibration(day);
    const monthVib = calculateMonthVibration(month);
    const yearVib = calculateYearVibration(year);

    // Calcul de la vibration universelle (jour + mois + année)
    const universalVib = calculateUniversalVibration(now);

    setDayVibration(dayVib);
    setMonthVibration(monthVib);
    setYearVibration(yearVib);
    setUniversalVibration(universalVib);
  }, []);

  const getDayInfo = (): DateVibeDetail | null => {
    return (
      dateVibeData[dayVibration.toString() as keyof typeof dateVibeData] || null
    );
  };

  const getMonthInfo = (): DateVibeDetail | null => {
    return (
      dateVibeData[monthVibration.toString() as keyof typeof dateVibeData] ||
      null
    );
  };

  const getYearInfo = (): DateVibeDetail | null => {
    return (
      dateVibeData[yearVibration.toString() as keyof typeof dateVibeData] ||
      null
    );
  };

  const getUniversalInfo = (): DateVibeDetail | null => {
    return (
      dateVibeData[
        universalVibration.toString() as keyof typeof dateVibeData
      ] || null
    );
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { weekday: "long" });
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString("fr-FR", { month: "long" });
  };

  const dayInfo = getDayInfo();
  const monthInfo = getMonthInfo();
  const yearInfo = getYearInfo();
  const universalInfo = getUniversalInfo();

  const openModal = (
    type: "universal" | "day" | "month" | "year",
    vibration: number,
    info: DateVibeDetail | null,
    title: string,
    subtitle: string
  ) => {
    setModalContent({ type, vibration, info, title, subtitle });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => setModalContent(null), 300);
  };

  return (
    <section className="daily-vibration-section">
      <div className="daily-vibration-container">
        <div className="daily-vibration-header">
          <h1>Vibration du Jour</h1>
          <p className="current-date">{formatDate(currentDate)}</p>
        </div>

        <div className="vibration-cards">
          {/* Card Vibration Universelle */}
          <div className="vibration-card universal-card">
            <div className="card-header">
              <h2>Vibration Universelle</h2>
              <p className="card-date">{formatDate(currentDate)}</p>
            </div>
            <div className="vibration-badge universal-badge">
              {universalVibration}
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
            </div>
            {universalInfo && (
              <>
                <div className="daily-vib-summary">
                  <p>{universalInfo.summary}</p>
                </div>
                <button
                  className="see-more-btn"
                  onClick={() =>
                    openModal(
                      "universal",
                      universalVibration,
                      universalInfo,
                      "Vibration Universelle",
                      formatDate(currentDate)
                    )
                  }
                >
                  Voir plus
                </button>
              </>
            )}
          </div>

          {/* Card Jour */}
          <div className="vibration-card">
            <div className="card-header">
              <h2>Jour</h2>
              <p className="card-date-combined">
                {getDayName(currentDate)} - {currentDate.getDate()}
              </p>
            </div>
            <div className="vibration-badge">
              {dayVibration}
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
            </div>
            {dayInfo && (
              <>
                <div className="daily-vib-summary">
                  <p>{dayInfo.summary}</p>
                </div>
                <button
                  className="see-more-btn"
                  onClick={() =>
                    openModal(
                      "day",
                      dayVibration,
                      dayInfo,
                      "Vibration du Jour",
                      `${getDayName(currentDate)} - ${currentDate.getDate()}`
                    )
                  }
                >
                  Voir plus
                </button>
              </>
            )}
          </div>

          {/* Card Mois */}
          <div className="vibration-card">
            <div className="card-header">
              <h2>Mois</h2>
              <p className="card-date-combined">
                {getMonthName(currentDate)} - {currentDate.getMonth() + 1}
              </p>
            </div>
            <div className="vibration-badge">
              {monthVibration}
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
            </div>
            {monthInfo && (
              <>
                <div className="daily-vib-summary">
                  <p>{monthInfo.summary}</p>
                </div>
                <button
                  className="see-more-btn"
                  onClick={() =>
                    openModal(
                      "month",
                      monthVibration,
                      monthInfo,
                      "Vibration du Mois",
                      `${getMonthName(currentDate)} - ${
                        currentDate.getMonth() + 1
                      }`
                    )
                  }
                >
                  Voir plus
                </button>
              </>
            )}
          </div>

          {/* Card Année */}
          <div className="vibration-card">
            <div className="card-header">
              <h2>Année</h2>
              <p className="card-date-combined">{currentDate.getFullYear()}</p>
            </div>
            <div className="vibration-badge">
              {yearVibration}
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
              <span className="star">✦</span>
              <span className="star">✧</span>
            </div>
            {yearInfo && (
              <>
                <div className="daily-vib-summary">
                  <p>{yearInfo.summary}</p>
                </div>
                <button
                  className="see-more-btn"
                  onClick={() =>
                    openModal(
                      "year",
                      yearVibration,
                      yearInfo,
                      "Vibration de l'Année",
                      `${currentDate.getFullYear()}`
                    )
                  }
                >
                  Voir plus
                </button>
              </>
            )}
          </div>
        </div>

        {/* Modal */}
        {modalOpen && modalContent && (
          <div className="vibration-modal-overlay" onClick={closeModal}>
            <div
              className={`vibration-modal ${
                modalContent.type === "universal" ? "modal-universal" : ""
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                ×
              </button>

              <div className="modal-header">
                <h2>{modalContent.title}</h2>
                <p className="modal-subtitle">{modalContent.subtitle}</p>
                <div className="modal-badge">
                  {modalContent.vibration}
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                  <span className="star">✦</span>
                  <span className="star">✧</span>
                </div>
              </div>

              {modalContent.info && (
                <div className="modal-content">
                  <div className="daily-modal-summary">
                    <p>{modalContent.info.summary}</p>
                  </div>

                  <div className="modal-details-grid">
                    <div className="modal-detail-item">
                      <h4>Forces</h4>
                      <p>{modalContent.info.strength}</p>
                    </div>
                    <div className="modal-detail-item">
                      <h4>Défis</h4>
                      <p>{modalContent.info.challenge}</p>
                    </div>
                    <div className="modal-detail-item">
                      <h4>Favorable pour</h4>
                      <p>{modalContent.info.favorable_for}</p>
                    </div>
                    <div className="modal-detail-item">
                      <h4>Défavorable pour</h4>
                      <p>{modalContent.info.unfavorable_for}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyVibrationSection;
