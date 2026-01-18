use axum::{
    extract::ws::{WebSocketUpgrade, WebSocket},
    response::IntoResponse,
};
use futures_util::{SinkExt, StreamExt};

pub async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(handle_socket)
}

async fn handle_socket(mut socket: WebSocket) {
    while let Some(Ok(msg)) = socket.next().await {
        if let axum::extract::ws::Message::Text(text) = msg {
            socket.send(text.into()).await.unwrap();
        }
    }
}
