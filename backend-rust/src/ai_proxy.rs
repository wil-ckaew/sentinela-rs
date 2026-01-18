use axum::{Json, extract::State};
use reqwest::Client;
use serde_json::Value;
use std::env;

pub async fn analyze(
    Json(payload): Json<Value>,
) -> Json<Value> {
    let ai_url = env::var("AI_URL").unwrap_or("http://ai:8000".into());
    let client = Client::new();

    let res = client
        .post(format!("{}/analyze", ai_url))
        .json(&payload)
        .send()
        .await
        .expect("AI offline");

    let json = res.json::<Value>().await.unwrap();
    Json(json)
}
