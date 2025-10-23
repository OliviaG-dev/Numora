import React from "react";
import type { TabProps } from "../shared/types";
import "./BasiquesTab.css";

const BasiquesTab: React.FC<TabProps> = ({ numerologyResults }) => {
  return (
    <>
      {/* Section Title */}
      <section className="numerology-section section-title-container">
        <div className="section-main-header">
          <div className="title-with-tooltip">
            <h2 className="section-elegant-title">
              <span className="matrix-icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
              </span>
              Basiques
              <span className="matrix-icon-end">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                </svg>
              </span>
            </h2>
            <div className="tooltip">
              <span className="tooltip-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
              </span>
              <div className="tooltip-content">
                <p>
                  Les nombres basiques révèlent les fondements de ta
                  personnalité et de ta mission de vie.
                </p>
                <p>
                  <strong>Chemin de Vie</strong> : ta mission principale et les
                  leçons à apprendre.
                </p>
                <p>
                  <strong>Expression, Âme, Personnalité</strong> : tes talents,
                  motivations et image extérieure.
                </p>
                <p>
                  Ces nombres forment la base de ton profil numérologique
                  complet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chemin de Vie */}
      <section className="numerology-section life-path">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Chemin de Vie</h3>
            <div className="tooltip">
              <span className="tooltip-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
              </span>
              <div className="tooltip-content">
                <p>
                  Le chemin de vie est le chiffre central en numérologie qui
                  révèle la mission principale de ton existence.
                </p>
                <p>
                  Il indique les forces à développer, les défis à surmonter et
                  les leçons de vie que ton âme est venue expérimenter.
                </p>
                <p>
                  C'est comme une boussole intérieure qui guide tes choix et ton
                  évolution tout au long de ta vie.
                </p>
              </div>
            </div>
          </div>
          <div className="number-badge life-path-badge">
            {numerologyResults.lifePath.number}
          </div>
        </div>
        {numerologyResults.lifePath.info && (
          <div className="section-content">
            <h3>{numerologyResults.lifePath.info.title}</h3>
            <p className="description">
              {numerologyResults.lifePath.info.description}
            </p>
            <div className="keywords">
              {numerologyResults.lifePath.info.keywords.map(
                (keyword: string, index: number) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                )
              )}
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <h4>Forces</h4>
                <p>{numerologyResults.lifePath.info.strengths}</p>
              </div>
              <div className="detail-item">
                <h4>Défis</h4>
                <p>{numerologyResults.lifePath.info.challenges}</p>
              </div>
              <div className="detail-item">
                <h4>Mission</h4>
                <p>{numerologyResults.lifePath.info.mission}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Nombre d'Expression */}
      <section className="numerology-section expression">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Nombre d'Expression</h3>
            <div className="tooltip">
              <span className="tooltip-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
              </span>
              <div className="tooltip-content">
                <p>
                  Le nombre d'expression révèle tes talents naturels et tes
                  capacités innées.
                </p>
                <p>
                  Il indique comment tu t'exprimes dans le monde, tes dons
                  créatifs et tes aptitudes professionnelles.
                </p>
                <p>
                  C'est la façon dont tu utilises tes compétences pour accomplir
                  ta mission de vie.
                </p>
              </div>
            </div>
          </div>
          <div className="number-badge expression-badge">
            {numerologyResults.expression.number}
          </div>
        </div>
        {numerologyResults.expression.info && (
          <div className="section-content">
            <h3>{numerologyResults.expression.info.title}</h3>
            <p className="description">
              {numerologyResults.expression.info.description}
            </p>
            <div className="keywords">
              {numerologyResults.expression.info.keywords.map(
                (keyword: string, index: number) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                )
              )}
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <h4>Forces</h4>
                <p>{numerologyResults.expression.info.strengths}</p>
              </div>
              <div className="detail-item">
                <h4>Défis</h4>
                <p>{numerologyResults.expression.info.challenges}</p>
              </div>
              <div className="detail-item">
                <h4>Mission</h4>
                <p>{numerologyResults.expression.info.mission}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Nombre de Réalisation */}
      <section className="numerology-section realisation">
        <div className="realisation section-header">
          <div className="title-with-tooltip">
            <h3>Nombre de Réalisation</h3>
            <div className="tooltip">
              <span className="tooltip-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
              </span>
              <div className="tooltip-content">
                <p>
                  Le nombre de réalisation représente le but de ta vie concrète
                  : ce que tu es appelé à construire, manifester et accomplir
                  dans le monde matériel.
                </p>
                <p>C'est comme le résumé du film de ta vie.</p>
                <p>
                  il montre comment ton potentiel intérieur (ton essence, ton
                  cœur, ton mental) se concrétise dans la réalité.
                </p>
              </div>
            </div>
          </div>
          <div className="number-badge realisation-badge">
            {numerologyResults.realisation.number}
          </div>
        </div>
        {numerologyResults.realisation.info && (
          <div className="section-content">
            <h3>{numerologyResults.realisation.info.title}</h3>
            <p className="description">
              {numerologyResults.realisation.info.description}
            </p>
            <div className="keywords">
              {numerologyResults.realisation.info.keywords.map(
                (keyword: string, index: number) => (
                  <span key={index} className="keyword-tag">
                    {keyword}
                  </span>
                )
              )}
            </div>
            <div className="details-grid">
              <div className="detail-item">
                <h4>Forces</h4>
                <p>{numerologyResults.realisation.info.strengths}</p>
              </div>
              <div className="detail-item">
                <h4>Défis</h4>
                <p>{numerologyResults.realisation.info.challenges}</p>
              </div>
              <div className="detail-item">
                <h4>Mission</h4>
                <p>{numerologyResults.realisation.info.mission}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Nombre du Cœur */}
      <section className="numerology-section heart-number">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Nombre du Cœur</h3>
            <div className="tooltip">
              <span className="tooltip-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 16V12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
              </span>
              <div className="tooltip-content">
                <p>
                  Le nombre du cœur révèle tes besoins émotionnels profonds et
                  ton langage de l'amour.
                </p>
                <p>
                  Il indique comment tu ressens, aimes et exprimes tes émotions
                  dans les relations.
                </p>
                <p>
                  C'est la voix de ton cœur qui guide tes désirs affectifs et
                  tes besoins relationnels.
                </p>
              </div>
            </div>
          </div>
          <div className="number-badge heart-number-badge">
            {numerologyResults.heartNumber.number}
          </div>
        </div>
        {numerologyResults.heartNumber.info && (
          <div className="section-content">
            <h3>Essence émotionnelle</h3>
            <p className="description">
              {numerologyResults.heartNumber.info.essence}
            </p>
            <div className="details-grid">
              <div className="detail-item">
                <h4>Besoins Émotionnels</h4>
                <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                  {numerologyResults.heartNumber.info.emotional_needs.map(
                    (need: string, index: number) => (
                      <li key={index} style={{ marginBottom: "0.5rem" }}>
                        {need}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="detail-item">
                <h4>Langage de l'Amour</h4>
                <p>{numerologyResults.heartNumber.info.love_language}</p>
              </div>
              <div className="detail-item">
                <h4>Défi Émotionnel</h4>
                <p>{numerologyResults.heartNumber.info.emotional_challenge}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Nombres de l'Âme, Personnalité et Jour */}
      <section className="numerology-section personal-numbers">
        <div className="personal-numbers-grid">
          {/* Nombre de l'Âme */}
          <div className="personal-number-card soul-urge">
            <div className="section-header">
              <div className="title-with-tooltip">
                <h3>Nombre de l'Âme</h3>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="8" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="tooltip-content">
                    <p>
                      Le nombre de l'âme révèle tes motivations profondes et tes
                      désirs intérieurs.
                    </p>
                    <p>
                      Il indique ce qui te pousse vraiment à agir, tes
                      aspirations secrètes et tes besoins spirituels.
                    </p>
                    <p>
                      C'est la voix de ton âme qui guide tes choix les plus
                      authentiques.
                    </p>
                  </div>
                </div>
              </div>
              <div className="number-badge soul-badge">
                {numerologyResults.soulUrge.number}
              </div>
            </div>
            {numerologyResults.soulUrge.info && (
              <div className="section-content">
                <p className="description">
                  Vos motivations profondes et vos désirs intérieurs
                </p>
                <div className="keywords">
                  {numerologyResults.soulUrge.info.map(
                    (keyword: string, index: number) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nombre de Personnalité */}
          <div className="personal-number-card personality">
            <div className="section-header">
              <div className="title-with-tooltip">
                <h3>Nombre de Personnalité</h3>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="8" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="tooltip-content">
                    <p>
                      Le nombre de personnalité révèle comment tu apparais aux
                      autres.
                    </p>
                    <p>
                      Il indique l'image que tu projettes, ton style de
                      communication et ton charisme naturel.
                    </p>
                    <p>
                      C'est la façade que tu présentes au monde et qui influence
                      les premières impressions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="number-badge personality-badge">
                {numerologyResults.personality.number}
              </div>
            </div>
            {numerologyResults.personality.info && (
              <div className="section-content">
                <p className="description">
                  Comment vous apparaissez aux autres
                </p>
                <div className="keywords">
                  {numerologyResults.personality.info.map(
                    (keyword: string, index: number) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Nombre du Jour */}
          <div className="personal-number-card birthday">
            <div className="section-header">
              <div className="title-with-tooltip">
                <h3>Nombre du Jour</h3>
                <div className="tooltip">
                  <span className="tooltip-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M12 16V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="8" r="1" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="tooltip-content">
                    <p>
                      Le nombre du jour révèle tes talents naturels et tes
                      capacités innées.
                    </p>
                    <p>
                      Il indique tes dons particuliers, tes aptitudes spéciales
                      et tes compétences naturelles.
                    </p>
                    <p>
                      C'est l'énergie créative que tu portes en toi depuis ta
                      naissance.
                    </p>
                  </div>
                </div>
              </div>
              <div className="number-badge birthday-badge">
                {numerologyResults.birthday.number}
              </div>
            </div>
            {numerologyResults.birthday.info && (
              <div className="section-content">
                <p className="description">Vos talents naturels et capacités</p>
                <div className="keywords">
                  {numerologyResults.birthday.info.map(
                    (keyword: string, index: number) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BasiquesTab;
