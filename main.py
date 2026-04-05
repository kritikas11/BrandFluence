from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.match import router as match_router
from routes.advisor import router as advisor_router
import threading

app = FastAPI(
    title="BrandFluence API",
    description="AI powered influencer marketplace for small Indian businesses",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(match_router,   prefix="/api", tags=["Matching"])
app.include_router(advisor_router, prefix="/api", tags=["AI Advisor"])

@app.get("/")
def root():
    return {
        "message": "BrandFluence API is running!",
        "endpoints": {
            "match":   "/api/match",
            "advisor": "/api/advisor",
            "docs":    "/docs"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    # Load ML models in background thread so server starts immediately
    thread = threading.Thread(target=load_models_background)
    thread.daemon = True
    thread.start()
    print("Server started! ML models loading in background...")

def load_models_background():
    try:
        import ml_engine
        print("ML models loaded successfully in background!")
    except Exception as e:
        print(f"ML model loading error: {e}")