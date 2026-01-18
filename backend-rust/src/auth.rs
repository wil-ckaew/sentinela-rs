use axum::{
    extract::{State, TypedHeader},
    headers::Authorization,
    http::StatusCode,
    Json,
};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};
use serde::{Serialize, Deserialize};
use sqlx::PgPool;
use std::env;
use chrono::{Utc, Duration};

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: i32,
    pub role: String,
    pub exp: usize,
}

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub token: String,
}

pub async fn login(
    State(pool): State<PgPool>,
    Json(payload): Json<LoginRequest>,
) -> Result<Json<LoginResponse>, StatusCode> {
    let user = sqlx::query!(
        "SELECT id, password, role FROM users WHERE email = $1",
        payload.email
    )
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::UNAUTHORIZED)?;

    if user.password != payload.password {
        return Err(StatusCode::UNAUTHORIZED);
    }

    let claims = Claims {
        sub: user.id,
        role: user.role,
        exp: (Utc::now() + Duration::hours(24)).timestamp() as usize,
    };

    let secret = env::var("JWT_SECRET").unwrap();
    let token = encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .unwrap();

    Ok(Json(LoginResponse { token }))
}

pub fn validate_token(
    TypedHeader(auth): TypedHeader<Authorization<String>>,
) -> Result<Claims, StatusCode> {
    let token = auth.token();
    let secret = env::var("JWT_SECRET").unwrap();

    let data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map_err(|_| StatusCode::UNAUTHORIZED)?;

    Ok(data.claims)
}
