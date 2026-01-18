import { NextResponse } from "next/server";

export async function POST() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE;

  if (!apiBase) {
    return NextResponse.json(
      { error: "API base não configurada" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiBase}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        logs: [
          "Falha de autenticação",
          "Acesso suspeito detectado",
          "Erro de permissão",
        ],
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Erro no proxy:", err);
    return NextResponse.json(
      { error: "AI Service indisponível" },
      { status: 502 }
    );
  }
}
