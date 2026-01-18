use axum::{
    Router,
    routing::{post, get},
    middleware,
};
use sqlx::PgPool;

use crate::{auth::login, middleware::auth_guard};

pub fn routes(pool: PgPool) -> Router {
    Router::new()
        .route("/login", post(login))
        .route(
            "/dashboard",
            get(|| async { "Dashboard protegido" })
                .layer(middleware::from_fn(auth_guard)),
        )
        .with_state(pool)
}
