import React, { useMemo } from "react";
import type { CompatibilityTabProps } from "../shared/types";
import { lifePathFriendsData } from "../../../data";
import type { LifePathFriendsDetail } from "../../../data";
import { calculateLifePathNumber } from "../../../utils/numerology/compatibility";
import "./FriendshipTab.css";

const FriendshipTab: React.FC<CompatibilityTabProps> = ({
  person1,
  person2,
}) => {
  // Helper function pour formater les noms
  const formatName = (name: string) => {
    if (!name || name.trim() === "") return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // Calculer les chemins de vie
  const lifePath1 = useMemo(() => {
    if (!person1.birthDate) return 0;
    try {
      return calculateLifePathNumber(person1.birthDate);
    } catch {
      return 0;
    }
  }, [person1.birthDate]);

  const lifePath2 = useMemo(() => {
    if (!person2.birthDate) return 0;
    try {
      return calculateLifePathNumber(person2.birthDate);
    } catch {
      return 0;
    }
  }, [person2.birthDate]);

  // Récupérer les données de compatibilité amicale basées sur les Life Path
  const friendshipData: LifePathFriendsDetail | null = useMemo(() => {
    if (!lifePath1 || !lifePath2) {
      return null;
    }

    try {
      // Essayer les deux combinaisons possibles (1-2 et 2-1)
      const key1 = `${lifePath1}-${lifePath2}`;
      const key2 = `${lifePath2}-${lifePath1}`;

      const data = lifePathFriendsData as Record<string, LifePathFriendsDetail>;
      return data[key1] || data[key2] || null;
    } catch (error) {
      console.error("Error calculating friendship compatibility:", error);
      return null;
    }
  }, [lifePath1, lifePath2]);

  return (
    <div className="friendship-compatibility-tab">
      {/* En-tête avec prénoms et badges */}
      <div className="friendship-analysis-header">
        <div className="person-info left">
          <div className="person-name">
            {formatName(person1.firstGivenName)}
          </div>
          <div className="number-badge life-path-badge">{lifePath1}</div>
        </div>
        <div className="vs-separator">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.8 }}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <h3>Analyse de compatibilité amicale</h3>
        </div>
        <div className="person-info right">
          <div className="person-name">
            {formatName(person2.firstGivenName)}
          </div>
          <div className="number-badge life-path-badge">{lifePath2}</div>
        </div>
      </div>

      {/* Données détaillées de compatibilité amicale */}
      {friendshipData ? (
        <div className="friendship-insights">
          <div className="friendship-header">
            <h2>{friendshipData.title}</h2>
            <div className="friendship-meta">
              <span className="relation-role">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {friendshipData.relation_role}
              </span>
              <span className="vibration">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                {friendshipData.vibration}
              </span>
            </div>
          </div>

          <div className="friendship-description">
            <p>{friendshipData.long_description}</p>
          </div>

          {/* Soutien mutuel */}
          {Object.keys(friendshipData.support).length > 0 && (
            <div className="mutual-support">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                Soutien mutuel
              </h3>
              <div className="support-grid">
                {Object.entries(friendshipData.support).map(
                  ([, value], index) => (
                    <div key={index} className="support-item">
                      <svg
                        className="support-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="var(--primary-purple)"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <p>{value}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Forces de l'amitié */}
          {friendshipData.strengths && friendshipData.strengths.length > 0 && (
            <div className="friendship-strengths">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Forces de cette amitié
              </h3>
              <div className="strengths-tags">
                {friendshipData.strengths.map((strength, index) => (
                  <span key={index} className="strength-tag">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Défi principal */}
          {friendshipData.challenge && (
            <div className="friendship-challenge">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Point d'attention
              </h3>
              <p>{friendshipData.challenge}</p>
            </div>
          )}

          {/* Conseil de croissance */}
          {friendshipData.growth_advice && (
            <div className="growth-advice">
              <h3>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Conseil pour faire grandir votre amitié
              </h3>
              <p>{friendshipData.growth_advice}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data-message">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>Données de compatibilité non disponibles</h3>
          <p>
            Assurez-vous que les chemins de vie des deux personnes sont
            correctement calculés pour afficher l'analyse de compatibilité
            amicale.
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendshipTab;
