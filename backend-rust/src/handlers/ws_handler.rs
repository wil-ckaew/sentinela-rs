use actix_web::{HttpRequest, HttpResponse};
use actix_web_actors::ws;
use crate::ws::server::AlertWs;

pub async fn ws_alerts(req: HttpRequest, stream: actix_web::web::Payload) -> HttpResponse {
    ws::start(AlertWs, &req, stream).unwrap()
}
