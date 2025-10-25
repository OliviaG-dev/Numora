import React, { useMemo } from "react";
import type { CompatibilityTabProps } from "../shared/types";
import {
  calculateFriendshipCompatibility,
  type FriendshipCompatibilityResult,
} from "../../../utils/numerology/compatibility";
import { calculateLifePathNumber } from "../../../utils/numerology/core";
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

  // Calculer la compatibilité amicale complète (Life Path + Expression Number)
  const friendshipCompatibility: FriendshipCompatibilityResult | null =
    useMemo(() => {
      if (!person1.birthDate || !person2.birthDate) {
      return null;
    }

    try {
        return calculateFriendshipCompatibility(person1, person2);
    } catch (error) {
      console.error("Error calculating friendship compatibility:", error);
      return null;
    }
    }, [person1, person2]);

  const lifePathFriendship = friendshipCompatibility?.lifePathFriendship;
  const expressionFriendship = friendshipCompatibility?.expressionFriendship;
  const expressionData = expressionFriendship?.detail;

  // Calculer les chemins de vie pour les badges
  const lifePath1 = person1.birthDate
    ? calculateLifePathNumber(person1.birthDate)
    : null;
  const lifePath2 = person2.birthDate
    ? calculateLifePathNumber(person2.birthDate)
    : null;

  return (
    <div className="friendship-compatibility-tab">
      {/* En-tête avec prénoms et badges */}
      <div className="friendship-analysis-header">
        <div className="person-info left">
          <div className="person-name">
            {formatName(person1.firstGivenName)}
          </div>
          <div className="number-badges">
            {lifePath1 && (
              <div
                className="number-badge lifepath-badge"
                title="Chemin de Vie"
              >
                {lifePath1}
              </div>
            )}
            {expressionFriendship && (
              <div
                className="number-badge expression-badge"
                title="Nombre d'Expression"
              >
                {expressionFriendship.expression1}
              </div>
            )}
          </div>
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
          <p className="subtitle">Chemin de Vie & Nombres d'Expression</p>
        </div>
        <div className="person-info right">
          <div className="person-name">
            {formatName(person2.firstGivenName)}
          </div>
          <div className="number-badges">
            {lifePath2 && (
              <div
                className="number-badge lifepath-badge"
                title="Chemin de Vie"
              >
                {lifePath2}
              </div>
            )}
            {expressionFriendship && (
              <div
                className="number-badge expression-badge"
                title="Nombre d'Expression"
              >
                {expressionFriendship.expression2}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section Life Path Compatibility */}
      {lifePathFriendship && (
        <div className="friendship-insights lifepath-section">
          <div className="section-badge">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
            <span>Analyse basée sur le Chemin de Vie</span>
          </div>

          <div className="friendship-header">
            <h2>{lifePathFriendship.title}</h2>
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
                {lifePathFriendship.relation_role}
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
                {lifePathFriendship.vibration}
              </span>
            </div>
          </div>

          <div className="friendship-description">
            <p>{lifePathFriendship.long_description}</p>
          </div>

          {/* Soutien mutuel */}
          {Object.keys(lifePathFriendship.support).length > 0 && (
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
                {Object.entries(lifePathFriendship.support).map(
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
          {lifePathFriendship.strengths &&
            lifePathFriendship.strengths.length > 0 && (
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
                  {lifePathFriendship.strengths.map((strength, index) => (
                  <span key={index} className="strength-tag">
                    {strength}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Défi principal */}
          {lifePathFriendship.challenge && (
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
              <p>{lifePathFriendship.challenge}</p>
            </div>
          )}

          {/* Conseil de croissance */}
          {lifePathFriendship.growth_advice && (
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
              <p>{lifePathFriendship.growth_advice}</p>
            </div>
          )}
        </div>
      )}

      {/* Données détaillées de compatibilité amicale basées sur Expression Number */}
      {expressionData && (
        <div className="friendship-insights expression-section">
          <div className="section-badge">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span>Analyse basée sur les Nombres d'Expression</span>
          </div>

          <div className="friendship-header">
            <h2>{expressionData.friendship_type}</h2>
            <div className="friendship-meta">
              <span className="vibe-tag">
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
                {expressionData.vibe}
              </span>
            </div>
            <p className="tagline">{expressionData.tagline}</p>
          </div>

          {/* Ratings visuels */}
          <div className="friendship-vibe-ratings">
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
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Vibrations de l'amitié
            </h3>
            <div className="ratings-grid">
              <div className="rating-item">
                <div className="rating-label">Fun</div>
                <div className="rating-bar">
                  <div
                    className="rating-fill fun"
                    style={{
                      width: `${
                        expressionData.friendship_vibe_rating.fun * 10
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="rating-value">
                  {expressionData.friendship_vibe_rating.fun}/10
                </div>
              </div>
              <div className="rating-item">
                <div className="rating-label">Confiance</div>
                <div className="rating-bar">
                  <div
                    className="rating-fill trust"
                    style={{
                      width: `${
                        expressionData.friendship_vibe_rating.trust * 10
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="rating-value">
                  {expressionData.friendship_vibe_rating.trust}/10
                </div>
              </div>
              <div className="rating-item">
                <div className="rating-label">Connexion profonde</div>
                <div className="rating-bar">
                  <div
                    className="rating-fill deep"
                    style={{
                      width: `${
                        expressionData.friendship_vibe_rating.deep_connection *
                        10
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="rating-value">
                  {expressionData.friendship_vibe_rating.deep_connection}/10
                </div>
              </div>
              <div className="rating-item">
                <div className="rating-label">Aventure</div>
                <div className="rating-bar">
                  <div
                    className="rating-fill adventure"
                    style={{
                      width: `${
                        expressionData.friendship_vibe_rating.adventure * 10
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="rating-value">
                  {expressionData.friendship_vibe_rating.adventure}/10
                </div>
              </div>
            </div>
          </div>

          {/* Pourquoi ils cliquent */}
          {expressionData.why_they_click &&
            expressionData.why_they_click.length > 0 && (
              <div className="why-they-click">
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
                  Pourquoi ils s'entendent si bien
                </h3>
                <div className="click-reasons">
                  {expressionData.why_they_click.map((reason, index) => (
                    <div key={index} className="reason-item">
                      <svg
                        className="reason-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <p>{reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Ce qu'ils aiment faire */}
          {expressionData.what_they_love_doing &&
            expressionData.what_they_love_doing.length > 0 && (
              <div className="love-doing">
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
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  Ce qu'ils adorent faire ensemble
                </h3>
                <div className="activities-grid">
                  {expressionData.what_they_love_doing.map(
                    (activity, index) => (
                      <div key={index} className="activity-tag">
                        {activity}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Meilleures activités */}
          {expressionData.best_activities &&
            expressionData.best_activities.length > 0 && (
              <div className="best-activities">
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
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Activités recommandées
                </h3>
                <div className="activities-list">
                  {expressionData.best_activities.map((activity, index) => (
                    <div key={index} className="activity-item">
                      {activity}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Superpower de l'amitié */}
          {expressionData.friendship_superpower && (
            <div className="friendship-superpower">
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
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Superpouvoir de cette amitié
              </h3>
              <p>{expressionData.friendship_superpower}</p>
            </div>
          )}

          {/* Points de friction */}
          {expressionData.friction_points &&
            expressionData.friction_points.length > 0 && (
              <div className="friction-points">
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
                  Points de friction
                </h3>
                <div className="friction-list">
                  {expressionData.friction_points.map((point, index) => (
                    <div key={index} className="friction-item">
                      {point}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Anthem */}
          {expressionData.anthem && (
            <div className="friendship-anthem">
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
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                Hymne de l'amitié
              </h3>
              <p className="anthem-text">{expressionData.anthem}</p>
            </div>
          )}

          {/* Conseil pour garder la magie */}
          {expressionData.keep_the_magic_alive && (
            <div className="magic-advice">
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
                Comment garder la magie vivante
              </h3>
              <p>{expressionData.keep_the_magic_alive}</p>
            </div>
          )}
        </div>
      )}

      {/* Message si aucune donnée disponible */}
      {!lifePathFriendship && !expressionData && (
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
            Assurez-vous que les informations des deux personnes (noms complets
            et dates de naissance) sont correctement renseignées pour afficher
            l'analyse de compatibilité amicale.
          </p>
        </div>
      )}
    </div>
  );
};

export default FriendshipTab;
