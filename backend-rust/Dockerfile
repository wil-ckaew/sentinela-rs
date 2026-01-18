# =========================
# STAGE 1 — Build
# =========================
FROM rust:1.88 as builder

WORKDIR /app

# Copia apenas os manifests primeiro (cache melhor)
COPY Cargo.toml Cargo.lock ./

# Cria dummy src para cache
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Agora copia o código real
COPY . .

# Build final
RUN cargo build --release

# =========================
# STAGE 2 — Runtime
# =========================
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/release/sentinela-backend .

EXPOSE 8080

CMD ["./sentinela-backend"]
