import { NextResponse } from "next/server";
import { z } from "zod";

import { generateAssessment } from "@/lib/assessment";
import type { AssessmentAnswer } from "@/lib/types";

const requestSchema = z.object({
  answers: z
    .array(
      z.object({
        id: z.string(),
        prompt: z.string(),
        response: z.string().min(10, "Please provide a more complete answer.")
      })
    )
    .length(5)
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Please complete all five questions before submitting.",
          details: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const result = await generateAssessment(parsed.data.answers as AssessmentAnswer[]);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Assessment request failed", error);

    return NextResponse.json(
      {
        error:
          "We could not generate the assessment right now. Please try again."
      },
      { status: 500 }
    );
  }
}
