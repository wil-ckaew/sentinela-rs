use jsonwebtoken::*;
use serde::{Serialize, Deserialize};
use chrono::{Utc, Duration};

const SECRET: &[u8] = b"SENTINELA_SECRET";

#[derive(Serialize, Deserialize)]
pub struct Claims {
    pub sub: String,
    pub role: String,
    pub exp: usize,
}

pub fn generate_jwt(user_id: &str, role: &str) -> String {
    let exp = (Utc::now() + Duration::hours(8)).timestamp() as usize;

    encode(
        &Header::default(),
        &Claims {
            sub: user_id.to_string(),
            role: role.to_string(),
            exp,
        },
        &EncodingKey::from_secret(SECRET),
    ).unwrap()
}

pub fn validate_jwt(token: &str) -> Claims {
    decode::<Claims>(
        token,
        &DecodingKey::from_secret(SECRET),
        &Validation::default(),
    )
    .unwrap()
    .claims
}
