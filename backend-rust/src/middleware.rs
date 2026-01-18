use axum::{
    body::Body,
    http::Request,
    middleware::Next,
    response::Response,
};
use jsonwebtoken::{decode, Validation, DecodingKey};
use crate::auth::Claims;

pub async fn auth_guard(
    req: Request<Body>,
    next: Next,
) -> Response {
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok());

    if let Some(auth) = auth_header {
        let token = auth.strip_prefix("Bearer ");

        if let Some(token) = token {
            if decode::<Claims>(
                token,
                &DecodingKey::from_secret(b"SECRET"),
                &Validation::default(),
            )
            .is_ok()
            {
                return next.run(req).await;
            }
        }
    }

    Response::builder()
        .status(401)
        .body(Body::from("Não autorizado"))
        .unwrap()
}
