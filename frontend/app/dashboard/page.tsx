export const dynamic = "force-dynamic";

const AI_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "http://ai:8000";

async function getAlerts() {
  try {
    const res = await fetch(`${AI_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logs: ["erro grave", "login ok", "falha critica"],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`AI respondeu com status ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao buscar alertas:", err);
    return {
      total_logs: 0,
      anomalies_detected: 0,
      anomalies: [],
    };
  }
}

export default async function Dashboard() {
  const data = await getAlerts();

  return (
    <main style={{ padding: 40 }}>
      <h1>📊 Dashboard – Sentinela.rs</h1>

      <p>Total de logs: {data.total_logs}</p>
      <p>Anomalias detectadas: {data.anomalies_detected}</p>

      <ul>
        {data.anomalies.map((log: string, i: number) => (
          <li key={i} style={{ color: "red" }}>
            ⚠️ {log}
          </li>
        ))}
      </ul>
    </main>
  );
}
