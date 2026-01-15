use axum::extract::ws::{Message, WebSocket};
use futures_util::StreamExt;

pub async fn handle_socket(mut socket: WebSocket) {
    while let Some(msg) = socket.next().await {
        match msg {
            Ok(Message::Text(text)) => {
                println!("📩 WebSocket recebeu: {}", text);
            }
            Ok(Message::Close(_)) => {
                println!("❌ WebSocket fechado");
                break;
            }
            _ => {}
        }
    }
}
