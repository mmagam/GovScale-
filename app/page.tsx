import { QuestionnaireForm } from "@/components/questionnaire-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-sand">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col gap-10 px-6 py-10 lg:px-10">
        <div className="grid gap-8 rounded-[32px] bg-white p-8 shadow-card lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <p className="inline-flex w-fit rounded-full bg-[#f9dccf] px-4 py-2 text-sm font-semibold text-ink">
                AI Strategic Assessment Tool
              </p>
              <div className="space-y-4">
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  Turn five answers into a strategic capability snapshot.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-[#425563]">
                  Capture organizational signals across leadership, collaboration,
                  learning culture, resilience, results orientation, and customer
                  impact in one streamlined assessment.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-[#fff7f1] p-4">
                <p className="text-sm font-semibold text-ink">Fast to complete</p>
                <p className="mt-2 text-sm text-[#536471]">
                  Five questions, one submission, immediate feedback.
                </p>
              </div>
              <div className="rounded-3xl bg-[#f3f6f4] p-4">
                <p className="text-sm font-semibold text-ink">Visual output</p>
                <p className="mt-2 text-sm text-[#536471]">
                  Radar chart makes strengths and gaps easy to discuss.
                </p>
              </div>
              <div className="rounded-3xl bg-[#eef4f8] p-4">
                <p className="text-sm font-semibold text-ink">AI-supported</p>
                <p className="mt-2 text-sm text-[#536471]">
                  Narrative analysis turns responses into practical direction.
                </p>
              </div>
            </div>
          </div>

          <QuestionnaireForm />
        </div>
      </section>
    </main>
  );
}
