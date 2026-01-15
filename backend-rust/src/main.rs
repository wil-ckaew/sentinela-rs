use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize)]
struct LogRequest {
    logs: Vec<String>,
}

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse { status: "ok" })
}

async fn analyze(Json(payload): Json<LogRequest>) -> Json<serde_json::Value> {
    Json(serde_json::json!({
        "total_logs": payload.logs.len(),
        "logs": payload.logs
    }))
}

#[tokio::main]
async fn main() {
    let app = Router::new()
        .route("/health", get(health))
        .route("/analyze", post(analyze));

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    println!("🚀 Backend rodando em http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("Erro ao bindar porta 8080");

    axum::serve(listener, app)
        .await
        .expect("Erro ao iniciar servidor");
}
