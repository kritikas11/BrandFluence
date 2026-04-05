from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

def get_all_influencers():
    result = supabase.table('influencers').select('*').execute()
    return result.data

def get_influencers_by_niche(niche: str):
    result = supabase.table('influencers')\
        .select('*')\
        .eq('niche', niche)\
        .execute()
    return result.data

def get_influencers_by_city(city: str):
    result = supabase.table('influencers')\
        .select('*')\
        .eq('city', city)\
        .execute()
    return result.data

def get_all_brands():
    result = supabase.table('brands').select('*').execute()
    return result.data