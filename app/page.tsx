import Link from "next/link";

export default function Home() {
  return (
    <main className="kbc-page">
      <div className="kbc-shell">
        <div className="kbc-layout" style={{ gridTemplateColumns: "1fr" }}>
          <div className="kbc-left" style={{ alignItems: "center", textAlign: "center" }}>
            <div className="kbc-header" style={{ width: "100%", justifyContent: "center" }}>
              <div className="kbc-brand">
                <span className="kbc-brand-mark">Y</span>
                You & Me Quiz
              </div>
            </div>

            <div className="kbc-question-box" style={{ width: "100%", maxWidth: "720px" }}>
              <p className="kbc-question-label">Welcome</p>
              <h1 className="kbc-question">Are you ready to discover the sweetest little quiz about us?</h1>
              <p style={{ marginTop: 16, color: "#fef3c7", fontSize: "1.05rem", lineHeight: 1.7 }}>
                Four playful questions. One funny panda host. One final reveal at the end.
              </p>
            </div>

            <Link href="/1" className="kbc-next-button" style={{ minWidth: 220 }}>
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
