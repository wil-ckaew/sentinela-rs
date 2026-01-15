import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Sentinela.rs",
  description: "Monitoramento inteligente de logs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>
        <Navbar />
        <main style={{ padding: "24px" }}>{children}</main>
      </body>
    </html>
  );
}
