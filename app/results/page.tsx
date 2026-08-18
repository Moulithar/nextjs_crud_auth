"use client";

import { useEffect, useState } from "react";

type QuizResultEntry = {
  id: number;
  type: "answer" | "secret";
  question?: number;
  optionLetter?: string;
  optionText?: string;
  value?: string;
  message: string;
  createdAt: string;
};

export default function QuizResultsPage() {
  const [results, setResults] = useState<QuizResultEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await fetch("/api/quiz-results", { cache: "no-store" });
      const data = await response.json();
      setResults(data.results ?? []);
    } catch (error) {
      console.error("Failed to load quiz results", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="kbc-page">
      <div className="kbc-shell">
        <div className="kbc-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kbc-left" style={{ alignItems: "center", textAlign: "center" }}>
            <div className="kbc-header" style={{ width: "100%", justifyContent: "center" }}>
              <div className="kbc-brand">
                <span className="kbc-brand-mark">R</span>
                Live Results
              </div>
            </div>

            <div className="kbc-question-box" style={{ width: "100%", maxWidth: "980px" }}>
              <p className="kbc-question-label">Live log</p>
              <h1 className="kbc-question">What the person is choosing right now</h1>
            </div>

            <div style={{ width: "100%", maxWidth: 980, marginTop: 16 }}>
              {loading ? (
                <div className="kbc-feedback">Loading live quiz activity...</div>
              ) : results.length === 0 ? (
                <div className="kbc-feedback">No activity yet. The quiz has not recorded anything yet.</div>
              ) : (
                <div style={{ display: "grid", gap: 12 }}>
                  {results.map((result) => (
                    <div
                      key={result.id}
                      style={{
                        borderRadius: 16,
                        background: "rgba(15, 23, 42, 0.72)",
                        border: "1px solid rgba(250, 204, 21, 0.25)",
                        padding: 16,
                        textAlign: "left",
                        color: "#fff7d6",
                      }}
                    >
                      <div style={{ fontSize: 12, color: "#facc15", letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 6 }}>
                        {result.type === "secret" ? "Secret" : `Question ${result.question ?? "?"}`}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16 }}>{result.message}</div>
                      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
                        {new Date(result.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
