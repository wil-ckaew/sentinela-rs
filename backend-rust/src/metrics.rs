use axum::{response::IntoResponse, body::Body};
use prometheus::{Encoder, TextEncoder, IntCounter};
use once_cell::sync::Lazy;

pub static REQUEST_COUNTER: Lazy<IntCounter> = Lazy::new(|| {
    prometheus::register_int_counter!(
        "http_requests_total",
        "Total de requisições HTTP"
    )
    .unwrap()
});

pub async fn metrics() -> impl IntoResponse {
    let encoder = TextEncoder::new();
    let metric_families = prometheus::gather();

    let mut buffer = Vec::new();
    encoder.encode(&metric_families, &mut buffer).unwrap();

    Body::from(buffer)
}
