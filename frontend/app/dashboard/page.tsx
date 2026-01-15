export const dynamic = "force-dynamic";

type AnalyzeResponse = {
  total_logs: number;
  anomalies_detected: number;
  anomalies: string[];
};

async function getAlerts(): Promise<AnalyzeResponse | null> {
  try {
    const res = await fetch("http://ai:8000/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logs: ["erro grave", "login ok", "falha critica", "ok"],
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao acessar AI service");
    }

    return res.json();
  } catch (error) {
    console.error("Erro ao buscar alertas:", error);
    return null;
  }
}

export default async function Dashboard() {
  const data = await getAlerts();

  return (
    <main style={{ padding: 40 }}>
      <h1>📊 Dashboard – Sentinela.rs</h1>

      {!data && (
        <p style={{ color: "orange" }}>
          ⚠️ AI indisponível ou erro de comunicação
        </p>
      )}

      {data && (
        <>
          <p>Total de logs analisados: {data.total_logs}</p>
          <p>Anomalias detectadas: {data.anomalies_detected}</p>

          {data.anomalies.length === 0 ? (
            <p style={{ color: "green" }}>✅ Nenhuma anomalia detectada</p>
          ) : (
            <ul>
              {data.anomalies.map((log, index) => (
                <li key={index} style={{ color: "red" }}>
                  ⚠️ {log}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
