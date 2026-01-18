use serde::{Serialize, Deserialize};
use uuid::Uuid;
use chrono::DateTime;
use chrono::Utc;

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct Alert {
    pub id: Uuid,
    pub level: String,
    pub message: String,
    pub created_at: DateTime<Utc>,
}
