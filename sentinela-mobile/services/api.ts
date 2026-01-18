export async function analyze() {
  const res = await fetch("http://SEU_IP:8080/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      logs: ["erro", "falha critica", "ok"]
    }),
  });

  return res.json();
}
