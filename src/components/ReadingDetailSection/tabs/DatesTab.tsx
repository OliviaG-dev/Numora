import React from "react";
import type { TabProps } from "../shared/types";

const DatesTab: React.FC<TabProps> = ({ numerologyResults, readingData }) => {
  return (
    <>
      {/* Cycles de Vie */}
      <section className="numerology-section life-cycles">
        <div className="title-with-tooltip">
          <h2>Cycles de Vie</h2>
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
                Les cycles de vie décrivent les trois grandes périodes de ton
                existence.
              </p>
              <p>
                Chaque cycle apporte ses propres leçons, défis et opportunités
                de croissance.
              </p>
              <p>
                C'est une carte temporelle qui guide ton évolution spirituelle
                et personnelle.
              </p>
            </div>
          </div>
        </div>
        <div className="life-cycles-grid">
          <div className="cycle-card">
            <h3>
              <span className="cycle-title">Premier Cycle</span>
              <span className="cycle-period">(Naissance → ~28 ans)</span>
            </h3>
            <div className="number-badge cycle-badge">
              {numerologyResults.lifeCycles.firstCycle.number}
            </div>
            {numerologyResults.lifeCycles.firstCycle.info && (
              <div className="cycle-content">
                <p className="cycle-summary">
                  {numerologyResults.lifeCycles.firstCycle.info.summary}
                </p>
                <div className="cycle-details">
                  <p>
                    {numerologyResults.lifeCycles.firstCycle.info.description}
                  </p>
                </div>
                <div className="cycle-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {numerologyResults.lifeCycles.firstCycle.info.challenge}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="cycle-card">
            <h3>
              <span className="cycle-title">Deuxième Cycle</span>
              <span className="cycle-period">(29 → ~56 ans)</span>
            </h3>
            <div className="number-badge cycle-badge">
              {numerologyResults.lifeCycles.secondCycle.number}
            </div>
            {numerologyResults.lifeCycles.secondCycle.info && (
              <div className="cycle-content">
                <p className="cycle-summary">
                  {numerologyResults.lifeCycles.secondCycle.info.summary}
                </p>
                <div className="cycle-details">
                  <p>
                    {numerologyResults.lifeCycles.secondCycle.info.description}
                  </p>
                </div>
                <div className="cycle-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {numerologyResults.lifeCycles.secondCycle.info.challenge}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="cycle-card">
            <h3>
              <span className="cycle-title">Troisième Cycle</span>
              <span className="cycle-period">(57 ans → fin de vie)</span>
            </h3>
            <div className="number-badge cycle-badge">
              {numerologyResults.lifeCycles.thirdCycle.number}
            </div>
            {numerologyResults.lifeCycles.thirdCycle.info && (
              <div className="cycle-content">
                <p className="cycle-summary">
                  {numerologyResults.lifeCycles.thirdCycle.info.summary}
                </p>
                <div className="cycle-details">
                  <p>
                    {numerologyResults.lifeCycles.thirdCycle.info.description}
                  </p>
                </div>
                <div className="cycle-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {numerologyResults.lifeCycles.thirdCycle.info.challenge}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Périodes de Réalisation */}
      <section className="numerology-section realization-periods">
        <div className="title-with-tooltip">
          <h2>Périodes de Réalisation</h2>
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
                Les périodes de réalisation (ou pinacles) révèlent les
                opportunités de réussite.
              </p>
              <p>
                Chaque période offre des conditions favorables pour accomplir
                tes objectifs.
              </p>
              <p>
                C'est un calendrier spirituel qui indique les meilleurs moments
                pour agir.
              </p>
            </div>
          </div>
        </div>
        <div className="realization-periods-grid">
          <div className="period-card">
            <h3>
              <span className="period-title">Première Période</span>
              <span className="period-duration">(jusqu'à ~30 ans)</span>
            </h3>
            <div className="number-badge period-badge">
              {numerologyResults.realizationPeriods.firstPeriod.number}
            </div>
            {numerologyResults.realizationPeriods.firstPeriod.info && (
              <div className="period-content">
                <p className="period-summary">
                  {
                    numerologyResults.realizationPeriods.firstPeriod.info
                      .summary
                  }
                </p>
                <div className="period-details">
                  <p>
                    {
                      numerologyResults.realizationPeriods.firstPeriod.info
                        .description
                    }
                  </p>
                </div>
                <div className="period-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {
                      numerologyResults.realizationPeriods.firstPeriod.info
                        .challenge
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="period-card">
            <h3>
              <span className="period-title">Deuxième Période</span>
              <span className="period-duration">(30 → 39 ans)</span>
            </h3>
            <div className="number-badge period-badge">
              {numerologyResults.realizationPeriods.secondPeriod.number}
            </div>
            {numerologyResults.realizationPeriods.secondPeriod.info && (
              <div className="period-content">
                <p className="period-summary">
                  {
                    numerologyResults.realizationPeriods.secondPeriod.info
                      .summary
                  }
                </p>
                <div className="period-details">
                  <p>
                    {
                      numerologyResults.realizationPeriods.secondPeriod.info
                        .description
                    }
                  </p>
                </div>
                <div className="period-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {
                      numerologyResults.realizationPeriods.secondPeriod.info
                        .challenge
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="period-card">
            <h3>
              <span className="period-title">Troisième Période</span>
              <span className="period-duration">(39 → 48 ans)</span>
            </h3>
            <div className="number-badge period-badge">
              {numerologyResults.realizationPeriods.thirdPeriod.number}
            </div>
            {numerologyResults.realizationPeriods.thirdPeriod.info && (
              <div className="period-content">
                <p className="period-summary">
                  {
                    numerologyResults.realizationPeriods.thirdPeriod.info
                      .summary
                  }
                </p>
                <div className="period-details">
                  <p>
                    {
                      numerologyResults.realizationPeriods.thirdPeriod.info
                        .description
                    }
                  </p>
                </div>
                <div className="period-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {
                      numerologyResults.realizationPeriods.thirdPeriod.info
                        .challenge
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="period-card">
            <h3>
              <span className="period-title">Quatrième Période</span>
              <span className="period-duration">(48 ans → fin de vie)</span>
            </h3>
            <div className="number-badge period-badge">
              {numerologyResults.realizationPeriods.fourthPeriod.number}
            </div>
            {numerologyResults.realizationPeriods.fourthPeriod.info && (
              <div className="period-content">
                <p className="period-summary">
                  {
                    numerologyResults.realizationPeriods.fourthPeriod.info
                      .summary
                  }
                </p>
                <div className="period-details">
                  <p>
                    {
                      numerologyResults.realizationPeriods.fourthPeriod.info
                        .description
                    }
                  </p>
                </div>
                <div className="period-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {
                      numerologyResults.realizationPeriods.fourthPeriod.info
                        .challenge
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nombres Personnels (Année, Mois, Jour) */}
      <section className="numerology-section personal-numbers">
        <div className="title-with-tooltip">
          <h2>Nombres Personnels</h2>
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
                Les nombres personnels (année, mois, jour) vous donnent des
                indications sur les énergies qui vous accompagnent au cours de
                l'année, du mois et du jour en cours.
              </p>
            </div>
          </div>
        </div>
        <div className="personal-numbers-grid">
          <div className="personal-card">
            <h3>
              <span className="personal-title">Année Personnelle</span>
              <span className="personal-period">
                (Janvier → Décembre {new Date().getFullYear()})
              </span>
            </h3>
            <div className="number-badge personal-badge">
              {numerologyResults.personalNumbers.year.number}
            </div>
            {numerologyResults.personalNumbers.year.info && (
              <div className="personal-content">
                <p className="personal-summary">
                  {numerologyResults.personalNumbers.year.info.summary}
                </p>
                <div className="personal-details">
                  <p>
                    {numerologyResults.personalNumbers.year.info.description}
                  </p>
                </div>
                <div className="personal-challenge">
                  <h4>Défi à relever</h4>
                  <p>{numerologyResults.personalNumbers.year.info.challenge}</p>
                </div>
              </div>
            )}
          </div>

          <div className="personal-card">
            <h3>
              <span className="personal-title">Mois Personnel</span>
              <span className="personal-period">
                (
                {new Date().toLocaleDateString("fr-FR", {
                  month: "long",
                  year: "numeric",
                })}
                )
              </span>
            </h3>
            <div className="number-badge personal-badge">
              {numerologyResults.personalNumbers.month.number}
            </div>
            {numerologyResults.personalNumbers.month.info && (
              <div className="personal-content">
                <p className="personal-summary">
                  {numerologyResults.personalNumbers.month.info.summary}
                </p>
                <div className="personal-details">
                  <p>
                    {numerologyResults.personalNumbers.month.info.description}
                  </p>
                </div>
                <div className="personal-challenge">
                  <h4>Défi à relever</h4>
                  <p>
                    {numerologyResults.personalNumbers.month.info.challenge}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="personal-card">
            <h3>
              <span className="personal-title">Jour Personnel</span>
              <span className="personal-period">
                (
                {new Date().toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                )
              </span>
            </h3>
            <div className="number-badge personal-badge">
              {numerologyResults.personalNumbers.day.number}
            </div>
            {numerologyResults.personalNumbers.day.info && (
              <div className="personal-content">
                <p className="personal-summary">
                  {numerologyResults.personalNumbers.day.info.summary}
                </p>
                <div className="personal-details">
                  <p>
                    {numerologyResults.personalNumbers.day.info.description}
                  </p>
                </div>
                <div className="personal-challenge">
                  <h4>Défi à relever</h4>
                  <p>{numerologyResults.personalNumbers.day.info.challenge}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DatesTab;
