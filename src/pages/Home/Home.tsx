import React from "react";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/HeroSection/HeroSection";
import FeaturesSection from "../../components/FeaturesSection/FeaturesSection";
import WhyNumora from "../../components/WhyNumora/WhyNumora";
import TargetAudience from "../../components/TargetAudience/TargetAudience";
import "./Home.css";

interface HomeProps {
  onNavigate: (page: "home" | "signup") => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="home">
      <Header onNavigate={onNavigate} />
      <HeroSection onNavigate={onNavigate} />
      <FeaturesSection />
      <WhyNumora />
      <TargetAudience />
    </div>
  );
};

export default Home;
