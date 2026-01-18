use actix::{Actor, StreamHandler};
use actix_web_actors::ws;

pub struct AlertSocket;

impl Actor for AlertSocket {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for AlertSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        if let Ok(ws::Message::Text(msg)) = msg {
            ctx.text(msg);
        }
    }
}
