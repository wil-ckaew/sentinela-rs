use sqlx::{PgPool, postgres::PgPoolOptions};
use std::env;

pub async fn connect() -> PgPool {
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL não definida");

    PgPoolOptions::new()
        .max_connections(5)
        .connect(&database_url)
        .await
        .expect("Erro ao conectar no Postgres")
}
