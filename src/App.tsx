import { useState } from "react";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import NewReading from "./pages/NewReading/NewReading";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Readings from "./pages/Readings/Readings";
import ReadingDetail from "./pages/ReadingDetail/ReadingDetail";
import DateAnalyzer from "./pages/DateAnalyzer/DateAnalyzer";
import NameAnalyzer from "./pages/NameAnalyzer/NameAnalyzer";
import DailyVibration from "./pages/DailyVibration/DailyVibration";
import CompatibilityAnalyzer from "./pages/CompatibilityAnalyzer/CompatibilityAnalyzer";
import type { PageType, ReadingData } from "./types/navigation";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  const [currentReadingData, setCurrentReadingData] =
    useState<ReadingData | null>(null);

  const navigateToPage = (page: PageType, readingData?: ReadingData) => {
    setCurrentPage(page);
    if (readingData) {
      setCurrentReadingData(readingData);
    }
  };

  return (
    <>
      {currentPage === "home" && <Home onNavigate={navigateToPage} />}
      {currentPage === "signup" && <Signup onNavigate={navigateToPage} />}
      {currentPage === "login" && <Login onNavigate={navigateToPage} />}
      {currentPage === "newReading" && (
        <NewReading onNavigate={navigateToPage} />
      )}
      {currentPage === "profile" && <Profile onNavigate={navigateToPage} />}
      {currentPage === "settings" && <Settings onNavigate={navigateToPage} />}
      {currentPage === "readings" && <Readings onNavigate={navigateToPage} />}
      {currentPage === "readingDetail" && (
        <ReadingDetail
          onNavigate={navigateToPage}
          readingData={currentReadingData || undefined}
        />
      )}
      {currentPage === "dateAnalyzer" && (
        <DateAnalyzer onNavigate={navigateToPage} />
      )}
      {currentPage === "nameAnalyzer" && (
        <NameAnalyzer onNavigate={navigateToPage} />
      )}
      {currentPage === "dailyVibration" && (
        <DailyVibration onNavigate={navigateToPage} />
      )}
      {currentPage === "compatibilityAnalyzer" && (
        <CompatibilityAnalyzer onNavigate={navigateToPage} />
      )}
    </>
  );
}

export default App;
