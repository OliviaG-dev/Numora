import React from "react";
import Header from "../components/Header/Header";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import WhyNumora from "../components/WhyNumora/WhyNumora";
import TargetAudience from "../components/TargetAudience/TargetAudience";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WhyNumora />
      <TargetAudience />
    </div>
  );
};

export default Home;
