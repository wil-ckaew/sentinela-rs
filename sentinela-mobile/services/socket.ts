export function connect(onMessage: (data: any) => void) {
  const ws = new WebSocket("ws://SEU_IP:8080/ws");

  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
}
