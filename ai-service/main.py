from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.ensemble import IsolationForest

app = FastAPI(title="Sentinela AI Service", version="1.0.0")

class LogInput(BaseModel):
    logs: List[str]

class AiResponse(BaseModel):
    total_logs: int
    anomalies_detected: int
    anomalies: List[str]

@app.get("/health")
def health():
    return {"status": "ai-ok"}

@app.post("/analyze", response_model=AiResponse)
def analyze_logs(data: LogInput):
    df = pd.DataFrame(data.logs, columns=["log"])
    df["length"] = df["log"].apply(len)

    model = IsolationForest(contamination=0.1, random_state=42)
    df["anomaly"] = model.fit_predict(df[["length"]])

    anomalies = df[df["anomaly"] == -1]["log"].tolist()

    return AiResponse(
        total_logs=len(data.logs),
        anomalies_detected=len(anomalies),
        anomalies=anomalies
    )
