use axum::{extract::State, Json};
use sqlx::PgPool;
use serde::Serialize;

#[derive(Serialize)]
pub struct Alert {
    pub id: i32,
    pub message: String,
    pub level: String,
}

pub async fn list_alerts(
    State(pool): State<PgPool>,
) -> Json<Vec<Alert>> {
    let alerts = sqlx::query_as!(
        Alert,
        "SELECT id, message, level FROM alerts ORDER BY id DESC"
    )
    .fetch_all(&pool)
    .await
    .unwrap();

    Json(alerts)
}
