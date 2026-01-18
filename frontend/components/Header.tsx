import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <h2>🛡️ Sentinela.rs</h2>

      <nav>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/upload">Upload</Link>
      </nav>
    </header>
  );
}
