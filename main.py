from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.match import router as match_router
from routes.advisor import router as advisor_router

app = FastAPI(
    title="InfluenceWala API",
    description="AI powered influencer marketplace for small Indian businesses",
    version="1.0.0"
)

# Allow React frontend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register routes
app.include_router(match_router,   prefix="/api", tags=["Matching"])
app.include_router(advisor_router, prefix="/api", tags=["AI Advisor"])

@app.get("/")
def root():
    return {
        "message": "InfluenceWala API is running!",
        "endpoints": {
            "match":   "/api/match",
            "advisor": "/api/advisor",
            "docs":    "/docs"
        }
    }

@app.get("/health")
def health():
    return {"status": "healthy"}