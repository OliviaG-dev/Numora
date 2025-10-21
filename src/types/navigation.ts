// Types partagés pour la navigation

export type PageType =
  | "home"
  | "signup"
  | "login"
  | "newReading"
  | "profile"
  | "settings"
  | "readings"
  | "readingDetail"
  | "dateAnalyzer"
  | "nameAnalyzer"
  | "dailyVibration"
  | "compatibilityAnalyzer";

export interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  birthTime?: string;
}

export type NavigateFunction = (
  page: PageType,
  readingData?: ReadingData
) => void;
