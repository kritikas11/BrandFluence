from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from ml_engine import match_influencers

router = APIRouter()

class MatchRequest(BaseModel):
    query: str           # brand's description in Hindi or English
    city: Optional[str] = None
    niche: Optional[str] = None
    budget: Optional[int] = None
    top_k: Optional[int] = 3

@router.post("/match")
def find_influencers(request: MatchRequest):
    results = match_influencers(
        query=request.query,
        city=request.city,
        niche=request.niche,
        budget=request.budget,
        top_k=request.top_k
    )
    return {
        "status": "success",
        "query": request.query,
        "total_found": len(results),
        "influencers": results
    }