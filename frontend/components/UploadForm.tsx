"use client";

import { useState } from "react";

export default function UploadForm() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const file = e.currentTarget.file.files[0];
    if (!file) return;

    setLoading(true);

    await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: await file.text(),
    });

    setLoading(false);
    alert("Logs enviados para análise!");
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <input
        type="file"
        name="file"
        accept=".log,.txt,.csv"
        className="border p-2 w-full"
      />
      <button
        className="bg-black text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processando..." : "Enviar Logs"}
      </button>
    </form>
  );
}
