import React, { useState } from "react";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "signup">("home");

  const navigateToPage = (page: "home" | "signup") => {
    setCurrentPage(page);
  };

  return (
    <>
      {currentPage === "home" && <Home onNavigate={navigateToPage} />}
      {currentPage === "signup" && <Signup onNavigate={navigateToPage} />}
    </>
  );
}

export default App;
