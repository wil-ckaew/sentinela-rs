use axum::{Router, routing::{get, post}, middleware};
use crate::{
    alerts::list_alerts,
    ws::ws_handler,
    ai_proxy::analyze,
    auth::login,
    middleware::auth_middleware,
};

pub fn routes() -> Router {
    Router::new()
        .route("/login", post(login))
        .route("/analyze", post(analyze))
        .route("/ws", get(ws_handler))
        .route(
            "/alerts",
            get(list_alerts).layer(middleware::from_fn(auth_middleware)),
        )
}
