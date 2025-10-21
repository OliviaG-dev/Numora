// Types partagés pour les composants de CompatibilityAnalyzerSection

import type {
  PersonInfo,
  CompatibilityResult,
  RelationshipType,
} from "../../../utils/numerology/compatibility";

export interface CompatibilityTabProps {
  person1: PersonInfo;
  person2: PersonInfo;
  analysisResult: CompatibilityResult;
  relationshipType: RelationshipType;
}

export interface CompatibilityFormProps {
  person1: PersonInfo;
  person2: PersonInfo;
  relationshipType: RelationshipType;
  onPerson1Change: (field: keyof PersonInfo, value: string) => void;
  onPerson2Change: (field: keyof PersonInfo, value: string) => void;
  onRelationshipChange: (type: RelationshipType) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  error: string | null;
}

