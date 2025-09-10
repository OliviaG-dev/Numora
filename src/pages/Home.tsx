import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import WhyNumora from "../components/WhyNumora/WhyNumora";
import TargetAudience from "../components/TargetAudience/TargetAudience";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <HeroSection />
      <FeaturesSection />
      <WhyNumora />
      <TargetAudience />
    </div>
  );
};

export default Home;
