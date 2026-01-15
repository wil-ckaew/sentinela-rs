import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, backgroundColor: "#f8fafc" }}>
        <Navbar />
        <main style={{ padding: 32 }}>{children}</main>
      </body>
    </html>
  );
}
