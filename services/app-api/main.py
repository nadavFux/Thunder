from fastapi import FastAPI

app = FastAPI(title="Thunder App API")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "app-api"}
