export const dynamic = "force-dynamic";

type AnalyzeResponse = {
  total_logs: number;
  anomalies_detected: number;
  anomalies: string[];
};

async function analyze(): Promise<AnalyzeResponse | null> {
  try {
    const res = await fetch("http://localhost:8080/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logs: ["erro grave", "login ok", "falha critica", "ok"]
      }),
      cache: "no-store",
    });

    if (!res.ok) throw new Error();

    return res.json();
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const data = await analyze();

  return (
    <main style={{ padding: 40 }}>
      <h1>📊 Sentinela.rs</h1>

      {!data && <p>⚠️ IA indisponível</p>}

      {data && (
        <>
          <p>Total logs: {data.total_logs}</p>
          <p>Anomalias: {data.anomalies_detected}</p>

          <ul>
            {data.anomalies.map((a, i) => (
              <li key={i} style={{ color: "red" }}>⚠️ {a}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
