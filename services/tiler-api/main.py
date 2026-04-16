from fastapi import FastAPI

app = FastAPI(title="Thunder Tiler API")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "tiler-api"}
