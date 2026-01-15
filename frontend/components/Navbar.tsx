"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        backgroundColor: "#020617",
        color: "#ffffff",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <strong>🛡️ Sentinela.rs</strong>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Dashboard</Link>
        <Link href="/dashboard">Tempo real</Link>
        <Link href="/upload">Upload</Link>
      </div>
    </nav>
  );
}
