import React from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import WhyNumora from "./components/WhyNumora";
import TargetAudience from "./components/TargetAudience";
import "./App.css";

function App() {
  return (
    <div className="app">
      <HeroSection />
      <FeaturesSection />
      <WhyNumora />
      <TargetAudience />
    </div>
  );
}

export default App;
