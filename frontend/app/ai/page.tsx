import { askSymptoms } from "../../services/ai";

"use client";

import { useState } from "react";

export default function Page() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    try {
      setResult(await askSymptoms(symptoms));
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Request failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>AI Assistant</h1>
      <p>Enter symptoms for general informational guidance. This is not a diagnosis.</p>
      <input value={symptoms} onChange={e => setSymptoms(e.target.value)} placeholder="Describe symptoms..." />
      <br /><br />
      <button onClick={submit} disabled={loading || !symptoms.trim()}>{loading ? "Thinking..." : "Get guidance"}</button>
      <pre>{result ? JSON.stringify(result, null, 2) : "No response yet."}</pre>
    </main>
  );
}
