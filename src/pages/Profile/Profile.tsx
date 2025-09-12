import React from "react";
import Header from "../../components/Header/Header";
import ProfileSection from "../../components/ProfileSection/ProfileSection";
import "./Profile.css";

interface ProfileProps {
  onNavigate: (
    page: "home" | "signup" | "login" | "newReading" | "profile" | "settings"
  ) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  return (
    <div className="profile-page">
      <Header onNavigate={onNavigate} />
      <ProfileSection onNavigate={onNavigate} />
    </div>
  );
};

export default Profile;

