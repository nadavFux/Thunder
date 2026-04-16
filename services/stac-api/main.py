from fastapi import FastAPI

app = FastAPI(title="Thunder STAC API")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "stac-api"}
