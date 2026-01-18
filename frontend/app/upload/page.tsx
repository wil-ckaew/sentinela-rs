"use client";

export default function Upload() {
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    const text = await file.text();

    await fetch("http://ai:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logs: text.split("\n") }),
    });

    alert("Logs enviados!");
  };

  return (
    <main style={{ padding: 30 }}>
      <h1>📂 Upload de Logs</h1>
      <input type="file" accept=".log,.txt" onChange={handleUpload} />
    </main>
  );
}
