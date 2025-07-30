import requests
import json
from ..cache.redis import redis_client

API_URL = "https://crminnovacion.com/api/conversaciones/Tele%20Medicina?page=1&limit=2"  # reemplaza
CACHE_KEY = "conversaciones"
TTL = 300  # 5 minutos

def get_conversaciones():
    cached = redis_client.get(CACHE_KEY)
    if cached:
        return json.loads(cached)

    response = requests.get(API_URL)
    response.raise_for_status()
    data = response.json()

    redis_client.setex(CACHE_KEY, TTL, json.dumps(data))
    return data
