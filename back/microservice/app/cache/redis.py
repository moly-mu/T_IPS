import redis
import os

# Usar variable de entorno para la URL de Redis
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Para desarrollo local vs Docker
if REDIS_URL.startswith("redis://"):
    redis_client = redis.from_url(REDIS_URL, decode_responses=True)
else:
    # Fallback para configuración manual
    redis_client = redis.Redis(
        host=os.getenv("REDIS_HOST", "localhost"), 
        port=int(os.getenv("REDIS_PORT", 6379)), 
        db=int(os.getenv("REDIS_DB", 0)), 
        decode_responses=True
    )
