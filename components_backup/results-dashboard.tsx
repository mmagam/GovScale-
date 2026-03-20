"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts";

import type { AssessmentResult } from "@/lib/types";

type ResultsDashboardProps = {
  result: AssessmentResult | null;
};

export function ResultsDashboard({ result }: ResultsDashboardProps) {
  if (!result) {
    return (
      <div className="mt-8 rounded-[28px] border border-dashed border-white/20 bg-white/5 p-6">
        <p className="text-sm uppercase tracking-[0.2em] text-mist">Results</p>
        <p className="mt-3 text-lg text-white">
          Submit the questionnaire to generate the assessment chart and written
          report.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-8 space-y-6 rounded-[28px] bg-[#f5efe7] p-5 text-ink sm:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-[#6d7f8b]">
            Assessment report
          </p>
          <h3 className="mt-2 text-2xl font-semibold">{result.headline}</h3>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 text-right shadow-sm">
          <p className="text-xs uppercase tracking-[0.18em] text-[#6d7f8b]">
            Overall score
          </p>
          <p className="text-3xl font-semibold text-ink">{result.overallScore}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="h-[320px] rounded-[28px] bg-white p-4">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={result.dimensions}>
              <PolarGrid stroke="#d7e0e5" />
              <PolarAngleAxis dataKey="label" tick={{ fill: "#425563", fontSize: 12 }} />
              <Radar
                dataKey="score"
                stroke="#f26b38"
                fill="#f26b38"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-5">
          <div className="rounded-[28px] bg-white p-5">
            <p className="text-sm font-semibold text-[#425563]">Executive summary</p>
            <p className="mt-3 text-base leading-7 text-[#243845]">
              {result.summary}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] bg-white p-5">
              <p className="text-sm font-semibold text-[#425563]">Strengths</p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#243845]">
                {result.strengths.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-[28px] bg-white p-5">
              <p className="text-sm font-semibold text-[#425563]">
                Focus areas
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-[#243845]">
                {result.focusAreas.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#e9efe9] p-5">
            <p className="text-sm font-semibold text-[#425563]">
              Recommended next step
            </p>
            <p className="mt-3 text-sm leading-6 text-[#243845]">
              {result.recommendation}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
