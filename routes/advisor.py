from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
router = APIRouter()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class AdvisorRequest(BaseModel):
    business_description: str
    city: str
    budget: int
    influencers: Optional[List[dict]] = []

@router.post("/advisor")
def get_campaign_advice(request: AdvisorRequest):

    # Build influencer summary for prompt
    influencer_text = ""
    for i, inf in enumerate(request.influencers, 1):
        influencer_text += f"""
        Influencer {i}:
        - Username: @{inf.get('username')}
        - City: {inf.get('city')}
        - Niche: {inf.get('niche')}
        - Followers: {inf.get('followers')}
        - Charge per post: Rs.{inf.get('charge_per_post')}
        - Trust score: {inf.get('trust_score')}/100
        """

    prompt = f"""
You are an expert influencer marketing advisor for small Indian businesses.
A small business owner has described their business. 
Give them practical, simple advice in Hindi-English mix (Hinglish).

Business details:
- Description: {request.business_description}
- City: {request.city}
- Budget: Rs.{request.budget}

Matched influencers:
{influencer_text}

Please provide:
1. Top influencer recommendation and why (1-2 lines)
2. What the post should say (in Hindi, 2-3 lines)
3. Whether to offer barter or cash and how much
4. Expected reach for this budget
5. Ready-made DM script to send the influencer (in Hindi)

Keep it simple, practical and in Hinglish. 
Small business owner should easily understand.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800,
        temperature=0.7
    )

    advice = response.choices[0].message.content

    return {
        "status": "success",
        "business": request.business_description,
        "city": request.city,
        "budget": request.budget,
        "advice": advice
    }