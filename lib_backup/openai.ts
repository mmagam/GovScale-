import OpenAI from "openai";

import type { AssessmentAnswer } from "@/lib/types";

const outputSchema = {
  name: "strategic_assessment",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      headline: { type: "string" },
      summary: { type: "string" },
      strengths: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 4
      },
      focusAreas: {
        type: "array",
        items: { type: "string" },
        minItems: 2,
        maxItems: 4
      },
      recommendation: { type: "string" },
      overallScore: { type: "number" },
      dimensions: {
        type: "array",
        minItems: 6,
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            key: { type: "string" },
            label: { type: "string" },
            score: { type: "number" }
          },
          required: ["key", "label", "score"]
        }
      }
    },
    required: [
      "headline",
      "summary",
      "strengths",
      "focusAreas",
      "recommendation",
      "overallScore",
      "dimensions"
    ]
  },
  strict: true
} as const;

export async function generateOpenAIAssessment(answers: AssessmentAnswer[]) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You are a senior organizational strategy consultant. Analyze the responses, score the organization from 0 to 100 across these six dimensions: leadershipCapability, collaboration, learningCulture, resilience, resultsOrientation, customerImpact. Return concise, professional language. Scores should reflect realistic differentiation, not all the same."
          }
        ]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify({ answers }, null, 2)
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: outputSchema.name,
        schema: outputSchema.schema,
        strict: true
      }
    }
  });

  const parsed = extractStructuredOutput(response);

  if (!parsed) {
    throw new Error("OpenAI response did not include parsed output.");
  }

  return parsed;
}

function extractStructuredOutput(response: unknown) {
  const candidate = response as {
    output_text?: string;
    output?: Array<{
      content?: Array<{
        type?: string;
        text?: string;
      }>;
    }>;
  };

  if (candidate.output_text) {
    return JSON.parse(candidate.output_text);
  }

  const textBlock = candidate.output
    ?.flatMap((item) => item.content ?? [])
    .find((item) => item.type === "output_text" && item.text);

  if (textBlock?.text) {
    return JSON.parse(textBlock.text);
  }

  return null;
}
