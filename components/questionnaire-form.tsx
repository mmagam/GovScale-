"use client";

import { useState, useTransition } from "react";

import { QUESTIONS } from "@/lib/questions";
import type { AssessmentAnswer, AssessmentResult } from "@/lib/types";
import { ResultsDashboard } from "@/components/results-dashboard";

const initialAnswers = QUESTIONS.map((question) => ({
  id: question.id,
  prompt: question.prompt,
  response: ""
}));

export function QuestionnaireForm() {
  const [answers, setAnswers] = useState<AssessmentAnswer[]>(initialAnswers);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isComplete = answers.every((answer) => answer.response.trim().length >= 10);

  function updateAnswer(id: string, response: string) {
    setAnswers((current) =>
      current.map((answer) =>
        answer.id === id ? { ...answer, response } : answer
      )
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/assess", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ answers })
        });

        const payload = await response.json();

        if (!response.ok) {
          setResult(null);
          setError(payload.error ?? "Something went wrong.");
          return;
        }

        setResult(payload as AssessmentResult);
      } catch (submissionError) {
        console.error(submissionError);
        setResult(null);
        setError("The assessment service is unavailable right now.");
      }
    });
  }

  return (
    <div className="rounded-[28px] bg-ink p-6 text-white lg:p-8">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.2em] text-mist">
          Assessment questionnaire
        </p>
        <h2 className="text-3xl font-semibold">Capture your strategic signals</h2>
        <p className="text-sm leading-7 text-[#d2dbe0]">
          Share concise answers with enough context for the AI engine to produce
          a useful assessment. Each response should be at least a sentence long.
        </p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        {QUESTIONS.map((question, index) => {
          const answer = answers.find((item) => item.id === question.id);

          return (
            <label
              key={question.id}
              className="block rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <span className="mb-3 block text-sm font-semibold text-[#f6ede5]">
                {index + 1}. {question.prompt}
              </span>
              <textarea
                className="min-h-28 w-full rounded-2xl border border-white/10 bg-[#16303f] px-4 py-3 text-base text-white outline-none transition placeholder:text-[#8ba1ad] focus:border-[#f6b89d]"
                placeholder={question.placeholder}
                value={answer?.response ?? ""}
                onChange={(event) => updateAnswer(question.id, event.target.value)}
              />
            </label>
          );
        })}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={!isComplete || isPending}
            className="inline-flex items-center justify-center rounded-full bg-ember px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#dd5b2b] disabled:cursor-not-allowed disabled:bg-[#c88a74]"
          >
            {isPending ? "Generating assessment..." : "Generate assessment"}
          </button>
          <p className="text-sm text-[#d2dbe0]">
            {isPending
              ? "Analyzing responses and preparing the report."
              : "Results appear below immediately after submission."}
          </p>
        </div>

        {error ? (
          <p className="rounded-2xl border border-[#ffbfa5] bg-[#4a2d25] px-4 py-3 text-sm text-[#ffe0d2]">
            {error}
          </p>
        ) : null}
      </form>

      <ResultsDashboard result={result} />
    </div>
  );
}
