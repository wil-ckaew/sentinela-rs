"use client";

import { useEffect, useState } from "react";

export default function RealtimeSocket() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080/ws");

    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onopen = () => {
      ws.send("Frontend conectado");
    };

    return () => ws.close();
  }, []);

  return (
    <div>
      <h3>⚡ Eventos em tempo real</h3>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
