// Types partagés pour les composants de ReadingDetailSection

export interface ReadingData {
  readingName: string;
  category: string;
  firstGivenName: string;
  secondGivenName: string;
  thirdGivenName: string;
  familyName: string;
  birthDate: string;
  gender: string;
}

export interface NumerologyResults {
  lifePath: { number: number; info: any };
  expression: { number: number; info: any };
  soulUrge: { number: number; info: string[] | undefined };
  personality: { number: number; info: string[] | undefined };
  birthday: { number: number; info: string[] | undefined };
  challenges: {
    first: { number: number; description: string };
    second: { number: number; description: string };
    third: { number: number; description: string };
    fourth: { number: number; description: string };
  };
  lifeCycles: {
    firstCycle: { number: number; info: any };
    secondCycle: { number: number; info: any };
    thirdCycle: { number: number; info: any };
  };
  realizationPeriods: {
    firstPeriod: { number: number; info: any };
    secondPeriod: { number: number; info: any };
    thirdPeriod: { number: number; info: any };
    fourthPeriod: { number: number; info: any };
  };
  personalNumbers: {
    year: { number: number; info: any };
    month: { number: number; info: any };
    day: { number: number; info: any };
  };
  karmicNumbers: {
    fullName: string;
    presentNumbers: number[];
    missingNumbers: number[];
    karmicDefinitions: Array<{
      number: number;
      summary: string;
      challenge: string;
      details: string;
      keywords: string[];
    }>;
  };
  cycleKarmicNumbers: {
    fullName: string;
    presentNumbers: number[];
    missingNumbers: number[];
    cycleKarmicDefinitions: Array<{
      number: number;
      summary: string;
      challenge: string;
      details: string;
      keywords: string[];
    }>;
  };
  karmicDebts: {
    lifePathDebt: any;
    expressionDebt: any;
    soulUrgeDebt: any;
    personalityDebt: any;
    birthdayDebt: any;
    allDebts: any[];
  };
}

export interface TabProps {
  numerologyResults: NumerologyResults;
  readingData?: ReadingData;
}
