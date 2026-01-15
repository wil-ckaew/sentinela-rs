FROM rust:1.83 AS builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
WORKDIR /app

# COPIANDO O BINÁRIO COM O NOME CORRETO
COPY --from=builder /app/target/release/backend-rust /app/backend-rust

EXPOSE 8080

# EXECUTANDO O BINÁRIO CORRETO
CMD ["./backend-rust"]
