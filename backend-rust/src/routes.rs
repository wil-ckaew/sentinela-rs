use axum::{
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize)]
pub struct AnalyzeRequest {
    pub logs: Vec<String>,
}

#[derive(Serialize)]
pub struct HealthResponse {
    pub status: &'static str,
    pub service: &'static str,
}

pub async fn health() -> Json<HealthResponse> {
    Json(HealthResponse {
        status: "ok",
        service: "backend",
    })
}

pub async fn analyze(Json(payload): Json<AnalyzeRequest>) -> Json<serde_json::Value> {
    let client = reqwest::Client::new();

    let res = client
        .post("http://ai:8000/analyze")
        .json(&payload)
        .send()
        .await
        .expect("Falha ao acessar AI service");

    let json = res.json::<serde_json::Value>().await.unwrap();
    Json(json)
}

pub fn app() -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/analyze", post(analyze))
}
