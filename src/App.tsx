import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "signup" | "login">(
    "home"
  );

  const navigateToPage = (page: "home" | "signup" | "login") => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" && <Home onNavigate={navigateToPage} />}
      {currentPage === "signup" && <Signup onNavigate={navigateToPage} />}
      {currentPage === "login" && <Login onNavigate={navigateToPage} />}
    </>
  );
}

export default App;
