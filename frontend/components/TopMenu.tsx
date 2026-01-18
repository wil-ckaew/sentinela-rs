"use client";

import Link from "next/link";

export default function TopMenu() {
  return (
    <header style={{
      background: "linear-gradient(90deg,#0f172a,#020617)",
      padding: 16,
      color: "white",
      display: "flex",
      gap: 20
    }}>
      <strong>🛡️ Sentinela.rs</strong>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/upload">Upload</Link>
      <Link href="/alerts">Alertas</Link>
    </header>
  );
}
