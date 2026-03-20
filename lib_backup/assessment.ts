import { z } from "zod";

import type { AssessmentAnswer, AssessmentResult } from "@/lib/types";
import { generateOpenAIAssessment } from "@/lib/openai";

const assessmentSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  strengths: z.array(z.string()).min(2).max(4),
  focusAreas: z.array(z.string()).min(2).max(4),
  recommendation: z.string(),
  overallScore: z.number().min(0).max(100),
  dimensions: z
    .array(
      z.object({
        key: z.string(),
        label: z.string(),
        score: z.number().min(0).max(100)
      })
    )
    .length(6)
});

const DIMENSION_LABELS = [
  ["leadershipCapability", "Leadership"],
  ["collaboration", "Collaboration"],
  ["learningCulture", "Learning"],
  ["resilience", "Resilience"],
  ["resultsOrientation", "Results"],
  ["customerImpact", "Customer Impact"]
] as const;

export async function generateAssessment(
  answers: AssessmentAnswer[]
): Promise<AssessmentResult> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await generateOpenAIAssessment(answers);
      const parsed = assessmentSchema.parse(response);
      return { ...parsed, source: "openai" };
    } catch (error) {
      console.warn("Falling back to mock assessment", error);
    }
  }

  const mock = buildMockAssessment(answers);
  return { ...assessmentSchema.parse(mock), source: "mock" };
}

function buildMockAssessment(answers: AssessmentAnswer[]) {
  const dimensions = DIMENSION_LABELS.map(([key, label], index) => {
    const answer = answers[index];
    const lengthFactor = Math.min(answer.response.trim().length / 240, 1);
    const positiveSignals = countSignals(answer.response, [
      "clear",
      "aligned",
      "strong",
      "effective",
      "customer",
      "learn",
      "adapt",
      "collabor",
      "resilien",
      "results"
    ]);
    const cautionSignals = countSignals(answer.response, [
      "silo",
      "unclear",
      "slow",
      "reactive",
      "inconsistent",
      "conflict",
      "weak",
      "limited",
      "challenge"
    ]);

    const score = Math.max(
      45,
      Math.min(92, Math.round(55 + lengthFactor * 15 + positiveSignals * 4 - cautionSignals * 3))
    );

    return { key, label, score };
  });

  const overallScore = Math.round(
    dimensions.reduce((total, dimension) => total + dimension.score, 0) /
      dimensions.length
  );

  const strongest = [...dimensions].sort((a, b) => b.score - a.score).slice(0, 2);
  const weakest = [...dimensions].sort((a, b) => a.score - b.score).slice(0, 2);

  const headline =
    overallScore >= 75
      ? "Strong strategic foundation with clear room to sharpen execution"
      : "Mixed strategic capability with priority gaps to address";

  const summary = `The organization shows an overall capability level of ${overallScore}/100. Responses suggest the strongest signals in ${strongest
    .map((item) => item.label.toLowerCase())
    .join(" and ")}, while the largest opportunities sit in ${weakest
    .map((item) => item.label.toLowerCase())
    .join(" and ")}. This output is ${
    process.env.OPENAI_API_KEY ? "a fallback heuristic" : "a local heuristic"
  } and gives the MVP a dependable baseline even before live AI configuration.`;

  const strengths = [
    `Higher confidence in ${strongest[0].label.toLowerCase()} based on the depth and positivity of the response.`,
    `Above-average score in ${strongest[1].label.toLowerCase()}, indicating meaningful organizational traction.`,
    "Responses include enough narrative detail to support a practical strategic discussion."
  ];

  const focusAreas = [
    `Clarify specific actions to improve ${weakest[0].label.toLowerCase()} in day-to-day operations.`,
    `Reduce inconsistency around ${weakest[1].label.toLowerCase()} with better routines, ownership, or measurement.`,
    "Translate qualitative observations into a small set of measurable follow-up actions."
  ];

  const recommendation = `Use this assessment as a starting point for a facilitated review. Validate the patterns in ${weakest[0].label.toLowerCase()} and ${weakest[1].label.toLowerCase()} with leadership stakeholders, then define 2 to 3 focused interventions for the next quarter.`;

  return {
    headline,
    summary,
    strengths,
    focusAreas,
    recommendation,
    overallScore,
    dimensions
  };
}

function countSignals(text: string, signals: string[]) {
  const normalized = text.toLowerCase();
  return signals.reduce(
    (count, signal) => count + (normalized.includes(signal) ? 1 : 0),
    0
  );
}
