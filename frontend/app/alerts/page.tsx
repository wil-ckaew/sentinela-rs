async function getAlerts() {
  try {
    const res = await fetch("http://localhost:3000/proxy", {
      method: "POST",
      cache: "no-store",
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function AlertsPage() {
  const data = await getAlerts();

  return (
    <main style={{ padding: 40 }}>
      <h1>🚨 Alertas – Sentinela</h1>

      {!data ? (
        <p>AI Service indisponível</p>
      ) : (
        <>
          <p>Total de logs: {data.total_logs}</p>
          <p>Anomalias: {data.anomalies_detected}</p>

          <ul>
            {data.anomalies.map((a: string, i: number) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
