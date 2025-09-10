import React from "react";
import Header from "../../components/Header/Header";
import LoginSection from "../../components/LoginSection/LoginSection";
import "./Login.css";

interface LoginProps {
  onNavigate: (page: "home" | "signup" | "login") => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  return (
    <div className="login-page">
      <Header onNavigate={onNavigate} />
      <LoginSection onNavigate={onNavigate} />
    </div>
  );
};

export default Login;
