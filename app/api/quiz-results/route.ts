export type QuizResultEntry = {
  id: number;
  type: "answer" | "secret";
  question?: number;
  optionLetter?: string;
  optionText?: string;
  value?: string;
  message: string;
  createdAt: string;
};

const quizResults: QuizResultEntry[] = [];
let nextId = 1;

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({ results: quizResults });
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    type?: "answer" | "secret";
    question?: number;
    optionLetter?: string;
    optionText?: string;
    value?: string;
    message?: string;
  };

  const message =
    body.message ??
    (body.type === "secret"
      ? `Secret number entered: ${body.value ?? ""}`
      : body.question
        ? `Question ${body.question} clicked option ${body.optionLetter ?? "?"}: ${body.optionText ?? ""}`
        : "Quiz activity logged");

  const entry: QuizResultEntry = {
    id: nextId++,
    type: body.type ?? "answer",
    question: body.question,
    optionLetter: body.optionLetter,
    optionText: body.optionText,
    value: body.value,
    message,
    createdAt: new Date().toISOString(),
  };

  quizResults.unshift(entry);

  return Response.json({ ok: true, entry });
}
