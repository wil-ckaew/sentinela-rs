use axum::{routing::get, Router};
use prometheus::{Encoder, TextEncoder, IntCounter};

lazy_static::lazy_static! {
    pub static ref ALERT_COUNTER: IntCounter =
        IntCounter::new("alerts_total", "Total alerts").unwrap();
}

pub fn router() -> Router {
    Router::new().route("/metrics", get(metrics))
}

async fn metrics() -> String {
    let encoder = TextEncoder::new();
    let mf = prometheus::gather();
    let mut buffer = vec![];
    encoder.encode(&mf, &mut buffer).unwrap();
    String::from_utf8(buffer).unwrap()
}
