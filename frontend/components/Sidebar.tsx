import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2>🛡️ Sentinela.rs</h2>

      <nav>
        <Link href="/dashboard">📊 Dashboard</Link>
        <Link href="/upload">📂 Upload Logs</Link>
      </nav>
    </aside>
  );
}
