import React, { useState } from "react";
import "./ReadingsSection.css";

interface Reading {
  id: string;
  title: string;
  date: string;
  type: "Personnelle" | "Amie" | "Connaissance" | "Famille" | "Collègue";
  description: string;
  numbers: {
    main: number;
    secondary?: number[];
  };
  insights: string[];
}

import type { NavigateFunction } from "../../types/navigation";

interface ReadingsSectionProps {
  onNavigate: NavigateFunction;
}

const ReadingsSection: React.FC<ReadingsSectionProps> = ({ onNavigate }) => {
  // État pour le filtre des catégories
  const [selectedCategory, setSelectedCategory] = useState<string>("Toutes");

  // Données d'exemple pour les lectures
  const [readings] = useState<Reading[]>([
    {
      id: "1",
      title: "Ma lecture personnelle",
      date: "15 Décembre 2024",
      type: "Personnelle",
      description:
        "Une analyse complète de votre chemin de vie basée sur votre date de naissance.",
      numbers: {
        main: 7,
        secondary: [3, 5, 9],
      },
      insights: [
        "Vous êtes une personne spirituelle et intuitive",
        "Votre mission implique l'enseignement et la sagesse",
      ],
    },
    {
      id: "2",
      title: "Lecture pour mon amie",
      date: "10 Décembre 2024",
      type: "Amie",
      description: "Découvrez comment vous vous exprimez dans le monde.",
      numbers: {
        main: 3,
        secondary: [1, 7],
      },
      insights: [
        "Vous avez un talent naturel pour la communication",
        "Votre créativité est votre plus grand atout",
      ],
    },
  ]);

  // Fonction pour filtrer les lectures par catégorie
  const filteredReadings = readings.filter(
    (reading) =>
      selectedCategory === "Toutes" || reading.type === selectedCategory
  );

  // Liste des catégories disponibles
  const categories = [
    "Toutes",
    "Personnelle",
    "Amie",
    "Connaissance",
    "Famille",
    "Collègue",
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      Personnelle: "rgba(139, 92, 246, 0.8)",
      Amie: "rgba(245, 158, 11, 0.8)",
      Connaissance: "rgba(59, 130, 246, 0.8)",
      Famille: "rgba(236, 72, 153, 0.8)",
      Collègue: "rgba(34, 197, 94, 0.8)",
    };
    return colors[type as keyof typeof colors] || "rgba(255, 255, 255, 0.6)";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Toutes: "rgba(255, 255, 255, 0.3)",
      Personnelle: "rgba(139, 92, 246, 0.6)",
      Amie: "rgba(245, 158, 11, 0.6)",
      Connaissance: "rgba(59, 130, 246, 0.6)",
      Famille: "rgba(236, 72, 153, 0.6)",
      Collègue: "rgba(34, 197, 94, 0.6)",
    };
    return (
      colors[category as keyof typeof colors] || "rgba(255, 255, 255, 0.3)"
    );
  };

  return (
    <div className="readings-section">
      <div className="readings-container">
        <div className="readings-header">
          <h1 className="readings-title">Mes Lectures</h1>
          <p className="readings-subtitle">
            Retrouvez toutes vos analyses numérologiques
          </p>
        </div>

        {/* Système de tags pour filtrer */}
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-tag ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
              style={{
                color:
                  selectedCategory === category
                    ? "white"
                    : getCategoryColor(category),
                backgroundColor:
                  selectedCategory === category
                    ? getCategoryColor(category)
                    : "transparent",
                borderColor: getCategoryColor(category),
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredReadings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <span>Aucune lecture pour le moment</span>
            <p>
              Commencez votre voyage numérologique en créant votre première
              lecture.
            </p>
            <button
              className="cta-button"
              onClick={() => onNavigate("newReading")}
            >
              Créer ma première lecture
            </button>
          </div>
        ) : (
          <div className="readings-grid">
            {filteredReadings.map((reading) => (
              <div key={reading.id} className="reading-card">
                <div className="reading-header">
                  <div className="reading-date">{reading.date}</div>
                  <div
                    className="reading-type"
                    style={{ color: getTypeColor(reading.type) }}
                  >
                    {reading.type}
                  </div>
                </div>
                <span className="reading-title-card">{reading.title}</span>
                <div className="reading-actions">
                  <button className="view-more-btn">Voir plus</button>
                  <button className="delete-btn">Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingsSection;
