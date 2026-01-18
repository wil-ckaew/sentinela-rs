use actix_web::{dev::ServiceRequest, Error};
use actix_web::error::ErrorUnauthorized;
use futures_util::future::{ready, Ready};
use crate::auth::jwt::validate_jwt;

pub fn auth_middleware(req: ServiceRequest) -> Ready<Result<ServiceRequest, Error>> {
    if let Some(auth) = req.headers().get("Authorization") {
        if let Ok(token) = auth.to_str() {
            let token = token.replace("Bearer ", "");
            validate_jwt(&token);
            return ready(Ok(req));
        }
    }

    ready(Err(ErrorUnauthorized("Token inválido")))
}
