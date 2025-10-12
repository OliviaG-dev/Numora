import React from "react";
import Header from "../../components/Header/Header";
import SignupSection from "../../components/SignupSection/SignupSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./Signup.css";

interface SignupProps {
  onNavigate: NavigateFunction;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  return (
    <div className="signup-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <SignupSection onNavigate={onNavigate} />
    </div>
  );
};

export default Signup;
