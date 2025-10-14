import React, { useState } from "react";
import "./KarmiqueTab.css";
import type { TabProps } from "../shared/types";
import { karmicDebtsData } from "../../../data";

const KarmiqueTab: React.FC<TabProps> = ({ numerologyResults }) => {
  // État pour gérer l'ouverture/fermeture des accordéons karmiques
  const [openKarmicAccordions, setOpenKarmicAccordions] = useState<Set<number>>(
    new Set()
  );

  // État pour gérer l'ouverture/fermeture des accordéons des cycles karmiques
  const [openCycleKarmicAccordions, setOpenCycleKarmicAccordions] = useState<
    Set<number>
  >(new Set());

  // Fonction pour gérer l'ouverture/fermeture des accordéons karmiques
  const toggleKarmicAccordion = (number: number) => {
    setOpenKarmicAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.clear();
        newSet.add(number);
      }
      return newSet;
    });
  };

  // Fonction pour gérer l'ouverture/fermeture des accordéons des cycles karmiques
  const toggleCycleKarmicAccordion = (number: number) => {
    setOpenCycleKarmicAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(number)) {
        newSet.delete(number);
      } else {
        newSet.clear();
        newSet.add(number);
      }
      return newSet;
    });
  };

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
              Karmique
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
                  Les aspects karmiques révèlent les leçons d'âme à apprendre
                  dans cette incarnation.
                </p>
                <p>
                  <strong>Nombres Karmiques</strong> : les chiffres manquants
                  dans ta date de naissance qui révèlent des défis intérieurs.
                </p>
                <p>
                  <strong>Cycles Karmiques</strong> : les expériences à intégrer
                  basées sur les lettres manquantes dans ton nom.
                </p>
                <p>
                  <strong>Dettes Karmiques</strong> : les leçons importantes
                  liées à des abus ou négligences dans des vies passées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des Nombres Karmiques */}
      <section className="numerology-section karmic-section">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Nombres Karmiques</h3>
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
                  Les nombres karmiques révèlent les leçons profondes d'âme
                  basées sur votre date de naissance. Ils indiquent les chiffres
                  manquants dans votre date de naissance qui révèlent des
                  faiblesses intérieures à travailler.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="karmic-overview">
          <div className="karmic-stats">
            <div className="stat-item">
              <span className="stat-number">
                {numerologyResults.karmicNumbers.presentNumbers.length}
              </span>
              <span className="stat-label">Nombres présents</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {numerologyResults.karmicNumbers.missingNumbers.length}
              </span>
              <span className="stat-label">Défis karmiques</span>
            </div>
          </div>

          <div className="present-numbers">
            <h4>Chiffres présents dans votre date de naissance :</h4>
            <div className="number-list">
              {numerologyResults.karmicNumbers.presentNumbers.map((num) => (
                <span key={num} className="number-tag present">
                  {num}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="karmic-definitions">
          {numerologyResults.karmicNumbers.karmicDefinitions.length > 0 ? (
            numerologyResults.karmicNumbers.karmicDefinitions.map((karmic) => (
              <div key={karmic.number} className="karmic-card">
                <div
                  className="karmic-header accordion-header"
                  onClick={() => toggleKarmicAccordion(karmic.number)}
                >
                  <h4>
                    Défi Karmique {karmic.number}
                    <span className="karmic-period">(Chiffre manquant)</span>
                  </h4>
                  <div className="header-right">
                    <div className="number-badge karmic-badge">
                      {karmic.number}
                    </div>
                    <div
                      className={`accordion-arrow ${
                        openKarmicAccordions.has(karmic.number) ? "open" : ""
                      }`}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 9L12 15L18 9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {openKarmicAccordions.has(karmic.number) && (
                  <div className="karmic-content accordion-content">
                    <div className="karmic-summary">
                      <h5>Résumé</h5>
                      <p>{karmic.summary}</p>
                    </div>

                    <div className="karmic-challenge">
                      <h5>Défi à relever</h5>
                      <p>{karmic.challenge}</p>
                    </div>

                    <div className="karmic-details">
                      <h5>Détails</h5>
                      <p>{karmic.details}</p>
                    </div>

                    {karmic.keywords.length > 0 && (
                      <div className="karmic-keywords">
                        <h5>Mots-clés</h5>
                        <div className="keywords-list">
                          {karmic.keywords.map((keyword, index) => (
                            <span key={index} className="keyword-tag">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-karmic-challenges">
              <h4>Félicitations !</h4>
              <p>
                Tous les chiffres de 1 à 9 sont présents dans votre date de
                naissance. Vous n'avez pas de défis karmiques spécifiques à
                relever.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section des Cycles Karmiques */}
      <section className="numerology-section cycle-karmic-section">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Cycles Karmiques</h3>
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
                  Les cycles karmiques représentent les expériences que vous
                  devez intégrer dans votre rapport au monde et votre identité
                  sociale. Ils sont basés sur les lettres manquantes dans votre
                  nom complet.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="cycle-karmic-overview">
          <div className="cycle-karmic-stats">
            <div className="stat-item">
              <span className="stat-number">
                {numerologyResults.cycleKarmicNumbers.presentNumbers.length}
              </span>
              <span className="stat-label">Nombres présents</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {numerologyResults.cycleKarmicNumbers.missingNumbers.length}
              </span>
              <span className="stat-label">Cycles karmiques</span>
            </div>
          </div>

          <div className="present-numbers">
            <h4>Nombres présents dans votre nom complet :</h4>
            <div className="number-list">
              {numerologyResults.cycleKarmicNumbers.presentNumbers.map(
                (num) => (
                  <span key={num} className="number-tag present">
                    {num}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="cycle-karmic-definitions">
          {numerologyResults.cycleKarmicNumbers.cycleKarmicDefinitions.length >
          0 ? (
            numerologyResults.cycleKarmicNumbers.cycleKarmicDefinitions.map(
              (cycleKarmic) => (
                <div key={cycleKarmic.number} className="cycle-karmic-card">
                  <div
                    className="cycle-karmic-header accordion-header"
                    onClick={() =>
                      toggleCycleKarmicAccordion(cycleKarmic.number)
                    }
                  >
                    <h3>
                      Cycle Karmique {cycleKarmic.number}
                      <span className="cycle-karmic-period">
                        (Lettre manquante)
                      </span>
                    </h3>
                    <div className="header-right">
                      <div className="number-badge cycle-karmic-badge">
                        {cycleKarmic.number}
                      </div>
                      <div
                        className={`accordion-arrow ${
                          openCycleKarmicAccordions.has(cycleKarmic.number)
                            ? "open"
                            : ""
                        }`}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 9L12 15L18 9"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {openCycleKarmicAccordions.has(cycleKarmic.number) && (
                    <div className="cycle-karmic-content accordion-content">
                      <div className="cycle-karmic-summary">
                        <h4>Résumé</h4>
                        <p>{cycleKarmic.summary}</p>
                      </div>

                      <div className="cycle-karmic-challenge">
                        <h4>Défi à relever</h4>
                        <p>{cycleKarmic.challenge}</p>
                      </div>

                      <div className="cycle-karmic-details">
                        <h4>Détails</h4>
                        <p>{cycleKarmic.details}</p>
                      </div>

                      {cycleKarmic.keywords.length > 0 && (
                        <div className="cycle-karmic-keywords">
                          <h4>Mots-clés</h4>
                          <div className="keywords-list">
                            {cycleKarmic.keywords.map((keyword, index) => (
                              <span key={index} className="keyword-tag">
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            )
          ) : (
            <div className="no-cycle-karmic-challenges">
              <h4>Félicitations !</h4>
              <p>
                Tous les nombres de 1 à 9 sont présents dans votre nom complet.
                Vous n'avez pas de cycles karmiques spécifiques à relever.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section des Dettes Karmiques */}
      <section className="numerology-section karmic-debts-section">
        <div className="section-header">
          <div className="title-with-tooltip">
            <h3>Dettes Karmiques</h3>
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
                  Les dettes karmiques (13, 14, 16, 19) révèlent des leçons
                  importantes à apprendre dans cette vie.
                </p>
                <p>
                  Elles indiquent des défis spécifiques liés à des abus ou des
                  négligences dans des vies passées.
                </p>
                <p>
                  Ces nombres apparaissent dans vos nombres principaux avant
                  réduction.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="karmic-debts-overview">
          <div className="karmic-debts-stats">
            <div className="stat-item">
              <span className="stat-number">
                {
                  numerologyResults.karmicDebts.allDebts.filter(
                    (debt) => debt.isKarmicDebt
                  ).length
                }
              </span>
              <span className="stat-label">Dettes karmiques</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {
                  numerologyResults.karmicDebts.allDebts.filter(
                    (debt) => !debt.isKarmicDebt
                  ).length
                }
              </span>
              <span className="stat-label">Nombres normaux</span>
            </div>
          </div>
        </div>

        <div className="karmic-debts-analysis">
          <h4>Analyse de vos nombres principaux</h4>
          <div className="debt-analysis-grid">
            <div className="debt-analysis-item">
              <h4>Chemin de Vie</h4>
              <div className="debt-number">
                {numerologyResults.karmicDebts.lifePathDebt.number}
                {numerologyResults.karmicDebts.lifePathDebt.isKarmicDebt && (
                  <span className="karmic-debt-highlight">
                    Dette{" "}
                    {numerologyResults.karmicDebts.lifePathDebt.karmicDebtType}
                  </span>
                )}
              </div>
            </div>

            <div className="debt-analysis-item">
              <h4>Expression</h4>
              <div className="debt-number">
                {numerologyResults.karmicDebts.expressionDebt.number}
                {numerologyResults.karmicDebts.expressionDebt.isKarmicDebt && (
                  <span className="karmic-debt-badge">
                    Dette{" "}
                    {
                      numerologyResults.karmicDebts.expressionDebt
                        .karmicDebtType
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="debt-analysis-item">
              <h4>Âme</h4>
              <div className="debt-number">
                {numerologyResults.karmicDebts.soulUrgeDebt.number}
                {numerologyResults.karmicDebts.soulUrgeDebt.isKarmicDebt && (
                  <span className="karmic-debt-badge">
                    Dette{" "}
                    {numerologyResults.karmicDebts.soulUrgeDebt.karmicDebtType}
                  </span>
                )}
              </div>
            </div>

            <div className="debt-analysis-item">
              <h4>Personnalité</h4>
              <div className="debt-number">
                {numerologyResults.karmicDebts.personalityDebt.number}
                {numerologyResults.karmicDebts.personalityDebt.isKarmicDebt && (
                  <span className="karmic-debt-badge">
                    Dette{" "}
                    {
                      numerologyResults.karmicDebts.personalityDebt
                        .karmicDebtType
                    }
                  </span>
                )}
              </div>
            </div>

            <div className="debt-analysis-item">
              <h4>Jour de Naissance</h4>
              <div className="debt-number">
                {numerologyResults.karmicDebts.birthdayDebt.number}
                {numerologyResults.karmicDebts.birthdayDebt.isKarmicDebt && (
                  <span className="karmic-debt-badge">
                    Dette{" "}
                    {numerologyResults.karmicDebts.birthdayDebt.karmicDebtType}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="karmic-debts-definitions">
          {numerologyResults.karmicDebts.allDebts
            .filter((debt) => debt.isKarmicDebt)
            .map((debt) => {
              const debtData =
                karmicDebtsData[
                  debt.karmicDebtType!.toString() as keyof typeof karmicDebtsData
                ];
              return (
                <div key={debt.karmicDebtType} className="karmic-debt-card">
                  <div className="karmic-debt-header">
                    <h4>
                      Dette Karmique {debt.karmicDebtType}
                      <span className="karmic-debt-period">
                        (Leçon à apprendre)
                      </span>
                    </h4>
                    <div className="number-badge karmic-debt-badge">
                      {debt.karmicDebtType}
                    </div>
                  </div>

                  <div className="karmic-debt-content">
                    <div className="karmic-debt-summary">
                      <h4>Résumé</h4>
                      <p>{debtData.summary}</p>
                    </div>

                    <div className="karmic-debt-challenge">
                      <h4>Défi à relever</h4>
                      <p>{debtData.challenge}</p>
                    </div>

                    <div className="karmic-debt-details">
                      <h4>Détails</h4>
                      <p>{debtData.details}</p>
                    </div>

                    {debtData.keywords.length > 0 && (
                      <div className="karmic-debt-keywords">
                        <h4>Mots-clés</h4>
                        <div className="keywords-list">
                          {debtData.keywords.map(
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
              );
            })}

          {numerologyResults.karmicDebts.allDebts.filter(
            (debt) => debt.isKarmicDebt
          ).length === 0 && (
            <div className="no-karmic-debts">
              <h4>Félicitations !</h4>
              <p>
                Aucune dette karmique détectée dans vos nombres principaux. Vous
                n'avez pas de leçons karmiques spécifiques à apprendre dans
                cette vie.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default KarmiqueTab;
