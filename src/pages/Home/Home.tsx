import React from "react";
import Header from "../../components/Header/Header";
import HomeSection from "../../components/HomeSection/HomeSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./Home.css";

interface HomeProps {
  onNavigate: NavigateFunction;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="home">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <HomeSection onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
