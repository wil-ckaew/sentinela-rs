use actix_web::{post, web, HttpResponse};
use bcrypt::verify;
use sqlx::PgPool;
use serde::Deserialize;
use crate::auth::jwt::generate_jwt;
use crate::models::user::User;

#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[post("/login")]
pub async fn login(
    db: web::Data<PgPool>,
    data: web::Json<LoginRequest>,
) -> HttpResponse {
    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1"
    )
    .bind(&data.email)
    .fetch_one(db.get_ref())
    .await
    .unwrap();

    if verify(&data.password, user.password.as_ref().unwrap()).unwrap() {
        let token = generate_jwt(&user.id.to_string(), &user.role);
        return HttpResponse::Ok().json(serde_json::json!({ "token": token }));
    }

    HttpResponse::Unauthorized().finish()
}
