import React from "react";
import Header from "../../components/Header/Header";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import NumerologyBackground from "../../components/NumerologyBackground/NumerologyBackground";
import "./Profile.css";

interface ProfileProps {
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

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="profile-page">
      <NumerologyBackground />
      <Header onNavigate={onNavigate} />
      <ProfileSection onNavigate={onNavigate} />
    </div>
  );
};

export default Profile;
