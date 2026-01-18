use actix_web::{HttpResponse};

pub async fn oauth_google() -> HttpResponse {
    HttpResponse::Found()
        .append_header((
            "Location",
            "https://accounts.google.com/o/oauth2/v2/auth?...",
        ))
        .finish()
}

pub async fn oauth_github() -> HttpResponse {
    HttpResponse::Found()
        .append_header((
            "Location",
            "https://github.com/login/oauth/authorize?...",
        ))
        .finish()
}
