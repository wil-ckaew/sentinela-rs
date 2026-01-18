use axum::{Json, extract::State};
use serde::{Deserialize, Serialize};
use jsonwebtoken::{encode, Header, EncodingKey};
use chrono::{Utc, Duration};
use sqlx::PgPool;
use crate::models::User;

#[derive(Deserialize)]
pub struct LoginInput {
    pub email: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub role: String,
    pub exp: usize,
}

pub async fn login(
    State(pool): State<PgPool>,
    Json(input): Json<LoginInput>,
) -> Json<serde_json::Value> {

    let user: User = sqlx::query_as(
        "SELECT id, email, password, role FROM users WHERE email = $1"
    )
    .bind(&input.email)
    .fetch_one(&pool)
    .await
    .expect("Usuário não encontrado");

    if user.password != input.password {
        panic!("Senha inválida");
    }

    let exp = Utc::now() + Duration::hours(2);

    let claims = Claims {
        sub: user.email,
        role: user.role,
        exp: exp.timestamp() as usize,
    };

    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(b"SECRET"),
    ).unwrap();

    Json(serde_json::json!({ "token": token }))
}
