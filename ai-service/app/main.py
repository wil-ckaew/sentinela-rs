from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.ensemble import IsolationForest

app = FastAPI(title="Sentinela AI Service")

class LogInput(BaseModel):
    logs: List[str]

@app.get("/health")
def health():
    return {"status": "ok", "service": "ai"}

@app.post("/analyze")
def analyze_logs(data: LogInput):
    if not data.logs:
        return {
            "total_logs": 0,
            "anomalies_detected": 0,
            "anomalies": []
        }

    df = pd.DataFrame(data.logs, columns=["log"])
    df["length"] = df["log"].apply(len)

    model = IsolationForest(contamination=0.25, random_state=42)
    df["anomaly"] = model.fit_predict(df[["length"]])

    anomalies = df[df["anomaly"] == -1]["log"].tolist()

    return {
        "total_logs": len(data.logs),
        "anomalies_detected": len(anomalies),
        "anomalies": anomalies
    }
