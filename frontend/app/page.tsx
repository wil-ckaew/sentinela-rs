export const dynamic = "force-dynamic";

async function getAlerts() {
  try {
    const res = await fetch("http://ai:8000/analyze", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Falha ao acessar AI service");
    }

    return res.json();
  } catch (error) {
    console.error("Erro ao buscar alertas:", error);
    return [];
  }
}

export default async function Dashboard() {
  const alerts = await getAlerts();

  return (
    <main style={{ padding: 40 }}>
      <h1>📊 Dashboard – Sentinela.rs</h1>

      {alerts.length === 0 && (
        <p style={{ color: "orange" }}>
          ⚠️ Nenhum alerta recebido ou AI indisponível
        </p>
      )}

      <ul>
        {alerts.map((alert: any, index: number) => (
          <li key={index}>
            <strong>{alert.level}</strong> — {alert.message}
          </li>
        ))}
      </ul>
    </main>
  );
}

