export type AssessmentAnswer = {
  id: string;
  prompt: string;
  response: string;
};

export type AssessmentDimension = {
  key: string;
  label: string;
  score: number;
};

export type AssessmentResult = {
  headline: string;
  summary: string;
  strengths: string[];
  focusAreas: string[];
  recommendation: string;
  overallScore: number;
  dimensions: AssessmentDimension[];
  source: "mock" | "openai";
};
