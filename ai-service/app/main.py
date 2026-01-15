from fastapi import FastAPI
from app.preprocessing import vectorize

app = FastAPI()

@app.get("/health")
def health():
    return {
        "status": "ok",
        "vector": vectorize("sentinela")
    }
