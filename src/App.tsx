import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NewReading from "./pages/NewReading/NewReading";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "signup" | "login" | "newReading"
  >("home");

  const navigateToPage = (page: "home" | "signup" | "login" | "newReading") => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" && <Home onNavigate={navigateToPage} />}
      {currentPage === "signup" && <Signup onNavigate={navigateToPage} />}
      {currentPage === "login" && <Login onNavigate={navigateToPage} />}
      {currentPage === "newReading" && (
        <NewReading onNavigate={navigateToPage} />
      )}
    </>
  );
}

export default App;
