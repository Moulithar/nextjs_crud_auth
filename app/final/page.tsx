"use client";

import Link from "next/link";
import { useState } from "react";

export default function FinalPage() {
  const [number, setNumber] = useState("");

  const handleSubmit = async () => {
    const trimmed = number.trim();

    if (!trimmed) {
      return;
    }

    const message = `Final quiz secret number entered: ${trimmed}`;

    try {
      await fetch("/api/quiz-results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "secret",
          value: trimmed,
          message,
        }),
      });
    } catch (error) {
      console.error("Unable to log secret number", error);
    }
  };

  return (
    <main className="kbc-page">
      <div className="kbc-shell">
        <div className="kbc-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kbc-left" style={{ alignItems: "center", textAlign: "center" }}>
            <div className="kbc-header" style={{ width: "100%", justifyContent: "center" }}>
              <div className="kbc-brand">
                <span className="kbc-brand-mark">✓</span>
                Quiz Complete
              </div>
            </div>

            <div className="kbc-question-box" style={{ width: "100%", maxWidth: "760px" }}>
              <p className="kbc-question-label">Final Result</p>
              <h1 className="kbc-question">You & Me quiz complete! ❤️</h1>
              <p style={{ marginTop: 18, color: "#fef3c7", fontSize: "1.08rem", lineHeight: 1.7 }}>
                You made it through all four rounds. The panda is proud, happy, and deeply impressed.
                <br />
                This is the official &ldquo;You & Me&rdquo; finale.
              </p>
            </div>

            <div style={{ width: "100%", maxWidth: 420 }}>
              <label htmlFor="whatsapp-number" style={{ display: "block", marginBottom: 10, fontWeight: 700, color: "#fef3c7" }}>
                Secret WhatsApp number
              </label>
              <input
                id="whatsapp-number"
                type="tel"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Enter your WhatsApp number"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: "1px solid rgba(250, 204, 21, 0.3)",
                  background: "rgba(15, 23, 42, 0.7)",
                  color: "#fff",
                  fontSize: 16,
                }}
              />
            </div>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", marginTop: 18 }}>
              <button type="button" className="kbc-next-button" onClick={handleSubmit}>
                Save number
              </button>
              <Link href="/1" className="kbc-next-button">
                Play Again
              </Link>
              <Link href="/" className="kbc-next-button" style={{ background: "linear-gradient(135deg, #e2e8f0, #cbd5e1)" }}>
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
