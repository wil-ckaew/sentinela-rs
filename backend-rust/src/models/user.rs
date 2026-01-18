use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(sqlx::FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub password: Option<String>,
    pub role: String,
    pub provider: String,
}
