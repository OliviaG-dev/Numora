import React, { useState, useEffect } from "react";
import "./DailyVibrationSection.css";
import { useAuth } from "../../hooks/useAuth";
import {
  calculateDayVibration,
  calculateMonthVibration,
  calculateYearVibration,
  calculateUniversalVibration,
} from "../../utils/numerology/daily";
import { dateVibeData } from "../../data";
import type { DateVibeDetail } from "../../data";

interface DailyVibrationSectionProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
      | "readingDetail"
  ) => void;
}

const DailyVibrationSection: React.FC<DailyVibrationSectionProps> = ({
  onNavigate,
}) => {
  const { isAuthenticated } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dayVibration, setDayVibration] = useState<number>(0);
  const [monthVibration, setMonthVibration] = useState<number>(0);
  const [yearVibration, setYearVibration] = useState<number>(0);
  const [universalVibration, setUniversalVibration] = useState<number>(0);
  const [dayExpanded, setDayExpanded] = useState(false);
  const [monthExpanded, setMonthExpanded] = useState(false);
  const [yearExpanded, setYearExpanded] = useState(false);
  const [universalExpanded, setUniversalExpanded] = useState(false);

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

  return (
    <section className="daily-vibration-section">
      <div className="daily-vibration-container">
        <div className="daily-vibration-header">
          <h1>Vibration du Jour</h1>
          <p className="current-date">{formatDate(currentDate)}</p>
        </div>

        {!isAuthenticated && (
          <div className="auth-warning">
            <div className="warning-content">
              <p className="warning-message">
                Pour sauvegarder vos vibrations et accéder à toutes les
                fonctionnalités,{" "}
                <span
                  className="highlight-text"
                  onClick={() => onNavigate("login")}
                >
                  connectez-vous
                </span>
                .
              </p>
            </div>
          </div>
        )}

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
                <div className="vibration-summary">
                  <p>{universalInfo.summary}</p>
                </div>
                {!universalExpanded ? (
                  <button
                    className="see-more-btn"
                    onClick={() => setUniversalExpanded(true)}
                  >
                    Voir plus
                  </button>
                ) : (
                  <div className="vibration-details">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{universalInfo.strength}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{universalInfo.challenge}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Favorable pour</h4>
                      <p>{universalInfo.favorable_for}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défavorable pour</h4>
                      <p>{universalInfo.unfavorable_for}</p>
                    </div>
                    <button
                      className="see-less-btn"
                      onClick={() => setUniversalExpanded(false)}
                    >
                      Voir moins
                    </button>
                  </div>
                )}
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
                <div className="vibration-summary">
                  <p>{dayInfo.summary}</p>
                </div>
                {!dayExpanded ? (
                  <button
                    className="see-more-btn"
                    onClick={() => setDayExpanded(true)}
                  >
                    Voir plus
                  </button>
                ) : (
                  <div className="vibration-details">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{dayInfo.strength}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{dayInfo.challenge}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Favorable pour</h4>
                      <p>{dayInfo.favorable_for}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défavorable pour</h4>
                      <p>{dayInfo.unfavorable_for}</p>
                    </div>
                    <button
                      className="see-less-btn"
                      onClick={() => setDayExpanded(false)}
                    >
                      Voir moins
                    </button>
                  </div>
                )}
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
                <div className="vibration-summary">
                  <p>{monthInfo.summary}</p>
                </div>
                {!monthExpanded ? (
                  <button
                    className="see-more-btn"
                    onClick={() => setMonthExpanded(true)}
                  >
                    Voir plus
                  </button>
                ) : (
                  <div className="vibration-details">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{monthInfo.strength}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{monthInfo.challenge}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Favorable pour</h4>
                      <p>{monthInfo.favorable_for}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défavorable pour</h4>
                      <p>{monthInfo.unfavorable_for}</p>
                    </div>
                    <button
                      className="see-less-btn"
                      onClick={() => setMonthExpanded(false)}
                    >
                      Voir moins
                    </button>
                  </div>
                )}
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
                <div className="vibration-summary">
                  <p>{yearInfo.summary}</p>
                </div>
                {!yearExpanded ? (
                  <button
                    className="see-more-btn"
                    onClick={() => setYearExpanded(true)}
                  >
                    Voir plus
                  </button>
                ) : (
                  <div className="vibration-details">
                    <div className="detail-item">
                      <h4>Forces</h4>
                      <p>{yearInfo.strength}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défis</h4>
                      <p>{yearInfo.challenge}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Favorable pour</h4>
                      <p>{yearInfo.favorable_for}</p>
                    </div>
                    <div className="detail-item">
                      <h4>Défavorable pour</h4>
                      <p>{yearInfo.unfavorable_for}</p>
                    </div>
                    <button
                      className="see-less-btn"
                      onClick={() => setYearExpanded(false)}
                    >
                      Voir moins
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyVibrationSection;
