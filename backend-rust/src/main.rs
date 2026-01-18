use dotenvy::dotenv;
use tokio::net::TcpListener;

mod auth;
mod db;
mod models;
mod middleware;
mod routes;

#[tokio::main]
async fn main() {
    dotenv().ok();

    let pool = db::connect().await;
    let app = routes::routes(pool);

    let listener = TcpListener::bind("0.0.0.0:8080")
        .await
        .unwrap();

    println!("🚀 Backend rodando em http://localhost:8080");

    axum::serve(listener, app).await.unwrap();
}
