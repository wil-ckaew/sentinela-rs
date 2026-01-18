use sqlx::{PgPool, postgres::PgPoolOptions};
use std::env;

pub async fn connect() -> PgPool {
    PgPoolOptions::new()
        .max_connections(5)
        .connect(&env::var("DATABASE_URL").unwrap())
        .await
        .expect("Erro ao conectar no banco")
}
