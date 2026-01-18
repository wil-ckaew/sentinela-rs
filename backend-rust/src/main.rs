use actix_web::{App, HttpServer, web};
use actix_cors::Cors;

mod db;
mod auth;
mod models;
mod handlers;
mod ws;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenvy::dotenv().ok();
    let pool = db::connect().await;

    HttpServer::new(move || {
        App::new()
            .wrap(Cors::permissive())
            .app_data(web::Data::new(pool.clone()))
            .service(handlers::auth_handler::login)
            .service(handlers::alert_handler::get_alerts)
    })
    .bind(("0.0.0.0", 8080))?
    .run()
    .await
}
