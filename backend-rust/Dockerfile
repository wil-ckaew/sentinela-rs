# =========================
# STAGE 1 — Build
# =========================
FROM rust:1.86 as builder

WORKDIR /app

# Copia tudo
COPY . .

# Build release
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
