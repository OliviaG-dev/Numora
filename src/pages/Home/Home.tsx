import React from "react";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import "./Home.css";

interface HomeProps {
  onNavigate: (
    page:
      | "home"
      | "signup"
      | "login"
      | "newReading"
      | "profile"
      | "settings"
      | "readings"
  ) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="home">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
