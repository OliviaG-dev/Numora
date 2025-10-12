import React from "react";
import Header from "../../components/Header/Header";
import LoginSection from "../../components/LoginSection/LoginSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import type { NavigateFunction } from "../../types/navigation";
import "./Login.css";

interface LoginProps {
  onNavigate: NavigateFunction;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  return (
    <div className="login-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <LoginSection onNavigate={onNavigate} />
    </div>
  );
};

export default Login;
