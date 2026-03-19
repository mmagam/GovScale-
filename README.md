# AI Strategic Assessment Tool

An MVP web application for collecting five qualitative answers and returning an AI-powered strategic assessment with a radar chart and written summary.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- OpenAI API with a local mock fallback

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Optionally add `OPENAI_API_KEY` to enable live AI analysis.

4. Start the development server:

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Behavior

- Without `OPENAI_API_KEY`, the app uses a deterministic local scoring heuristic so the MVP still works.
- With `OPENAI_API_KEY`, the `/api/assess` route sends answers to the OpenAI Responses API and expects structured JSON output.

## Project Structure

```text
app/
  api/assess/route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  questionnaire-form.tsx
  results-dashboard.tsx
lib/
  assessment.ts
  openai.ts
  questions.ts
  types.ts
```
