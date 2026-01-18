use axum::{
    http::StatusCode,
    middleware::Next,
    response::Response,
    extract::Request,
};
use crate::auth::validate_token;

pub async fn auth_middleware(
    req: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let headers = req.headers();
    let auth = headers
        .get("authorization")
        .ok_or(StatusCode::UNAUTHORIZED)?;

    validate_token(auth.to_str().unwrap().parse().unwrap())?;

    Ok(next.run(req).await)
}
