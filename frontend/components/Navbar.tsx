"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#0f172a", // azul escuro
        color: "white",
        padding: "16px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <strong style={{ fontSize: 20 }}>🛡️ Sentinela.rs</strong>

      <nav style={{ display: "flex", gap: 20 }}>
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>

        <Link href="/dashboard" style={{ color: "white", textDecoration: "none" }}>
          Dashboard
        </Link>

        <Link href="/upload" style={{ color: "white", textDecoration: "none" }}>
          Upload
        </Link>
      </nav>
    </header>
  );
}
