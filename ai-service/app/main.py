from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import pandas as pd
from sklearn.ensemble import IsolationForest
import psycopg2
import os

app = FastAPI(title="Sentinela AI Service")

DB_URL = os.getenv("DATABASE_URL")

class LogInput(BaseModel):
    logs: List[str]

def save_alert(log):
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO alerts (message, level) VALUES (%s, %s)",
        (log, "CRITICAL"),
    )
    conn.commit()
    cur.close()
    conn.close()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze_logs(data: LogInput):
    if not data.logs:
        return {"total_logs": 0, "anomalies_detected": 0, "anomalies": []}

    df = pd.DataFrame(data.logs, columns=["log"])
    df["length"] = df["log"].apply(len)

    model = IsolationForest(contamination=0.25, random_state=42)
    df["anomaly"] = model.fit_predict(df[["length"]])

    anomalies = df[df["anomaly"] == -1]["log"].tolist()

    for log in anomalies:
        save_alert(log)

    return {
        "total_logs": len(data.logs),
        "anomalies_detected": len(anomalies),
        "anomalies": anomalies
    }
