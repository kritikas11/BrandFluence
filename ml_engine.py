from sentence_transformers import SentenceTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import numpy as np
import pandas as pd
from database import get_all_influencers
import os

print("Loading ML models...")

# ── Load sentence transformer ────────────────────────────
embedder = SentenceTransformer(
    'paraphrase-multilingual-MiniLM-L12-v2'
)
print("Sentence transformer loaded!")

# ── Load influencer data from Supabase ───────────────────
print("Loading influencers from Supabase...")
influencers = get_all_influencers()
df = pd.DataFrame(influencers)
print(f"Loaded {len(df)} influencers")

# ── Generate embeddings for all influencer bios ──────────
print("Generating embeddings...")
bio_texts = []
for _, row in df.iterrows():
    text = f"{row.get('bio','')} {row.get('niche','')} {row.get('city','')}"
    bio_texts.append(str(text))

influencer_embeddings = embedder.encode(
    bio_texts,
    show_progress_bar=True
)
print("Embeddings ready!")

# ── Train fake follower classifier ───────────────────────
print("Training fake follower classifier...")

features = ['followers','following','total_posts','engagement_rate']
df_model = df[features].fillna(0)

# Create labels based on rules
def compute_fake_label(row):
    followers  = row['followers'] or 0
    following  = row['following'] or 0
    posts      = row['total_posts'] or 0
    engagement = row['engagement_rate'] or 0

    score = 0
    if following > 0 and (followers/following) < 1.5:
        score += 30
    if engagement < 1.5:
        score += 40
    if posts < 10 and followers > 5000:
        score += 30
    return 1 if score > 40 else 0

df['fake_label'] = df_model.apply(compute_fake_label, axis=1)

X = df_model.values
y = df['fake_label'].values

fake_classifier = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)
fake_classifier.fit(X, y)
print("Fake follower classifier trained!")

# ── Core matching function ───────────────────────────────
def match_influencers(
    query: str,
    city: str = None,
    niche: str = None,
    budget: int = None,
    top_k: int = 3
):
    # Encode the brand's query
    query_embedding = embedder.encode([query])[0]

    # Cosine similarity with all influencers
    scores = np.dot(influencer_embeddings, query_embedding) / (
        np.linalg.norm(influencer_embeddings, axis=1) *
        np.linalg.norm(query_embedding) + 1e-10
    )

    # Add scores to dataframe
    df['match_score'] = scores

    filtered = df.copy()

    # Filter by city if provided
    if city:
        city_match = filtered[
            filtered['city'].str.lower() == city.lower()
        ]
        if len(city_match) >= top_k:
            filtered = city_match

    # Filter by niche if provided
    if niche:
        niche_match = filtered[
            filtered['niche'].str.lower() == niche.lower()
        ]
        if len(niche_match) >= top_k:
            filtered = niche_match

    # Filter by budget if provided
    if budget:
        budget_match = filtered[
            filtered['charge_per_post'] <= budget
        ]
        if len(budget_match) >= top_k:
            filtered = budget_match

    # Sort by match score
    filtered = filtered.sort_values(
        'match_score', ascending=False
    )

    # Get top K results
    top = filtered.head(top_k)

    results = []
    for _, row in top.iterrows():
        # Get fake follower prediction
        feat = [[
            row.get('followers', 0) or 0,
            row.get('following', 0) or 0,
            row.get('total_posts', 0) or 0,
            row.get('engagement_rate', 0) or 0
        ]]
        is_fake = fake_classifier.predict(feat)[0]
        trust_score = 85 if is_fake == 0 else 40

        results.append({
            "username":          row.get('username'),
            "full_name":         row.get('full_name'),
            "city":              row.get('city'),
            "niche":             row.get('niche'),
            "followers":         int(row.get('followers', 0) or 0),
            "engagement_rate":   float(row.get('engagement_rate', 0) or 0),
            "charge_per_post":   int(row.get('charge_per_post', 0) or 0),
            "match_score":       round(float(row['match_score']), 3),
            "trust_score":       trust_score,
            "fake_flag":         bool(is_fake),
            "profile_pic":       row.get('profile_pic'),
            "language":          row.get('language', 'Hindi+English')
        })

    return results