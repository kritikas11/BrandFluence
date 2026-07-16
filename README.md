# BrandFluence

AI-powered influencer marketplace built for small Indian businesses — helps a business owner describe their brand/campaign in plain language and get back matched influencers plus practical, Hinglish campaign advice.

Built for HackVerse 2.0.

---

## What it does

1. **Influencer matching** — A business describes what they're looking for (in Hindi or English). The query is embedded using a multilingual sentence transformer and matched against influencer profile embeddings (bio + niche + city) via cosine similarity. Results can be filtered by city, niche, and budget.

2. **Fake-follower flagging** — Each matched influencer is scored by a `RandomForestClassifier` trained on engagement heuristics (follower/following ratio, engagement rate, post count vs. follower count) to flag likely fake-follower accounts and assign a trust score. Note: labels are rule-based, not verified ground-truth fraud data — this is a heuristic signal, not a guarantee.

3. **AI campaign advisor** — Given the business description, city, budget, and the matched influencer list, an LLM (via Groq) generates practical campaign advice in Hinglish: top influencer pick and why, suggested post copy, barter vs. cash guidance, expected reach, and a ready-to-send DM script.

---

## Tech stack

**Backend:** FastAPI
**ML/Matching:** Sentence-Transformers (`paraphrase-multilingual-MiniLM-L12-v2`), scikit-learn (RandomForestClassifier)
**LLM:** Groq API (`llama-3.1-8b-instant`)
**Database:** Supabase (Postgres)
**Frontend:** React

---

## API endpoints

| Method | Endpoint      | Description                                             |
|--------|---------------|----------------------------------------------------------|
| GET    | `/`           | API status + endpoint list                               |
| GET    | `/health`     | Health check                                              |
| POST   | `/api/match`  | Returns top-K matched influencers for a query             |
| POST   | `/api/advisor`| Returns AI-generated campaign advice (Hinglish)            |
| GET    | `/docs`       | Auto-generated FastAPI docs (Swagger UI)                   |

### `POST /api/match`
```json
{
  "query": "looking for a fashion influencer for a saree brand",
  "city": "Lucknow",
  "niche": "fashion",
  "budget": 5000,
  "top_k": 3
}
```

### `POST /api/advisor`
```json
{
  "business_description": "small handmade jewellery brand",
  "city": "Lucknow",
  "budget": 5000,
  "influencers": [ /* results from /api/match */ ]
}
```

---

## Project structure

```
.
├── main.py                  # FastAPI app entrypoint
├── ml_engine.py              # Embedding + matching + fake-follower classifier
├── database.py                # Supabase client + queries
├── routes/
│   ├── match.py                # /api/match endpoint
│   └── advisor.py               # /api/advisor endpoint (Groq LLM)
└── influencewala-frontend/      # React frontend
```

---

## Setup

**Requirements:** Python 3.11, a Supabase project with `influencers` and `brands` tables, a Groq API key.

1. Clone the repo and install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   GROQ_API_KEY=your_groq_api_key
   ```

3. Run the API:
   ```bash
   uvicorn main:app --reload
   ```

4. Visit `http://localhost:8000/docs` for interactive API docs.

---

## Notes

- The fake-follower detector uses heuristic rule-based labels, not verified fraud data — treat trust scores as a directional signal, not ground truth.
- Advisor responses are generated per-request via Groq and aren't cached.
