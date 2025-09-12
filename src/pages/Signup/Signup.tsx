
import React from "react";
import Header from "../../components/Header/Header";
import SignupSection from "../../components/SignupSection/SignupSection";
import "./Signup.css";

interface SignupProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  return (
    <div className="signup-page">
      <Header onNavigate={onNavigate} />
      <SignupSection onNavigate={onNavigate} />
    </div>
  );
};

export default Signup;
