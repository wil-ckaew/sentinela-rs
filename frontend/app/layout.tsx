import TopMenu from "@/components/TopMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, Arial, sans-serif",
          backgroundColor: "#f5f6f8",
        }}
      >
        <TopMenu />
        <div style={{ minHeight: "100vh" }}>{children}</div>
      </body>
    </html>
  );
}
