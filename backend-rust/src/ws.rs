use axum::{
    extract::ws::{WebSocketUpgrade, Message},
    response::IntoResponse,
};
use futures_util::StreamExt;

pub async fn ws_handler(ws: WebSocketUpgrade) -> impl IntoResponse {
    ws.on_upgrade(|mut socket| async move {
        while let Some(Ok(_)) = socket.next().await {
            let _ = socket.send(Message::Text(
                "⚠️ Alerta crítico detectado".into()
            )).await;
        }
    })
}
